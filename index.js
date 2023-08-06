const express = require("express");
const cors = require("cors");
const mysql = require('mysql');
const app = express();
app.use(express.json());
app.use( cors());

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;
var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "healthtracker"
  });
  
  con.connect();




app.get('/', (req, res) => {
res.send('Welcome to Health Tracker');
});

app.post('/api/createpatient', (req,res)=> {
	

	var ret_val = {};
	try
	{
		
		
		var name = req.body.name;
		var email = req.body.email;
		var phone = req.body.phone;
		var address = req.body.address;
		var lat = req.body.lat;
		var lng = req.body.lng;
		var password = req.body.password;
		var gender = req.body.gender;
		var dob = req.body.dob;
		
				
		

		var sql = `INSERT INTO patient(name, email, phone, address, lat, lng , gender , password , dob) VALUES ('${name}', '${email}', '${phone}', '${address}', '${lat}', '${lng}', '${gender}', '${password}', '${dob}')`;

		con.query(sql, function (err, result) {
			if (err) throw err;
			console.log("1 record inserted");
		});
		
	
		ret_val.code="1";
		ret_val.message="Success. Patient created";
		return res.status(200).send(ret_val);

	}
	catch ( error )
	{
			console.log(error);
			ret_val.code="0";
			ret_val.message="ERROR. Patient not inserted";
			return res.status(500).send(ret_val);
	}	

});


app.post('/api/registerpatient', (req,res)=> {
	

	var ret_val = {};
	try
	{
		
		
		var name = req.body.name;
		var email = req.body.email;
		var password = req.body.password;
		var flag = 0;
		var sql = `select *  from patient where email='${email}'`;
				
		con.query(sql, function (err, result, fields) {

        
        
			
			if (err) throw err;
			console.log("Records fetched");
			console.log(result.length);
			var l=result.length;
			if (l==0){
				flag=1;
				console.log("about to insert the record");
				var sql = `INSERT INTO patient(name, email,  password ) VALUES ('${name}', '${email}',  '${password}')`;

				con.query(sql, function (err, result) {
				if (err) throw err;
					console.log("1 record inserted");
				});
		
	
				ret_val.code="1";
				ret_val.message="Success. Patient registered";
				return res.status(200).send(ret_val);
			}

			else{
				ret_val.code="0";
				ret_val.message="Email already used , please enter another Email";
				return res.status(200).send(ret_val);
			}
			
			
			
		});
		
		
	}
	catch ( error )
	{
			console.log(error);
			ret_val.code="0";
			ret_val.message="ERROR. Patient not registered";
			return res.status(500).send(ret_val);
	}	

});










app.get('/api/readpatientv2', (req,res)=> {
	

	var ret_val = {};
	try
	{
		
		var id ;
		var name ;
		var email ;
		var phone ;
		var address ;
		var lat ;
		var lng ;
		var dob ;
		var gender ;
		var password ;
		
				
		

		var sql = `SELECT * from patient`;

		con.query(sql, function (err, result, fields) {

        
        
			var aryresults = [];
			var ret_val = {};	
			if (err) throw err;
			console.log("Records fetched");
			console.log(result.length);
			var l=result.length;
			var i=0;
			while ( i<l )
			{
				
			ret_val.idno= result[i].id;
			ret_val.name= result[i].name;
			ret_val.email= result[i].email;
			ret_val.phone= result[i].phone;
			ret_val.address= result[i].address;
			ret_val.lat= result[i].lat;
			ret_val.lng= result[i].lng;
			ret_val.dob= result[i].dob;
			ret_val.gender= result[i].gender;
			ret_val.password= result[i].password;
			console.log(ret_val);
			aryresults[i]= ret_val;
			ret_val={};
			
			i=i+1;
			}
			return res.status(200).send(  aryresults);
			
		});
		
	
	}
	catch ( error )
	{
			console.log(error);
			ret_val.code="0";
			ret_val.message="ERROR. patient data not fetched";
			return res.status(500).send(ret_val);
	}	

});



