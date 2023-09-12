import db from '../models/index'
import bcrypt from 'bcryptjs'

const salt = bcrypt.genSaltSync(10);

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

let createNewUser = async(data) => {
    return new Promise(async(resolve, reject) => {
        try {
            let hashUserPasswordFromBcrypt = await hashUserPassword(data.password)
            console.log('password:', data.password);
            console.log('hash password:', hashUserPasswordFromBcrypt);
            const create = await db.User.create({
                email: data.email,
                password: hashUserPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phoneNumber: data.phoneNumber,
                gender: data.gender,
                roleId: data.roleId,
                positionId: data.positionId,
                image: data.image
            })
            resolve('ok! create success')
        } catch (e) {
            reject(e)
        }

    })
}


module.exports = {
    createNewUser: createNewUser
}