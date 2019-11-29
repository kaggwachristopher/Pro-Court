var passport = require('passport');
var Account = require('./models/account');

module.exports = function (app) {

    app.get('/',(req,res)=>{
        //res.send("this is the public view page")
        res.render('index', { user : req.user })
    })
    app.get('/register', function(req, res) {
        //when public clicks register, they get this registration form
        res.render('register', { });
    });
    app.get('/login', function(req, res) {
        //when public clicks login, they get this login form
        res.render('login', { user : req.user });
    });

    app.post('/login', passport.authenticate('local'), (req, res)=> {
        res.redirect('/');
    });
    
    app.post('/adminlog',passport.authenticate('local'),(req,res)=>{
        res.send('stafflog logs here, replace this with res.render')
    })
    app.post('/register',(req,res)=>{
        //public submits registration form and is sent back to login
        Account.register(new Account({ username : req.body.username }), req.body.password, (err, account)=> {
            if (err) {
                return res.render('register', { account : account });
            }
    
            passport.authenticate('local')(req, res, ()=> {
              res.redirect('/');
            });
        });
        
    })
    app.post('/accountmgt',(req,res)=>{
        res.send('super admin creates admin accounts here')
    })

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

}