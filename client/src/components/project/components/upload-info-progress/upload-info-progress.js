import React from "react";

export const UploadInfoProgress = (props) => {
  const { file, action, uploadProgress, uploadedStatus } = props;

  switch (action) {
    case "upload":
      return (
        <main>
          <p>{file.name}</p>
          <p>{uploadProgress}</p>
        </main>
      )
    case "checkDeploy":
      return (
        <main>
          <p>{file.name}</p>
          <p>{uploadedStatus.result}</p>
          <p>{uploadedStatus.status}</p>
        </main>
      )
    default:
  }
}