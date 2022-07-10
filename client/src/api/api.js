import axios from "axios";
import { Cytomine } from "cytomine-client";
import { cytomineCurrentTime, requestAPI } from "../util"
import { fetchCurrentUser } from "../util";

export const annotation = async({ jobUserId, imageInstanceId, imageWidth, imageHeight }) => {
  const bbox = `0,0,${imageWidth},${imageHeight}`;
  const params = {
    user: jobUserId,
    notReviewedOnly: false,
    image: imageInstanceId,
    showWKT: true,
    showTerm: true,
    kmeans: false,
    bbox: bbox
  };


  const { data } = await Cytomine.instance.api.get('annotation.json', {params});
  
  return data; 
}

export const upload = async({ projectId, storageId, uploadFiles, signature, setUploadProgress }) => {
  const files = Array.from(uploadFiles);
  const authorization = "CYTOMINE " + signature.publicKey + ":" + signature.signature;
  let formData = new FormData();

  formData.append("idStorage", storageId);
  formData.append("idProject", projectId);
  formData.append("files[]", files[0]);

  const url = process.env.REACT_APP_UPLOAD_SERVER 
    + "/upload?idProject=" + projectId
    + "&idStorage=" + storageId
    + "&cytomine=" + process.env.REACT_APP_REMOTE_SERVER;

  const requestRes = await axios.request({
    url: url,
    method: "POST",
    data: formData,
    headers: {
      'Accept': "applicatin/json, text/javascript, */*, q=0.01",
      'Authorization': authorization,
      'Content-Type-Full': 'null',
      'DateFull': signature.dateFull,
      'Origin': process.env.REACT_APP_REMOTE_SERVER
    },
    onUploadProgress: (progress) => {
      setUploadProgress(Math.round((progress.loaded / progress.total) * 100));
    },
    withCredentials: false,
  });

  const { uploadedFile } = requestRes.data[0];

  return uploadedFile.id;
}

export const uploadSignature = async({ projectId, storageId }) => {
  const forwardURI = "/upload";
  const method = "POST";
  const queryString = "idProject=" + projectId + "&idStorage=" + storageId 
    + "&cytomine=" + process.env.REACT_APP_REMOTE_SERVER; 
  const date = cytomineCurrentTime();
  const { publicKey } = fetchCurrentUser();

  const uploadSignature = await Cytomine.instance.fetchSignature({
    method: "POST",
    uri: forwardURI,
    queryString: queryString,
    date: date,
    contentMD5: null,
    contentType: null,
  });

  const signature = {
    publicKey: publicKey,
    signature: uploadSignature,
    dateFull: date
  }

  return signature;
}

export const stopPrediction = async({ jobId }) => {
  return requestAPI({
    url: '/job/' + jobId + '/kill.json',
    method: 'GET'
  })
}