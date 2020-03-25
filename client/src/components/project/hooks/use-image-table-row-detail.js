/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from "react";

export const useImageTableRowDetail = ({ jobs, hasJobs }) => {
  const [selectedResultId, setSelectedResultId] = useState(0);
  const [results, setResults] = useState([]);
  const inputLabel = useRef(null);

  const handleSelectResult = (event) => {
    setSelectedResultId(event.target.value);
  }

  const currentSelectedResult = () => {
    return results.filter(result => result.id === selectedResultId)[0];
  }

  useEffect(() => {
    if (hasJobs) {
      const contains = jobs.map(job => job.id).includes(selectedResultId);
      
      if (!contains || results.length !== jobs.length) {
        setSelectedResultId(jobs[0].id)
      }
    } else {
      setSelectedResultId(0);
    }

    setResults(jobs);
  }, [jobs]);

  return {
    inputLabel,
    selectedResultId,
    handleSelectResult,
    currentSelectedResult
  }
}