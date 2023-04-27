require("dotenv").config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const userRoutes = require('./routes/user.js');
const dataRoutes = require('./routes/data-access.js')

app.use(cors());
app.use(express.json());

app.use('/api/user', userRoutes);
app.use('/api/data-access' , dataRoutes);


  
const port = process.env.TOKEN_SERVER_PORT;

app.listen(port, () =>{
    console.log(`Authorization Server running on ${port} listening`);
})


