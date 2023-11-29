import { Request, Response } from "express";
import { Prisma } from "@prisma/client";
import { prisma } from "../utils/prisma";

export class CourseController {
  async registerCourse(req: Request, res: Response) {
    const { name, teacher, category, description, picture } = req.body;
    try {
      const course = await prisma.course.create({
        data: {
          name,
          teacher,
          category,
          description,
          picture,
        },
      });
      return res.json({ course });
    } catch (error) {
      console.error("Error fetching course:", error);
      return res.status(500).json({ Error: "Internal Server Error" });
    }
  }

  async updateCourse(req: Request, res: Response) {
    const name = req.params.name;
    const updates = req.body;
    try {
      const existingCourse = await prisma.course.findUnique({
        where: { name },
      });

      if (!existingCourse) {
        return res.status(404).json({ Error: "Course not found." });
      }

      const courseupdate = await prisma.course.update({
        where: { name },
        data: { ...existingCourse, ...updates },
      });

      return res.json({
        Atual: existingCourse,
        Novo: courseupdate,
      });
    } catch (error) {
      console.error("Error fetching course:", error);
      return res.status(500).json({ Error: "Internal Server Error" });
    }
  }

  async getCourseByName(req: Request, res: Response) {
    const name = req.params.name;

    try {
      const course = await prisma.course.findUnique({
        where: { name },
      });

      return res.json({ course });
    } catch (error) {
      console.error("Error fetching course:", error);
      return res.status(500).json({ Error: "Internal Server Error" });
    }
  }

  async getAllCourses(req: Request, res: Response) {
    try {
      const courses = await prisma.course.findMany();
      return res.json({ courses });
    } catch (error) {
      console.error("Error fetching course:", error);
      return res.status(500).json({ Error: "Internal Server Error" });
    }
  }

  async getCoursesByTeacher(req: Request, res: Response) {
    const teacher = req.params.teacher;

    try {
      const teachercourses = await prisma.course.findMany({
        where: { teacher },
      });

      return res.json({ teachercourses });
    } catch (error) {
      console.error("Error fetching course:", error);
      return res.status(500).json({ Error: "Internal Server Error" });
    }
  }

  async getCoursesByCategory(req: Request, res: Response) {
    const category = req.params.category;

    try {
      const categorycourses = await prisma.course.findMany({
        where: { category },
      });

      return res.json({ categorycourses });
    } catch (error) {
      console.error("Error fetching course:", error);
      return res.status(500).json({ Error: "Internal Server Error" });
    }
  }

  async deleteCourse(req: Request, res: Response) {
    const id = Number(req.params.id);
    try {
      const deletecourse = await prisma.course.delete({ where: { id } });
      return res.json({ DELETADO: { deletecourse } });
    } catch (error) {
      console.error("Error fetching course:", error);
      return res.status(500).json({ Error: "Internal Server Error" });
    }
  }
}
