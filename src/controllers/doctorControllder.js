import insurance from "../models/insurance";
import doctorService from "../services/doctor-service";

let getTopDoctorHome = async (req, res) => {
  let limit = req.query.limit;
  if (!limit) limit = 10;
  try {
    let response = await doctorService.getTopDoctorHome(+limit);
    // Khi ko lay dc response -> chuyen sang catch vi ko return response(chay tu tren -> duoi)
    // console.log("Check response", response)
    return res.status(200).json(response);
  } catch (e) {
    console.log("happen catch", e);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};
let getAllDoctor = async (req, res) => {
  try {
    let doctors = await doctorService.getAllDoctor();
    return res.status(200).json(doctors);
  } catch (e) {
    console.log("happen catch", e);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};
let saveMarkdown = async (req, res) => {
  try {
    let data = req.body;
    if (data.action === "CREATE") {
      let response = await doctorService.createMarkdown(data);
      return res.status(200).json(response);
    }
    if (data.action === "UPDATE") {
      let response = await doctorService.updateMarkdown(data);
      return res.status(200).json(response);
    }
  } catch (e) {
    console.log("happen catch", e);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};
let getDetailDoctor = async (req, res) => {
  try {
    let doctorId = req.query.id;
    let response = await doctorService.getDetailDoctor(doctorId);
    return res.status(200).json(response);
  } catch (e) {
    console.log("happen catch", e);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};
let getAllSchedules = async (req, res) => {
  try {
    let data = await doctorService.getAllSchedules();
    return res.status(200).json(data);
  } catch (e) {
    console.log("happen catch", e);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};
let bulkCreateSchedules = async (req, res) => {
  try {
    let data = await doctorService.bulkCreateSchedules(req.body);
    return res.status(200).json(data);
  } catch (e) {
    console.log("Happen catch", e);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};
let getDoctorSchedule = async (req, res) => {
  try {
    let schedules = await doctorService.getDoctorSchedule(
      req.query.doctorId,
      req.query.date
    );
    return res.status(200).json(schedules);
  } catch (e) {
    console.log("Happen catch", e);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};

let getDoctorInfo = async (req, res) => {
  try {
    let doctorId = req.query.id;
    let data = await doctorService.getDoctorInfo(doctorId);
    console.log("Check res", data);
    return res.status(200).json(data);
  } catch (e) {
    console.log("Happen catch", e);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};

module.exports = {
  getTopDoctorHome: getTopDoctorHome,
  getAllDoctor: getAllDoctor,
  saveMarkdown: saveMarkdown,
  getDetailDoctor: getDetailDoctor,
  getAllSchedules: getAllSchedules,
  bulkCreateSchedules: bulkCreateSchedules,
  getDoctorSchedule: getDoctorSchedule,
  getDoctorInfo: getDoctorInfo,
};
