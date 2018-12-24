//Require the express package and use express.Router()
const express = require('express');
const router = express.Router();
const Approver = require('../models/ApproverModel');
const Auth = require('../controllers/authcontroller');

//GET HTTP method to /approver
router.get('/', Auth.isAuth, (req, res) => {
    Approver.getAll((err, approvers) => {
        if (err) {
            res.json({ sucess: false, message: `Failed to load approver list. Error: ${err}` });
        }
        else {
            res.write(JSON.stringify({ success: true, approvers: approvers }, null, 2));
            res.end();
        }
    });
});

//POST HTTP method to /approver
router.post('/', Auth.isAuth, Auth.isAdmin, (req, res, next) => {
    let newApprover = new Approver({
        user: req.body.user,
        category: req.body.category
    });

    Approver.add(newApprover, (err, list) => {
        if (err) {
            res.json({ success: false, message: `Failed to create a new approver. Error: ${err}` });

        }
        else
            res.json({ success: true, message: "Added successfully." });

    });
});

//DELETE HTTP method to /approver. Here, we pass in a param which is the object id.
router.delete('/:id', Auth.isAuth, Auth.isAdmin, (req, res, next) => {
    //access the parameter which is the id of the item to be deleted
    let id = req.params.id;

    //Call the model method deleteById
    Approver.deleteById(id, (err, approver) => {
        if (err) {
            res.json({ success: false, message: `Failed to delete the approver. Error: ${err}` });
        }
        else if (approver) {
            res.json({ success: true, message: "Deleted successfully" });
        }
        else
            res.json({ success: false });
    })
});


module.exports = router;