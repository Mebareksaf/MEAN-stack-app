const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const Post = require('./models/post');

const app = express();
//connecting mongoDb to our backend
mongoose.connect("//the string copied from the cloud mongoDB")
.then(() => {
  console.log('Connected to Database!')
})
.catch(() => {
  console.log('Connection FAILED!')
});

//  app.use((req, res, next) => {
//    console.log("first middleware!");
//    next();
//  });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// combining the angular server with the node server
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "*"
    );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
    );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
    );
  next();
});

// adding posts to our database||our backend, POST method
app.post((req, res, next) => {
  const post = new Post({
    title = req.body.title,
    content = req.body.content
  });
  post.save();
  //console.log(post);
  res.status(201).json({
    message: 'Post Added Successfully!'
  });
});

// fetching posts from our backend, GET method
app.get('/api/posts',(req, res, next) => {
  Post.find().then(documents => {
    res.status(200).json({
      message: 'Posts Fetched Successfully!',
      posts: posts
    });
  });
  //res.send("Hello from Express");
  /*const posts = [
    {id:'id1',
     title: 'First Server-side post',
     content: 'coming from the server'
    },
    {id:'id2',
     title: 'Second Server-side post',
     content: 'coming from the server second'
    }
  ];*/

 });

module.exports = app;
