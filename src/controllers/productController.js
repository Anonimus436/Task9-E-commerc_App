const Product = require("../models/Product");
const Category = require("../models/Category")
const uploadToCloudinary = require("../utils/cloudinary");

class ProductsController {
    async showAll(req, res) {
       
            const products = await Product.find();

            return res.status(200).json({
                success: true,
                data: products
            });

    }


    async showAllCategory(req, res) {
            const findcategory = await Category.find();

            return res.status(200).json({
                success: true,
                data: findcategory
            });
    }


    async showById(req, res) {
            const { id } = req.params;

            const products = await Product.findById(id);

            return res.status(200).json({
                success: true,
                data: products
            });
    }


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

async addProductWithImageByMulter(req, res) {

        const imageUrl = await uploadLocalByMulter(req, res);

        const { name, description, price, features, brand, numReviews } = req.body;

        const product = await Product.create({ 
            name, 
            description, 
            price, 
            images: [imageUrl], 
            features, 
            brand, 
            numReviews 
        });

        return res.status(201).json({
            success: true,
            data: product
        });
}
   

 uploadCloudByCloudinary = async (req, res) => {
    if (!req.file) {
        throw new Error("File Must be uploaded");
    }

    const path = await uploadToCloudinary(req.file);
    return path;
};

async addProductWithImageByCloudinary(req, res) {
        const imageUrl = await uploadCloudByCloudinary(req, res);

        const { name, description, price, features, brand, numReviews } = req.body;

        const product = await Product.create({
            name,
            description,
            price,
            images: [imageUrl], 
            features,
            brand,
            numReviews
        });

        return res.status(201).json({
            success: true,
            data: product
        });
}


    async update(req, res) {
            const { id } = req.params;

            const  { name, description , price, images , features , brand , numReviews } = req.body;

            const products = await Product.findById(id);

            if(!products) {
                return res.status(404).json({
                    success: false,
                    data: null,
                });
            }

            const newProduct = await Product.findByIdAndUpdate(
                id, 
                { name, description , price, images , features , brand , numReviews},
                { new: true }
            );

            return res.status(201).json({
                success: true,
                data: newBook
            });
    }

    async remove(req, res) {
            const { id } = req.params;

            const products = await Product.findById(id);

            if(!products) {
                return res.status(404).json({
                    success: false,
                    data: null,
                });
            }

            const deleted = await Product.findByIdAndDelete(id, { new: true });

            return res.status(200).json({
                success: true,
                data: deleted,
            });
    }

}

module.exports = new ProductsController();