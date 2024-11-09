// controllers/eventController.js
const Event = require('../models/Event'); // Adjust the path based on your folder structure

// Create a new event
exports.createEvent = async (req, res) => {
  
  try {
    const {
      userType,
      userName,
      eventType,
      selectedDepartment,
      achievementDate,
      achievementType,
      achievementDescription,

      publicationDate,
      publicationTitle,
      journalConference,
      authorName,
      publicationDescription,

      // Date,
      scholarProfile,
      citations,

      revenueDate,
      fundingAgency,
      revenueAmount,
      revenueDescription,


      eventName,
      eventDescription,
      eventDate,
      examName,
      examType,
      
      
      achievementName,
      


      hackathonName,
      hackathonDescription,
      hackathonDate,
      hackathonTeamName,
      hackathonPosition


     /*  achievementDetails,
      publicationTitle,
      publicationDomain,
      scholarProfile,
      citations,
      revenueAmount,
      revenueDescription,
      examName,
      examType,
      studentAchievementTitle,
      userName,
      selectedDepartment */
    } = req.body;

    // Validate required fields
    // if (!eventName || !eventDescription || !eventDate) {
    //   return res.status(400).json({ message: 'Event name, description, and date are required.' });
    // }

    // Ensure eventDate is properly converted into a Date object
    const parsedEventDate = new Date(eventDate);
    const parsed1EventDate = new Date(revenueDate);
    const parsed2EventDate = new Date(publicationDate);
    const parsed3EventDate = new Date(achievementDate);
    const parsed4EventDate = new Date(hackathonDate);
    //const parsed5EventDate = new Date(revenueDate);
    // Create a new event instance and save it
    const savedEvent = await Event.create({
      /* userType,
      eventName,
      eventDescription,
      ,
      achievementDetails,
      publicationTitle,
      publicationDomain,
      scholarProfile,
      citations,
      revenueAmount,
      revenueDescription,
      examName,
      examType,
      studentAchievementTitle,
      userName,
      selectedDepartment */

      eventDate: parsedEventDate,
      userType,
      userName,
      eventType,
      selectedDepartment,
      achievementDate:parsed3EventDate,
      achievementType,
      achievementDescription,

      publicationDate:parsed2EventDate,
      publicationTitle,
      journalConference,
      authorName,
      publicationDescription,

      //Date:parsedEventDate,
      scholarProfile,
      citations,

      revenueDate:parsed1EventDate,
      fundingAgency,
      revenueAmount,
      revenueDescription,



      eventName,
      eventDescription,
      //eventDate:parsedEventDate,
      examName,
      examType,

      eventName,
      eventDescription,
      //achievementDate:parsedEventDate,
      achievementName,
      achievementDescription,


      hackathonName,
      hackathonDescription,
      hackathonDate:parsed4EventDate,
      hackathonTeamName,
      hackathonPosition
    });

    console.log(savedEvent);
    return res.status(201).json(savedEvent); // Respond with the created event
  } catch (error) {
    console.error('Error creating event:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

// Get all events (optional, if you need to fetch events)
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    return res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};