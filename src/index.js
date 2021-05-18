const express = require('express');
const cors = require('cors'); // ovo sluzi da bi mogao komunucirati s frontendom na drugom portu
const  morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/user.js');


dotenv.config();



const app = express()  // instanciranje aplikacije
const port = 3000 // port na kojem će web server slušati

mongoose.connect(
process.env.DATABASE, 
{useNewUrlParser: true, useUnifiedTopology: true},


err => {
    if(err){
        console.log(err);
    } else {
        console.log("Povezan na bazu");
    }
}
);


app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const productRoutes = require("./routes/product");
const categoryRoutes = require("./routes/category");
const userRoutes = require("./routes/auth");

app.use("/api", productRoutes);
app.use("/api", categoryRoutes);
app.use("/api", userRoutes);


//Okvirne rute koje će vjerojatno biti osjetno drugačije
app.get('/', (req, res) => {  
    res.json({ }); //transport, da preko stringa mozemo prebacivati komplicirane js objekte!!
});

app.post('/', (req, res) => {  
    let user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;

    user.save(err =>{
        if(err) {
            res.json(err);
        } else{
            res.json('uspjesno spremljeno')
        }
    });
});










app.listen(port, () => console.log(`\n\n[DONE] Backend se vrti na http://localhost:${port}/\n\n`));