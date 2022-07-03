require('dotenv').config()
const express = require('express')
const axios = require('axios')
const app = express()
const cors = require('cors')
// If you're here and you like writing routes, feel free to add some of your own! Get creative with what the itunes API can serve back by visiting their documentation:
// https://affiliate.itunes.apple.com/resources/documentation/itunes-store-web-service-search-api/

app.use(cors())

app.get('/', (req, res) => {
    res.status(200).send('Please use /search/:term to search for all music, /album/:artistId to search for all albums by artist, or /song/:albumId to search for all songs by an album id')
})

app.get('/search/:term', async (req, res) => {
    // searches for all music
   //  console.log(req.params.term);
    let response = await axios.get(`https://itunes.apple.com/search?term=${req.params.term}`)
    res.status(200).send(response.data)
})

app.get('/album/:artistId', async (req, res) => {
    // searches for all albums by artist, feed itunes artistId into params
   //  console.log(req.params.artistId);
    let response = await axios.get(`https://itunes.apple.com/lookup?id=${req.params.artistId}&entity=album`)
    res.status(200).send(response.data)
})

app.get('/song/:albumId', async (req, res) => {
    // searches for all songs by album
   //  console.log(req.params.albumId);
    let response = await axios.get(`https://itunes.apple.com/lookup?id=${req.params.albumId}&entity=song`)
    res.status(200).send(response.data)
})

app.get('*', (req, res) => {
    res.status(404).send('404: Not Found')
})

app.listen(process.env.PORT || 4444, () => console.log(`Listening on ${process.env.PORT || 4444}`))