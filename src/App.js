import React, { useState, useEffect } from "react";
import "./App.css";
import { Auth } from "./Components/Auth";
import { db } from "./firebase-config";
import { getDocs, collection } from "firebase/firestore";

function App() {
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
    <div className="App">
      <Auth />
      <div>
        {jobInfo.map(({ id, jobTitle }) => (
          <div key={id}>{jobTitle}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
