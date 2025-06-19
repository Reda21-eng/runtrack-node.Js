const mongoose = require('mongoose');

const yearSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 2,
    maxlength: 20
  },
  startYear: {
    type: Number,
    required: true,
    min: 2000,
    max: 2100
  },
  endYear: {
    type: Number,
    required: true,
    min: 2000,
    max: 2100,
    validate: {
      validator: function(value) {
        return value > this.startYear;
      },
      message: 'endYear doit être supérieur à startYear.'
    }
  }
});

module.exports = mongoose.model('Year', yearSchema);
