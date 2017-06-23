var dashDBClient = require('../dashDB');
var bcrypt = require("bcrypt-nodejs");

var users = {
 
	authenticate: function(username, password, next){
		dashDBClient.getConnection().then(function(db){
			//var query = "SELECT USERID, USERNAME, PASSWORD, FIRST_NAME, LAST_NAME, EMAIL FROM USERS WHERE USERNAME='"+username+"' AND STATUS=1";
			var query = "SELECT USERS.USERID, USERS.USERNAME, USERS.PASSWORD, USERS.FIRST_NAME, USERS.LAST_NAME, USERS.EMAIL, CARS.MO_ID,CARS.CAR_NAME FROM USERS,CARS WHERE USERS.USERNAME='"+username+"' AND USERS.STATUS=1 AND USERS.USERNAME= CARS.USERNAME"; 
			console.log("---query ", query);
			db.query(query, function (err, rows) 
			{
				//console.log("---------------rows ", rows);
				if (err) {
					next(err);
				} else {
					if(rows && rows.length > 0){
						var hash = rows[0].PASSWORD;
						if(bcrypt.compareSync(password, hash)){
							next(null, rows[0]);
						}else{
							next('invalid password', null);
						}
					}else{
						next('invalid username', null);
					}
				}
				db.close(function(){});
			});
			
		});
	},
	getAll: function(req, res, next) {
		var allusers = data; // Spoof a DB call
		next(null, allusers);
	}
};
 
var data = [{
  name: 'user 1',
  id: '1'
}, {
  name: 'user 2',
  id: '2'
}, {
  name: 'user 3',
  id: '3'
}];
 
module.exports = users;