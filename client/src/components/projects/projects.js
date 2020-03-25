import React from "react";
import { Link } from "react-router-dom";

import { useProjects } from "./hooks";

export const Projects = (props) => {
    const { projects } = useProjects();

    return(
        <div>
            {projects.map(project => (
                <div>
                    <Link to={{ 
                        pathname: "/project",
                        state: {
                            projectId: project.id
                        }
                    }}>{project.name}</Link>
                </div>
            ))}      
        </div>
    );
}