// Module Requirements
const request = require('request');
const localConfig = require('../config/local');


// Query the Bitbucket Server looking for the following:
// - Pull Requests that have the comment "Ready to Merge": Create PR object and add to table, assign to owner or leave as unassigned
// - Pull Requests that have transitioned to "Merged" state: Transition to "Merged" State in table, and alert approver that it has completed
function scanPullRequests() {
    
};


// Scan Bitbucket every 30 seconds
setInterval(scanPullRequests, localConfig.bitbucketQueryIntervalMs);


// Export functions for testing purposes
module.exports = {
    scan: scanPullRequests
};