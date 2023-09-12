import db from '../models/index'


const deleteHandler = async(userId) => {
    return new Promise(async(resolve, reject) => {
        try {
            let deleteUser = await db.User.findOne({ where: { id: userId }, raw: true });
            console.log(deleteUser);
            if (deleteUser) {
                await deleteUser.destroy();
            }
            const allUser = await db.User.findAll({ raw: true });
            resolve(allUser);
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    deleteHandler: deleteHandler
}