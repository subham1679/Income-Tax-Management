module.exports=function(app,passport)
{
    // var bodyParser=require('body-parser');
    // app.use(bodyParser.urlencoded({extended: true}));
    //  app.use(bodyParser.json());
    // const jsonParser = bodyParser.json()
    

    app.get('/',function(req,res){
        res.render('home');
    });

    app.get('/index',function(req,res){
        res.render('index');
    });

    app.get('/index_2',function(req,res){
        res.render('index_2');
    });

    app.get('/login_user',function(req,res){
        res.render('login_user');
    });

    

    app.get('/login',function(req,res){
        res.render('login',{message:req.flash('loginMessage')});
    });

    app.post('/login',passport.authenticate('local-login',{
        successRedirect:'/admin',
        failureRedirect:'/login',
        failureFlash:true
    }),
    function(req,res){
        if(req.bodyParser.remember){
            req.session.cookie.maxAge=1000*50*2;
        }
        else{
            req.session.cookie.expires=false;
        }
        res.redirect('/');
    });

    app.get('/signup',function(req,res){
        res.render('signup',{message:req.flash('signupMessage')});
    });

    app.post('/signup',passport.authenticate('local-signup',{
        successRedirect:'/admin',
        failureRedirect:'/signup',
        failureFlash:true
    }));

    app.get('/admin',isLoggedIn,function(req,res){
        res.render('admin',{
            user:req.user
        });
    });

    app.get('/add_user',function(req,res){
        res.render('add_user');
    });

    

    app.get('/delete_user',function(req,res){
        res.render('delete_user');
    });

    app.get('/update_user',function(req,res){
        res.render('update_user');
    }); 

   
   
    app.get('/logout',function(req,res){
        req.logout();
        res.redirect('/');
    });
};

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    else{
        res.redired('/');
    }
}