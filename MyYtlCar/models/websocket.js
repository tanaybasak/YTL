var dashDBClient = require('../dashDB');
var bcrypt = require("bcrypt-nodejs");
var ibmdb = require('ibm_db');


global.dbConnString = "DATABASE=BLUDB;"
    + "HOSTNAME=dashdb-entry-yp-dal09-08.services.dal.bluemix.net;"+"PORT=50000;"+"PROTOCOL=TCPIP;"
    + "UID=dash13563;"+"PWD=017de7305602";



var socket = {
 
	fetch: function(driver_id){
		ibmdb.open(dbConnString, function(err, conn) 
                {
                        if (err) {
                            console.log("Error", err);
                        } else {
                    
                    
                    
                    var query = "SELECT * FROM TRIP_ROUTES WHERE TRIP_ROUTES.DRIVER_ID='"+driver_id+"'ORDER BY ID DESC LIMIT 1";
                    
                    conn.query(query, function(err, rows) {
                        if (err) {
                            console.log("Error", err);
                            return;
                        } else {
                            
                           
                                    console.log(rows[0].TIMESTAMP);
                                    connection.send(JSON.stringify(rows));
                                                                
                                    }
                            }); 
                                                   
                        } 
                }) 
            };
	
};
 

 
module.exports = socket;