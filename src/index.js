const app = require('express')()
const http = require('http').createServer(app)
const cameraRouter = require('./routers/camera')
const parkingspotRouter = require('./routers/parkingspot')
const bodyParser = require('body-parser')
const pool = require ('./mysql_pool')

app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

//Default path : behavior TBD
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname+"/public" })
})

// We should find a better idea for this : the problem is that it's convenient to properly close the pool or a node process might persist
app.get('/stop', (req,res) => {
  pool.end()
  process.exit()
})

//all urls using /camera will be redirected to the camera router
app.use('/camera', cameraRouter)

//all urls using /mobile will be redirected to the mobile app router
app.use('/parkingspot', parkingspotRouter)

//Socket Logic
const socketio = require('socket.io')(http)
socketio.on("connection", (socket) => {
  // userSocket.on("send_message", (data) => {
  //     userSocket.broadcast.emit("receive_message", data)
  // })
  console.log(`Connecté au client ${socket.id}`)
  socketio.emit('news','Voici un nouvel élément envoyé par le serveur')
})

//We can use process.env.PORT if we deploy the app on heroku, to use the server port
// const port = process.env.PORT || 8000

module.exports = http.listen(8000, "0.0.0.0", () => {
  console.log("Application available on your machine's port 8000")
})