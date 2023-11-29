import { Router } from "express";
import { UserController } from "./controller/UserController";
import { AuthController } from "./controller/AuthController";
import { AuthMiddlewares } from "./middlewares/auth";
import { CourseController } from "./controller/CourseController";

const usercontroller = new UserController();
const authcontroller = new AuthController();
const coursecontroller = new CourseController();

export const router = Router();

router.post("/create", usercontroller.store);
router.get("/users", AuthMiddlewares, usercontroller.index);

router.post("/auth", authcontroller.authenticate);

router.post("/course", coursecontroller.registerCourse);
router.put("/course/:name", coursecontroller.updateCourse);
router.get("/course/:name", coursecontroller.getCourseByName);
router.get("/courses", coursecontroller.getAllCourses);
router.get("/courses/teacher/:teacher", coursecontroller.getCoursesByTeacher);
router.get(
  "/courses/category/:category",
  coursecontroller.getCoursesByCategory
);
router.delete("/course/delete/:id", coursecontroller.deleteCourse);
