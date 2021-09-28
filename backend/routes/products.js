const express = require("express");
const mongoose = require("mongoose");
const multer = require('multer');

const { Product } = require("../models/product");
const { Category } = require("../models/category");

const router = express.Router();

// Multer parameters

// MIME type for file
const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg',
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE_MAP[file.mimetype];
        let uploadError = new Error('invalid image type');
        if (isValid) { uploadError = null; }
        cb(uploadError, 'public/uploads')
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname.replace(' ', '-');
        const extension = FILE_TYPE_MAP[file.mimetype];
        cb(null, `${fileName}-${Date.now()}.${extension}`)
    }
})

const uploadOptions = multer({ storage: storage })


router.get(`/`, async (req, res) => {
    let filter = {};
    if (req.query.categories) {
        filter = { category: req.query.categories.split(",") }
    }
    const productList = await Product.find(filter).populate('category');
    if (!productList) {
        res.status(500).json({ success: false })
    }
    res.status(200).json(productList)
})

router.get(`/:id`, async (req, res) => {
    const product = await Product.findById(req.params.id).populate('category')
    if (!product) {
        res.status(500).json({ success: false })
    }
    res.status(200).json(product)
})

router.post(`/`, uploadOptions.single('image'), async (req, res) => {
    const category = await Category.findById(req.body.category)
    if (!category) {
        return res.status(400).send('Invalid category!');
    }
    const file = req.file;
    if (!file) return res.status(400).send('No image in the request!');
    const fileName = req.file.filename; // provided by multer
    const basePath = `${req.protocol}://${req.get('host')}/public/upload/`;

    let product = new Product({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: `${basePath}${filename}`, // http://localhost:3000/public/upload/image-234423
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
    })
    product = await product.save();
    if (!product) {
        return res.status(500).send('The product cannot be created!')
    }
    res.send(product)
})

router.put(`/:id`, uploadOptions.single('image'), async (req, res) => {

    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).send('Invalid product ID!')

    const category = await Category.findById(req.body.category)
    if (!category) return res.status(400).send('Invalid category!');

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(400).send('Invalid product!')

    const file = req.file;
    let imagesPath;
    if (file) {
        const filename = file.fileName;
        const basePath = `${req.protocol}://${req.get('host')}/public/uploads`;
        imagesPath = `${basePath}${filename}`;
    } else {
        imagesPath = product.image;
    }


    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: imagesPath,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
    },
        {
            new: true
        }
    )
    if (!updatedProduct) {
        return res.status(404).send('Cannot be updated!');
    }
    res.send(updatedProduct);
})

router.delete(`/:id`, (req, res) => {
    Product.findByIdAndRemove(req.params.id)
        .then((product) => {
            if (product) {
                return res.status(200).json({ success: true, message: 'Product deleted!' })
            } else {
                return res.status(404).json({ success: false, message: 'Product not found!' })
            }
        })
        .catch(err => {
            return res.status(400).json({ success: false, error: err })
        })
})


router.get(`/get/count`, async (req, res) => {
    const productCount = await Product.countDocuments()
    if (!productCount) {
        res.status(500).json({ success: false })
    }
    res.status(200).json({ productCount: productCount })
})


router.get(`/get/featured/:count`, async (req, res) => {
    const count = req.params.count ? req.params.count : 0;
    const products = await Product.find({ isFeatured: true }).limit(+count);
    if (!products) {
        res.status(500).json({ success: false })
    }
    res.send(products)
})


router.put('/gallery-images/:id', uploadOptions.array('images', 10), async (req, res) => {

    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).send('Invalid product ID!')

    const files = req.files;
    let imagesPaths = [];
    const basePath = `${req.protocol}://${req.get('host')}/public/upload/`;
    if (files) {
        files.map(file => {
            imagesPaths.push(`${basePath}${file.fileName}`);
        })
    }

    const product = await Product.findByIdAndUpdate(
        req.params.id, {
        image: imagesPath,
    },
        {
            new: true
        }
    )
    if (!product) {
        return res.status(500).send('Cannot be updated!');
    }
    res.send(product);

})

module.exports = router;
