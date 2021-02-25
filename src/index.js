const app = require('express')()
const http = require('http').createServer(app)
const cameraRouter = require('./routes/camera')
const bodyParser = require('body-parser')
const pool = require ('./mysql_client')

const db = require('./mysql_client')
db.on('error', (err) => {
  console.error(err)
})

app.use(bodyParser.urlencoded({
  extended: false
}))

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname+"/public" })
})

app.get('/json', (req, res) => {
  res.status(200).json({"message":"ok"})
})

// We should find a better idea for this : the problem is that it's convenient to properly close the pool or a node process might persist
app.get('/stop', (req,res) => {
  pool.end()
  process.exit()
})

app.use('/camera', cameraRouter)

//Socket Logic
const socketio = require('socket.io')(http)

socketio.on("connection", (socket) => {
  // userSocket.on("send_message", (data) => {
  //     userSocket.broadcast.emit("receive_message", data)
  // })
  console.log(`Connecté au client ${socket.id}`)
  
  socketio.emit('news','Voici un nouvel élément envoyé par le serveur')
})

// const port = process.env.PORT || 8000

module.exports = http.listen(8000, "0.0.0.0", () => {
  console.log("app dispo sur le port 8000 de la machine")
})