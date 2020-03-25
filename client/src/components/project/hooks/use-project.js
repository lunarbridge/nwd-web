/* eslint-disable react-hooks/exhaustive-deps */
import { Project } from "cytomine-client"; 
import { useState, useEffect } from "react";

import { fetchCurrentUser } from "../../../util";

export const useProject = ({ projectId }) => {
  const [userIsAdmin, setUserIsAdmin] = useState(false);

  useEffect(() => {
    const fetch = async() => {
      const project = await Project.fetch(projectId);
      const admins = await project.fetchAdministrators();

      const me = fetchCurrentUser();
      const currentUserIsAdmin = admins.array.map(admin => admin.id).includes(me.id);

      setUserIsAdmin(currentUserIsAdmin);
    }

    fetch();
  }, []);

  return {
    userIsAdmin
  }
}