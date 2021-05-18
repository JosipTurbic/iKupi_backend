const router = require("express").Router();
const Product = require('../models/product');
const upload = require('../middlewares/upload-photo');


//POST- dodaj novi proizvod
router.post("/products", upload.single("photo"), async (req,res) =>{
    try{
        let product = new Product();
        product.categoryID = req.body.categoryID;
        product.title = req.body.title;
        product.description = req.body.description;
        product.photo = req.file.location;
        product.price = req.body.price;

        await product.save();

        res.json({
            status: true,
            message: "Uspjesno spremljeno"
        });

    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        });

    }
});


//GET- dobiti sve proizvode

router.get("/products", async (req, res) =>{
    try{
        let products = await Product.find().populate("category").exec();
        res.json({
            success: true,
            products: products
        });
    } catch (err){
        res.status(500).json({
            success: false,
            message: err.message
        });

    }
})


//GET- dobiti samo jedan proizvod

router.get("/products/:id", async (req, res) =>{
    try{
        let product = await Product.findOne({_id: req.params.id}).populate('category').exec();
        res.json({
            success: true,
            product: product
        });
    } catch (err){
        res.status(500).json({
            success: false,
            message: err.message
        });

    }
})

//PUT- izmijeni proizvod

router.put("/products/:id", upload.single("photo"), async (req, res) =>{
    try{
        let product = await Product.findOneAndUpdate({_id: req.params.id}, {
            $set: {
                title: req.body.title,
                price: req.body.price,
                category: req.body.categoryID,
                photo: req.file.location,
                description: req.body.description
            }
        },
        {upsert: true}

        );

        res.json({
            success: true,
            updatedProduct: product
        });


    } catch (err){
        res.status(500).json({
            success: false,
            message: err.message
        });

    }
})

//DELETE- obrisi jedan proizvod

router.delete("/products/:id", async (req, res) =>{
    try{
        let deletedProduct = await Product.findOneAndDelete({ _id: req.params.id});

        if (deletedProduct){
            res.json({
                status: true,
                message: "Uspjesno obrisano"
            });
        }
       
    } catch (err){
        res.status(500).json({
            success: false,
            message: err.message
        });

    }
})

module.exports = router;