const express=require('express')
const app = express()
const http=require('http')
const socketIo=require('socket.io')
const path=require('path')


app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname,'public')))

const server=http.createServer(app)

const io=socketIo(server)

io.on('connection',(socket)=>{
    socket.on('send-location',(data)=>{
        io.emit('recevied-location',{id: socket.id, ...data})
    })
    console.log('connected')
    socket.on('disconnect',()=>{
    console.log('disconnect')

        io.emit('user-disconnected', socket.id)
    })
})

app.get('/',(req,res)=>{
    res.render('index')
})

// io.on('connection')


server.listen(3000,()=>{
    console.log('port is on the listen 3000')
})