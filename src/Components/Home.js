import React, { useState, useEffect } from "react";
import { db } from "../firebase-config";
import { getDocs, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const jobInfoCollection = collection(db, "jobInfo");

  const [jobInfo, setJobInfo] = useState([]);

  const getJobInfoList = async () => {
    try {
      const data = await getDocs(jobInfoCollection);
      const getData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setJobInfo(getData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getJobInfoList();
  }, []);

  return (
    <>
      {jobInfo.map(({ id, jobTitle }) => (
        <div key={id}>{jobTitle}</div>
      ))}
    </>
  );
};

export default Home;
