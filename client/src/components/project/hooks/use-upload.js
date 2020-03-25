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

  const _checkDeploy = (uploadedId, interval=1000) => {
    const check = async() => {
      const uploadedFile = await UploadedFile.fetch(uploadedId);
      const status = uploadedFileStatus[uploadedFile.status];

      switch (status) {
        case "UPLOADED":
        case "TO_DEPLOY":
        case "TO_CONVERT":
          setUploadedStatus({
            result: "processing",
            status: status
          });
          setTimeout(check, interval);
          break;
        case "CONVERTED":
        case "DEPLOYED":
          setUploadedStatus({
            result: "success",
            status: status
          });
          socket.emit("fetchData");
          break;
        case "ERROR_FORMAT":
        case "ERROR_CONVERSION":
        case "UNCOMPRESSED":
        case "ERROR_DEPLOYMENT":
          setUploadedStatus({
            result: "error",
            status: status
          });
          break;
        default:
      }
    }

    setAction("checkDeploy");
    check();

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

      const uploaded = await uploadRequest({
        projectId: projectId,
        storageId: storageId,
        uploadFiles: uploadFiles,
        signature: signature,
        setUploadProgress: setUploadProgress
      });

      const uploadedId = uploaded.data[0].uploadFile.id;

      _checkDeploy(uploadedId);      
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