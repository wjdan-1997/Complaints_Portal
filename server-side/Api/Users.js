const userSchema = require('../Models/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const Validator = require("validator");
const userCreateValidation = require('../Utils/userCreateValidation')
const loginValidation = require('../Utils/LoginValidation');
const userUpdatedValidation = require('../Utils/UserValidations');


userRegistering = (req, res) => {

    const { name, email, password, education, phoneNumber, gender, address } = req.body;

    const { msg, isValid } = userCreateValidation(req.body);
    if (!isValid) {
        return res.status(400).json({ errorMessage: msg })
    }
    userSchema.findOne({ email: email }).then(user => {
        if (user) {
            return res.status(400).json({ errorMessage: "Email already exists" });
        } else {
            const newUser = new userSchema({
                name,
                email,
                password,
                education,
                phoneNumber,
                gender,
                address,
            });

            // Hash password before saving in database
            bcrypt.genSalt(7, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) return res.status(400).json({ errorMessage: 'err' });
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json({ responseBody: user }))
                        .catch(err => res.json({ errorMessage: 'Not created', err }))
                });
            });
        }
    });

}

// only for admin you use this route in user managemnt screen
createUser = async (req, res) => {
    const isAdmin = req.user.role == 'admin'
    const { name, email, password, education, phoneNumber, gender, address, role } = req.body;

    if (!isAdmin) {
        return res.status(401)
            .json({ errorMessage: "UnAuthraized" })
    }
    const { msg, isValid } = userCreateValidation(req.body);
    if (!isValid) {
        return res.status(400).json({ errorMessage: msg })
    }
    userSchema.findOne({ email: email }).then(user => {
        if (user) {
            return res.status(400).json({ errorMessage: "Email already exists" });
        } else {
            const newUser = new userSchema({
                name,
                email,
                password,
                education,
                phoneNumber,
                gender,
                address,
                role,
            });
            console.log('newUserr--1', newUser);
            console.log('passswordBody--2', password);
            // Hash password before saving in database
            bcrypt.genSalt((err, salt) => {
                if (err) return res.status(400).json({ errorMessage: 'msg' });
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    console.log('passswordHashed--3', hash);

                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json({ responseBody: user }))
                        .catch(err => res.json({ errorMessage: 'Not created', err }))
                });
            });
        }
    });

}
userLogin = async (req, res) => {
    const { email, passwordReceived } = req.body;

    // check if the inputs field are valid 
    const { msg, isValid } = loginValidation(req.body);
    if (!isValid) {
        return res.status(400).json({ errorMessage: msg })
    };
    // use findOne function to see if the user exist
    userSchema.findOne({ email }).then(user => {
        // Check if user exists
        if (!user) {
            return res.status(404).json({ errorMessage: "Email not found" });
        }

        // Check password
        bcrypt.compare(passwordReceived, user.password).then(isMatch => {
            if (isMatch) {

                const payload = {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role
                };
                // Sign token
                jwt.sign(
                    payload,
                    process.env.JWT,
                    {
                        expiresIn: 31556926 // 1 year in seconds
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        });
                    }
                );
            } else {
                return res
                    .status(400)
                    .json({ errorMessage: "Password incorrect" });
            }
        });
    });


}

userLogout = (req, res) => {
    delete req.headers.token

    res.json({
        status: "logout",
        msg: "Please Log In again"
    });
}
// update user only allowed by user 
userProfile = async (req, res) => {
    const { name, email, education, phoneNumber, gender, address } = req.body;

    const userId = req.user.id;
    const id = req.params.id;

    const { msg, isValid } = userUpdatedValidation(req.body);
    if (!isValid) {
        return res.status(400).json({ errorMessage: msg })
    }
    if (!userId || req.user.role != 'user') {
        return res.status(401)
            .json({ errorMessage: "Not Allowed" })
    }
    const data = await userSchema.findOne({ "_id": (id) }, (err, data) => {
        console.log('req.body.email!', email);
        console.log('data.email!', data.email);
        console.log('email === data.email!', email == data.email);
        console.log('is user not found by id!!', !data);

        if (!data) {
            return res.status(400).json({ errorMessage: "This user not found" });
        }
        if (email == data.email) {
            return res.status(400).json({ errorMessage: "Email already exists" });
        }
        return data;
    }).clone().catch(err => console.log(err));

    data.name = name
    data.email = email
    data.education = education
    data.phoneNumber = phoneNumber
    data.gender = gender
    data.address = address
    data.save()
        .then(user => res.json({ responseBody: user }));
}

