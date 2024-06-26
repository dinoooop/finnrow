import { bc } from '../helpers/bc.js';
import Post from '../models/post.js';

export const index = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).send(error.toString());
  }
};

export const show = async (req, res) => {
  try {
    const userId = req.userId;
    const postId = req.params.id;
    const post = await Post.findOne({ _id: postId }).populate('user')

    if (!post) {
      return res.status(404).json({ error: 'Not found' });
    }

    res.json(post);
  } catch (error) {
    res.status(500).send(error.toString());
  }
};

export const store = async (req, res) => {

  const file = req.file;
  const url = (file)? await bc.uploadToS3(file) : '';
  
  try {
    const newPost = new Post({
      title: req.body.title,
      content: req.body.content,
      user: req.userId,
      cover: url
    });
    
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    console.log(error);
    res.status(400).send(error.toString());
  }
};

export const update = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const updatedPost = await Post.findByIdAndUpdate(id, { title, content }, { new: true });
    if (!updatedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(updatedPost);
  } catch (error) {
    res.status(400).send(error.toString());
  }
};

export const destroy = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPost = await Post.findByIdAndDelete(id);
    if (!deletedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(deletedPost);
  } catch (error) {
    res.status(400).send(error.toString());
  }
};