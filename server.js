var http = require('http');
var formidable = require('formidable');
var fs = require('fs');
var unzip = require('unzip');
var DecompressZip = require('decompress-zip');

http.createServer(function (req, res) {
	//console.log(http.address())
  if (req.url == '/fileupload') {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      var oldpath = files.filetoupload.path;
      var newpath = 'files/' + files.filetoupload.name;
      console.log(newpath)
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        
        var f = files.filetoupload.name.split(".");
        var append = f[f.length - 1];
        
        if (append == "zip") {
        	
      	  console.log("is zip file")
      	  var unzipper = new DecompressZip(newpath)
      	unzipper.on('error', function (err) {
      	    console.log('Caught an error');
      	  
      	});
      	 
      	unzipper.on('extract', function (log) {
      		console.log(files.filetoupload.name.lastIndexOf("."))
      		var d = files.filetoupload.name.substring(0, files.filetoupload.name.lastIndexOf("."))
      		console.log(d)
      		var dir = "files/" + d + "/"
      		fs.readdir(dir, (err, files) => {
      		  files.forEach(file => {
      		    res.write("http://localhost:8000/" + dir + file + "\n");
      		  });
      		  res.end();
      		})
      	    console.log('Finished extracting');
      	});
      	unzipper.on('progress', function (fileIndex, fileCount) {
      	    console.log('Extracted file ' + (fileIndex + 1) + ' of ' + fileCount);
      	});
      	
      	unzipper.on('list', function (files) {
      	    console.log('The archive contains:');
      	    console.log(files);
      	   
      	});
      	 
      	
      	
      	
      	unzipper.extract({
      	    path: 'files/',
      	    filter: function (file) {
      	        return file.type !== "SymbolicLink";
      	    }
      	});
      	
      	//unzipper.list();
      	
        }
        res.write('File uploaded and moved!' + "\n");
        //res.end();
      });
      
 });
  } else {
	  
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
  }
}).listen("8000");

