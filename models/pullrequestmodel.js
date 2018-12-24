//Require mongoose package
const mongoose = require('mongoose');

//Define PullRequest
const PullRequestSchema = mongoose.Schema({
    creator: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    state: {
        type: [String],
        required: true,
        enum: ['Awaiting Changes', 'Ready to Merge', 'Promoting', 'Promote Failed', 'Merged']
    },
    dateCreated: {
        type: Date,
        default: Date.now,
        required: true
    },
    dateUpdated: {
        type: Date,
        default: Date.now,
        required: true
    },

    promoterAssigned: String,
    promoterLast: String
});

const PullRequest = module.exports = mongoose.model('PullRequest', PullRequestSchema);

//PullRequest.find() returns all the approvers
module.exports.getAll = (callback) => {
    PullRequest.find(callback);
}

//newPullRequest.save is used to insert the document into MongoDB
module.exports.add = (newPullRequest, callback) => {
    newPullRequest.save(callback);
}

// Here we need to pass an id parameter to PullRequest.remove
module.exports.deleteById = (id, callback) => {
    let query = { _id: id };
    PullRequest.deleteOne(query, callback);
}