// update user only allowed by admin 
updateUser = async (req, res) => {
    const { name, email, education, phoneNumber, gender, address, passwordReceived } = req.body;

    const isAdmin = req.user.role == 'admin';
    const id = req.params.id;

    const saltCrypt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(passwordReceived, saltCrypt);


    if (!isAdmin) {
        return res.status(401)
            .json({ errorMessage: "UnAuthraized" })
    }

    const data = await userSchema.findOne({ "_id": (id) }, (err, data) => {
        console.log('req.body.email!', email);
        console.log('data.email!', data.email);
        console.log('email === data.email!', email == data.email);
        console.log('is user not found by id!!', !data);

        if (!data) {
            return res.status(400).json({ errorMessage: "This user not found" });
        }
        if (email == data.email) {
            return res.status(400).json({ errorMessage: "Email already exists" });
        }
        return data;
    }).clone().catch(err => console.log(err));
    console.log("mmmmm data", data);

    data.name = name
    data.email = email
    data.education = education
    data.phoneNumber = phoneNumber
    data.gender = gender
    data.address = address
    data.password = passwordHash;
    data.save()
        .then(user => res.json({ responseBody: user }))


}
// put
changePassword = async (req, res) => {
    const { passwordReceived, newPassword } = req.body;
    console.log('reeeeq wejdn', req.body);
    const userId = req.user.id;
    const id = req.params.id;

    if (!userId || req.user.role != 'user') {
        return res.status(401)
            .json({ errorMessage: "Not Allowed" })
    }

    const data = await userSchema.findOne({ "_id": (id) }, (err, data) => {
        if (err) return res.json({ errorMessage: "user not found!" })
        return data;
    }).clone().catch(err => console.log(err));

    const saltCrypt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(newPassword, saltCrypt)


    bcrypt.compare(passwordReceived, data.password)
        .then((isMatch) => {


            if (isMatch) {
                console.log('is matching!======', isMatch);
                data.password = passwordHash
                data.save()
                    .then(user => res.json({ responseBody: user }))
                    .catch(err => res.json({ errorMessage: 'not match' }))

            }
            else {
                console.log('is matching!======', isMatch);

                return res
                    .status(400)
                    .json({ errorMessage: " Wrong Pass" });
            }
        })

}
currentUser = async (req, res) => {
    const userEmail = req.user.email;
    const user = await userSchema.findOne({ email: userEmail });

    if (!user) {
        return res.status(404).json({
            message: "not found user"
        })
    } else {
        return res.status(200)
            .json({ responseBody: user })
    }

}
getUsers = async (req, res) => {
    const isAdmin = req.user.role == 'admin';
    if (!isAdmin) {
        return res.status(401)
            .json({ errorMessage: "UnAuthraized" })
    }
    const user = await userSchema.find({}, (err, data) => {
        if (err) {
            return res.status(400).json({ success: false, errorMessage: err })
        }
    }).clone().catch(err => console.log(err))
    return res.json({ responseBody: user })
};
deleteUser = async (req, res) => {
    const isAdmin = req.user.role == 'admin';
    const id = req.params.id;

    if (!isAdmin) {
        return res.status(401)
            .json({ errorMessage: "UnAuthraized" })
    }

    const data = await userSchema.deleteOne({ "_id": (id) }, (err, data) => {
        if (err) {
            return res.status(400).json({ success: false, errorMessage: err })
        }
        return res.status(200).json({ success: true, responseBody: data })

    }).clone().catch(err => console.log(err))

    return data
}
// Private Methods not used 
saveedUser = async (newUser, res, req) => {
    // hash the password 
    const saltCrypt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(newUser.password, saltCrypt);
    newUser.password = passwordHash;
    // use findOne function to find on document if its exist
    userSchema.findOne({ email: newUser.email }, async (err, emil) => {
        if (!!emil) {
            return res.send({ errorMessage: "User already exist" })
        }
    });
    console.log('Is newUser added', newUser);
    newUser.save()
        .then(user => res.json({ responseBody: user }))
        .catch(err => res.json({ errorMessage: 'Not created' }))

}
module.exports = {
    changePassword,
    getUsers,
    userProfile,
    createUser,
    userRegistering,
    userLogin,
    userLogout,
    currentUser,
    deleteUser,
    updateUser
}

