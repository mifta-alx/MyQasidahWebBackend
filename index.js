const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Routes = require("./Routes/Routes.js");
const cookieParser = require("cookie-parser");
require('dotenv').config();

let app = express();
app.use(cookieParser());
app.use(cors());
app.use(express.json());
// 'mongodb://localhost:27017/db_qasidah'
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
});
const db = mongoose.connection;
db.on('err', (err) => console.log(err))
db.once('open', ()=> console.log('Database Connected...'))
    
const port = 3001;
app.listen(process.env.PORT || port, () => {
    console.log(`Example app listening on port ${port}`);
});

app.use(Routes);