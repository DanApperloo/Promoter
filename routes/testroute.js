const express = require('express');
const router = express.Router();
const Listener = require('../controllers/listenercontroller');
const Auth = require('../controllers/authcontroller');

router.get('/', Auth.isAuth, Auth.isAdmin, function (req, res) {
    res.send("Hello World");
});

router.get('/interval', function (req, res) {
    Listener.scan();
    res.send("Query Complete");
});

module.exports = router;