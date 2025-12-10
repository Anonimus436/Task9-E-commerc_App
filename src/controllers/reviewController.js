const Review = require("../models/Review");
const Product = require("../models/Product");
const User = require("../models/User");
const uploadToCloudinary = require("../utils/cloudinary");

class ReviewController {

uploadLocalByMulter = async (req, res) => {
    if (!req.file) {
        throw new Error("You Must Select file");
    }

    const fileUrl = `${req.protocol}://${req.get('host')}/${req.file.path.replace('uploads/', '')}`;

    return res.json({ 
            success: true,
            path: fileUrl
        });
};

addReviewWithImagesByMulter = async (req, res) => {
    const imageUrl1 = await uploadLocalByMulter(req, res);
    const { rating, comment, productId, userId } = req.body; 
    const { id } = req.params; 
   const userReview = await User.findById(userId)
    const product = await Product.findById(id);
    if (!product) {
        return res.status(400).json({ Success: false, message: 'Product not found' });
    }

    const review = await Review.create({
        rating,
        comment,
        product: productId,
        user: userReview._id ,
        images : [imageUrl1] 
    });

    res.status(201).json({ Success: true, review });
};


uploadCloudByCloudinary = async (req, res) => {
    if (!req.file) {
        throw new Error("File Must be uploaded");
    }

    const path = await uploadToCloudinary(req.file);
    return path;
};


addReviewWithimagesByCloudinary = async (req, res) => {
    const imageUrl = await uploadCloudByCloudinary(req, res);
    const { rating, comment, productId, userId } = req.body; 
    const { id } = req.params; 
   const userReview = await User.findById(userId)
    const product = await Product.findById(id);
    if (!product) {
        return res.status(400).json({ Success: false, message: 'Product not found' });
    }

    const review = await Review.create({
        rating,
        comment,
        product: productId,
        user: userReview._id ,
        images : [imageUrl] 
    });

    res.status(201).json({ Success: true, review });
};


getProductReview = async (req, res) => {
    const { id: productId } = req.params; 

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: null });
        }

        const reviews = await Review.find({ product: productId })

        return res.status(200).json({
            success: true,
            productId,
            reviews,
        });
};


updateProductReview = async (req, res) => {
    const { id } = req.params;
    const { rating, comment, userId } = req.body;

    const userReview = await User.findById(userId);
        if (!userReview) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const review = await Review.findById(reviewId);
        if (!review) {
            return res.status(404).json({ success: false, message: 'Review not found' });
        }

        const updatedReview = await Review.findByIdAndUpdate(
            id ,
            { rating, comment, user: userReview._id },
            { new: true }
        );

        res.status(200).json({ success: true, review: updatedReview });

};


deleteReview = async (req , res) => {
const {id} = req.params ;
const removeReview = await Review.findByIdAndDelete(id)
return res.status(200).json({Success : true , data : removeReview})
}

}
module.exports = new ReviewController() ;