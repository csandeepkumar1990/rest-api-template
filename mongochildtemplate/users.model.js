'use strict';
const mongoose = require('mongoose');

const UsersSchema = mongoose.Schema({
    field1: { type: String, set: deleteEmpty },
    field2: { type: String, set: deleteEmpty },
    field3: { type: String, set: deleteEmpty },
    insertedBy: { type: String, set: deleteEmpty },
    updatedBy: { type: String, set: deleteEmpty },
    createdAt: { type: Date, timestamps: true },
    updatedAt: { type: Date, timestamps: true }
});

function deleteEmpty(v) {
  if (v == 'null' || v == 'undefined' || v == null || v == undefined) {
    return undefined;
  }
  return v;
}

module.exports = mongoose.model('Users', UsersSchema);
