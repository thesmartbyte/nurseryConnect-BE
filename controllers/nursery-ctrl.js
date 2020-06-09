const bcrypt = require("bcryptjs");
const Nursery = require('../models/nursery-model')
const User = require('../models/user-model')

nurserySignup = async (req, res) => {
  const {
    name,
    adrsln1,
    adrsln2,
    city,
    state,
    pin,
    owner,
    mobile,
    password,
    gstNo,
    email
  } = req.body
  if (!name || !adrsln1 || !adrsln2 || !city || !state || !pin || !owner || !mobile || !password) {
    return res.status(400).json({
        success: false,
        error: 'You must provide all details',
    })
  }
  try{
    let nursery = await Nursery.findOne({
        mobile
    });
    let user = await User.findOne({
      mobile
    });
    if (nursery || user) {
        return res.status(400).json({
            msg: "Nursery Already Exists"
        });
    }
    nursery = new Nursery({
        name,
        adrsln1,
        adrsln2,
        city,
        state,
        pin,
        owner,
        mobile,
        password,
        gstNo,
        email,
        status : 'Awaited'
    });

    if (!nursery) {
      return res.status(400).json({ success: false, error: err })
    }

    nursery
      .save()
      .then(async () => {
          user = new User({
            name: owner,
            mobile,
            password,
            nurseryId: nursery._id,
            userType: 'Owner',
            email,
            status : 'Awaited'
          })
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(password, salt);
          user.save().then(() => {
            return res.status(201).json({
              success: true,
              id: nursery._id,
              message: 'Nursery created successfully, waiting for approval!',
            })
          })
      })
      .catch(error => {
          return res.status(400).json({
              error,
              message: 'Nursery not created!',
          })
      })

  } catch(e){
    console.log(e.message);
    res.status(500).send("Error in Saving");
  }
}

getNurseries = async (req, res) => {
  await Nursery.find({}, (err, nurseries) => {
      if (err) {
          return res.status(400).json({ success: false, error: err })
      }
      if (!nurseries.length) {
          return res
              .status(404)
              .json({ success: false, error: `Nurseries not found` })
      }
      return res.status(200).json({ success: true, data: nurseries })
  }).catch(err => console.log(err))
}

getNurseryById = async (req, res) => {
  await Nursery.findOne({ _id: req.params.id }, (err, nursery) => {
      if (err) {
          return res.status(400).json({ success: false, error: err })
      }

      if (!nursery) {
          return res
              .status(404)
              .json({ success: false, error: 'Nursery not found' })
      }
      return res.status(200).json({ success: true, data: nursery })
  }).catch(err => console.log(err))
}

module.exports = {
  nurserySignup,
  getNurseries,
  getNurseryById
}