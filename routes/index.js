const express = require('express');
const router = express.Router();

/// Routing all HTPP requests to /test to test router
router.use('/test', require('./testroute'));

/// Routing all HTPP requests to /login to login router
router.use('/login', require('./loginroute'));

/// Routing all HTTP requests to /approver to approver router
router.use('/approver', require('./approverroute'));

/// Routing all HTTP requests to /pullrequest to pullrequest router
router.use('/pullrequest', require('./pullrequestroute'));


module.exports = router;