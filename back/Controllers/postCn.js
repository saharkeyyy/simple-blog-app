import Post from "../Models/postModel.js";
import ApiFeatures from "../Utils/Apifeatures.js";
import { catchAsync } from "../Utils/catchAsync.js";
import HandleERROR from "../Utils/HandleError.js";

// Add a new post
export const addPost = catchAsync(async (req, res, next) => {
    const { title, summary, content, author } = req.body;

    // Handle file upload
    let image = '';
    if (req.file) {
        image = '/uploads/' + req.file.filename;
    } else {
        return next(new HandleERROR("No image uploaded", 400));
    }

    if (!title || !summary || !content || !author) {
        return next(new HandleERROR("Missing fields", 400));
    }

    const aPost = await Post.create({
        title,
        summary,
        content,
        author,
        image,
    });

    res.status(201).json({
        success: true,
        message: "POST created",
        data: aPost,
    });
});

// Get all posts
export const getAllPosta = catchAsync(async (req, res, next) => {
    const features = new ApiFeatures(Post.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
    
        const posts = await features.query.populate('author', 'username'); // Populating author's username

    res.status(200).json({
        status: 200,
        data: posts,
    });

});
// Get a single post by ID
export const getPostById = catchAsync(async (req, res, next) => {
    const {id: postId } = req.params; // Use postId to match the router
    // const posts = await features.query.populate('author', 'username');
    // Find the post by its ID and populate the author field
    const post = await Post.findById(postId)

    if (!post) {
        return next(new HandleERROR("Post not found", 404));
    }

    res.status(200).json({
        success: true,
        data: post,
    });
});



// Update a post
export const updatePost = catchAsync(async (req, res, next) => {
    const { title, summary, content } = req.body;
    let image = '';

    // If a new image is uploaded, update the image
    if (req.file) {
        image = '/uploads/' + req.file.filename;
    } else {
        image = req.body.image; // Retain old image if no new image is provided
    }

    const post = await Post.findByIdAndUpdate(
        req.params.id,
        { title, summary, content, image },
        { new: true, runValidators: true }
    );

    if (!post) {
        return next(new HandleERROR("No post found with that ID", 404));
    }

    res.status(200).json({
        success: true,
        message: "POST updated successfully",
        data: post,
    });
});
// Delete a post
export const deletePost = catchAsync(async (req, res, next) => {
    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post) {
        return next(new HandleERROR("No post found with that ID", 404));
    }

    res.status(204).json({
        success: true,
        message: "POST deleted successfully",
        data: null,
    });
});
