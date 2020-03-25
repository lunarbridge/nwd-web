import { useState, useEffect } from "react";
import { ProjectCollection } from "cytomine-client";

export const useProjects = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetch = async() => {
            const projects = await ProjectCollection.fetchAll();
            setProjects(projects._data);
        }

        fetch();
    }, []);

    return { projects }
}