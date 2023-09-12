import express from "express";
import homeController from "../controllers/homeController"; //object (ten bat ky), dung de goi den cac phan tu ben trong(la function)

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/home", homeController.getHomePage);

  router.get("/create", homeController.create);

  router.post("/post-create", homeController.postCreate);

  router.get("/edit", homeController.edit);

  router.get("/update/:id", homeController.update);
  router.post("/post-update", homeController.postUpdate);

  router.post("/post-delete/:id", homeController.postDelete);
  // router.get('/delete', homeController.delete2)

  // API
  return app.use("/", router);
};

module.exports = initWebRoutes;
