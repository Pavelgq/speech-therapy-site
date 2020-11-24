// const db = require('../db/database');
const crypto = require('crypto')
const mongoose = require('mongoose')
// const ObjectId = require('mongodb').ObjectID
// const logger = require(`../logger/logger`)

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: 'role is required',
      default: 'user',
    },
    firstName: String,
    lastName: String,
    sex: String,
    classGroup: String,
    days: [
      {
        type: Date,
        default: Date.now,
      },
    ],
    lessons: {
      type: Number,
      default: 0,
    },
    level: {
      type: Number,
      default: 1,
    },
    money: {
      type: Number,
      default: 0,
    },
    exp: {
      type: Number,
      default: 0,
    },
    kMoney: {
      type: Number,
      default: 1,
    },
    kExp: {
      type: Number,
      default: 1,
    },
    login: {
      type: String,
      unique: 'this login already exist',
    },
    email: {
      type: String,
      required: 'e-mail is required',
      unique: 'this e-mail already exist',
    },
    passwordHash: String,
    salt: String,
  },
  {
    timestamps: true,
  }
)

userSchema
  .virtual('password')
  .set(function (password) {
    this._plainPassword = password
    if (password) {
      this.salt = crypto.randomBytes(128).toString('base64')
      this.passwordHash = crypto.pbkdf2Sync(password, this.salt, 1, 128, 'sha1')
    } else {
      this.salt = undefined
      this.passwordHash = undefined
    }
  })
  .get(function () {
    return this._plainPassword
  })

userSchema.methods.checkPassword = function (password) {
  if (!password) return false
  if (!this.passwordHash) return false
  return (
    crypto.pbkdf2Sync(password, this.salt, 1, 128, 'sha1') === this.passwordHash
  )
}

const userModel = mongoose.model('User', userSchema)

module.exports = userModel
