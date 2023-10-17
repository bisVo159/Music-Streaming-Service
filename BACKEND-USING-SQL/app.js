// npm i express
// npm i mysql
// npm i dotenv
// npm i --save-dev nodemon
// node app.js -> to run
// after     "start": "nodemon app.js" script npn start

require('dotenv').config(); 

const express=require('express')
const bodyParser = require('body-parser');

const cors=require('cors')

const app=express()

const userRouter=require('./api/users/user.router')
const artistRouter=require('./api/artists/artist.router')
const songRouter=require('./api/songs/song.router')
const playlistRouter=require('./api/Playlists/playlist.router')
const playlistSongsRouter=require('./api/playlistSongs/playlistSong.router')

app.use(express.json())
app.use(cors())

app.get('/api',(req,res)=>{
    res.json({
        success:true,
        message:"This is rest apis working"
    })
})

app.use('/api/users', userRouter);
app.use('/api/artists', artistRouter);
app.use('/api/songs', songRouter);
app.use('/api/playlists', playlistRouter);
app.use('/api/playlistSongs', playlistSongsRouter);

const port = process.env.APP_PORT || 3000;

app.listen(port,()=>{
    console.log("Server up and running on PORT: ",port)
})