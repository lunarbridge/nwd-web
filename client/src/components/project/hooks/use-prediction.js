/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from "react";
import { Job, JobParameter } from "cytomine-client";

import { SocketContext } from "../../../context";
import { stopPrediction } from '../../../api'

export const usePrediction = ({ projectId }) => {
  const [software, setSoftware] = useState(null);
  const [parameters, setParameters] = useState([]);

  const socket = useContext(SocketContext);

  const start = async({ imageInstanceId }) => {
    const requiredParamTemplate = {
      "CYTOMINE_ID_IMAGE": imageInstanceId
    }
    
    const jobParams = [];

    parameters.forEach(param => {
      let value = null;
      value = param.requireSetValue ? requiredParamTemplate[param.key] : param.value;

      const jobParameter = new JobParameter({
        softwareParameter: param.id,
        value: value
      });

      jobParams.push(jobParameter);
    });

    let job = new Job({
      software: software.id,
      project: projectId
    });
    
    job.jobParameters = jobParams;
    job = await job.save();
    // console.log(job);
    await job.execute();

    // console.log(res);
    // const data = {
    //   processId: job.id
    // }

    socket.emit('fetchData');

    // socket.emit("monitorProcess", JSON.stringify(data));
  }

  const stop = async({ jobId }) => {
    try {
      const res = await stopPrediction({ jobId: jobId });
      console.log(res);

      socket.emit('fetchData');
    } catch(error) {
      alert('Remote server error')
    }
    // const res = await stopPrediction({ jobId: jobId });
    // socket.emit('fetchData');

    // console.log(res);
  }

  useEffect(() => {
    socket.on("fetchSoftware", (data) => {
      setSoftware(data.latestSoftware);
      setParameters(data.parameters);
    });

    socket.emit("fetchSoftware");
    
  }, []);

  return {
    start,
    stop
  }
}