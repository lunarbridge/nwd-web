/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useContext } from 'react';
import { ImageInstanceCollection, Job, ImageInstance } from 'cytomine-client';

import { processStatus as status } from '../../../constants';
import { SocketContext } from '../../../context';

export const useImageData = ({ projectId }) => {
  const [processStatus, setProcessStatus] = useState([]);
  const [images, setImages] = useState([]);
  const socket = useContext(SocketContext);

  const getImage = (id) => {
    return images.filter(image => image.id === id)[0];
  }

  const getJobs = (imageInstanceId) => {
    return (processStatus.filter(status => 
      status.image_instance_id === imageInstanceId
    ));
  }

  const _deleteJob = async(resultId) => {
    const toDeleteJob = await Job.fetch(resultId);
    await toDeleteJob.deleteAllData();
    await toDeleteJob.delete();
  }

  const handleDeleteImage = async(imageInstanceId) => {
    const jobs = getJobs(imageInstanceId);

    const promises = jobs.forEach(async(job) => {
      await _deleteJob(job.id);
    });

    Promise.resolve(promises);
    await ImageInstance.delete(imageInstanceId);

    socket.emit('fetchData');
  }

  const handleDeleteResult = async(resultId) => {
    const res = await _deleteJob(resultId);
    console.log(res);

    socket.emit('fetchData');
  }

  const checkHasRunningJob = (jobs) => {
    return jobs.map(job => checkIsJobRunning(job)).includes(true);
  }

  const checkIsJobRunning = (job) => {
    let isRunning = false;

    switch (status[job.status]) {
      case "NOT_LAUNCH":
      case "IN_QUEUE":
      case "RUNNING":
      case "WAIT":
        isRunning = true;
        break;
      default:
    }

    return isRunning
  }

  useEffect(() => {        
    const fetchImages = async() => {
      const images = await ImageInstanceCollection.fetchAll({
        filterKey: 'project',
        filterValue: projectId
      });
      
      setImages(images.array);
    }

    fetchImages();

    const data = {
        projectId: projectId
    };

    socket.emit('join', JSON.stringify(data));
    
    socket.on('fetchData', (data) => {
      fetchImages();
      const { processStatus } = data;
      setProcessStatus(processStatus);
    });

    socket.emit('fetchData');

    socket.on('updateProcess', (data) => {
      fetchImages();
      const { processStatus } = data;
      setProcessStatus(processStatus);
    })

    return () => {
      socket.emit('leave');
      socket.off('fetchData');
      socket.off('updateProcess');
    }
  }, []);

  return { 
    processStatus, 
    images,
    getImage,
    getJobs,
    handleDeleteResult,
    handleDeleteImage,
    checkIsJobRunning,
    checkHasRunningJob
  }
}