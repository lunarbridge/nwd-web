/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from "react";
import { StorageCollection, UploadedFile, User } from "cytomine-client";

import { SocketContext } from "../../../context";
import { uploadSignature as signatureRequest, upload as uploadRequest } from "../../../api";
import { uploadedFileStatus } from "../../../constants";

// const uploadedFileStatus = ["UPLOADED", "CONVERTED", "DEPLOYED", "ERROR_FORMAT",
//                             "ERROR_CONVERSION", "UNCOMPRESSED", "TO_DEPLOY",
//                             "TO_CONVERT", "ERROR_CONVERSION", "ERROR_DEPLOYMENT"];

export const useUpload = ({ projectId }) => {
  const [signature, setSignature] = useState(null);
  const [storageId, setStorageId] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState(null);
  const [action, setAction] = useState("upload");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedStatus, setUploadedStatus] = useState(uploadedFileStatus[0]);
  const socket = useContext(SocketContext);

  const _checkDeploy = (uploadedId, interval=500) => {
    const exitCheck = (checkerId) => {
      console.log('exit check')
      
      clearInterval(checkerId);
      setTimeout(() => setIsUploading(false), 5000);
    }

    setAction("checkDeploy");

    let checker = setInterval(async() => {
      const { status, statusText } = await UploadedFile.fetch(uploadedId);

      setUploadProgress(status);
      setUploadedStatus(statusText);

      switch (statusText) {
        case "UPLOADED":
          setUploadedStatus({
            result: "uploaded file",
            status: statusText
          });
        case "TO_DEPLOY":
          setUploadedStatus({
            result: "Deploy scheduled...",
            status: statusText
          });
        case "TO_CONVERT":
          setUploadedStatus({
            result: "Processing image...",
            status: statusText
          });
          exitCheck(checker);
          break;
        case "CONVERTED":
          setUploadedStatus({
            result: "Converted image",
            status: statusText
          });
        case "DEPLOYED":
          setUploadedStatus({
            result: "Successfully deployed image",
            status: statusText
          });
          exitCheck(checker);
          socket.emit("fetchData");
          break;
        case "ERROR_FORMAT":
          setUploadedStatus({
            result: "Upload file format is not supported",
            status: statusText
          });
          exitCheck();
        case "ERROR_CONVERSION":
          setUploadedStatus({
            result: "Failed to convert image",
            status: statusText
          });
          exitCheck(checker);
        case "UNCOMPRESSED":
          setUploadedStatus({
            result: "Uncomporessed",
            status: statusText
          });
          exitCheck(checker);
        case "ERROR_DEPLOYMENT":
          setUploadedStatus({
            result: "Failed to deploy image",
            status: statusText
          });
          exitCheck(checker);
          break;
        default:
        }

    }, interval);
  }

  const handleUpload = async(event) => {
    event.preventDefault();

    const uploadFiles = event.target.files;
    const uploadFile = uploadFiles[0]

    if (uploadFile) {
      setFile(uploadFile);
      setUploadProgress(0);
      setAction("upload");
      setIsUploading(true);

      const uploadedFileId = await uploadRequest({
        projectId: projectId,
        storageId: storageId,
        uploadFiles: uploadFiles,
        signature: signature,
        setUploadProgress: setUploadProgress
      });

      _checkDeploy(uploadedFileId);   
    } 
  }

  useEffect(() => {
    const fetch = async() => {
      const storages = await StorageCollection.fetchAll();
      const me = await User.fetchCurrent();
      const myStorage = storages.array.filter(storage => storage.user === me.id)[0];

      const signature = await signatureRequest({ 
        projectId: projectId,
        storageId: myStorage.id 
      });

      setStorageId(myStorage.id);
      setSignature(signature);      
    }

    fetch();
  }, []);

  return {
    file,
    action,
    isUploading,
    uploadProgress,
    uploadedStatus,
    handleUpload
  }
} 