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
Route.post('/signin','AuthController.signin')
Route.post('/signup','AuthController.signup')

Route.group(() => {
  Route.get("/restart", "CourseController.restart");
  Route.resource("courses", "CourseController").only([
    "index",
    "store",
    "show"
  ]);
  Route.resource("professors", "ProfessorController").only(["index", "show"]);
  Route.resource("students", "StudentController").only([
    "index",
    "store",
    "show"
  ]);
}).prefix(":dbId").middleware(['userPrivilegesDetector']);
