"use strict";

const mongoose = require("mongoose");

const PersonSchema = new mongoose.Schema({
  gender: String,

  name: {
    title: String,
    first: String,
    last: String
  },

  location: {
    street: String,
    city: String,
    state: String,
    postcode: String,

    coordinates: {
      latitude: Number,
      longitude: Number
    },

    timezone: {
      offset: String,
      description: String
    }
  },

  email: String,

  login: {
    uuid: String,
    username: String,
    password: String,
    salt: String,
    md5: String,
    sha1: String,
    sha256: String
  },

  dob: {
    date: Date,
    age: Number
  },

  registered: {
    date: Date,
    age: Number
  },

  phone: String,

  cell: String,

  id: {
    name: String,
    value: String
  },

  picture: {
    large: String,
    medium: String,
    thumbnail: String
  },

  nat: String
});

module.exports = mongoose.model("Person", PersonSchema);
