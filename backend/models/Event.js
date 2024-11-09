// models/Event.js
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  userType: { type: String },
  userName:{type:String},
  selectedDepartment:{type:String},
  eventType:{type:String},
 // achievementDate:{type:Date},
  achievementType:{type:String},
  achievementDescription:{type:String},

  //publicationDate:{type:Date},
  publicationTitle:{type:String},
  journalConference:{type:String},
  authorName:{type:String},
  publicationDescription:{type:String},

 // Date:{type:Date},
  scholarProfile: { type: String },
  citations: { type: Number},

 // revenueDate:{type:Date},
  fundingAgency:{type:String},
  revenueAmount: { type: Number },
  revenueDescription: { type: String },


  eventName: { type: String },
  eventDescription: { type: String },
  eventDate: { type: Date },
  examName: { type: String },
  examType: { type: String },


  eventName: { type: String },
  eventDescription: { type: String },
  //achievementDate:{type:Date},
  achievementName:{type:String},
  achievementDescription:{type:String},

  hackathonName:{type:String},
  hackathonDescription:{type:String},
 // hackathonDate:{type:Date},
  hackathonTeamName:{type:String},
  hackathonPosition:{type:Number}



  /* achievementDetails: { type: String },
  publicationTitle: { type: String },
  publicationDomain: { type: String },
  
  
  
  
  studentAchievementTitle: { type: String },
  
  selectedDepartment:{type:String} */
}, { timestamps: true }); 

module.exports = mongoose.model('Event', eventSchema);