const router = require('express').Router();
const user = require('../models/user');
const verifyToken = require("../middlewares/verify-token");

const jwt = require('jsonwebtoken');

/*Registracijska ruta */
router.post('/auth/signup', async (req, res) =>{
    if (!req.body.email || !req.body.password){
        res.json({success: false, message: "Unesi lozinku i email"});
    }else {
        try{
            let newUser = new user();
            newUser.name=req.body.name;
            newUser.email=req.body.email;
            newUser.password=req.body.password
            await newUser.save()
            let token = jwt.sign(newUser.toJSON(), process.env.SECRET,{
                expiresIn: 604800
            });
            res.json({
                success: true,
                token: token,
                message: "Uspjesno napravljen novi korisnik"
            })
        }catch (err) { 
            res.status(500).json({
                success: false,
                message: err.message
            });

        }
    }

});

/*Profil*/
router.get("/auth/user", verifyToken, async (req, res) =>{
    try{
        let foundUser = await user.findOne({_id: req.decoded._id});
        if(foundUser){
            res.json({
                success: true,
                user: foundUser
            })
        }
    } catch (err){
        res.status(500).json({
            success: false,
            message: err.message
        });

    }
})

/* Ažuriraj profil */
router.put("/auth/user", verifyToken, async (req, res) => {
    try {
      let foundUser = await user.findOne({ _id: req.decoded._id });
  
      if (foundUser) {
        if (req.body.name) foundUser.name = req.body.name;
        if (req.body.email) foundUser.email = req.body.email;
        if (req.body.password) foundUser.password = req.body.password;
  
        await foundUser.save();
  
        res.json({
          success: true,
          message: "Successfully updated"
        });
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message
      });
    }
  });

/*Login ruta */
router.post("/auth/login", async (req, res) =>{
    try{
        let foundUser = await user.findOne({email: req.body.email});
        if(!foundUser){
            res.status(403).json({
                success: false,
                message: "Autentikacija neuspješna, user nije pronađen"
            })
        }else {
            if(foundUser.comparePassword(req.body.password)) {
                let token = jwt.sign(foundUser.toJSON(), process.env.SECRET, {
                    expiresIn: 604800
                })

                res.json({success: true, token: token});
            }else {
                res.status(403).json({
                    success: false,
                    message: "Neuspješna autentikacija, netočna lozinka"
                })
            }
        }

    }catch (err){
        res.status(500).json({
            success: false,
            message: err.message
        });

    }
})



module.exports = router;