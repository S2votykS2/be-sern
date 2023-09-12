import express from "express";
import apiController from "../controllers/apiController";
import doctorControllder from "../controllers/doctorControllder";

let router = express.Router();

let apiRouter = (app) => {
  router.post("/login", apiController.handleLogin);

  router.get("/read", apiController.handleRead);

  router.post("/create", apiController.handleCreate);

  router.put("/update", apiController.handleUpdate);

  router.delete("/delete", apiController.handleDelete);

  router.get("/allcode", apiController.handleAllcode);
  // SERN
  router.get("/top-doctor-home", doctorControllder.getTopDoctorHome);

  router.get("/get-all-doctors", doctorControllder.getAllDoctor);

  router.post("/save-markdown", doctorControllder.saveMarkdown);

  router.get("/get-detail-doctor", doctorControllder.getDetailDoctor);

  router.get("/get-all-schedules", doctorControllder.getAllSchedules);

  router.post("/bulk-create-schedules", doctorControllder.bulkCreateSchedules);

  router.get("/get-doctor-schedule", doctorControllder.getDoctorSchedule);

  router.get("/get-doctor-info", doctorControllder.getDoctorInfo);

  return app.use("/api", router);
};

export default apiRouter;
