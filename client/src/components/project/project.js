import React from "react";

import { ImageTable, Upload } from "./components";
import { useProject } from "./hooks";
import { fetchCurrentUser } from "../../util";

export const Project = (props) => {
  const { projectId } = props.location.state;
  const user = fetchCurrentUser();

  const project = useProject({ projectId: projectId });
  
  return (
    <main>
      <p>user: {user.username}</p>
      {project.userIsAdmin && (
        <p>User is admin</p>
      )}
      <Upload projectId={projectId} />
      <ImageTable 
        projectId={projectId} 
        userIsAdmin={project.userIsAdmin}
        username={user.username}
      />
    </main>
  )
}
