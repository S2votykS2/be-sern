import { raw } from "body-parser";
import db from "../models/index";
require("dotenv").config();
import _, { reject } from "lodash";

let getTopDoctorHome = (limitInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findAll({
        limit: limitInput,
        order: [["createdAt", "DESC"]],
        attributes: {
          exclude: ["password", "image"],
        },
        where: { roleId: "R2" },
        include: [
          {
            model: db.Allcode,
            as: "genderData",
            attributes: ["valueEn", "valueVi"],
          },
          {
            model: db.Allcode,
            as: "positionData",
            attributes: ["valueEn", "valueVi"],
          },
          {
            model: db.Allcode,
            as: "roleData",
            attributes: ["valueEn", "valueVi"],
          },
        ],
        raw: true,
        nest: true,
      });
      // if (user && user.image) {
      //     data.image = new Buffer(data.image, 'base 64').toString('binary');
      // }
      // if (!data) {
      //     data = {}
      // }
      resolve({
        errCode: 0,
        message: "OK",
        data: user,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let getAllDoctor = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      let doctors = await db.User.findAll({
        where: { roleId: "R2" },
        attributes: {
          exclude: ["password", "image"],
        },
      });
      resolve({
        errCode: 0,
        message: "OK",
        data: doctors,
      });
    } catch (e) {
      reject(e);
    }
  });
};
let createMarkdown = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data) {
        resolve({
          errCode: 1,
          message: "Missing parameters required",
        });
      }
      let checkMarkdown = await db.Markdown.findOne({
        where: { doctorId: data.doctorId },
      });
      let checkDoctorInfo = await db.Doctorinfor.findOne({
        where: { doctorId: data.doctorId },
      });
      if (checkMarkdown && checkDoctorInfo) {
        resolve({
          errCode: 2,
          message: "user exits, cant create anymore",
        });
        return;
      }
      let createMarkdown = await db.Markdown.create({
        doctorId: data.doctorId,
        contentHTML: data.contentHTML,
        contentMarkdown: data.contentMarkdown,
        description: data.description,
      });

      let createDoctorInfo = await db.Doctorinfor.create({
        doctorId: data.doctorId,
        priceId: data.price,
        paymentId: data.payment,
        provinceId: data.province,
        nameClinic: data.nameClinic,
        addressClinic: data.addressClinic,
        note: data.note,
        count: data.count,
      });
      console.log("Check createMarkdown:", createMarkdown);
      console.log("Check createDoctorInfor:", createDoctorInfo);
      resolve({
        errCode: 0,
        message: "OK",
      });
    } catch (e) {
      reject(e);
    }
  });
};
let updateMarkdown = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.doctorId) {
        resolve({
          errCode: 1,
          errMessage: "Doctor undefined",
        });
      }

      let updateMarkdown = await db.Markdown.findOne({
        where: { doctorId: data.doctorId },
        raw: false,
      });
      (updateMarkdown.contentHTML = data.contentHTML),
        (updateMarkdown.contentMarkdown = data.contentMarkdown),
        (updateMarkdown.description = data.description),
        await updateMarkdown.save();

      let updateDoctorInfo = await db.Doctorinfor.findOne({
        where: { doctorId: data.doctorId },
        raw: false,
      });
      (updateDoctorInfo.priceId = data.price),
        (updateDoctorInfo.paymentId = data.payment),
        (updateDoctorInfo.provinceId = data.province),
        (updateDoctorInfo.nameClinic = data.nameClinic),
        (updateDoctorInfo.addressClinic = data.addressClinic),
        (updateDoctorInfo.note = data.note),
        (updateDoctorInfo.count = data.count),
        await updateDoctorInfo.save();
      resolve({
        errCode: 0,
        message: "OK",
      });
    } catch (e) {
      reject(e);
    }
  });
};

