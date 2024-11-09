import React, { useState, useRef } from 'react';
import {
  Button, TextField, RadioGroup, FormControlLabel, Radio, Box, Typography, Snackbar
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios'

const AddEventForm = () => {
  const [userType, setUserType] = useState('');
  const [eventType, setEventType] = useState('');
  const [eventDetails, setEventDetails] = useState({});
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [highlightedFields, setHighlightedFields] = useState([]);
  const formRefs = useRef({});

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
    setEventType('');
    setEventDetails({});
    setSelectedDepartment('');
    setShowConfirm(false);
    setHighlightedFields([]);
  };

  const handleEventTypeChange = (e) => {
    setEventType(e.target.value);
    setEventDetails({});
    setShowConfirm(false);
    setHighlightedFields([]);
  };

  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e.target.value);
    setShowConfirm(false);
    setHighlightedFields([]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventDetails((prev) => ({ ...prev, [name]: value }));
    setHighlightedFields((prev) => prev.filter(field => field !== name));
  };

  const validateFields = () => {
    const requiredFields = ['department'];
  
    if (userType === 'faculty') {
      if (eventType === 'achievements') {
        requiredFields.push('achievementType', 'eventDate', 'achievementDescription'); // eventDate instead of achievementDate
      } else if (eventType === 'publications') {
        requiredFields.push('publicationTitle', 'journalConference', 'eventDate','authorName', 'publicationDescription');
      } else if (eventType === 'google_scholar') {
        requiredFields.push('scholarProfile','eventDate', 'citations');
      } else if (eventType === 'revenue') {
        requiredFields.push('fundingAgency', 'revenueAmount', 'eventDate', 'revenueDescription');
      }
    }
  
    if (userType === 'student') {
      if (eventType === 'exam') {
        requiredFields.push('eventName', 'eventDescription', 'examName', 'examType', 'eventDate');
      } else if (eventType === 'achievements') {
        requiredFields.push('eventName', 'eventDescription', 'eventDate', 'achievementName', 'achievementDescription');
      } else if (eventType === 'hackathons') {
        requiredFields.push('hackathonName', 'hackathonDescription', 'eventDate', 'hackathonTeamName', 'hackathonPosition');
      }
    }
  
    const missingFields = requiredFields.filter(field => !eventDetails[field] && (field !== 'department' || !selectedDepartment));
  
    if (missingFields.length > 0) {
      setHighlightedFields(missingFields);
      const firstMissingField = missingFields[0];
      const ref = formRefs.current[firstMissingField];
      if (ref) {
        ref.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      
      return false;
    }
  
    return true;
  };
  

  const handleConfirm = () => {
    if (!validateFields()) {
      alert('Please fill all the required fields before confirming.');
      return;
    }
    setShowConfirm(true);
  };

  const handleSubmit = async () => {
    if (!validateFields()) {
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:5000/api/events', {
        userType: userType || null,
        userName:eventDetails.userName,
        selectedDepartment:selectedDepartment||null,
         eventType:eventType||null,

        //achievementDate:eventDetails.achievementDate||null,//new
        achievementType:eventDetails.achievementType||null,//new
        achievementDescription:eventDetails.achievementDescription||null,//n
       // publicationDate:eventDetails.publicationDate||null,//new
        publicationTitle: eventDetails.publicationTitle || null,
        journalConference:eventDetails.journalConference||null,//n
        authorName:eventDetails.authorName||null,//n
        publicationDescription:eventDetails.publicationDescription||null,//n


       // Date:eventDetails.Date||null,//new
        scholarProfile:eventDetails.scholarProfile||null,
        citations:eventDetails.citations||null,//new

       // revenueDate:eventDetails.revenueDate||null,//new
        fundingAgency:eventDetails.fundingAgency||null,//new
        revenueAmount: eventDetails.revenueAmount || null,
        revenueDescription: eventDetails.revenueDescription || null,






        eventName: eventDetails.eventName || null,
        eventDescription: eventDetails.eventDescription || null,
        eventDate: eventDetails.eventDate || null,
        examName: eventDetails.examName || null,
        examType: eventDetails.examType || null,


        // eventName:eventDetails.eventName||null,//ne
        // eventDescription:eventDetails.eventDescription||null,//new
        //achievementDate:eventDetails.achievementDate||null,//new
        // achievementDescription:eventDetails.achievementDescription||null,//new
        achievementName:eventDetails.achievementName||null,//new


        hackathonName:eventDetails.hackathonName||null,//new
        hackathonDescription:eventDetails.hackathonDescription||null,//new
       // hackathonDate:eventDetails.hackathonDate||null,//new
        hackathonTeamName:eventDetails.hackathonTeamName||null,//new
        hackathonPosition:eventDetails.hackathonPosition||null,//new


       /*  achievementDetails: eventDetails.achievementDetails || null,
        
        publicationDomain: eventDetails.publicationDomain || null,
        
        citations: eventDetails.citations || null,
        
        
        studentAchievementTitle: eventDetails.studentAchievementTitle || null */
         
      });
      
  
      console.log('Event submitted:', response.data);
      setSubmitted(true);
      setShowConfirm(false);
  
      setTimeout(() => {
        setEventDetails({});
        setEventType('');
        setUserType('');
        setSelectedDepartment('');
        setSubmitted(false);
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error('Error submitting event:', error);
      alert('Failed to submit the event. Please try again later.');
    }
  };
  
// eslint-disable-next-line
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <Box
      sx={{
        margin: '20px auto',
        width: '60%',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
           backgroundColor: '#f9f1ff',
         maxHeight: '80vh',
        overflowY: 'auto',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Add Activity
      </Typography>

      <Typography variant="h6">Select User Type:</Typography>
      <RadioGroup row value={userType} onChange={handleUserTypeChange}>
        <FormControlLabel value="faculty" control={<Radio />} label="Faculty" />
        <FormControlLabel value="student" control={<Radio />} label="Student" />
      </RadioGroup>
      {userType && (
        <>
          <Typography variant="h6">Select Department:</Typography>
          <RadioGroup row value={selectedDepartment} onChange={handleDepartmentChange}>
            <FormControlLabel value="cse" control={<Radio />} label="CSE" />
            <FormControlLabel value="electronics" control={<Radio />} label="Electronics" />
            <FormControlLabel value="electrical" control={<Radio />} label="Electrical" />
            <FormControlLabel value="it" control={<Radio />} label="IT" />
            <FormControlLabel value="mechanical" control={<Radio />} label="Mechanical" />
            <FormControlLabel value="civil" control={<Radio />} label="Civil" />
          </RadioGroup>
        </>
      )}
      {userType && (
  <>
    <Typography variant="h6">Select Activity Type:</Typography>
    <RadioGroup row value={eventType} onChange={handleEventTypeChange}>
      {userType === 'faculty' ? (
        <>
          <FormControlLabel value="achievements" control={<Radio />} label="Achievements" />
          <FormControlLabel value="publications" control={<Radio />} label="Publications" />
          <FormControlLabel value="google_scholar" control={<Radio />} label="Google Scholar" />
          <FormControlLabel value="revenue" control={<Radio />} label="Revenue Generation" />
        </>
      ) : (
        <>
          <FormControlLabel value="exam" control={<Radio />} label="Exam" />
          <FormControlLabel value="achievements" control={<Radio />} label="Achievements" />
          <FormControlLabel value="hackathons" control={<Radio />} label="Hackathons" />
        </>
      )}
    </RadioGroup>

    {}
    <Box mt={2}> {}
      <TextField
        label="User Name"
        name="userName"
        value={eventDetails.userName || ''}
        onChange={handleChange}
        inputRef={el => formRefs.current.userName = el}
        error={highlightedFields.includes('userName')}
        helperText={highlightedFields.includes('userName') ? "User name is required." : ""}
        fullWidth
        required
      />
    </Box>
  </>
)}

      {eventType && (
        <Box mt={1}>
          {userType === 'faculty' && eventType === 'achievements' && (
            <>
           <TextField
  label="Date"
  type="date"
  name="eventDate" // Ensure this matches with validateFields
  value={eventDetails.eventDate || ''}
  onChange={handleChange}
  fullWidth
  InputLabelProps={{ shrink: true }}
  margin="normal"
  inputRef={(el) => (formRefs.current['eventDate'] = el)} // Use eventDate instead of achievementDate
  error={highlightedFields.includes('eventDate')}
  helperText={highlightedFields.includes('eventDate') ? 'This field is required.' : ''}
/>

              <TextField
                label="Type of Achievement"
                name="achievementType"
                value={eventDetails.achievementType || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
                inputRef={(el) => (formRefs.current['achievementType'] = el)}
                error={highlightedFields.includes('achievementType')}
                helperText={highlightedFields.includes('achievementType') ? 'This field is required.' : ''}
              />
             
              <TextField
                label="Achievement Description"
                name="achievementDescription"
                value={eventDetails.achievementDescription || ''}
                onChange={handleChange}
                fullWidth
                multiline
                rows={3}
                margin="normal"
                inputRef={(el) => (formRefs.current['achievementDescription'] = el)}
                error={highlightedFields.includes('achievementDescription')}
                helperText={highlightedFields.includes('achievementDescription') ? 'This field is required.' : ''}
              />
            </>
          )}

{userType === 'faculty' && eventType === 'publications' && (
    <>
        <TextField
            label="Publication Date"
            type="date"
            name="eventDate" // Corrected name attribute
            value={eventDetails.eventDate || ''} // Ensure this uses publicationDate
            onChange={handleChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
            margin="normal"
            inputRef={(el) => (formRefs.current['eventDate'] = el)}
            error={highlightedFields.includes('eventDate')}
            helperText={highlightedFields.includes('eventDate') ? 'This field is required.' : ''}
        />
        <TextField
            label="Publication Title"
            name="publicationTitle"
            value={eventDetails.publicationTitle || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
            inputRef={(el) => (formRefs.current['publicationTitle'] = el)}
            error={highlightedFields.includes('publicationTitle')}
            helperText={highlightedFields.includes('publicationTitle') ? 'This field is required.' : ''}
        />
        <TextField
            label="Journal/Conference"
            name="journalConference"
            value={eventDetails.journalConference || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
            inputRef={(el) => (formRefs.current['journalConference'] = el)}
            error={highlightedFields.includes('journalConference')}
            helperText={highlightedFields.includes('journalConference') ? 'This field is required.' : ''}
        />
        <TextField
            label="Author Name"
            name="authorName"
            value={eventDetails.authorName || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
            inputRef={(el) => (formRefs.current['authorName'] = el)}
            error={highlightedFields.includes('authorName')}
            helperText={highlightedFields.includes('authorName') ? 'This field is required.' : ''}
        />
        <TextField
            label="Publication Description"
            name="publicationDescription"
            value={eventDetails.publicationDescription || ''}
            onChange={handleChange}
            fullWidth
            multiline
            rows={3}
            margin="normal"
            inputRef={(el) => (formRefs.current['publicationDescription'] = el)}
            error={highlightedFields.includes('publicationDescription')}
            helperText={highlightedFields.includes('publicationDescription') ? 'This field is required.' : ''}
        />
    </>
)}

{userType === 'faculty' && eventType === 'google_scholar' && (
    <>
        <TextField
            label="Date"
            type="date"
            name="eventDate" // Ensure this matches the state
            value={eventDetails.eventDate || ''} // Ensure this uses Date
            onChange={handleChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
            margin="normal"
            inputRef={(el) => (formRefs.current['eventDate'] = el)}
            error={highlightedFields.includes('eventDate')}
            helperText={highlightedFields.includes('eventDate') ? 'This field is required.' : ''}
        />
        <TextField
            label="Google Scholar Profile"
            name="scholarProfile"
            value={eventDetails.scholarProfile || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
            inputRef={(el) => (formRefs.current['scholarProfile'] = el)}
            error={highlightedFields.includes('scholarProfile')}
            helperText={highlightedFields.includes('scholarProfile') ? 'This field is required.' : ''}
        />
        <TextField
            label="Citations"
            name="citations"
            type="number"
            value={eventDetails.citations || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
            inputRef={(el) => (formRefs.current['citations'] = el)}
            error={highlightedFields.includes('citations')}
            helperText={highlightedFields.includes('citations') ? 'This field is required.' : ''}
        />
    </>
)}

          {userType === 'faculty' && eventType === 'revenue' && (
            <>
            <TextField
                label="Revenue Date"
                type="date"
                name="eventDate"
                value={eventDetails.eventDate || ''}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
                margin="normal"
                inputRef={(el) => (formRefs.current['eventDate'] = el)}
                error={highlightedFields.includes('eventDate')}
                helperText={highlightedFields.includes('eventDate') ? 'This field is required.' : ''}
              />
              <TextField
                label="Funding Agency"
                name="fundingAgency"
                value={eventDetails.fundingAgency || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
                inputRef={(el) => (formRefs.current['fundingAgency'] = el)}
                error={highlightedFields.includes('fundingAgency')}
                helperText={highlightedFields.includes('fundingAgency') ? 'This field is required.' : ''}
              />
              <TextField
                label="Revenue Amount"
                name="revenueAmount"
                type="number"
                value={eventDetails.revenueAmount || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
                inputRef={(el) => (formRefs.current['revenueAmount'] = el)}
                error={highlightedFields.includes('revenueAmount')}
                helperText={highlightedFields.includes('revenueAmount') ? 'This field is required.' : ''}
              />
              
              <TextField
                label="Revenue Description"
                name="revenueDescription"
                value={eventDetails.revenueDescription || ''}
                onChange={handleChange}
                fullWidth
                multiline
                rows={3}
                margin="normal"
                inputRef={(el) => (formRefs.current['revenueDescription'] = el)}
                error={highlightedFields.includes('revenueDescription')}
                helperText={highlightedFields.includes('revenueDescription') ? 'This field is required.' : ''}
              />
            </>
          )}

          {userType === 'student' && eventType === 'exam' && (
            <>
              <TextField
                label="Event Name"
                name="eventName"
                value={eventDetails.eventName || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
                inputRef={(el) => (formRefs.current['eventName'] = el)}
                error={highlightedFields.includes('eventName')}
                helperText={highlightedFields.includes('eventName') ? 'This field is required.' : ''}
              />
              <TextField
                label="Event Description"
                name="eventDescription"
                value={eventDetails.eventDescription || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
                inputRef={(el) => (formRefs.current['eventDescription'] = el)}
                error={highlightedFields.includes('eventDescription')}
                helperText={highlightedFields.includes('eventDescription') ? 'This field is required.' : ''}
              />
               <TextField
                label="Exam Date"
                type="date"
                name="eventDate"
                value={eventDetails.eventDate || ''}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
                margin="normal"
                inputRef={(el) => (formRefs.current['eventDate'] = el)}
                error={highlightedFields.includes('eventDate')}
                helperText={highlightedFields.includes('eventDate') ? 'This field is required.' : ''}
              />
              <TextField
                label="Exam Name"
                name="examName"
                value={eventDetails.examName || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
                inputRef={(el) => (formRefs.current['examName'] = el)}
                error={highlightedFields.includes('examName')}
                helperText={highlightedFields.includes('examName') ? 'This field is required.' : ''}
              />
              <TextField
                label="Exam Type"
                name="examType"
                value={eventDetails.examType || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
                inputRef={(el) => (formRefs.current['examType'] = el)}
                error={highlightedFields.includes('examType')}
                helperText={highlightedFields.includes('examType') ? 'This field is required.' : ''}
              />
             
            </>
          )}

          {userType === 'student' && eventType === 'achievements' && (
            <>
              <TextField
                label="Event Name"
                name="eventName"
                value={eventDetails.eventName || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
                inputRef={(el) => (formRefs.current['eventName'] = el)}
                error={highlightedFields.includes('eventName')}
                helperText={highlightedFields.includes('eventName') ? 'This field is required.' : ''}
              />
              <TextField
                label="Event Description"
                name="eventDescription"
                value={eventDetails.eventDescription || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
                inputRef={(el) => (formRefs.current['eventDescription'] = el)}
                error={highlightedFields.includes('eventDescription')}
                helperText={highlightedFields.includes('eventDescription') ? 'This field is required.' : ''}
              />
              <TextField
                label="Achievement Date"
                type="date"
                name="eventDate"
                value={eventDetails.eventDate || ''}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
                margin="normal"
                inputRef={(el) => (formRefs.current['eventDate'] = el)}
                error={highlightedFields.includes('eventDate')}
                helperText={highlightedFields.includes('eventDate') ? 'This field is required.' : ''}
              />
              <TextField
                label="Achievement Name"
                name="achievementName"
                value={eventDetails.achievementName || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
                inputRef={(el) => (formRefs.current['achievementName'] = el)}
                error={highlightedFields.includes('achievementName')}
                helperText={highlightedFields.includes('achievementName') ? 'This field is required.' : ''}
              />
              <TextField
                label="Achievement Description"
                name="achievementDescription"
                value={eventDetails.achievementDescription || ''}
                onChange={handleChange}
                fullWidth
                multiline
                rows={3}
                margin="normal"
                inputRef={(el) => (formRefs.current['achievementDescription'] = el)}
                error={highlightedFields.includes('achievementDescription')}
                helperText={highlightedFields.includes('achievementDescription') ? 'This field is required.' : ''}
              />
            </>
          )}

          {userType === 'student' && eventType === 'hackathons' && (
            <>
              <TextField
                label="Hackathon Name"
                name="hackathonName"
                value={eventDetails.hackathonName || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
                inputRef={(el) => (formRefs.current['hackathonName'] = el)}
                error={highlightedFields.includes('hackathonName')}
                helperText={highlightedFields.includes('hackathonName') ? 'This field is required.' : ''}
              />
              <TextField
                label="Hackathon Description"
                name="hackathonDescription"
                value={eventDetails.hackathonDescription || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
                inputRef={(el) => (formRefs.current['hackathonDescription'] = el)}
                error={highlightedFields.includes('hackathonDescription')}
                helperText={highlightedFields.includes('hackathonDescription') ? 'This field is required.' : ''}
              />
              <TextField
                label="Hackathon Date"
                type="date"
                name="eventDate"
                value={eventDetails.eventDate || ''}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
                margin="normal"
                inputRef={(el) => (formRefs.current['eventDate'] = el)}
                error={highlightedFields.includes('eventDate')}
                helperText={highlightedFields.includes('eventDate') ? 'This field is required.' : ''}
              />
              <TextField
                label="Team Name"
                name="hackathonTeamName"
                value={eventDetails.hackathonTeamName || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
                inputRef={(el) => (formRefs.current['hackathonTeamName'] = el)}
                error={highlightedFields.includes('hackathonTeamName')}
                helperText={highlightedFields.includes('hackathonTeamName') ? 'This field is required.' : ''}
              />
              <TextField
                label="Position"
                name="hackathonPosition"
                value={eventDetails.hackathonPosition || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
                inputRef={(el) => (formRefs.current['hackathonPosition'] = el)}
                error={highlightedFields.includes('hackathonPosition')}
                helperText={highlightedFields.includes('hackathonPosition') ? 'This field is required.' : ''}
              />
            </>
          )}

          <Button variant="contained" color="primary" onClick={handleConfirm} sx={{ mt: 2 }}>
            Confirm
          </Button>
        </Box>
      )}

<Snackbar open={submitted} autoHideDuration={6000} onClose={() => setSubmitted(false)}>
        <MuiAlert onClose={() => setSubmitted(false)} severity="success" sx={{ width: '100%' }}>
          🎉 Hooray, your event has been added! 🎉
        </MuiAlert>
      </Snackbar>
      {showConfirm && (
        <Box mt={2}>
          <Typography variant="h6">Please confirm your submission:</Typography>
          <Button variant="contained" color="secondary" onClick={handleSubmit}>
            Submit
          </Button>
          <Button variant="outlined" onClick={() => setShowConfirm(false)} sx={{ ml: 2 }}>
            Cancel
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default AddEventForm;