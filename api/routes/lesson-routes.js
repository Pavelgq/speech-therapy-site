const { Router } = require(`express`)
// const multer = require(`multer`)
// const jwt = require('jsonwebtoken')
// const async = require(`../utils/async`)
//   const dataRenderer = require(`../utils/data-renderer`);
const lessonModel = require(`./lesson-model`)
const passport = require('passport')
const logger = require(`../logger/logger`)
// const e = require('express')
// const jwtsecret = require('../secret/jwtsecret')
//   const createStreamFromBuffer = require(`../utils/buffer-to-stream`);

const lessonRouter = new Router()

// const toPage = async (cursor, skip = 0, limit = 20) => {
//   return {
//     data: await cursor.skip(skip).limit(limit).toArray(),
//     skip,
//     limit,
//     total: await cursor.count(),
//   }
// }

lessonRouter.use((req, res, next) => {
  res.header(`Access-Control-Allow-Origin`, `*`)
  res.header(
    `Access-Control-Allow-Headers`,
    `Origin, X-Requested-With, Content-Type, Accept`
  )
  res.header('Access-Control-Allow-Credentials', 'true')

  next()
})

// const upload = multer({
//   storage: multer.memoryStorage(),
// })

lessonRouter.post(`/save`, async (req, res) => {
  try {
    const result = await lessonModel.create(req.body)
    console.log(result)
    res.send(result)
  } catch (error) {
    res.status = 400
    console.log(error)
    logger.error(error)
    res.send(error)
  }
})

lessonRouter.get(`/my`, async (req, res) => {
  await passport.authenticate('jwt', function (_err, user) {
    if (user) {
      console.log(user)
      lessonModel.find(
        {
          user: user._id,
        },
        function (_err, lessons) {
          const allLesson = {}
          console.log(lessons)
          lessons.forEach(function (lesson) {
            allLesson[lesson._id] = lesson
          })

          res.send(allLesson)
        }
      )
    } else {
      res.send({ error: 'access error' })
    }
  })(req, res)
})

lessonRouter.post(`/during`, async (req, res) => {
  await passport.authenticate('local', function (_err, user) {
    if (user && user.role === 'Admin') {
      const dateFrom = req.body.dateFrom
      const dateTo = req.body.dateTo

      lessonModel.find({
        created_on: {
          $gte: new Date(dateFrom),
          $lt: new Date(dateTo),
        },
      })
    } else {
      res.send({ error: 'access error' })
    }
  })(req, res)
})

lessonRouter.get(`/:id`, async (req, res) => {
  await passport.authenticate('jwt', function (_err, user) {
    console.log('work')
    if (user && user.role === 'admin') {
      console.log(user)
      const currentUserId = req.params.id
      lessonModel.find(
        {
          user: currentUserId,
        },
        function (_err, lessons) {
          const allLesson = {}
          console.log(lessons)
          lessons.forEach(function (lesson) {
            allLesson[lesson._id] = lesson
          })

          res.send(allLesson)
        }
      )
    } else {
      res.send({ error: 'access error' })
    }
  })(req, res)
})

module.exports = lessonRouter
