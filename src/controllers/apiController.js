import userService from "../services/user-api"
import crudService from "../services/crud-api"
// Login
let handleLogin = async(req, res) => {
        let email = req.body.email;
        let password = req.body.password;
        // console.log('Email:', email, ' - ', 'Password:', password);

        if (!email || !password) {
            return res.status(500).json({
                errorCode: 1,
                message: 'Missing inputs parameter!'
            })
        }

        let userData = await userService.handleUserLogin(email, password);
        console.log('UserData:', userData);
        return res.status(200).json({
            errorCode: userData.errCode,
            message: userData.errMessage,
            user: userData.user ? userData.user : {}
        })
    }
    // CRUD
    // Read
let handleRead = async(req, res) => {
    let id = req.query.id;
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing id required',
            users: []
        })
    }
    let users = await crudService.handleReadUser(id);
    return res.status(200).json({
        errCode: 0,
        message: 'OK',
        users
    })
}

// Create
let handleCreate = async(req, res) => {
        let message = await crudService.handleCreateUser(req.body);
        console.log(message);
        return res.status(200).json(message)
    }
    // Update
let handleUpdate = async(req, res) => {
        let message = await crudService.handleUpdateUser(req.body);
        return res.status(200).json(message);
    }
    // Delete
let handleDelete = async(req, res) => {
    let message = await crudService.handleDeleteUser(req.body.email);
    return res.status(200).json(message);
}


// Redux
let handleAllcode = async(req, res) => {
    try {
        let message = await crudService.handleAllcodeService(req.query.type);
        // let message = await crudService.handleAllcodeService(req.body.type);
        return res.status(200).json(message);
    } catch (e) {
        console.log(e);
        res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'

        })
    }
}
module.exports = {
    handleLogin: handleLogin,
    handleRead: handleRead,
    handleCreate: handleCreate,
    handleUpdate: handleUpdate,
    handleDelete: handleDelete,
    handleAllcode: handleAllcode
}