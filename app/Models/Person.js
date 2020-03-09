"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

const Faker = use("Faker");

class Person extends Model {
  static boot() {
    super.boot();

    this.addHook("beforeCreate", async person => {
      const {
        name,
        username,
        birthday,
        email,
        address: {
          street,
          city,
          state,
          country,
          geo: { lat, lng },
          zipcode
        },
        phone
      } = Faker.getRandomPerson();

      person.name = name;
      person.username = username;
      person.birthday = new Date(birthday);
      person.email = email;
      person.address_street = street;
      person.address_city = city;
      person.address_country = country;
      person.address_state = state;
      person.address_geo_lat = lat;
      person.address_geo_lng = lng;
      person.address_zipcode = zipcode;
      person.phone = phone;
    });
  }
}

module.exports = Person;