app.get('/api/readonepatient', (req,res)=> {
	

	var ret_val = {};
	try
	{
		
		var id ;
		var name ;
		var email ;
		var phone ;
		var address ;
		var lat ;
		var lng ;
		var dob ;
		var gender ;
		var password ;
		
				
		
		var id = req.query.id;
		var sql = `SELECT * from patient where id='${id}'`;

		con.query(sql, function (err, result, fields) {

        
			var ret_val = {};	
			if (err) throw err;
			console.log("Record fetched");
			console.log(result.length);
			
			var i=0;
			
			ret_val.idno= result[i].id;
			ret_val.name= result[i].name;
			ret_val.email= result[i].email;
			ret_val.phone= result[i].phone;
			ret_val.owner= result[i].owner;
			ret_val.address= result[i].address;
			ret_val.lat= result[i].lat;
			ret_val.lng= result[i].lng;
			ret_val.dob= result[i].dob;
			ret_val.gender= result[i].gender;
			ret_val.password= result[i].password;

			console.log(ret_val);
			
			return res.status(200).send( ret_val);
			
		});
		
	
	}
	catch ( error )
	{
			console.log(error);
			ret_val.code="0";
			ret_val.message="ERROR. Patient data not fetched";
			return res.status(500).send(ret_val);
	}	

});




app.post('/api/updatepatients', (req,res)=> {
	var ret_val = {};
	try
	{
		
		var id = req.body.id;
		var name = req.body.name;
		var email = req.body.email;
		var phone = req.body.phone;
		var address = req.body.address;
		var lat = req.body.lat;
		var lng = req.body.lng;
		var dob = req.body.dob;
		var gender = req.body.gender;
		var password = req.body.password;
		
				
		

		var sql = `update patient set name='${name}', email='${email}', phone='${phone}', address='${address}', lat='${lat}', lng='${lng}' , dob='${dob}' , gender='${gender}' , password='${password}' where id='${id}' `;
		console.log(sql);
		con.query(sql, function (err, result) {
			if (err) throw err;
			console.log("Number of records updated " + result.affectedRows);
		});
		
	
		
			ret_val.code="1";
		ret_val.message="Success. Patient Updated";
		return res.status(200).send(ret_val);

	}
	catch ( error )
	{
			console.log(error);
			ret_val.code="0";
			ret_val.message="ERROR. Patient not Updated";
			return res.status(500).send(ret_val);
	}

});






app.delete('/api/deletepatient', (req,res)=> {
	var ret_val = {};
		try
		{
			var id = req.query.id;
			var sql = `delete from patient where id='${id}'`;
  
			con.query(sql, function (err, result) {
				if (err) throw err;
				console.log("Number of records deleted: " + result.affectedRows);
				ret_val.code="1";
			ret_val.message="Success. Patient Deleted";
			return res.status(200).send(ret_val);
			});
	
		}
		catch ( error )
		{
				console.log(error);
				ret_val.code="0";
				ret_val.message="ERROR. No records Deleted";
				return res.status(500).send(ret_val);
		}

});






