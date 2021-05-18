const router = require("express").Router();
const Category = require('../models/category');



router.post('/categories', async (req, res) =>{
    try{
        const category = new Category();
        category.type = req.body.type;

        await category.save();

        res.json({
            success: true,
            message: "Uspjesno napravljena nova kategorija"
        });

    } catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        });

    }
});

router.get("/categories", async (req, res) =>{
    try{
        let categories = await Category.find();
        res.json({
            success: true,
            categories: categories
        });
    } catch (err){
        res.status(500).json({
            success: false,
            message: err.message
        });

    }
})

module.exports = router;