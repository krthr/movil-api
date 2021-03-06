"use strict";

const faker = require("faker");

class Faker {
  constructor() {}

  getRandomPerson() {
    const { name, username, address, phone } = faker.helpers.createCard();
    const { city, state, country, geo, zipcode, streetA: street } = address;
    const birthday = faker.date.between("01/01/1980", "01/01/2002");
    const email = faker.internet.email();

    return {
      name,
      username,
      birthday,
      email,
      address: { street, city, state, country, geo, zipcode },
      phone
    };
  }

  getRandomCourseName() {
    const { adjective, ingverb, noun } = faker.hacker;
    return `${ingverb()} ${adjective()} ${noun()}`;
  }
}

module.exports = Faker;
