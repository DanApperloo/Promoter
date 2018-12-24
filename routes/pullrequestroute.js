//Require the express package and use express.Router()
const express = require('express');
const router = express.Router();
const PullRequest = require('../models/PullRequestModel');
const Auth = require('../controllers/authcontroller');

//GET HTTP method to /pullrequest
router.get('/', Auth.isAuth, (req, res) => {
    PullRequest.getAll((err, pullrequests) => {
        if (err) {
            res.json({ sucess: false, message: `Failed to load approver list. Error: ${err}` });
        }
        else
        {
            res.write(JSON.stringify({ success: true, pullrequests: pullrequests }, null, 2));
            res.end();
        }
    });
});


module.exports = router;