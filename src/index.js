// 
// const express = require('express');
// const cors = require('cors');
// const mongoose = require("mongoose");

//
// const URL = process.env.URL;

// const app = express();

// app.use(
//   cors({
//     origin: true,
//     credentials:true
//   })
// );

// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());


// const mongoConnect = () => {
//   mongoose.set("strictQuery", false);
//   mongoose.connect(URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   }).then(
//     () => {
//       console.log("Connected to MongoDB");
//     }
//   ).catch(error => {
//     console.error("Error connecting to MongoDB:", error);
//   });
// };

// app.listen(PORT, async () => {
//   await mongoConnect();
//   console.log(`Server running at http://localhost:${PORT}`);
// });


const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require("dotenv").config();
const cors = require('cors');
const URL = process.env.URL;
const PORT = process.env.PORT || 8080;

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true });

// Post schema
const postSchema = new mongoose.Schema({
    title: String,
    shortDescription: String,
    content: String,
    image: String,
});

const Post = mongoose.model('Post', postSchema);

// API Endpoints

// Get all posts
app.get('/posts', async (req, res) => {
    const posts = await Post.find({});
    res.json(posts);
});

// Get a single post by ID
app.get('/posts/:id', async (req, res) => {
    const post = await Post.findById(req.params.id);
    res.json(post);
});

// Create a new post
app.post('/posts', async (req, res) => {
    const newPost = new Post(req.body);
    await newPost.save();
    res.json(newPost);
});

// Update a post by ID
app.put('/posts/:id', async (req, res) => {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedPost);
});

// Delete a post by ID
app.delete('/posts/:id', async (req, res) => {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: 'Post deleted' });
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
