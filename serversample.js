var http = require('http');
var fs = require("fs");
var qs = require("querystring");
var MongoClient = require ("mongodb").MongoClient;
var dbUrl="mongodb://localhost:27017";
var isLoginSucceessful=false;

//create a server object:
http.createServer(function (req,res,err) {
    
    if(req.url === "/apple"){
		res.write('Hello World!'); //write a response to the client
        res.end(); //end the response
	}else if(req.url === "/index"){
		sendFileContent(res, "index.html", "text/html");
	}
	else if(req.url === "/cart"){
		if (req.method === "POST") {
				console.log("sending");
				formData = '';
				msg = '';
					return req.on('data', function (data) {
					formData += data;
					console.log(formData);
						return req.on('end', function () {
						console.log("request data");	
								MongoClient.connect(dbUrl, function(err, db) {
									if (err) throw err;
									var dbo = db.db("mydb");
									dbo.collection("favlist").find({ login: formData }).toArray(function(err, result) {
									if (err) throw err;
										db.close();
									res.end(JSON.stringify(result));
									});
								});
						});		
					});

			
			
			
		}else {
			sendFileContent(res, "cart.html", "text/html");
		}
	}
	
else if(req.url === "/logindata"){
        if (req.method === "POST") {
            console.log("sending");
            formData = '';
            msg = '';
            return req.on('data', function (data) {
                formData += data;
                console.log(formData);
                info = formData.split("&");
                console.log(info[0]);//login=XXX
                console.log(info[1]);//password=YYY

                return req.on('end', function () {
                    var user;
                    user = qs.parse(formData);

                    msg = JSON.stringify(user);

                    for (i = 0; i < 1; i++) {
                        var c = info[i].split("=");
                    }

                    console.log(c[0]);
                    console.log(c[1]);

                    for (i = 1; i < info.length; i++) {

                        var d = info[i].split("=");

                    }

                    console.log(d[0]);
                    console.log(d[1]);

                    stringMsg = JSON.parse(msg);

                    MongoClient.connect(dbUrl, function (err, db)  {
						
						
                        if (err) throw err;

                        var dbo = db.db("mydb");
                        var myobj = stringMsg;
                        var query = { login: c[1], password: d[1], id: c[1]};
                        var items = query
						console.log(query)

                        dbo.collection("customers").find(query).toArray(function (err, items) {

                            var array = [];
                            for (var i = 0; i < items.length; i++) {
                                array.push(items[i].login);
                            }

                            if (err) throw err;
                            console.log(items.length);

                            if (items.length > 0) {
                                isLoginSuccessful = true;
                                console.log("loginok");
                                res.end("ACgotcha");

                            } else {
                                isLoginSuccessful = false;
                                console.log("Fail To login");
                                res.end("You Failed Successful!");
                                db.close();


                            }

                        });
                    });
                });
            });

        } else {
			
            sendFileContent(res, "index.html", "text/html");
        }
	}
	
else if(req.url === "/regsdata"){
        if (req.method === "POST") {
            console.log("sending");
            formData = '';
            msg = '';
            return req.on('data', function (data) {
                formData += data;
                console.log(formData);
                info = formData.split("&");
                console.log(info[0]);//login=XXX
                console.log(info[1]);//password=YYY


                return req.on('end', function () {
                    var user;
                    user = qs.parse(formData);

                    msg = JSON.stringify(user);

                    for (i = 0; i < 1; i++) {
                        var c = info[i].split("=");
                    }

                    console.log(c[0]);
                    console.log(c[1]);

                    for (i = 1; i < info.length; i++) {

                        var d = info[i].split("=");

                    }

                    console.log(d[0]);
                    console.log(d[1]);

                    stringMsg = JSON.parse(msg);


                    MongoClient.connect(dbUrl, function (err, db)  {
						
						
                        if (err) throw err;

                        var dbo = db.db("mydb");
                        var myobj = stringMsg;
                        var query = { login: c[1], password: d[1], id: c[1]};
                        var items = query;
						console.log(query);
							
						dbo.collection("customers").insertOne(query, function(err, res) {
							  if (err) throw err;

								db.close();

						});
				
						
						 res.end("Account Create");
					});
				});	
			});
		
		} else {

			sendFileContent(res,"index.html", "text/html");
		}
	}
	


else if(req.url === "/userpage"){
	if (req.method === "POST") {
		console.log("sending");
		formData = '';
		msg = '';
			return req.on('data', function (data) {
			formData += data;
			console.log(formData);
			console.log({ login: formData })
				return req.on('end', function () {
				console.log("req data");	
						MongoClient.connect(dbUrl, function(err, db) {
							if (err) throw err;
							var dbo = db.db("mydb");
							dbo.collection("customers").find({ login: formData }).toArray(function(err, result) {
							if (err) throw err;
								db.close();
								res.end(JSON.stringify(result));
							});
						});
				});		
			});

		
		
		
	}else {
		sendFileContent(res, "userpage.html", "text/html");
	}
	
				

	
}

else if(req.url === "/deleteac"){
	if (req.method === "POST") {
			console.log("Deleting");
				formData = '';
				msg = '';
				return req.on('data', function (formData) {
				console.log("User Delete:="+formData);
					stringMsg = formData;
					return req.on('end', function () {
						console.log("Delete...");	
						MongoClient.connect(dbUrl, function(err, db) {
						  if (err) throw err;
						  var dbo = db.db("mydb");
						  var myquery = { login : stringMsg.toString()};
						  console.log(myquery);
						  dbo.collection("customers").deleteOne(myquery, function(err, obj) {
							if (err) throw err;
							console.log("Account Delete");
							db.close();
							res.end("Success")
						  });
						});
					});		
				});

			
			
			
	}else {

		sendFileContent(res, "cart.html", "text/html");

	}
		
					

		
}
	
	else if(req.url === "/deleteitem"){
	if (req.method === "POST") {
			console.log("Delete Item");
				formData = '';
				msg = '';
				return req.on('data', function (formData) {
				console.log("Prodtct Remove="+formData);
					stringMsg = formData;
					//console.log(stringMsg);
					return req.on('end', function () {
						console.log("Product Delete...");	
											MongoClient.connect(dbUrl, function(err, db) {
												if (err) throw err;
												var dbo = db.db("mydb");
												var myquery = { login : stringMsg.toString()};
												dbo.collection("favlist").deleteMany(myquery, function(err, obj) {
												if (err) throw err;
												console.log(obj.result.n + "Product Delete");
												db.close();
												res.end("Success")
												});
											});
					});		
				});

			
			
			
	}else {
		sendFileContent(res, "cart.html", "text/html");
	}
		
					

		
}
	else if(req.url === "/favlist"){
		if (req.method === "POST") {
				console.log("sending");
				formData = '';
				msg = '';
			return req.on('data', function (data) {
				formData += data;
				console.log(formData);
				info=formData.split("&");
				console.log(info[0]);//logid=XXX
				console.log(info[1]);//content=YYY
			  
			  
				return req.on('end', function () {
					var user;
					user = qs.parse(formData);

					msg = JSON.stringify(user);
				  
					for(i=0; i<1; i++){
						var c=info[i].split("=");
					}
				
					console.log(c[0]);
					console.log(c[1]);
				
					for(i=1; i<info.length; i++){
						
						var f=info[i].split("=");
						
					}
				
					console.log(f[0]);
					console.log(f[1]);
					
					stringMsg = JSON.parse(msg);
					
					

					var logid = c[1];

					var content = f[1];

					var items = { login: logid, cart: content, id: logid};
							
						MongoClient.connect(dbUrl, function(err, db) {
						if (err) throw err;
						
						var dbo = db.db("mydb");
						
						
						
							dbo.collection("favlist").insertOne(items, function(err, res) {
						
								if (err) throw err;
								console.log("Product Inserted");
								db.close();

							
							});
							res.end("Success");
						});
					});
				});
			
			
			
		}
		else {

			sendFileContent(res, "favlist.html", "text/html");
		}
		}



	
	
	
	else if(/^\/[a-zA-Z0-9\/-/]*.js$/.test(req.url.toString())){
		sendFileContent(res, req.url.toString().substring(1), "text/javascript");
	}else if(/^\/[a-zA-Z0-9\/-/]*.bundle.min.js$/.test(req.url.toString())){
		sendFileContent(res, req.url.toString().substring(1), "text/javascript");
	}else if(/^\/[a-zA-Z0-9\/-/]*.css$/.test(req.url.toString())){
		sendFileContent(res, req.url.toString().substring(1), "text/css");
	}else if(/^\/[a-zA-Z0-9\/-]*.min.css$/.test(req.url.toString())){
		sendFileContent(res, req.url.toString().substring(1), "text/css");
	}else if(/^\/[a-zA-Z0-9\/-]*.jpg$/.test(req.url.toString())){
		sendFileContent(res, req.url.toString().substring(1), "image/jpg");
	}else if(/^\/[a-zA-Z0-9-._\/]*.min.js$/.test(req.url.toString())){
		sendFileContent(res, req.url.toString().substring(1), "text/javascript");
	}else if(/^\/[a-zA-Z0-9-]*.min.css.map$/.test(req.url.toString())){
		sendFileContent(res, req.url.toString().substring(1), "text/map");
	}else if(/^\/[a-zA-Z0-9\/-/]*.min.js.map$/.test(req.url.toString())){
		sendFileContent(res, req.url.toString().substring(1), "text/map");
	}else if(/^\/[a-zA-Z0-9\/-/]*.css.map$/.test(req.url.toString())){
		sendFileContent(res, req.url.toString().substring(1), "text/map");
	}else if(/^\/[a-zA-Z0-9\/-/]*.png$/.test(req.url.toString())){
		sendFileContent(res, req.url.toString().substring(1), "image/png");
	}else if(/^\/[a-zA-Z0-9\/-/]*.ico$/.test(req.url.toString())){
		sendFileContent(res, req.url.toString().substring(1), "text/ico");
	}else if(/^\/[a-zA-Z0-9\/-/?]*.ttf$/.test(req.url.toString())){
		sendFileContent(res, req.url.toString().substring(1), "text/font");
	}else if(/^\/[a-zA-Z0-9\/-/?]*.woff$/.test(req.url.toString())){
		sendFileContent(res, req.url.toString().substring(1), "text/woff");
	}else if(/^\/[a-zA-Z0-9\/-/?]*.woff2$/.test(req.url.toString())){
		sendFileContent(res, req.url.toString().substring(1), "text/woff2");
	}else{
console.log("Requested URL is: " + req.url);
res.end();
}
	

}).listen(9999); //the server object listens on port 8080


function sendFileContent(response, fileName, contentType){
	fs.readFile(fileName, function(err, data){
		if(err){
			response.writeHead(404);
			response.write("Not Found!");
		}
		else{
			response.writeHead(200, {'Content-Type': contentType});
			response.write(data);
		}
		response.end(); 
	});
}