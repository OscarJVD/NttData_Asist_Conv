const mongoose = require('mongoose')

const answerSchema = new mongoose.Schema({
  answer: {
    type: String,
    required: true,
    trim: true,
    unique: false
  },
  ask: {
    type: String,
    required: true,
    trim: true,
    unique: false,
    default: "que te ha gustado de la feria"
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