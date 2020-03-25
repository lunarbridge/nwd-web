import axios from "axios";

import { cytomineCurrentTime, requestAPI } from "../util"

export const annotation = async({ jobUserId, imageInstanceId, imageWidth, imageHeight }) => {
  const bbox = `0,0,${imageWidth},${imageHeight}`;

  return requestAPI({
    url: "/annotation.json?user=" + jobUserId
      + "&notReviewedOnly=false"
      + "&image=" + imageInstanceId
      + "&showWKT=true"
      + "&showTerm=true"
      + "&kmeans=true"
      + "bbox=" + bbox,
    method: "GET"
  });
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

  return axios.request({
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
    }
  });
}

export const uploadSignature = async({ projectId, storageId }) => {
  const forwardURI = "/upload";
  const method = "POST";
  const queryString = "idProject=" + projectId + "&idStorage=" + storageId 
    + "&cytomine=" + process.env.REACT_APP_REMOTE_SERVER; 
  const date = cytomineCurrentTime();

  const response = await requestAPI({
    url: "/signature.json?date=" + encodeURIComponent(date) 
      + "&forwardURI=" + forwardURI
      + "&method=" + method
      + "&queryString=" + encodeURIComponent(queryString), 
    headers: new Headers({
      "X-Requested-With": "XMLHttpRequest"
    })
  });

  return Object.assign(response, { dateFull: date });
}

export const stopPrediction = async({ jobId }) => {
  return requestAPI({
    url: '/job/' + jobId + '/kill.json',
    method: 'GET'
  })
}