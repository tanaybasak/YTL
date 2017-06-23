


var d = new Buffer("nitins:nitins").toString('base64');
console.log(" d " ,d);

var bcrypt = require("bcrypt-nodejs");
var hash = bcrypt.hashSync("nitins");

console.log(" --hash ", hash);

var c = bcrypt.compareSync("nitins", hash);

console.log("comp ", c);