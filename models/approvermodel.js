//Require mongoose package
const mongoose = require('mongoose');

//Define Approver
const ApproverSchema = mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    category: {
        type: [String],
        required: true,
        enum: ['XSC', 'Transport', 'LP', 'PS', 'Other']
    }
});

const Approver = module.exports = mongoose.model('Approver', ApproverSchema);

//Approver.find() returns all the approvers
module.exports.getAll = (callback) => {
    Approver.find(callback);
}

//newApprover.save is used to insert the document into MongoDB
module.exports.add = (newApprover, callback) => {
    newApprover.save(callback);
}

// Here we need to pass an id parameter to Approver.remove
module.exports.deleteById = (id, callback) => {
    let query = { _id: id };
    Approver.deleteOne(query, callback);
}