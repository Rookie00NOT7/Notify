# ACML-HAM

# How to run the server (BACKEND):
    1- The node server runs on port 5000.
    2- to run the server, install the dependancies first.. using the "npm i --save" command.
    3- run the server using the "node server.js" command.
# How to run the app (FRONTEND):
    1- The app runs in port 3000.
    2- to run the app, go to my app dir using the "cd my-app" command... then install the dependancies first.. using the "npm i --save" command.
    3- run the app using the "npm start" command.
# NOTE: Make sure you're running both the server and the app together while testing.

# DOCKER:
    for docker, use the "docker-compose up --build" command in the docker terminal.

# GUIDELINES:
    * Once you open the app, you should see the registeration page... register.
    * You should register (sign up) first before logging in.
    * After registeration, you will be automatically redirected to the login page... Log in.
    * After that, you will be redirected to your profile page.
    * If you are a student, you should be able to ONLY receive notifications from Doctors and TAs, and edit your profile if you want.
    * If you are a Dr/TA, you should be able to send notifications to TAs and students(if you're a Dr), send notifications only to students(if you're a TA), and to view All notifications that you sent to people.

# HOST:
    * write your localhost

# KEYS_DEV:
    * create a file called DEVkeys.js, and input your development variables inside as follows:
    module.exports = {
    accountSid : 'your twilio accountSid',
    authToken : 'your twilio authToken',
    email : '<your nodemailer email>@gmail.com',
    emailPass : '<your nodemailer password>'
    }

# DB_CONFIG:
    * create a file called DBconfig.js, and input your Database URL in it as follows:
    const url = "your url goes here"

    module.exports = url


    