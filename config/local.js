// Module Requirements
const fs = require('fs');

// Aplication Constants
const port = 3000;

// Jira
const jira_port = 8080;
const jira_base_url = "http://localhost:8080";

// Bitbucket
const bitbucket_port = 7990;
const bitbucket_base_url = "http://localhost:7990";
const bitbucket_consumer_key = fs.readFileSync('bitbucket.key', 'utf8');
const bitbucket_consumer_secret = fs.readFileSync('bitbucket.pem', 'utf8');

// Define our Bitbucket Listener credentials
const bitbucket_listener = "StatusListener"
const bitbucket_listener_token = "OTk3MjEzMzc2MzQ5Op7brZUofPuYWk1rtrsiVlPZ7c1m"     // Create Access Token for User in Bitbucket settings
const bitbucket_listener_query_interval_ms = 30000   // 5 seconds for testing, 30 seconds for production


module.exports = {
    /// Local Server
    port: port,
    thisServer: "http://localhost:" + port.toString(),

    /// Cookie Info
    redirectCookieName: "pARedirectUrl",

    /// Target Jira
    jiraPort: jira_port,
    jiraBaseUrl: jira_base_url,

    /// Target Bitbucket
    bitbucketPort: bitbucket_port,
    bitbucketBaseUrl: bitbucket_base_url,

    /// Bitbucket Application Link
    bitbucketConsumerKey: bitbucket_consumer_key,
    bitbucketConsumerSecret: bitbucket_consumer_secret,

    /// Bitbucket Listener User
    bitbucketListenerUser: bitbucket_listener,
    bitbucketListenerToken: bitbucket_listener_token,
    bitbucketQueryIntervalMs: bitbucket_listener_query_interval_ms
}