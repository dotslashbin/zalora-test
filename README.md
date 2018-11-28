# zalora-test

Submitted by: Joshua Fuentes <joshuarpf@gmail.com>

[ Description ]
This is a simple application that demonstrates a few fetures in a typical web application using nodejs as the development platform, together with other modules integrated to it. This is not meant to be a full blown application, and is in no way ready for production. The demonstration includes the following: 

1. Basic nodejs platform
2. Use of "express", a famous nodejs development framework and web server
3. Use of "formidable" , for form parsing
4. Use of an HTML template engine called Handlebars
5. Funcitonal programming, implementing callback functions
6. Utilization of ES6 

Note:
I have just gotten back to funcational programming after a couple of years of strictly doing object oriented approaches, so I am aware that there is a big room for improvement on this one. I welcome all constructive criticisms, and please do criticize as it will help me be better at this.

[ Assumptions ]
Before everything else, I would like to point out that this is intended for an audience who has prior knowledge to this test. I will assume that the user is capable of using git, nodejs, and docker for this matter. There are three installation guides below, where the last two invovles a docekrized application. 

[ Installation guide - Part 1: running from a local nodejs installaton ]
1. Clone the repository 
2. Go to the project folder
3. run "npm install"
4. run the main script with the command "node index.js"
5. Check the terminal to see if the app is running without errors. 
	- It should say "RUNNING ON PORT: 8008" if it was done correctly


[ Installation guide - Part 2: building from docker ]
1. Clone the repository 
2. Go to the project folder. 
3. Build your docker image: 
   - $ docker build -t <your username>/node-web-app .
4. Run your docker image: 
   - docker run -p <your port>:8008 -d <your username>/zalora-test
5. Run your brower and go to localhost:<your port

[ Installation guide - Part 3: re-using a public docker image ]
1. Pull the docker image
   - docker pull dotslashbin/zalora-test
2. Run your docker image: 
   - docker run -p <your port>:8008 -d dotslashbin/zalora-test
3. Run your brower and go to localhost:<your port>

