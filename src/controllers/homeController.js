import createService from '../services/create-service'
import displayService from '../services/display-service'
import updateService from '../services/update-service'
import deleteService from '../services/delete-service'

let getHomePage = async(req, res) => {
        let data = await displayService.displayUser();
        // console.log(data);
        return res.render('homepage.ejs', { datas: data })
    }
    // CREATE
let create = (req, res) => {
    return res.render('create.ejs');
}

let postCreate = async(req, res) => {
    let message = await createService.createNewUser(req.body);
    res.redirect('/home');
}

// Edit
let edit = async(req, res) => {
    let data = await displayService.displayUser();
    res.render('edit.ejs', { datas: data })
}

// Update
let update = async(req, res) => {
    const userId = req.params.id;
    let data = await updateService.update(userId);
    res.render('update.ejs', { datas: data });
}

let postUpdate = async(req, res) => {
    if (req.body.id) {
        const oldData = await updateService.update(req.body.id);
        const newData = req.body;
        console.log("old-data", oldData);
        console.log("new-data", newData);
        const allUser = await updateService.updateUser(oldData, newData, req.body.id);
        console.log("Allcode:", allUser);
        res.render('homepage.ejs', { datas: allUser });

    } else {
        res.send('id invalid');

    }

}

//Delete
const postDelete = async(req, res) => {
    const userId = req.params.id;
    console.log(userId);
    if (userId) {
        const allUser = await deleteService.deleteHandler(userId)
        res.render('homepage.ejs', { datas: allUser });
    } else {
        res.send("ID invalid")
    }
}


module.exports = {
    getHomePage: getHomePage,
    create: create,
    postCreate: postCreate,
    edit: edit,
    update: update,
    postUpdate: postUpdate,
    postDelete: postDelete,
}