const User = require('../models/user-model');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

userSignup = async (req, res) => {
    const {
      name,
      mobile,
      password,
      nurseryId,
      userType,
      email,
      status
    } = req.body;
    if (!name || !mobile || !password || !nurseryId || !userType) {
        return res.status(400).json({
            success: false,
            error: 'You must provide all details',
        })
    }

    try {
        let user = await User.findOne({
            mobile
        });
        if (user) {
            return res.status(400).json({
                msg: "User Already Exists"
            });
        }

        user = new User({
          name,
          mobile,
          password,
          nurseryId,
          userType,
          email,
          status : 'Approved'
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            "randomString", {
                expiresIn: 10000
            },
            (err, token) => {
                if (err) throw err;
                res.status(200).json({
                    token
                });
            }
        );
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Error in Saving");
    }
}

passwordLogin = async (req, res) => {
    const { mobile, password } = req.body;
    try {
      if(!mobile || !password){
        return res.status(400).json({
          success: false,
          error: 'You must provide all details',
        })
      }
      let user = await User.findOne({
        mobile
      });
      if (!user)
        return res.status(400).json({
          message: "User Not Exist"
        });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({
          message: "Incorrect Password !"
        });

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        "secret",
        {
          expiresIn: 3600
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            token
          });
        }
      );
    } catch (e) {
      console.error(e);
      res.status(500).json({
        message: "Server Error"
      });
    }
}

userDetails = async(req, res) => {
  try {
    // request.user is getting fetched from Middleware after token authentication
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (e) {
    res.send({ message: "Error in Fetching user" });
  }
}

getUsers = async (req, res) => {
  await User.find({}, (err, users) => {
      if (err) {
          return res.status(400).json({ success: false, error: err })
      }
      if (!users.length) {
          return res
              .status(404)
              .json({ success: false, error: `Users not found` })
      }
      return res.status(200).json({ success: true, data: users })
  }).catch(err => console.log(err))
}

module.exports = {
  userSignup,
  passwordLogin,
  userDetails,
  getUsers
}