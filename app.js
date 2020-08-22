var express=require('express');
var session=require('express-session');
var cookieParser=require('cookie-parser');
var bodyParser=require('body-parser');
var body=require('body-parser');
var morgan=require('morgan');
var passport=require('passport');
var flash=require('connect-flash');
var app=express();
var bcrypt = require('bcrypt-nodejs');


var mysql = require('mysql')
var salt = bcrypt.genSaltSync(10);

app.use(body.urlencoded({extended: false}));
app.use(body.json())


var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'kumar@123',
    database: 'Project'
  });
  
  connection.connect(function(err){
      if(err)
      {
          throw err;
      }
      else{
          console.log("add user database connected succesfully");
      }
  });

  app.post('/add_user',function(req,res,err){
    // console.log("i am in post post add user");
    if(err)
    {
        console.log(err);
    }
    // console.log(req.body);
    var payer={
        f_name:req.body.first,
        l_name:req.body.last,
        email:req.body.email,
        password:bcrypt.hashSync(req.body.password,salt),
        dob:req.body.dob,
        aadhar_no:req.body.aadhar,
        mobile:req.body.mobile,
        noe:req.body.employment,
        addr_1:req.body.addr1,
        addr_2:req.body.addr2,
        city:req.body.city,
        state:req.body.state,
        pincode:req.body.pincode
    }
    var insertQuery = "INSERT INTO tax_payer (f_name,l_name,email,password,dob,aadhar_no,mobile,noe,addr_1,addr_2,city,state,pincode) values (?,?,?,?,?,?,?,?,?,?,?,?,?)";
    connection.query(insertQuery,[payer.f_name,payer.l_name,payer.email,payer.password,payer.dob,payer.aadhar_no,payer.mobile,payer.noe,payer.addr_1,payer.addr_2,payer.city,payer.state,payer.pincode], function (err, rows, fields) {
    if (err) 
    {
        throw err
    }    
    else{
        payer.person_id = rows.insertId;
        console.log("payer added succesfully");
        res.redirect('/moreinfo_1');
    }
    // console.log('The solution is: ', rows[0].solution)
    });
    
});

app.get('/moreinfo_1',function(req,res){
    res.render('moreinfo_1');
})

app.post('/moreinfo_1',function(req,res){
    // console.log(req.body);
    var income={
        person_id:req.body.pid,
        ann_inc:req.body.salary,
        house_inc:req.body.house,
        other:req.body.other
    }
    var more="INSERT INTO gross_income (person_id,ann_inc,house_inc,other) values (?,?,?,?)";
    connection.query(more,[income.person_id,income.ann_inc,income.house_inc,income.other],function(err,rows,fields){
        if(err)
        {
            console.log(err);
        }
        else{
            console.log('more info added');
            res.redirect('/tax_info');
        }
    });
});

app.get('/tax_info',function(req,res){
    res.render('tax_info');
});

app.post('/tax_info',function(req,res){
    console.log(req.body);
    var tax={
        person_id:req.body.pid,
        tax_money:req.body.tax_mon,
        itr:req.body.itr,
        total_income:req.body.tot_mon,
        percent:req.body.percent,
        after_tax:req.body.inc_aft
    }
    var more2="INSERT INTO tax (person_id,tax_amt,ITR_date,ann_tot_inc,tax_per,inc_afr_tax) values (?,?,?,?,?,?)";
    connection.query(more2,[tax.person_id,tax.tax_money,tax.itr,tax.total_income,tax.percent,tax.after_tax],function(err,rows,field){
        if(err){
            console.log(err);
        }
        else{
            tax.tid = rows.insertId;
            res.redirect('/admin');
        }
    });
});

app.post('/delete_user',function(req,res,err){
    if(err)
    {
        console.log(err);
    }
    
    
    var del="DELETE FROM tax WHERE person_id = ?";
    connection.query(del,req.body.pid,function(err,results,fields){
        if(err)
        {
            console.log(err);
        }
        
        
        
       
        
    });
    var del="DELETE FROM gross_income WHERE person_id = ?";
    connection.query(del,req.body.pid,function(err,results,fields){
        if(err)
        {
            console.log(err);
        }
        
        console.log('Deleted Rows:',results.affectedRows);
        
        
    });
    var del="DELETE FROM tax_payer WHERE person_id = ?";
    connection.query(del,req.body.pid,function(err,results,fields){
        if(err)
        {
            console.log(err);
        }
        
        res.redirect('/admin');
        
    });
    
   
});

