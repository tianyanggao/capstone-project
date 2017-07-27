# Capstone-project skills assessment preparation
# Synopsis

This project aims to build a file upload server using node.js that allow user to upload images and response with the link to access the image.The two objectives are followed:

1.allowing using to upload single image 
2.allowing user to uoload a zip file and get a list of images URL.

# Code Example
Two main module are required.They are formidable and decompress-zip.

formidable module is a very good module for working with file uploads

var http = require('http');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
  res.write('<input type="file" name="filetoupload"><br>');
  res.write('<input type="submit">');
  res.write('</form>');
  return res.end();
}).listen(8080);

The decompress-zip is used to extracts the contents of the ZIP archive file

unzipper.extract({
      	    path: 'files/',
      	    filter: function (file) {
      	        return file.type !== "SymbolicLink";
      	    }
      	});
        
 # Motivation
The purrpose of setting this project is to test the skills of team members.

# Installation
The project is run on eclipse within a javasript project.
