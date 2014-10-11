var ncp = require('ncp').ncp;

ncp("node_modules/coffeebone", ".", function (err) {
 if (err) {
   return console.error(err);
 }
 console.log('Coffebone successfully moved.');
});