let getDetailDoctor = (idInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!idInput) {
        resolve({
          errCode: 1,
          message: "Missing id required",
        });
      }
      let data = await db.User.findOne({
        where: { id: idInput },
        raw: true,
        nest: true,
        attributes: {
          exclude: ["password", "image"],
        },
        include: [
          {
            model: db.Markdown,
            attributes: ["contentHTML", "contentMarkdown", "description"],
            as: "MarkdownData",
          },
          // { model: db.Markdown },

          {
            model: db.Doctorinfor,
            attributes: [
              "priceId",
              "provinceId",
              "paymentId",
              "nameClinic",
              "addressClinic",
              "note",
              "count",
            ],
            as: "DoctorInfoData",
          },
          // {
          //   model: db.Insurance,
          //   attributes: ["nameInsurance", "description"],
          //   as: "InsuranceData",
          // },
        ],
      });

      resolve({
        errCode: 0,
        message: "OK",
        data: data,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let getAllSchedules = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      let schedules = await db.Allcode.findAll({
        where: { type: "TIME" },
        raw: true,
      });
      if (schedules) {
        resolve({
          errCode: 0,
          message: "OK",
          data: schedules,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let MAX_NUMBER_SCHEDULE = parseInt(process.env.MAX_NUMBER_SCHEDULE);
let bulkCreateSchedules = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let schedules = data.data;
      if (schedules.length === 0) {
        resolve({
          errCode: 1,
          message: "Missing required parameters",
        });
        return;
      }
      // Data input
      if (schedules && schedules.length > 0) {
        var newSchedules = schedules.map((schedule, index) => {
          schedule.maxNumber = MAX_NUMBER_SCHEDULE;
          return schedule;
        });
      }
      // Exit
      let exits = await db.Schedule.findAll({
        where: { doctorId: schedules[0].doctorId, date: schedules[0].date },
        raw: true,
        attributes: ["doctorId", "timeType", "date"],
        // attributes: ["doctorId", "timeType", "date", "maxNumber"],
      });
      // Format date column
      let formatNewSchedules = newSchedules.map((item, index) => {
        item.date = new Date(item.date).getTime();
        return item;
      });
      console.log("Check formatNewSchedule", formatNewSchedules);
      let formatExits = exits.map((item, index) => {
        item.date = new Date(item.date).getTime();
        return item;
      });
      console.log("Check formatExit", formatExits);
      // compare-difference ==> fix loi tranh trung data
      let toCreate = _.differenceWith(
        formatNewSchedules,
        formatExits,
        (a, b) => {
          return a.timeType === b.timeType && a.date === b.date;
        }
      );
      console.log("Check toCreate", toCreate);
      // Bulk create
      if (toCreate && toCreate.length > 0) {
        let bulkCreate = await db.Schedule.bulkCreate(toCreate);
      }
      resolve({
        errCode: 0,
        message: "OK",
      });
    } catch (e) {
      reject(e);
    }
  });
};
let getDoctorSchedule = async (doctorId, date) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!doctorId && !date) {
        resolve({
          errCode: 1,
          message: "Missing required parameters",
        });
      }
      // Lay tat ca scbedule voi dk doctorId
      let schedules = await db.Schedule.findAll({
        where: { doctorId: doctorId },
      });
      console.log("Check schedule", schedules);
      // Lay chinh xac schedule voi doctorId va date
      let exactSchedules = [];
      let date2;
      if (schedules && schedules.length > 0) {
        schedules.forEach((schedule, index) => {
          let Unixdate = new Date(`${schedule.date}`).getTime();
          // console.log("Unixdate", Unixdate);
          if (`${date}` === `${Unixdate}`) {
            date2 = schedule.date;
          }
        });
        // let Unixdate = new Date(`${schedules[0].date}`).getTime();
        // if (date === `${Unixdate}`) {
        //   date2 = schedules[0].date;
        // }
        exactSchedules = await db.Schedule.findAll({
          where: { doctorId: doctorId, date: date2 },
          include: {
            model: db.Allcode,
            attributes: ["valueEN", "valueVI"],
            as: "timeTypeData",
          },
          nest: true,
          raw: true,
        });
        console.log("Check exactSchedule", exactSchedules);
      } else {
        let exactSchedules = [];
      }
      resolve({
        errCode: 0,
        message: "OK",
        data: exactSchedules,
      });
    } catch (e) {
      reject(e);
    }
  });
};
let getDoctorInfo = async (doctorId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!doctorId) {
        resolve({
          errCode: 1,
          message: "Missing required doctorId",
        });
      }
      let insurance = await db.Insurance.findAll({
        where: { doctorId: doctorId },
        raw: true,
      });

      let doctorInfo = await db.Doctorinfor.findOne({
        where: { doctorId: doctorId },
        raw: true,
        nest: true,
        include: [
          {
            model: db.Allcode,
            attributes: ["valueEN", "valueVI"],
            as: "priceData",
          },
          {
            model: db.Allcode,
            attributes: ["valueEN", "valueVI"],
            as: "paymentData",
          },
          {
            model: db.Allcode,
            attributes: ["valueEN", "valueVI"],
            as: "provinceData",
          },
        ],
        attributes: {
          exclude: ["id", "doctorId"],
        },
      });
      resolve({
        errCode: 0,
        message: "OK",
        doctorInfo: doctorInfo,
        insurance: insurance,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getTopDoctorHome: getTopDoctorHome,
  getAllDoctor: getAllDoctor,
  createMarkdown: createMarkdown,
  updateMarkdown: updateMarkdown,
  getDetailDoctor: getDetailDoctor,
  getAllSchedules: getAllSchedules,
  bulkCreateSchedules: bulkCreateSchedules,
  getDoctorSchedule: getDoctorSchedule,
  getDoctorInfo: getDoctorInfo,
};
