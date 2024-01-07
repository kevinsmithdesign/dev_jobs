import React, { useState, useEffect } from "react";
import { db } from "../firebase-config";
import { getDocs, collection } from "firebase/firestore";

import {
  Button,
  Grid,
  Card,
  CardContent,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";

const Home = () => {
  const jobInfoCollection = collection(db, "jobInfo");

  const [jobInfo, setJobInfo] = useState([]);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  //   const getJobInfoList = async () => {
  //     try {
  //       const data = await getDocs(jobInfoCollection);
  //       const getData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  //       setJobInfo(getData);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  const [selectedJob, setSelectedJob] = useState(null);
  const [openApplyModal, setOpenApplyModal] = useState(false);
  const [applicantInfo, setApplicantInfo] = useState({
    resume: "",
    phoneNumber: "",
    email: "",
  });

  const handleApplyClick = () => {
    setOpenApplyModal(true);
  };

  const handleApplyModalClose = () => {
    setOpenApplyModal(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setApplicantInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleApplySubmit = () => {
    // Handle the submission of applicant information here
    console.log("Applicant Information:", applicantInfo);
    // Close the modal after submission
    setOpenApplyModal(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDocs(jobInfoCollection);
        const getData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setJobInfo(getData);

        // Automatically select the first card when the component mounts
        if (getData.length > 0) {
          setSelectedJob(getData[0]);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const handleCardClick = (index) => {
    // Check if jobInfo is not empty and index is valid
    if (jobInfo.length > 0 && index >= 0 && index < jobInfo.length) {
      setSelectedJob(jobInfo[index]);
      setActiveCardIndex(index);
    }
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={5}>
          {jobInfo.map(
            ({ jobTitle, companyName, location, salaryRange }, index) => (
              <Card
                key={index}
                sx={{
                  boxShadow: 0,
                  border:
                    activeCardIndex === index
                      ? "1px solid #007bff"
                      : "1px solid #ddd",
                  mb: 1,
                  cursor: "pointer",
                  backgroundColor:
                    activeCardIndex === index ? "#EFF7FF" : "inherit", // Background color change
                  "&:hover": {
                    backgroundColor:
                      activeCardIndex === index ? "#cce5ff" : "#f0f0f0", // Hover effect
                  },
                }}
                onClick={() => handleCardClick(index)}
              >
                <CardContent>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    {jobTitle}
                  </Typography>
                  <Typography variant="body1" mb={2}>
                    {companyName}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {location}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {salaryRange}
                  </Typography>
                </CardContent>
              </Card>
            )
          )}
        </Grid>
        <Grid item xs={7}>
          <Card sx={{ boxShadow: 0, border: "1px solid #ddd" }}>
            <CardContent>
              {selectedJob && (
                <>
                  <Typography variant="h5">{selectedJob.jobTitle}</Typography>
                  <Typography variant="body1">
                    {selectedJob.companyName}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {selectedJob.location}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" mb={2}>
                    {selectedJob.salaryRange}
                  </Typography>
                  <Typography variant="body2" mb={2}>
                    {selectedJob.jobDescription}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleApplyClick}
                  >
                    Apply
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Apply Modal */}
      <Dialog open={openApplyModal} onClose={handleApplyModalClose}>
        <DialogTitle>Apply for {selectedJob?.jobTitle}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Resume"
            type="text"
            fullWidth
            name="resume"
            value={applicantInfo.resume}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Phone Number"
            type="tel"
            fullWidth
            name="phoneNumber"
            value={applicantInfo.phoneNumber}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            name="email"
            value={applicantInfo.email}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleApplyModalClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleApplySubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Home;
