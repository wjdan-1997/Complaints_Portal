const userSchema = require('../Models/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const userValidationRegister = require('../Utils/UserRegisterValidation')
const adminRegisterValidation = require('../Utils/adminRegisterValidation')
const loginValidation = require('../Utils/LoginValidation')


userRegistering = async (req, res) => {
    
    const { name, email, passwordReceived, education, phoneNumber, gender, address } = req.body;
   
    const { msg, isValid } = userValidationRegister(req.body);
    if (!isValid) {
        return res.status(400).json({ errorMessage: msg })
    }
    const isAdmin = false;
    const password = passwordReceived;
    const newUser = new userSchema({
        name,
        email,
        password,
        education,
        phoneNumber,
        gender,
        address,
        isAdmin
    });
    return createUser(newUser,res);

}

adminRegistering = async (req, res) => {
    const { msg, isValid } = adminRegisterValidation(req.body);
    const { name, email, passwordReceived, phoneNumber } = req.body;
    if (!isValid) {
        return res.status(400).json({ errorMessage: msg })
    }
    const isAdmin = true;
    const password = passwordReceived;
    const newUser = new userSchema({ name, email, password, phoneNumber, isAdmin });
    return createUser(newUser,res);
}

userLogin = async (req, res) => {
    const { email, passwordReceived } = req.body;

    // check if the inputs field are valid 
    const { msg, isValid } = loginValidation(req.body);
    if (!isValid) {
        return res.status(400).json({ errorMessage: msg })
    };
    // use findOne function to see if the user exist
    const existUser = await userSchema.findOne({ email })
    if (!existUser) {
        return res.send({
            errorMessage: "Wrong Pass or Email"
        })
    }
    console.log('Is existUser',existUser);
    // use bcrypt to compare password with hashed password 
    bcrypt.compare(passwordReceived, existUser.password).then(isMatch => {
        if (isMatch) {
            const payload = {
              id: existUser.id,
              email:existUser.email,
              name: existUser.name,
              isAdmin: existUser.isAdmin
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
              .json({ errorMessage: "Wrong Pass or Email" });
          }
    })

}
userLogout = (req, res) => {
    delete req.headers.token

    res.json({ 
        status: "logout",
        msg:"Please Log In again"
     });
}

currentUser = async (req, res) => {
    const userEmail = req.user.email;
    const user = await userSchema.findOne({ email: userEmail });

    if (!user) {
        return res.status(404).json({
            message: "not found user"
        })
    }

    res.json({ user: user })
}
// Private Methods
createUser = async (newUser, res) => {
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
    console.log('Is newUser added',newUser);
    newUser.save()
        .then(user => res.json({ responseBody: user }))
        .catch(error => {
            res.status(400).json({
                error: error,
                errorMessage: 'User not created!',
            })
        });
}

module.exports = {
   
    userRegistering,
    adminRegistering,
    userLogin,
    userLogout,
    currentUser
}

