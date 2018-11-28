const fs = require('fs'); 

var loadListOfFiles = (path, callback) => {
	fs.readdir(path, (error, files) => {
		if(error == null) {
			var container = []; 
			files.forEach( file => {

				if(file != '.DS_Store')
				{
					container.push({ filename: file})
				}
			})
		} 

		callback(container)
	});
}

var fileDeleteThing = (fileToDelete) => {
	return new Promise((resolve, reject) => {

		try {
			fs.unlink(fileToDelete, (error) => {
				console.log("File deleted...")

				if(error) {
					reject("There was a problem deleting the file...")
				} else {
					resolve("File has been deleted")					
				}
			});
		} catch(error) {
			reject("There was a problem deleting the file...")
		}
	})
}

module.exports = {
	loadListOfFiles, 
	fileDeleteThing
}