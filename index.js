const express=require("express");
const cors=require("cors");
const mysql=require("mysql");
//app creation and initialization using express & cors modules :://
const app=express();
app.use(express.json());
app.use(cors());
//host and port information :://
const http=require("http");
const hostname='127.0.0.1';
const port=3000;
//Connecting to the database :://
var con=mysql.createConnection(
    {
        host : "local host",
        user : "root",
        password : "",
        database : "healthtracker"
    }
)
//listening function of the app :://
app.listen(port,()=>console.log(`Listening on port :: $port..`));

/*CURD apis for the patients table ::
=======================*/
app.post('/api/createpatient',(req,res)=>{
    var ret_val={};
    try{
        var name=req.body.name;
        var email=req.body.email;
        var phone=req.body.phone;
    }
    catch(error){

    }
}
);

/*Patient login api ::
=================*/
app.get('/api/patientlogin', (req,res)=> {
	var ret_val = {};
    try
    {
        var email = req.body.email;
        var password = req.body.password;
		
		var sql = `Select * from patients  where email='${email}' and password='${password}'`;
			con.query(sql, function (err, result, fields) {
				var l=result.length;
			    
				var ret_val = {};	
				if (err) throw err;
				if(l == 1) {
					var i=0;
					ret_val.code="1";
					
					ret_val.id= result[i].id;
					ret_val.name= result[i].name;
					ret_val.email= result[i].email;
					
					console.log(ret_val);
				
					return res.status(200).send(ret_val);
				}
				else {
					ret_val.code="0";
					ret_val.message="ERROR. Invalid Login";
					return res.status(200).send(ret_val);
				}
			});
	}
	catch (error)
	{
        console.log(error);
        ret_val.code="0";
        ret_val.message="ERROR. Login Procedure Failed";
        return res.status(500).send(ret_val);
	}
});