//api.js 
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, './.env') });
connectDb = require('./models/index.js');
var cron = require('node-cron');
const PORT = process.env.PORT || 3005;

//const hostname = process.env.HOST; //add later when in prod mode
// var createError   = require('http-errors');  //to handle http errors
const express     = require('express');
var cors = require("cors");
var app = express();


var indexRouter = require('./routes/index');
var fansRouter = require('./routes/fans');
var usersRouter = require('./routes/users');
var userDataRouter = require('./routes/userData');
var popularUsersRouter = require('./routes/popularUsers');
var userItemRouter = require('./routes/userItem');
var loginRouter = require('./routes/login');
var signupRouter = require('./routes/signup');
var publicPostsRouter = require('./routes/publicPosts');
var postsRouter = require('./routes/posts');
var searchPostsRouter = require('./routes/searchPosts');
var postItemRouter = require('./routes/postItem');
var postcommentsRouter = require('./routes/postcomments');
var postcommentItemRouter = require('./routes/postcommentItem');



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(function (req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

app.use('/', indexRouter);
app.use('/fans', fansRouter);
app.use('/users', usersRouter);
app.use('/userData', userDataRouter);
app.use('/popularUsers', popularUsersRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/userItem', userItemRouter);
app.use('/posts', postsRouter);
app.use('/publicPosts', publicPostsRouter);
app.use('/searchPosts', searchPostsRouter);
app.use('/postItem', postItemRouter);
app.use('/postcomments', postcommentsRouter);
app.use('/postcommentItem', postcommentItemRouter);


// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//     next(createError(404));
// });


//for handling background jobs
// cron.schedule('* * * * *', () => {
//     console.log('running a task every minute');
// });

connectDb().then(async () => {
 
    try {
        await app.listen(PORT, () =>
            console.log(`Coox app listening on port ${PORT}!`),
        );
    } catch(e) {
        console.log('Catch an error: ', e);
    }
});

module.exports = app;