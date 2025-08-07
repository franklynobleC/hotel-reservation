const express = require('express')
const bodyParser = require('body-parser')
const { connectDb, getConnection, sqlPool} = require('./db/connectDb')
// parse application/json
require('dotenv').config()
const cors = require('cors')

//AuthRouter
const authRouter = require('./routes/authRoute')
const userRouter = require('./routes/usersRoute')
const roomsRouter = require('./routes/roomsRoute')
const reservationRouter = require('./routes/reservationsRoute')
// Do something with the headers
// const cookieParser = require('cookie-parser')
const app = express()
app.use(bodyParser.json())

app.use(express.json())

app.use(cors())

// app.use(cookieParser(process.env.JWT_SECRET))
app.use(express.static('./public'))
// app.use(fileUpload({ useTempFiles: true }))

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/rooms', roomsRouter)
app.use('/api/v1/reservations', reservationRouter)
//   Add Port
/* This code is setting up the server to listen on a specific port. */
const port = 5000 // if  the Port  is  undefined, use port 5000

const start = async () => {
  try {
     await getConnection()
    // await sqlPool.connect()

    // const db = await dbConnection(process.env.MONGO_URI)
  } catch (error) {
    console.log('connection Failed Error!', error)
  }
  app.listen(port, () => {
    console.log(`listening on  port ${port}`)
  })
}
start()
