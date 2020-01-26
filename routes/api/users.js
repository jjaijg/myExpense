const express = require("express");
const router = express.Router();

const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

// User Model
const User = require("../../models/users");
// Token Model
const Token = require("../../models/tokens");

// @route   GET api/users
// @desc    Register user
// @access  Public
router.post("/", (req, res) => {
  const { name, email, password } = req.body;

  // Simple validation
  if (!name || !email || !password) {
    return res.status(400).json({
      id: "USER_REGISTRATION",
      success: false,
      msg: "Please enter all fields!!!"
    });
  }

  // Check if user already exist
  User.findOne({ email }).then(user => {
    if (user)
      return res.status(400).json({
        id: "USER_REGISTRATION",
        success: false,
        msg: "User already Exist!"
      });
    // create new user
    const newUser = new User({
      name,
      email,
      password
    });

    // gen salt and hash
    bcrypt.genSalt(10, (err, salt) => {
      if (err) throw err;
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;

        // Add to db
        newUser
          .save()
          .then(user => {
            // Create a verification token for this user
            var token = new Token({
              _userId: user._id,
              token: crypto.randomBytes(16).toString("hex")
            });
            // Save token
            token
              .save()
              .then(token => {
                // Send Email
                const transporter = nodemailer.createTransport({
                  service: "gmail",
                  auth: {
                    user: process.env.MAILGUN_ID,
                    pass: process.env.MAILGUN_PW
                  }
                });
                const mailOptions = {
                  from: process.env.MAILGUN_ID,
                  to: user.email,
                  subject: "Account Verification Token",
                  text: `Hello\n\nPlease verify your account by clicking the link: \nhttp://${"localhost:3000" ||
                    req.headers.host}/verify/${token.token}`
                };
                transporter
                  .sendMail(mailOptions)
                  .then(() =>
                    res.json({
                      id: "USER_REGISTRATION",
                      success: true,
                      msg:
                        "A verification email has been sent to " +
                        user.email +
                        "."
                    })
                  )
                  .catch(err =>
                    res.status(500).json({
                      id: "USER_REGISTRATION",
                      success: false,
                      msg:
                        "Please make sure you entered a valid email! We are not able to send verification mail."
                    })
                  );
              })
              .catch(err =>
                res.status(500).json({
                  id: "USER_REGISTRATION",
                  success: false,
                  msg: err.message
                })
              );
          })
          .catch(err =>
            res.status(500).json({
              id: "USER_REGISTRATION",
              success: false,
              msg: err.message
            })
          );
      });
    });
  });
});

// @route   POST api/users/confirmation/
// @desc    Verifies user by checking token
// @access  Public
router.post("/confirmation/", (req, res) => {
  // Find a matching token
  Token.findOne({ token: req.body.token }).then(token => {
    if (!token)
      return res.status(400).json({
        id: "CONFIRMATION",
        success: false,
        msg:
          "We were unable to find a valid token. Your token may have expired."
      });

    // If we found a token, find a matching user
    User.findOne({ _id: token._userId, email: req.body.email }).then(user => {
      if (!user)
        return res.status(400).json({
          id: "CONFIRMATION",
          success: false,
          msg: "We were unable to find a user for this token."
        });
      if (user.isVerified)
        return res.status(400).json({
          id: "CONFIRMATION",
          success: false,
          msg: "This user has already been verified."
        });
      // Verify and save the user
      user.isVerified = true;
      user
        .save()
        .then(() => {
          jwt.sign(
            {
              id: user.id
            },
            process.env.JWTSECRET,
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.json({
                id: "CONFIRMATION",
                success: true,
                token,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email
                }
              });
            }
          );
        })
        .catch(err =>
          res.status(500).json({
            id: "CONFIRMATION",
            success: false,
            msg: err.message
          })
        );
    });
  });
});

// @route   GET api/users/resend
// @desc    Resends email to the registered user
// @access  Public
router.post("/resend", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (!user)
      return res.status(400).json({
        id: "RESEND_EMAIL",
        success: false,
        msg: "We were unable to find a user with that email."
      });
    if (user.isVerified)
      return res.status(400).json({
        id: "RESEND_EMAIL",
        success: false,
        msg: "This account has already been verified. Please log in."
      });

    // Create a verification token, save it, and send email
    var token = new Token({
      _userId: user._id,
      token: crypto.randomBytes(16).toString("hex")
    });

    // Save the token
    token
      .save()
      .then(() => {
        // Send the email
        var transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: {
            user: process.env.MAILGUN_ID,
            pass: process.env.MAILGUN_PW
          }
        });
        var mailOptions = {
          from: "no-reply@mytransaction.herokuapp.com",
          to: user.email,
          subject: "Account Verification Token",
          text: `Hello\n\nPlease verify your account by clicking the link: \nhttp://${req.headers.host}/verify/${token.token}`
        };
        transporter
          .sendMail(mailOptions)
          .then(() => {
            res.json({
              id: "EMAIL_VERIFY_SENT",
              success: true,
              msg: "A verification email has been sent to " + user.email + "."
            });
          })
          .catch(err =>
            res.status(500).json({
              id: "EMAIL_VERIFY",
              success: false,
              msg: err.message
            })
          );
      })
      .catch(err =>
        res.status(500).json({
          id: "EMAIL_VERIFY",
          success: false,
          msg: err.message
        })
      );
  });
});

module.exports = router;
