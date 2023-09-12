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

const displayUser = async() => {
    return new Promise(async(resolve, reject) => {
        try {
            let data = await db.User.findAll({ raw: true }); //raw:true (lay du lieu)
            // console.log(data)
            resolve(data)
        } catch (e) {
            console.log(e);
        }
    })
}


const displayUser2 = async() => {
    try {
        let data = await db.User.findAll({ raw: true }); //raw:true (lay du lieu)
        // console.log(data);
        return data;

    } catch (e) {
        console.log(e);
    }
}

module.exports = {
    displayUser: displayUser,
    displayUser2: displayUser2

}