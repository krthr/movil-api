"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.get("/", async () => {
  return {
    greeting: "Hello world in JSON"
  };
});

Route.group(() => {
  Route.get("restart", async () => {
    const person = await use("App/Models/Person").create({ name: "Sonwil" });

    const professor = await use("App/Models/Professor").create();
    await professor.person().associate(person);

    return {
      result: true,
      professor: await use("App/Models/Professor")
        .query()
        .where("id", professor.id)
        .with("person")
        .fetch()
    };
  });

  Route.resource("courses", "CourseController").only([
    "index",
    "store",
    "show"
  ]);
}).prefix(":dbId");
