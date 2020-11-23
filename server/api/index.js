const server = require('speech-therapy-back')
// Create express instance
server.run()

// Export express app
module.exports = server
// // Start standalone server if directly running
// if (require.main === module) {
//   const port = process.env.PORT || 3001
//   app.listen(port, () => {
//     console.log(`API server listening on port ${port}`)
//   })
// }
