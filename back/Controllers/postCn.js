import Post from "../Models/postModel.js";
import ApiFeatures from "../Utils/Apifeatures.js";
import { catchAsync } from "../Utils/catchAsync.js";
import HandleERROR from "../Utils/HandleError.js";
import adminCheck from "../middleware/adminCheck.js";

// Add a new post with file upload handling
export const addPost = catchAsync(async (req, res, next) => {
    const { title, summary, content, author, userId } = req.body;

    // If there's an uploaded file, use the filename
    let image = '';
    if (req.file) {
        image = '/uploads/' + req.file.filename;
    } else {
        return next(new HandleERROR("No image uploaded", 400));
    }

    // Check if all required fields are provided
    if (!title || !summary || !content || !author) {
        return next(new HandleERROR("Missing fields", 400));
    }

    // Create a new post
    const aPost = await Post.create({
        title,
        summary,
        content,
        author,
        userId,
        image,
    });

    res.status(201).json({
        success: true,
        message: "POST created",
        data: aPost,
    });
});

// Update an existing post
export const updatePost = catchAsync(async (req, res, next) => {
    const { postId } = req.params;

    const postUp = await Post.findByIdAndUpdate(postId, req.body, {
        new: true,
    });

    res.status(201).json({
        success: true,
        message: "Post updated",
        data: postUp,
    });
});

// Get all posts by admin check
export const getAllPosta = catchAsync(async (req, res, next) => {
    // const isAdmin = adminCheck(req.headers.authorization);
    // if (!isAdmin) {
    //     return next(new HandleERROR("You are not authorized to perform this", 401));
    // }

    const features = new ApiFeatures(Post, req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
    const posts = await features.query;
    res.status(200).json({ status: 200, data: posts });
});