app.post('/api/patientlogin', (req,res)=> {
	var ret_val = {};
    try
    {
        var email = req.body.email;
        var password = req.body.password;
		
		var sql = `Select * from patient where email='${email}' and password='${password}'`;
			con.query(sql, function (err, result, fields) {
				var l=result.length;
			    
				var ret_val = {};	
				if (err) throw err;
				if(l == 1) {
					var i=0;
					ret_val.code="1";
					ret_val.message="Login Successful";
					
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








app.post('/api/createambulance', (req,res)=> {
	

	var ret_val = {};
	try
	{
		
		
		var Vnumber = req.body.Vnumber;
		var type = req.body.type;
		var owner = req.body.owner;
		var address = req.body.address;
		var lat = req.body.lat;
		var lng = req.body.lng;
		var owner_phone = req.body.owner_phone;
		var hourly_rate = req.body.hourly_rate;
		
				
		

		var sql = `INSERT INTO ambulance(Vnumber,type , owner , address, lat, lng , owner_phone , hourly_rate) VALUES ('${Vnumber}', '${type}', '${owner}', '${address}', '${lat}', '${lng}', '${owner_phone}', '${hourly_rate}')`;

		con.query(sql, function (err, result) {
			if (err) throw err;
			console.log("1 record inserted");
		});
		
	
		ret_val.code="1";
		ret_val.message="Success. Ambulance created";
		return res.status(200).send(ret_val);

	}
	catch ( error )
	{
			console.log(error);
			ret_val.code="0";
			ret_val.message="ERROR. Ambulance not inserted";
			return res.status(500).send(ret_val);
	}	

});








app.get('/api/readoneambulance', (req,res)=> {
	

	var ret_val = {};
	try
	{
		
		var id ;
		var Vnumber ;
		var type ;
		var owner ;
		var address ;
		var lat ;
		var lng ;
		var owner_phone ;
		var hourly_rate ;
		
				
		
		var id = req.query.id;
		var sql = `SELECT * from ambulance where id='${id}'`;

		con.query(sql, function (err, result, fields) {

        
			var ret_val = {};	
			if (err) throw err;
			console.log("Record fetched");
			console.log(result.length);
			
			var i=0;
			
			ret_val.idno= result[i].id;
			ret_val.Vnumber= result[i].Vnumber;
			ret_val.type= result[i].type;
			ret_val.owner= result[i].owner;
			ret_val.address= result[i].address;
			ret_val.lat= result[i].lat;
			ret_val.lng= result[i].lng;
			ret_val.owner_phone= result[i].owner_phone;
			ret_val.hourly_rate= result[i].hourly_rate;
			console.log(ret_val);
			
			return res.status(200).send( ret_val);
			
		});
		
	
	}
	catch ( error )
	{
			console.log(error);
			ret_val.code="0";
			ret_val.message="ERROR. Ambulance data not fetched";
			return res.status(500).send(ret_val);
	}	

});





app.get('/api/readambulance', (req,res)=> {
	

	var ret_val = {};
	try
	{

		var sql = `SELECT * from ambulance`;

		con.query(sql, function (err, result, fields) {
	
			if (err) throw err;
			return res.status(200).send(  result);
			
		});
		
	
	}
	catch ( error )
	{
			console.log(error);
			ret_val.code="0";
			ret_val.message="ERROR. Ambulance data not fetched";
			return res.status(500).send(ret_val);
	}	

});



app.get('/api/readambulancev2', (req,res)=> {
	

	var ret_val = {};
	try
	{
		
		var id ;
		var Vnumber ;
		var type ;
		var owner ;
		var address ;
		var lat ;
		var lng ;
		var owner_phone ;
		var hourly_rate ;
		
				
		

		var sql = `SELECT * from ambulance`;

		con.query(sql, function (err, result, fields) {

        
        
			var aryresults = [];
			var ret_val = {};	
			if (err) throw err;
			console.log("Records fetched");
			console.log(result.length);
			var l=result.length;
			var i=0;
			while ( i<l )
			{
				
			ret_val.idno= result[i].id;
			ret_val.Vnumber= result[i].Vnumber;
			ret_val.type= result[i].type;
			ret_val.owner= result[i].owner;
			ret_val.address= result[i].address;
			ret_val.lat= result[i].lat;
			ret_val.lng= result[i].lng;
			ret_val.owner_phone= result[i].owner_phone;
			ret_val.hourly_rate= result[i].hourly_rate;
			console.log(ret_val);
			aryresults[i]= ret_val;
			ret_val={};
			
			i=i+1;
			}
			return res.status(200).send(  aryresults);
			
		});
		
	
	}
	catch ( error )
	{
			console.log(error);
			ret_val.code="0";
			ret_val.message="ERROR. Ambulance data not fetched";
			return res.status(500).send(ret_val);
	}	

});




app.post('/api/updateambulance', (req,res)=> {
	var ret_val = {};
	try
	{
		
		var id = req.body.id;
		var Vnumber = req.body.Vnumber;
		var type = req.body.type;
		var owner = req.body.owner;
		var address = req.body.address;
		var lat = req.body.lat;
		var lng = req.body.lng;
		var owner_phone = req.body.owner_phone;
		var hourly_rate = req.body.hourly_rate;
		
				
		

		var sql = `update ambulance set Vnumber='${Vnumber}', type='${type}', owner='${owner}', address='${address}', lat='${lat}', lng='${lng}' , owner_phone='${owner_phone}' , hourly_rate='${hourly_rate}' where id='${id}' `;

		con.query(sql, function (err, result) {
			if (err) throw err;
			console.log("Number of records updated " + result.affectedRows);
		});
		
	
		
			ret_val.code="1";
		ret_val.message="Success. Ambulance Updated";
		return res.status(200).send(ret_val);

	}
	catch ( error )
	{
			console.log(error);
			ret_val.code="0";
			ret_val.message="ERROR. Ambulance not Updated";
			return res.status(500).send(ret_val);
	}

});


app.delete('/api/deleteambulance', (req,res)=> {
	var ret_val = {};
		try
		{
			var id = req.query.id;
			var sql = `delete from ambulance where id='${id}'`;
  
			con.query(sql, function (err, result) {
				if (err) throw err;
				console.log("Number of records deleted: " + result.affectedRows);
				ret_val.code="1";
			ret_val.message="Success. Ambulance Deleted";
			return res.status(200).send(ret_val);
			});
	
		}
		catch ( error )
		{
				console.log(error);
				ret_val.code="0";
				ret_val.message="ERROR. No records Deleted";
				return res.status(500).send(ret_val);
		}

});







app.post('/api/createclinics', (req,res)=> {
	

	var ret_val = {};
	try
	{
		
		var name = req.body.name;
		var owner_name = req.body.owner_name;
		var phone = req.body.phone;
		var email = req.body.email;
		var address = req.body.address;
		var lat = req.body.lat;
		var lng = req.body.lng;
		var doe = req.body.doe;
		var description = req.body.description;
		

		var sql = `INSERT INTO clinics(name, owner_name, phone, email, address, lat, lng , doe, description) VALUES ('${name}', '${owner_name}', '${phone}', '${email}',  '${address}', '${lat}', '${lng}', '${doe}', '${description}')`;
		console.log(sql);
		con.query(sql, function (err, result) {
			if (err) throw err;
			console.log("1 record inserted");
		});
		
	
		ret_val.code="1";
		ret_val.message="Success. Clinic created";
		return res.status(200).send(ret_val);

	}
	catch ( error )
	{
			console.log(error);
			ret_val.code="0";
			ret_val.message="ERROR. Clinic not inserted";
			return res.status(500).send(ret_val);
	}	

});



app.get('/api/readclinics', (req,res)=> {
	

	var ret_val = {};
	try
	{
		
		var id ;
		var name ;
		var owner_name ;
		var phone ;
		var email;
		var address ;
		var lat ;
		var lng ;
		var doe ;
		var desc ;
		
				
		

		var sql = `SELECT * from clinics`;

		con.query(sql, function (err, result, fields) {

        
        
			var aryresults = [];
			var ret_val = {};	
			if (err) throw err;
			console.log("Records fetched");
			console.log(result.length);
			var l=result.length;
			var i=0;
			while ( i<l )
			{
				
			ret_val.id= result[i].id;
			ret_val.name= result[i].name;
			ret_val.owner_name= result[i].owner_name;
			ret_val.phone= result[i].phone;
			ret_val.email= result[i].email;
			ret_val.address= result[i].address;
			ret_val.lat= result[i].lat;
			ret_val.lng= result[i].lng;
			ret_val.doe= result[i].doe;
			ret_val.desc= result[i].desc;
			console.log(ret_val);
			aryresults[i]= ret_val;
			ret_val={};
			
			i=i+1;
			}
			return res.status(200).send(  aryresults);

			
		});
		
	
	}
	catch ( error )
	{
			console.log(error);
			ret_val.code="0";
			ret_val.message="ERROR. Clinics data not fetched";
			return res.status(500).send(ret_val);
	}	

});










app.post('/api/createpatient_ambulance', (req,res)=> {
	

	var ret_val = {};
	try
	{
		
		
		var patient_id = req.body.patient_id;
		var ambulance_id = req.body.ambulance_id;
		var destination = req.body.destination;
		var booking_time = req.body.booking_time;
		var booking_date = req.body.booking_date;
		var payment_made = req.body.payment_made;
		
		
				
		

		var sql = `INSERT INTO patient_ambulance(patient_id, ambulance_id, destination, booking_time, booking_date, payment_made) VALUES ('${patient_id}', '${ambulance_id}', '${destination}', '${booking_time}',  '${booking_date}', '${payment_made}')`;

		con.query(sql, function (err, result) {
			if (err) throw err;
			console.log("1 record inserted");
		});
		
	
		ret_val.code="1";
		ret_val.message="Success. patient_ambulance created";
		return res.status(200).send(ret_val);

	}
	catch ( error )
	{
			console.log(error);
			ret_val.code="0";
			ret_val.message="ERROR. patient_ambulance not inserted";
			return res.status(500).send(ret_val);
	}	

});



app.get('/api/readpatient_ambulance', (req,res)=> {
	

	var ret_val = {};
	try
	{

		var sql = `SELECT * from patient_ambulance`;

		con.query(sql, function (err, result, fields) {
	
			if (err) throw err;
			return res.status(200).send(  result);
			
		});
		
	
	}
	catch ( error )
	{
			console.log(error);
			ret_val.code="0";
			ret_val.message="ERROR. patient_ambulance data not fetched";
			return res.status(500).send(ret_val);
	}	

});








app.post('/api/createlife_style_diseases_symptoms', (req,res)=> {
	

	var ret_val = {};
	try
	{
		
		
		var life_style_diseases_id = req.body.life_style_diseases_id;
		var symp_text = req.body.symp_text;
		
				

		var sql = `INSERT INTO life_style_diseases_symptoms(life_style_diseases_id, symp_text) VALUES ('${life_style_diseases_id}', '${symp_text}')`;

		con.query(sql, function (err, result) {
			if (err) throw err;
			console.log("1 record inserted");
		});
		
	
		ret_val.code="1";
		ret_val.message="Success. life_style_diseases_symptoms created";
		return res.status(200).send(ret_val);

	}
	catch ( error )
	{
			console.log(error);
			ret_val.code="0";
			ret_val.message="ERROR. life_style_diseases_symptoms not inserted";
			return res.status(500).send(ret_val);
	}	

});



app.get('/api/readlife_style_diseases_symptoms', (req,res)=> {
	

	var ret_val = {};
	try
	{

		var sql = `SELECT * from life_style_diseases_symptoms`;

		con.query(sql, function (err, result, fields) {
	
			if (err) throw err;
			return res.status(200).send(  result);
			
		});
		
	
	}
	catch ( error )
	{
			console.log(error);
			ret_val.code="0";
			ret_val.message="ERROR. life_style_diseases_symptoms data not fetched";
			return res.status(500).send(ret_val);
	}	

});









app.get('/api/readclinic_tests', (req,res)=> {
	

	var ret_val = {};
	try
	{

		var sql = `SELECT * from clinic_tests`;

		con.query(sql, function (err, result, fields) {
	
			if (err) throw err;
			return res.status(200).send(  result);
			
		});
		
	
	}
	catch ( error )
	{
			console.log(error);
			ret_val.code="0";
			ret_val.message="ERROR. clinic_tests data not fetched";
			return res.status(500).send(ret_val);
	}	

});









app.get('/api/readlife_style_diseases', (req,res)=> {
	

	var ret_val = {};
	try
	{

		var sql = `SELECT * from life_style_diseases`;

		con.query(sql, function (err, result, fields) {
	
			if (err) throw err;
			return res.status(200).send(  result);
			
		});
		
	
	}
	catch ( error )
	{
			console.log(error);
			ret_val.code="0";
			ret_val.message="ERROR. life_style_diseases data not fetched";
			return res.status(500).send(ret_val);
	}	

});




app.get('/api/readtestsv2', (req,res)=> {
	

	var ret_val = {};
	try
	{
		
		var id ;
		var sc_name ;
		var code ;
		var description ;
		var instructions ;
		
				
		

		var sql = `SELECT * from tests`;

		con.query(sql, function (err, result, fields) {

        
        
			var aryresults = [];
			var ret_val = {};	
			if (err) throw err;
			console.log("Records fetched");
			console.log(result.length);
			var l=result.length;
			var i=0;
			while ( i<l )
			{
				
			ret_val.idno= result[i].id;
			ret_val.sc_name= result[i].sc_name;
			ret_val.code= result[i].code;
			ret_val.description= result[i].description;
			ret_val.instructions= result[i].instructions;
			
			console.log(ret_val);
			aryresults[i]= ret_val;
			ret_val={};
			
			i=i+1;
			}
			return res.status(200).send(  aryresults);
			
		});
		
	
	}
	catch ( error )
	{
			console.log(error);
			ret_val.code="0";
			ret_val.message="ERROR. tests data not fetched";
			return res.status(500).send(ret_val);
	}	

});


app.get('/api/readambulancev2', (req,res)=> {
	

	var ret_val = {};
	try
	{
		
		var id ;
		var Vnumber ;
		var type ;
		var owner ;
		var address ;
		var lat ;
		var lng ;
		var owner_phone ;
		var hourly_rate ;
		
				
		

		var sql = `SELECT * from ambulance`;

		con.query(sql, function (err, result, fields) {

        
        
			var aryresults = [];
			var ret_val = {};	
			if (err) throw err;
			console.log("Records fetched");
			console.log(result.length);
			var l=result.length;
			var i=0;
			while ( i<l )
			{
				
			ret_val.idno= result[i].id;
			ret_val.Vnumber= result[i].Vnumber;
			ret_val.type= result[i].type;
			ret_val.owner= result[i].owner;
			ret_val.address= result[i].address;
			ret_val.lat= result[i].lat;
			ret_val.lng= result[i].lng;
			ret_val.owner_phone= result[i].owner_phone;
			ret_val.hourly_rate= result[i].hourly_rate;
			console.log(ret_val);
			aryresults[i]= ret_val;
			ret_val={};
			
			i=i+1;
			}
			return res.status(200).send(  aryresults);
			
		});
		
	
	}
	catch ( error )
	{
			console.log(error);
			ret_val.code="0";
			ret_val.message="ERROR. Ambulance data not fetched";
			return res.status(500).send(ret_val);
	}	

});






app.get('/api/readclinicsv2', (req,res)=> {
	

	var ret_val = {};
	try
	{
		
		var id ;
		var name ;
		var owner_name ;
		var phone ;
		var email ;
		var address ;
		var lat ;
		var lng ;
		var doe ;
		var description ;
		
		
				
		

		var sql = `SELECT * from clinics`;

		con.query(sql, function (err, result, fields) {

        
        
			var aryresults = [];
			var ret_val = {};	
			if (err) throw err;
			console.log("Records fetched");
			console.log(result.length);
			var l=result.length;
			var i=0;
			while ( i<l )
			{
				
			ret_val.idno= result[i].id;
			ret_val.name= result[i].name;
			ret_val.owner_name= result[i].owner_name;
			ret_val.phone= result[i].phone;
			ret_val.email= result[i].email;
			ret_val.address= result[i].address;
			ret_val.lat= result[i].lat;
			ret_val.lng= result[i].lng;
			ret_val.doe= result[i].doe;
			ret_val.description= result[i].description;
		
			console.log(ret_val);
			aryresults[i]= ret_val;
			ret_val={};
			
			i=i+1;
			}
			return res.status(200).send(  aryresults);
			
		});
		
	
	}
	catch ( error )
	{
			console.log(error);
			ret_val.code="0";
			ret_val.message="ERROR. clinics data not fetched";
			return res.status(500).send(ret_val);
	}	

});

app.get('/api/readlife_style_diseasesv2', (req,res)=> {
	

	var ret_val = {};
	try
	{
		
		var id ;
		var common_name ;
		var sc_name ;
		var description ;
		
		
				
		

		var sql = `SELECT * from life_style_diseases`;

		con.query(sql, function (err, result, fields) {

        
        
			var aryresults = [];
			var ret_val = {};	
			if (err) throw err;
			console.log("Records fetched");
			console.log(result.length);
			var l=result.length;
			var i=0;
			while ( i<l )
			{
				
			ret_val.idno= result[i].id;
			ret_val.common_name= result[i].common_name;
			ret_val.sc_name= result[i].sc_name;

			ret_val.description= result[i].description;
		
			console.log(ret_val);
			aryresults[i]= ret_val;
			ret_val={};
			
			i=i+1;
			}
			return res.status(200).send(  aryresults);
			
		});
		
	
	}
	catch ( error )
	{
			console.log(error);
			ret_val.code="0";
			ret_val.message="ERROR. life_style_diseases data not fetched";
			return res.status(500).send(ret_val);
	}	

});




app.get('/api/readpatient_life_style_diseases', (req,res)=> {
	

	var ret_val = {};
	try
	{

		var sql = `SELECT * from patient_life_style_diseases`;

		con.query(sql, function (err, result, fields) {
	
			if (err) throw err;
			return res.status(200).send(  result);
			
		});
		
	
	}
	catch ( error )
	{
			console.log(error);
			ret_val.code="0";
			ret_val.message="ERROR. Patient_life_style_diseases data not fetched";
			return res.status(500).send(ret_val);
	}	

});






app.get('/api/readpatient_life_style_diseasesv2', (req,res)=> {
	

	var ret_val = {};
	try
	{
		
		var id ;
		var patient_id;
		var life_style_diseases_id;
		var duration;
		
				
		

		var sql = `SELECT * from patient_life_style_diseases`;

		con.query(sql, function (err, result, fields) {

        
        
			var aryresults = [];
			var ret_val = {};	
			if (err) throw err;
			console.log("Records fetched");
			console.log(result.length);
			var l=result.length;
			var i=0;
			while ( i<l )
			{
				
			ret_val.id= result[i].id;
			ret_val.patient_id= result[i].patient_id;
			ret_val.life_style_diseases_id= result[i].life_style_diseases_id;
			ret_val.duration= result[i].duration;
			console.log(ret_val);
			aryresults[i]= ret_val;
			ret_val={};
			
			i=i+1;
			}
			return res.status(200).send(  aryresults);
			
		});
		
	
	}
	catch ( error )
	{
			console.log(error);
			ret_val.code="0";
			ret_val.message="ERROR. patient_life_style_diseases data not fetched";
			return res.status(500).send(ret_val);
	}	

});







app.post('/api/createpatient_life_style_diseases', (req,res)=> {
	

	var ret_val = {};
	try
	{
		
		var id = req.body.id;
		var patient_id = req.body.patient_id;
		var life_style_diseases_id = req.body.life_style_diseases_id;
		var duration = req.body.duration;
		
				

		var sql = `INSERT INTO patient_life_style_diseases(id, patient_id, life_style_diseases_id, duration) VALUES ('${id}', '${patient_id}', '${life_style_diseases_id}', '${duration}')`;

		con.query(sql, function (err, result) {
			if (err) throw err;
			console.log("1 record inserted");
		});
		
	
		ret_val.code="1";
		ret_val.message="Success. patient_life_style_diseases created";
		return res.status(200).send(ret_val);

	}
	catch ( error )
	{
			console.log(error);
			ret_val.code="0";
			ret_val.message="ERROR. patient_life_style_diseases not inserted";
			return res.status(500).send(ret_val);
	}	

});







app.delete('/api/deletepatient_life_style_diseases', (req,res)=> {
	var ret_val = {};
		try
		{
			var id = req.query.id;
			var sql = `delete from patient_life_style_diseases where id='${id}'`;
  
			con.query(sql, function (err, result) {
				if (err) throw err;
				console.log("Number of records deleted: " + result.affectedRows);
				ret_val.code="1";
			ret_val.message="Success. patient_life_style_diseases Deleted";
			return res.status(200).send(ret_val);
			});
	
		}
		catch ( error )
		{
				console.log(error);
				ret_val.code="0";
				ret_val.message="ERROR. No records Deleted";
				return res.status(500).send(ret_val);
		}

});






app.post('/api/updatepatient_life_style_diseases', (req,res)=> {
	var ret_val = {};
	try
	{
		
		var id = req.body.id;
		var patient_id = req.body.patient_id;
		var life_style_diseases_id = req.body.life_style_diseases_id;
		var duration = req.body.duration;		

		var sql = `update patient_life_style_diseases set patient_id='${patient_id}', life_style_diseases_id='${life_style_diseases_id}', duration='${duration}',  where id='${id}' `;

		con.query(sql, function (err, result) {
			if (err) throw err;
			console.log("Number of records updated " + result.affectedRows);
		});
		
	
		
			ret_val.code="1";
		ret_val.message="Success. patient_life_style_diseases Updated";
		return res.status(200).send(ret_val);

	}
	catch ( error )
	{
			console.log(error);
			ret_val.code="0";
			ret_val.message="ERROR. patient_life_style_diseases not Updated";
			return res.status(500).send(ret_val);
	}

});



app.post('/api/createtests', (req,res)=> {
	

	var ret_val = {};
	try
	{
		
		var id = req.body.id;
		var sc_name = req.body.sc_name;
		var code = req.body.code;
		var description = req.body.description;
		var instructions = req.body.instructions;
		
				

		var sql = `INSERT INTO tests(id, sc_name, code, description,instructions) VALUES ('${id}', '${sc_name}', '${code}', '${description}', '${instructions}')`;

		con.query(sql, function (err, result) {
			if (err) throw err;
			console.log("1 record inserted");
		});
		
	
		ret_val.code="1";
		ret_val.message="Success. tests created";
		return res.status(200).send(ret_val);

	}
	catch ( error )
	{
			console.log(error);
			ret_val.code="0";
			ret_val.message="ERROR. tests not inserted";
			return res.status(500).send(ret_val);
	}	

});


app.post('/api/createlife_style_diseases', (req,res)=> {
	

	var ret_val = {};
	try
	{
		
		var id = req.body.id;
		var common_name = req.body.common_name;
		var sc_name = req.body.sc_name;
		var description = req.body.description;
		
				

		var sql = `INSERT INTO life_style_diseases(id, common_name, sc_name, description) VALUES ('${id}', '${common_name}', '${sc_name}', '${description}')`;

		con.query(sql, function (err, result) {
			if (err) throw err;
			console.log("1 record inserted");
		});
		
	
		ret_val.code="1";
		ret_val.message="Success. life_style_diseases created";
		return res.status(200).send(ret_val);

	}
	catch ( error )
	{
			console.log(error);
			ret_val.code="0";
			ret_val.message="ERROR. life_style_diseases not inserted";
			return res.status(500).send(ret_val);
	}	

});

app.get('/api/readclinicsv2', (req,res)=> {
	

	var ret_val = {};
	try
	{
		
		var id ;
		var name ;
		var owner_name ;
		var phone ;
		var email ;
		var address ;
		var lat ;
		var lng ;
		var doe ;
		var description ;
		
		
				
		

		var sql = `SELECT * from clinics`;

		con.query(sql, function (err, result, fields) {

        
        
			var aryresults = [];
			var ret_val = {};	
			if (err) throw err;
			console.log("Records fetched");
			console.log(result.length);
			var l=result.length;
			var i=0;
			while ( i<l )
			{
				
			ret_val.idno= result[i].id;
			ret_val.name= result[i].name;
			ret_val.owner_name= result[i].owner_name;
			ret_val.phone= result[i].phone;
			ret_val.email= result[i].email;
			ret_val.address= result[i].address;
			ret_val.lat= result[i].lat;
			ret_val.lng= result[i].lng;
			ret_val.doe= result[i].doe;
			ret_val.description= result[i].description;
		
			console.log(ret_val);
			aryresults[i]= ret_val;
			ret_val={};
			
			i=i+1;
			}
			return res.status(200).send(  aryresults);
			
		});
		
	
	}
	catch ( error )
	{
			console.log(error);
			ret_val.code="0";
			ret_val.message="ERROR. clinics data not fetched";
			return res.status(500).send(ret_val);
	}	

});












app.listen(port, () => console.log(`Listening on port ${port}..`));


