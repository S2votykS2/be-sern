import db from '../models/index'

const update = async(userId) => {
    return new Promise(async(resolve, reject) => {
        try {
            let data = await db.User.findOne({ where: { id: userId }, raw: true });
            resolve(data)
        } catch (e) {
            console.log(e);
        }
    })
}
const updateUser = async(oldData, newData, userId) => {
    return new Promise(async(resolve, reject) => {
        try {
            // const updateUser = await db.User.create({ id: oldData.id });
            // updateUser.set({
            //     email: newData.email,
            //     password: newData.password,
            //     firstName: newData.firstName,
            //     lastName: newData.lastName,
            //     address: newData.lastName,
            //     phoneNumber: newData.phoneNumber,
            //     gender: newData.gender,
            //     positionId: newData.positionId,
            //     roleId: newData.roleId,
            //     image: newData.image,
            // });
            // await updateUser.save()

            const updateUser = await db.User.findOne({ where: { id: userId }, row: true })
            if (updateUser) {
                updateUser.email = newData.email,
                    updateUser.password = newData.password,
                    updateUser.firstName = newData.firstName,
                    updateUser.lastName = newData.lastName,
                    updateUser.address = newData.lastName,
                    updateUser.phoneNumber = newData.phoneNumber,
                    updateUser.gender = newData.gender,
                    updateUser.positionId = newData.positionId,
                    updateUser.roleId = newData.roleId,
                    updateUser.image = newData.image,
                    await updateUser.save();
            }

            const allUser = await db.User.findAll({ row: true })
            resolve(allUser)
        } catch (e) {
            console.log(e);
            reject(e);
        }
    })
}
module.exports = {
    update: update,
    updateUser: updateUser
}