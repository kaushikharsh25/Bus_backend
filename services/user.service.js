const userModel = require('../models/user.model');

module.exports.createUser = async ({
    firstname, lastname, email, password, studentId, age, role
}) => {
    if (!firstname || !email || !password) {
        throw new Error('Firstname, email, and password are required');
    }

    const user = await userModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password,
        studentId,
        age,
        role // Include role when creating a user
    });

    return user;
};