app.post('/update_user',function(req,res){
   
    if(req.body.attr=='f_name')
    {
        // console.log(req.body.pid,req.body.nval);
        var upd="UPDATE tax_payer SET f_name = '"+req.body.nval+"' WHERE person_id='"+req.body.pid+"' " ;
        connection.query(upd,function(err,result){
            if(err)
            {
                console.log(err);
            }
            // console.log(result.affectedRows + " records updated");
            res.redirect('/admin');
        });
    }
    if(req.body.attr=='l_name')
    {
        // console.log(req.body.pid,req.body.nval);
        var upd="UPDATE tax_payer SET l_name = '"+req.body.nval+"' WHERE person_id='"+req.body.pid+"' " ;
        connection.query(upd,function(err,result){
            if(err)
            {
                console.log(err);
            }
            // console.log(result.affectedRows + " records updated");
            res.redirect('/admin');
        });
    }
    if(req.body.attr=='email')
    {
        // console.log(req.body.pid,req.body.nval);
        var upd="UPDATE tax_payer SET email = '"+req.body.nval+"' WHERE person_id='"+req.body.pid+"' " ;
        connection.query(upd,function(err,result){
            if(err)
            {
                console.log(err);
            }
            // console.log(result.affectedRows + " records updated");
            res.redirect('/admin');
        });
    }
    if(req.body.attr=='password')
    {
        // console.log(req.body.pid,req.body.nval);
        var pass=bcrypt.hashSync(req.body.nval, null, null)
        var upd="UPDATE tax_payer SET password = '"+pass+"' WHERE person_id='"+req.body.pid+"' " ;
        connection.query(upd,function(err,result){
            if(err)
            {
                console.log(err);
            }
            // console.log(result.affectedRows + " records updated");
            res.redirect('/admin');
        });
    }
    if(req.body.attr=='dob')
    {
        // console.log(req.body.pid,req.body.nval);
        var upd="UPDATE tax_payer SET dob = '"+req.body.nval+"' WHERE person_id='"+req.body.pid+"' " ;
        connection.query(upd,function(err,result){
            if(err)
            {
                console.log(err);
            }
            // console.log(result.affectedRows + " records updated");
            res.redirect('/admin');
        });
    }
    if(req.body.attr=='aadhar_no')
    {
        // console.log(req.body.pid,req.body.nval);
        var upd="UPDATE tax_payer SET aadhar_no = '"+req.body.nval+"' WHERE person_id='"+req.body.pid+"' " ;
        connection.query(upd,function(err,result){
            if(err)
            {
                console.log(err);
            }
            // console.log(result.affectedRows + " records updated");
            res.redirect('/admin');
        });
    }
    if(req.body.attr=='mobile')
    {
        // console.log(req.body.pid,req.body.nval);
        var upd="UPDATE tax_payer SET mobile = '"+req.body.nval+"' WHERE person_id='"+req.body.pid+"' " ;
        connection.query(upd,function(err,result){
            if(err)
            {
                console.log(err);
            }
            // console.log(result.affectedRows + " records updated");
            res.redirect('/admin');
        });
    }
    if(req.body.attr=='noe')
    {
        // console.log(req.body.pid,req.body.nval);
        var upd="UPDATE tax_payer SET noe = '"+req.body.nval+"' WHERE person_id='"+req.body.pid+"' " ;
        connection.query(upd,function(err,result){
            if(err)
            {
                console.log(err);
            }
            // console.log(result.affectedRows + " records updated");
            res.redirect('/admin');
        });
    }
    if(req.body.attr=='addr_1')
    {
        // console.log(req.body.pid,req.body.nval);
        var upd="UPDATE tax_payer SET addr_1 = '"+req.body.nval+"' WHERE person_id='"+req.body.pid+"' " ;
        connection.query(upd,function(err,result){
            if(err)
            {
                console.log(err);
            }
            // console.log(result.affectedRows + " records updated");
            res.redirect('/admin');
        });
    }
    if(req.body.attr=='addr_2')
    {
        // console.log(req.body.pid,req.body.nval);
        var upd="UPDATE tax_payer SET addr_2 = '"+req.body.nval+"' WHERE person_id='"+req.body.pid+"' " ;
        connection.query(upd,function(err,result){
            if(err)
            {
                console.log(err);
            }
            // console.log(result.affectedRows + " records updated");
            res.redirect('/admin');
        });
    }
    if(req.body.attr=='city')
    {
        // console.log(req.body.pid,req.body.nval);
        var upd="UPDATE tax_payer SET city = '"+req.body.nval+"' WHERE person_id='"+req.body.pid+"' " ;
        connection.query(upd,function(err,result){
            if(err)
            {
                console.log(err);
            }
            // console.log(result.affectedRows + " records updated");
            res.redirect('/admin');
        });
    }
    if(req.body.attr=='state')
    {
        // console.log(req.body.pid,req.body.nval);
        var upd="UPDATE tax_payer SET state = '"+req.body.nval+"' WHERE person_id='"+req.body.pid+"' " ;
        connection.query(upd,function(err,result){
            if(err)
            {
                console.log(err);
            }
            // console.log(result.affectedRows + " records updated");
            res.redirect('/admin');
        });
    }
    if(req.body.attr=='pincode')
    {
        // console.log(req.body.pid,req.body.nval);
        var upd="UPDATE tax_payer SET pincode = '"+req.body.nval+"' WHERE person_id='"+req.body.pid+"' " ;
        connection.query(upd,function(err,result){
            if(err)
            {
                console.log(err);
            }
            // console.log(result.affectedRows + " records updated");
            res.redirect('/admin');
        });
    }
    if(req.body.attr=='ann_inc')
    {
        // console.log(req.body.pid,req.body.nval);
        var upd="UPDATE gross_income SET ann_inc = '"+req.body.nval+"' WHERE person_id='"+req.body.pid+"' " ;
        connection.query(upd,function(err,result){
            if(err)
            {
                console.log(err);
            }
            // console.log(result.affectedRows + " records updated");
            res.redirect('/admin');
        });
    }
    if(req.body.attr=='house_inc')
    {
        // console.log(req.body.pid,req.body.nval);
        var upd="UPDATE gross_income SET house_inc = '"+req.body.nval+"' WHERE person_id='"+req.body.pid+"' " ;
        connection.query(upd,function(err,result){
            if(err)
            {
                console.log(err);
            }
            // console.log(result.affectedRows + " records updated");
            res.redirect('/admin');
        });
    }
    if(req.body.attr=='other')
    {
        // console.log(req.body.pid,req.body.nval);
        var upd="UPDATE gross_income SET other = '"+req.body.nval+"' WHERE person_id='"+req.body.pid+"' " ;
        connection.query(upd,function(err,result){
            if(err)
            {
                console.log(err);
            }
            // console.log(result.affectedRows + " records updated");
            res.redirect('/admin');
        });
    }

});
var x;
var id;
app.post('/login_user',function(req,res){
    var p=req.body.password;
    id=req.body.ID;
    
    connection.query("SELECT password FROM tax_payer WHERE person_id= '"+id+"'", function (err, result, fields) {
        if(err)
        {
            console.log(err);
        }
        else if(bcrypt.compareSync(p,result[0].password)){
            connection.query("SELECT * FROM tax WHERE person_id= '"+id+"'", function (err, result, fields){
                if(err)
                {
                    console.log(err);
                }
                else{
                    x=result;
                   res.redirect('/tax_details');
                
                }
            });
        }
        else{
            
            res.json({success:false});
        }
      });
      
   
});
var t;
var p;
app.post('/any_info',function(req,res){
    var id=req.body.id;
    t=req.body.tax;
    p=req.body.person;
    if(p==="person")
    {
        connection.query("SELECT * FROM tax_payer WHERE person_id= '"+id+"'", function (err, result, fields){
        if(err)
        {
            console.log(err);
        }
        else{
            x=result;
            res.redirect('/any_info');
        
        }
        });
    }
    else if(t==="tax")
    {
        connection.query("SELECT * FROM tax WHERE person_id = '"+id+"'", function (err, result, fields){
        if(err)
        {
            console.log(err);
        }
        else{
            x=result;
            res.redirect('/any_info2');
        
        }
        });
    }
});

app.get('/any_info2',function(req,res){
    res.render('any_info2',{details:x});
});


app.get('/any_info',function(req,res){
    res.render('any_info',{details:x});
});


app.get('/tax_details',function(req,res,next){
    res.render('tax_details',{details:x});
});

app.post('/tax_details',function(req,res){
    var d=req.body.date;
    connection.query("SELECT * FROM tax WHERE ITR_date= '"+d+"'", function (err, result, fields){
        if(err)
        {
            console.log(err);
        }
        else{
            x=result;
           res.redirect('/tax_details');
        
        }
    });
});

app.set('view engine','ejs');
require('./config/passport.js')(passport);




app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));



app.use(session({
    secret:'Believe in the fight',
    resave:true,
    saveUninitialized:true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());



require('./routes/routes.js')(app,passport,mysql,bcrypt,bodyParser);
app.listen(8000,function(){
    console.log('Server Started');
});