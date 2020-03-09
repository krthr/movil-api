'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Professor extends Model {
    person() {
        return this.belongsTo("App/Models/Person");
    }
    course(){
        return this.belongsTo("App/Models/Course");
    }
}

module.exports = Professor
