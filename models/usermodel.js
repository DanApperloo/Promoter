//Require mongoose package
const mongoose = require('mongoose');

//Define User
const UserSchema = mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        required: true
    }
});

const User = module.exports = mongoose.model('User', UserSchema);

//User.find() returns all the approvers
module.exports.getAll = (callback) => {
    User.find(callback);
}

//newUser.save is used to insert the document into MongoDB
module.exports.add = (newUser, callback) => {
    newUser.save(callback);
}

// Here we need to pass an id parameter to User.remove
module.exports.deleteById = (id, callback) => {
    let query = { _id: id };
    User.deleteOne(query, callback);
}

// Here we need to pass a User value to User.findOneOrCreate
module.exports.findOneOrCreate = (_user, callback) => {
    let query = { user: _user };

    User.findOne(query, (err, result) => {
        let newUser= new User({
            user: _user,
            admin: false
        });

        return result ? callback(err, result) : User.add(newUser, (err, result) => { return callback(err, result) })
    })
}