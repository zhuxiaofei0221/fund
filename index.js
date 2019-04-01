const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoUri = require('./config/config').mongoUri;
const user = require('./routes/api/user');
const profile = require('./routes/api/profile');

//使用body-parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//链接mongoDB
mongoose.connect(mongoUri).then(()=>console.log('mongoDB connected')).catch(err=>console.log(err));

//初始化passport
app.use(passport.initialize());
require('./config/passport')(passport);

//使用routes
app.use('/api/user',user);
app.use('/api/profile',profile);

const port = process.env.PORT || 5000;
app.listen(5000,() => {console.log(`sever is running on port ${port}`)});