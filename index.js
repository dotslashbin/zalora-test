const express 		= require('express')
const hbs 			= require('hbs')

const formidable 	= require('formidable')
const http 			= require('http')
const util 			= require('util')
const fs 			= require('fs-extra')
const os  			= require('os')

const app 			= express()
const port 			= 8008

const helper 		= require('./helpers/helper.js')

const uploadFolder 	= __dirname + '/uploads/'

app.set('view engine', 'hbs')

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {

	// helper.loadListOfFiles(uploadFolder, renderIndex)

	// console.log(files)

	// res.render('index.hbs', { title: "jambawamba", foo:"foobar", files_container: "<ol>" + files + "</ol>" })

	helper.loadListOfFiles(uploadFolder, (files) => {
		res.render('index.hbs', { title: "jambawamba", foo:"foobar", files_container: files })
	})
})

app.get('/about', (req, res) => {
	res.render('about.hbs', { title: "jambawamba", foo:"bar"})
})

app.post('/', (req, res) => {

	if (req.url == '/' && req.method.toLowerCase() == 'post') {

		var form = new formidable.IncomingForm();

		form.uploadDir = uploadFolder

		form.parse(req)

		form.on('file', (name, file) => {
			if(file.size > 0)
			{

				fs.rename(file.path, uploadFolder + file.name)

				fs.readdir(uploadFolder, (error, files) => {
					if(error == null) {

						helper.loadListOfFiles(uploadFolder, (files) => {
							res.render('index.hbs', { title: "jambawamba", foo:"foobar", files_container: files })
						})
					} else {
						res.render('index.hbs', { title: "jambawamba"})
					}
				});
				
			} else {
				res.render('index.hbs', { title: "jambawamba", foo:"foobar", 'errorMessage':"No files uploaded..." })
			}
		})

	}

})

// ORIGINAL WORKING VERSION BEFORE PROMISES
/** 
 * app.post('/delete', (req, res) => {
	var form = new formidable.IncomingForm();

	form.parse(req, (error, fields, files) => {
		if(error == null) {

			var fileName = fields.file_to_delete

			try {
				fs.unlink(uploadFolder + fileName, () => {
					console.log("File deleted...")
				});

				helper.loadListOfFiles(uploadFolder, (files) => {
					res.render('index.hbs', { title: "jambawamba", foo:"foobar", files_container: files })
				})
			} catch(error) {

			}
		}
	})
})
 */

app.post('/delete', (req, res) => {
	var form = new formidable.IncomingForm();

	form.parse(req, (error, fields, files) => {
		if(error == null) {

			var fileName = fields.file_to_delete

			helper.fileDeleteThing(uploadFolder+fileName).then(
				(message) => {
					helper.loadListOfFiles(uploadFolder, (files) => {
						res.render('index.hbs', { title: "jambawamba", foo:"foobar", files_container: files, message:message })
					})
				}, 
				(errorMessage) => {
					console.log("FAILED: " + errorMessage)
					helper.loadListOfFiles(uploadFolder, (files) => {
						res.render('index.hbs', { title: "jambawamba", foo:"foobar", files_container: files, message:errorMessage })
					})
				}, 
			)

		}
	})
})

app.listen(port, () => {
	console.log("RUNNING ON PORT: " + port)
})