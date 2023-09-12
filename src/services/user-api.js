import db from "../models/index"
import bcrypt from 'bcryptjs'

let handleUserLogin = (email, password) => {
    return new Promise(async(resolve, reject) => {
        try {
            let userData = {};

            let isExist = await checkUserEmail(email);
            // let isExist = await db.User.fineOne({
            // where: { email: email },
            // raw: true
            // })
            if (isExist) {
                let user = await db.User.findOne({
                    attribute: ['email', 'password'],
                    where: { email: email },
                    raw: true,
                });
                if (user) {
                    // console.log('data:', user)
                    let check = bcrypt.compareSync(password, user.password);
                    console.log(check, ' - ', 'password:', password, ' - ', 'user.password:', user.password);
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = 'OK';
                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.errCode = 'Wrong password';
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = `User's not found`;
                }

            } else {
                userData.errCode = 1;
                userData.errMessage = `Your email isn't exit. Please input other email`
            }
            resolve(userData)
        } catch (e) {
            reject(e)
        }
    })
}

let checkUserEmail = (userEmail) => {
    return new Promise(async(resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail },
                raw: true
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (e) {
            reject(e)
        }
    })
}

let compareUserPassword = () => {
    return new Promise((resolve, reject) => {
        try {

        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin
}