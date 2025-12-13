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
    const { rating, comment } = req.body; 

    const review = await Review.create({
        rating,
        comment,
        images : [imageUrl1] 
    });

    res.status(201).json({ Success: true, review });
};

async addUserReview(req , res){
    const{id} = req.params ;
    const checkUserReview = await Review.findById(id);
    if(!checkUserReview){
        return res.status(201).json({Success : false , data : null})
    }
    const {userId , productId} = req.body ;
    checkUserReview.user = [...checkUserReview.user , userId]
    checkUserReview.product = [...checkUserReview.product , productId]
    await checkUserReview.save();
    return res.status(201).json({Success : true , data : checkUserReview})
}


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
    const { rating, comment } = req.body;

        const review = await Review.findById(reviewId);
        if (!review) {
            return res.status(404).json({ success: false, message: 'Review not found' });
        }

        const updatedReview = await Review.findByIdAndUpdate(
            id ,
            { rating, comment},
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