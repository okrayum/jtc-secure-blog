// controllers/posts.js
const { default: mongoose } = require("mongoose");
const Post = require("../models/post");
const User = require("../models/user");

// Class definition for the PostController
class PostController {
    // Method for creating a new post
    static async CreatePost(req, res, next) {
        try {
            // Destructuring title and description from the request body
            const { title, description } = req.body;

            // Checking if title or description is missing
            if (!title || !description) return res.status(400).json("Please provide title and description");

            // Creating a new post with the provided title, user ID, and description
            const post = await Post.create({
                title,
                userId: req.user.id,
                description,
            });

            // Sending a success response with the created post
            res.status(200).json(post);
        } catch (error) {
            // Logging the error and passing it to the error handling middleware
            console.log(error);
            next(error);
        }
    }

    // Method for deleting a post by its ID
    static async DeletePostById(req, res, next) {
        try {
            // Extracting the post ID from the request parameters
            const postId = req.params.id;
            const postToDelete = await Post.findById(postId);

            // Implement deletion logic here
            if (!postToDelete) return res.status(404).json({ message: "Please select a valid post for deletion"});


            await Post.findByIdAndDelete(postId);

            
            // Sending a success response after successful deletion
            res.status(200).json({ message: 'Post deleted successfully' });
        } catch (error) {
            // Logging the error and passing it to the error handling middleware
            console.log(error);
            next(error);
        }
    }

    // Method for updating a post by its ID
    static async UpdatePost(req, res, next) {
        try {
            // Extracting the post ID from the request parameters
            const postId = req.params.id;
            const postToUpdate = Post.findById(postId);

            if (!postToUpdate) return res.status(404).json({ message: "Please select a valid post to update"});

            // Implement update logic here
            const { title, description } = req.body;

            await Post.findByIdAndUpdate(postId,{
                title,
                description,
            });

            // Sending a success response after successful update
            res.status(200).json({ message: 'Post updated successfully'});
        } catch (error) {
            // Logging the error and passing it to the error handling middleware
            console.log(error);
            next(error);
        }
    }

    // Method for getting a post by its ID
    static async GetPostById(req, res, next) {
        try {
            // Extracting the post ID from the request parameters
            const postId = req.params.id;
            
            // Implement retrieval logic here
            const postToGet = await Post.findById(postId)
            if (!postToGet) return res.status(404).json({ message: "Post not found"});

           
            // Sending a success response with the retrieved post
            res.status(200).json({ message: 'Retrieved post by ID', post: postToGet});
        } catch (error) {
            // Logging the error and passing it to the error handling middleware
            console.log(error);
            next(error);
        }
    }

    // Method for getting posts by a user's ID
    static async GetPostByUserId(req, res, next) {
        try {
            // Extracting the user ID from the request parameters
            const userId = req.params.userId;
            const user = await User.findById(userId);

            // Implement retrieval logic here
            if (!user) return res.status(404).json({message: "No user or posts found"});
            const usersPosts = await Post.find({userId: userId});

            // Sending a success response with the retrieved posts
            res.status(200).json({ message: 'Retrieved posts by user ID', posts: usersPosts });
        } catch (error) {
            // Logging the error and passing it to the error handling middleware
            console.log(error);
            next(error);
        }
    }
}

// Exporting the PostController class to be used by other modules
module.exports = PostController;