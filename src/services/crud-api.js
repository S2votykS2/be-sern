import { raw } from "body-parser";
import db from "../models/index"
import bcrypt from 'bcryptjs'
const salt = bcrypt.genSaltSync(10);

// 1.Read
let handleReadUser = (userId) => {
    return new Promise(async(resolve, reject) => {
        try {
            // let users = '';
            // if (userId === 'ALL') {
            //     users = await db.User.findAll({
            //         attributes: {
            //             exclude: ['password']
            //         }
            //     })
            // }
            // if (userId && userId !== 'ALL') {
            //     users = await db.User.findOne({
            //         where: { id: userId },
            //         attributes: {
            //             exclude: ['password']
            //         }
            //     })}


            let users = await db.User.findAll({
                attributes: {
                    exclude: ['password']
                }
            })
            resolve(users)

        } catch (e) {
            reject(e);
        }
    })
}

// 2.Create
let hashUserPassword = (password) => {
    return new Promise(async(resolve, reject) => {
        try {
            let hash = await bcrypt.hashSync("B4c0/\/", salt);
            resolve(hash);
        } catch (e) {
            reject(e);
        }
    })
}
let handleCreateUser = async(data) => {
        return new Promise(async(resolve, reject) => {
            try {
                if (!data.email) {
                    resolve({
                        errCode: 1,
                        errMessage: 'Missing email required'
                    })
                    return;
                }
                let check = await db.User.findOne({ where: { email: data.email } });
                if (check) {
                    resolve({
                        errCode: 2,
                        message: 'Your email is already in used'
                    })
                    return;
                }

                let hashUserPasswordFromBcrypt = await hashUserPassword(data.password)
                const create = await db.User.create({
                    email: data.email,
                    password: hashUserPasswordFromBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phoneNumber: data.phoneNumber,
                    gender: data.gender,
                    positionId: data.positionId,
                    roleId: data.roleId,
                    image: data.avatar
                })
                console.log("Check create", create);
                resolve({
                    errCode: 0,
                    message: 'OK'
                });
            } catch (e) {
                reject(e);
            }
        })

    }
    // 3.Update
let handleUpdateUser = async(data) => {
        if (!data.email) {
            return ({
                errCode: 1,
                errMessage: 'Missing email required'
            })
        }
        let user = await db.User.findOne({ where: { email: data.email }, raw: false })
        if (!user.id || !user.gender || user.positionId || user.roleId) {
            // user.email = data.email,
            // user.password = data.password,
            user.firstName = data.firstName,
                user.lastName = data.lastName,
                user.phoneNumber = data.phoneNumber,
                user.gender = data.gender,
                user.address = data.address,
                user.positionId = data.positionId,
                user.roleId = data.roleId;
            if (data.avatar) {
                user.image = data.avatar
            }
            await user.save();
            return ({
                errCode: 0,
                errMessage: 'update success'
            })
        }
        return ({
            errCode: 2,
            errMessage: 'email unvalid'
        })


    }
    // 4.Delete
let handleDeleteUser = async(userId) => {
        if (!userId) {
            return ({
                errCode: 1,
                message: 'Missing email required'
            })
        }
        let user = await db.User.findOne({
            where: { id: userId }
        })
        if (user) {
            await db.User.destroy({ where: { id: userId } })
            return ({
                errCode: 0,
                errMessage: 'delete success'
            })
        }
        return ({
            errCode: 2,
            errMessage: 'ID unvalid'
        })

    }
    // crud Redux
let handleAllcodeService = (typeInput) => {
    return new Promise(async(resolve, reject) => {
        try {
            if (!typeInput) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter!'
                })
            } else {
                let res = {};
                let data = await db.Allcode.findAll({ where: { type: typeInput } });
                res.errCode = 0;
                res.data = data;
                resolve(res);
            }
        } catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    handleReadUser: handleReadUser,
    handleCreateUser: handleCreateUser,
    handleUpdateUser: handleUpdateUser,
    handleDeleteUser: handleDeleteUser,
    handleAllcodeService: handleAllcodeService
}