const mongoose = require('mongoose')

const answerSchema = new mongoose.Schema({
  answer: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
}, {
  timestamps: true
})

let Dataset = mongoose.models.answer || mongoose.model('answer', answerSchema)
module.exports = Dataset