const mongoose = require('mongoose');
const {Schema} = mongoose; 

const SurveySchema = new Schema({
  title: { type:String },
  description: { type:String },
  location: { type: String},
  startDate: { type: Date },
  endDate: { type: Date },
  userId: {type: String}
},{timestamps: true});

const Survey = mongoose.model('survey', SurveySchema);
module.exports = Survey;