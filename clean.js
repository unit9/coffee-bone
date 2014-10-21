var fs  = require('fs');
var ncp = require('ncp').ncp;

function removeFile(file) {
    fs.unlink(file, function (err) {
        if (err) return console.log(err);
        console.log('Cleaning: deleted file ' + file + '.');
    });
}

function deleteFolderRecursive(path) {
  if( fs.existsSync(path) ) {
      fs.readdirSync(path).forEach(function(file,index) {
        var curPath = path + "/" + file;
          if(fs.statSync(curPath).isDirectory()) { // recurse
              deleteFolderRecursive(curPath);
          } else { // delete file
              fs.unlinkSync(curPath);
          }
      });
      fs.rmdirSync(path);      
    }
};

ncp("node_modules/coffeebone", ".", function (err) {
    if (err) {
        return console.error(err);
    }

    console.log('Coffeebone successfully moved.');
    deleteFolderRecursive('./node_modules/coffeebone');
    console.log('Cleaning: deleted folder ' + './node_modules/coffeebone' + '.');
    removeFile('./clean.js');
});