const express = require('express');
const router = express.Router();
const html = require('html-template-tag')
const fs = require('fs')
global.XMLHttpRequest = require('xhr2')

require('dotenv').config()

const firebase = require('firebase');
require('firebase/storage')
// require('firebase/auth');
// require('firebase/database');



// Initialize Firebase
// TODO: Replace with your project's customized code snippet
const config = {
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: 'comic-server.firebaseapp.com',
  databaseURL: 'https://comic-server.firebaseio.com',
  storageBucket: 'comic-server.appspot.com',
};
firebase.initializeApp(config);

// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = firebase.storage();

// Create a storage reference from our storage service
const storageRef = storage.ref();

// Create a child reference
const imagesRef = storageRef.child('images'); // imagesRef now points to 'images'

// Child references can also take paths delimited by '/'
const boomRef = storageRef.child('images/boom.svg');
// spaceRef now points to "images/space.jpg"
// imagesRef still points to "images"


/* GET home page. */
router.get('/', function(req, res, next) {
  res.send(html`
  <h1>Hello!</h1>
  <form method='post'>
  <input type='file' id='file' name='file' />
  <button type='submit'>Upload</button>
  </form>
  `);
});

router.post('/', async (req, res, next) => {
  try {
    const {data} = req.body
    // console.log("hhiiiii", req.body)
    console.log("req.body.data: ", data);
    console.log("typeof: ", typeof data);
    storageRef.child('mountains2.mov').put(data, { contentType: data.type }).then(() => console.log('this worked! :*')).catch((e) => console.log('oh no!!! :(', e))

    // let blob = new Blob([req.body.imageBinary], {type: 'image/svg+xml;charset=utf-8'})
    // boomRef.put(blob).then(function(snapshot){
    //   console.log("uploaded", snapshot)
    // })
    res.send("hello")
  } catch (err) {
    console.log("ERROR: ", err)
    next(err)
  }
 
 
  
})

module.exports = router;
