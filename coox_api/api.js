//api.js 
//const hostname = process.env.HOST; //add later when in prod mode
var PORT          = process.env.PORT || 3005; //local or remote 

// var createError   = require('http-errors');  //to handle http errors
const express     = require('express');
const BodyParser  = require('body-parser');
var cors = require("cors");

var app = express();


var indexRouter = require('./index');
var usersRouter = require('./users');
var userItemRouter = require('./userItem');
var loginRouter = require('./login');
var signupRouter = require('./signup');
var postsRouter = require('./posts');
var postItemRouter = require('./postItem');
// var addPostRouter = require('./addPost');
var postCommentsRouter = require('./postComments');
var postCommentItemRouter = require('./postCommentItem');
var messagesRouter = require('./messages');
var messageItemRouter = require('./messageItem');

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
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/userItem', userItemRouter);
app.use('/posts', postsRouter);
app.use('/postItem', postItemRouter);
// app.use('/addPost', addPostRouter);
app.use('/postComments', postCommentsRouter);
app.use('/postCommentItem', postCommentItemRouter);
app.use('/messages', messagesRouter);
app.use('/messageItem', messageItemRouter);

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//     next(createError(404));
// });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

module.exports = app;