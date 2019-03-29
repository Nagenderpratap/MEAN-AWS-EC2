var express = require('express');
var router = express.Router();
// var MongoClient = require('mongoose').MongoClient;
var mongoose = require('mongoose');

const ObjectID = require('mongodb').ObjectID;
var Book = require('../models/Book.js');
var passwordHash = require('password-hash');

// var multer = require('multer');
// var upload = multer({limits: {fileSize: 2000000 },dest:'/uploads/'}) 
 var  fs = require('fs');

//  var albumnSchema = new Schema({
//   name: String,
//   image: Buffer
// })

// const Albumn = mongoose.model('Albumn', albumnSchema);



mongoose.Promise = require('bluebird');


// Connect
const connection = (closure) => {
    return mongoose.connect('mongodb://localhost/first', {promiseLibrary: require('bluebird') },(err, db) => {
        if (err) return console.log(err);

        console.log("Databases created!");
        closure(db);
    });
};

// Error handling
const sendError = (err, res) => {
  response.status = 501;
  response.message = typeof err == 'object' ? err.message : err;
  res.status(501).json(response);
};

// Response handling
let response = {
  status: 200,
  data: [],
  message: null,
  statusCode : ' ',
};


// Get all books
router.get('/book', (req, res) => {
    connection((db) => {
        db.collection('india')
            .find()
            .toArray()
            .then((users) => {
                response.data = users;
                response.message = 'data coming';
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});


/* GET ALL BOOKS */
router.get('/api', function(req, res, next) {
  Book.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE BOOK BY ID */
// router.get('/:id', (req, res) => {
//     connection((db) => {
//         db.collection('india')
//             .findOne()
//             .toArray()
//             .then((users) => {
//                 response.data = users;
//                 res.json(response);
//             })
//             .catch((err) => {
//                 sendError(err, res);
//             });
//     });
// });


/* GET SINGLE BOOK BY ID */
router.get('/:id', function(req, res, next) {
  Book.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* Save Book */
router.post('/save', (req, res) => {
  var bindata = new Buffer((req.body.profile).split(",")[1],"base64");
 
  // var newImg = fs.readFileSync(req.body.profile);
  // var encImg = newImg.toString('base64');


  //  var base64d=req.body.profile.replace(/^data:image\/png;base64,/, "");

//    var newItem = {
//     img: Buffer(encImg, 'base64')
//  };
   console.log('picc'+bindata);
  // console.log('picc222--- encodeeee'+encImg);

    connection((db) => {
        db.collection('india')
            .insert({title: req.body.bookName, author: req.body.authorName, profile: bindata})
            .then((users) => {
                response.data = users;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});


/* SAVE BOOK */
router.post('/', function(req, res, next) {
  Book.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});


/* Update Book */
router.put('/updateBook/:id', (req, res) => {
  if(req.params != null)
    connection((db) => {
        db.collection('india')
            .findOneAndUpdate({_id: new ObjectID(req.params.id)},{ $set: {title: req.body.bookName, author: req.body.authorName}},{ upsert: true })
            .then((users) => {
                response.data = users;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

/* UPDATE BOOK */
router.put('/:id', function(req, res, next) {
  Book.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* Delete Book */
router.delete('/deleteBook/:id', (req, res) => {
  // if(req.params != null)
    connection((db) => {
        db.collection('india')
            .findOneAndDelete({_id: new ObjectID(req.params.id)})
            .then((users) => {
                response.data = users;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});


/* DELETE BOOK */
router.delete('/:id', function(req, res, next) {
  Book.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE USER  REGISTER */
router.post('/userRegister', (req, res) => {
  if(req.body != null)
  {
    req.body.user_Password = passwordHash.generate(req.body.user_Password);

    connection((db) => {
        db.collection('delhiStore')
            .insert(req.body)
            .then((users) => {
                response.data = users;
                response.message = "user registered";
                response.statusCode = 'S100';
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
  }
});

/*  USER  LOGIN */
router.post('/userLogin', (req, res) => {
  if(req.body != null)
  {
     // req.body._Password = passwordHash.generate(req.body._Password);
    connection((db) => {

      db.collection('delhiStore').find({user_Email: req.body._Email})
            .toArray()
            .then((users) => {
              var password = users[0].user_Password;
                if(passwordHash.verify(req.body._Password,password)){
                       response.statusCode = 'S100';
                       response.message = "user login";
                       response.data = users;
                       res.json(response);
                    }else {
                       response.statusCode = 'E100';
                       response.message = "Password Incorrect";
                       res.json(response);
                    }
                })
            .catch((err) => {
              response.statusCode = 'E100';
                sendError(err, res);
            });
    });
  }
});

/*-----------------------------------  USER  Tweet -------------------------------------------*/

router.post('/userTweet/:id', (req, res) => {
  if(req.body != null)
  {
    console.log('check data=='+JSON.stringify(req.body));
    connection((db) => {
        db.collection('tweetList').
            insert(
              {
                userId: req.params.id,      
                comments : req.body.msg,
                created : req.body.date
              
               })
               .then((users) => {
                response.data = users;
                response.message = "tweets new message";
                response.statusCode = 'S100';
                res.json(response);
            })

            .catch((err) => {
                sendError(err, res);
            });
    });
  }
});

//----------------------------------------------------------------------------------------------  

/*------------------------------- USER  Tweet LISTING -------------------------------------------*/

router.get('/TweetList/:id', (req, res) => {
  if(req.body != null)
  {
    connection((db) => {
        db.collection('tweetList').
            find(
              { userId: req.params.id}
            )            
               .toArray()
               .then((users) => {
                response.data = users;
                response.message = "listing getting";
                response.statusCode = 'S100';
                res.json(response);
            })

            .catch((err) => {
                sendError(err, res);
            });
    });
  }
});

//--------------------------------------------------------------------------------------------------  

//*------------------------------- USER  Tweet LISTING search data -----------------------------------*/

router.get('/TweetListSearch/:data', (req, res) => {
  if(req.body != null)
  {
    connection((db) => {
        db.collection('tweetList')
               .find({ $text: { $search: "hii"}})          
               .toArray()
               .then((users) => {
                response.data = users;
                response.message = "listing getting";
                response.statusCode = 'S100';
                res.json(response);
            })

            .catch((err) => {
                sendError(err, res);
            });
    });
  }
});

//-----------------------------------------------------------------------------------------------  

module.exports = router;
