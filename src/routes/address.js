const router = require("express").Router();
const Address = require("../models/address");
const User = require("../models/user");
const verifyToken = require("../middlewares/verify-token");
const axios = require("axios");
/*POST- napravi novu adresu*/ 
router.post("/addresses", verifyToken, async (req, res) => {
    try {
      let address = new Address();
      address.user = req.decoded._id;
      address.country = req.body.country;
      address.fullName = req.body.fullName;
      address.streetAddress = req.body.streetAddress;
      address.city = req.body.city;
      address.zupanija = req.body.zupanija;
      address.zipCode = req.body.zipCode;
      address.phoneNumber = req.body.phoneNumber;
  
      await address.save();
      res.json({
        success: true,
        message: "Uspjesno dodana adresa"
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message
      });
    }
  });
    /*GET- dobiti sve adrese */
router.get("/addresses", verifyToken, async (req, res) => {
    try{
    let addresses = await Address.find({user: req.decoded._id});

    res.json({
        success: true,
        addresses: addresses
    });
    } catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});
/*GET- dobiti listu država */
router.get("/countries", async (req, res) => {
    try{
        let response = await axios.get("https://restcountries.eu/rest/v2/all");
        res.json(response.data);

    } catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});

/*GET- dohvati jednu adresu */
router.get("/addresses/:id", verifyToken, async (req,res) => {
  try{
    let address = await Address.findOne({_id: req.params.id});
    res.json({
      success: true,
      address: address
    })

  } catch (err){
    res.status(500).json({
      success: false,
      message: err.message
  });
  }
})

/*PUT- uredi adresu */
router.put("/addresses/:id", verifyToken, async (req, res) =>{
  try{
    let foundAddress = await Address.findOne({_id: req.params.id});
    if(foundAddress){
      
     if(req.body.country) foundAddress.country = req.body.country;
     if(req.body.fullName) foundAddress.fullName = req.body.fullName;
     if(req.body.streetAddress) foundAddress.streetAddress = req.body.streetAddress;
     if(req.body.city) foundAddress.city = req.body.city;
     if(req.body.zupanija) foundAddress.zupanija = req.body.zupanija;
     if(req.body.zipCode) foundAddress.zipCode = req.body.zipCode;
     if(req.body.phoneNumber) foundAddress.phoneNumber = req.body.phoneNumber;

     await foundAddress.save();

     res.json({
       success: true,
       message: "Uspjesno azurirana adresa"
     });

    } 
  } catch(err){
    res.status(500).json({
      success: false,
      message: err.message
  });
  }
});
/*PUT- obriši adresu*/
router.delete("/addresses/:id", verifyToken, async (req,res)=>{
  try{
    let deletedAddress = await Address.remove({user: req.decoded._id, _id: req.params.id});

    if(deletedAddress){
      res.json({
        success: true,
        message:"Adresa je uspjesno obrisana"
      })
    }

  } catch(err){
    res.status(500).json({
      success: false,
      message: err.message
  });
  }
});
/* PUT- postavi zadanu adresu */
router.put("/addresses/set/default", verifyToken, async(req, res) => {
  try{
    const updatedAddress = await User.findOneAndUpdate({_id: req.decoded._id}, {$set: {address: req.body.id}});
    if(updatedAddress){
      res.json({
        success: true,
        message: "Uspjesno postavljena glavna adresa"
      })
    }

  } catch (err){
    res.status(500).json({
      success: false,
      message: err.message
  });
  }
})

module.exports = router;