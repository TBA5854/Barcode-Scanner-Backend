const Official = require('./models/officialModel');
const Staff = require('./models/staffModel');
const Club = require('./models/clubModel');
const Student = require('./models/studentModel');
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const mongooose = require('mongoose')
const User = require('./models/authModels')
const port = 3000;

function authverify(req, res, next) {
    var incomimg_token: string = req.headers.authorization;
    console.log(incomimg_token);
    if (!incomimg_token) {
        res.json("No token");
    }
    incomimg_token = incomimg_token.split(' ')[1];
    if (!incomimg_token) {
        res.json("No token");
    }
    console.log(incomimg_token);
    jwt.verify(incomimg_token, 'This is supposed to be secret , made with <3 by tba', (err, decodedtoken) => {
        if (err) {
            console.log(err);
            res.json("Not verified");
        }
        else {
            console.log(decodedtoken);
            // res.json("Verified");
            next();
            // res.json("Not verified");
        }
        // next();
    });
}

app.use(express.json());

mongooose.connect('mongodb://eve:1234@localhost:27017/Events')

type user = {
    _id: string,
    email: string,
    password: string,
    __v: number,
}

app.post('/signup-student', authverify, officialAuth, async (req, res) => {
    var email: string = req.body.email;
    var password: string = req.body.password;
    var name: string = req.body.name;
    var regNo: string = req.body.regNo;
    var clubs: Array<string> = req.body.clubs;
    var board: Array<string> = req.body.board;

    if (await User.exists({ "email": (email) })) {
        res.json({ "route": "login", "info": "User Already Exists" })
    }
    else {
        try {
            var profile = await Student.create({ regNo, clubs, board });
            var profile_id = profile._id;
            var user = await User.create({ name, email, password, profile: profile_id });
            console.log(user._id);
            var user_id = user._id;
            var token = jwt.sign({ user_id }, 'This is supposed to be secret , made with <3 by tba', { expiresIn: '180d' });
            res.status(201).json({ token, user, profile });
        } catch (err) {
            console.log({ regNo, clubs, board })
            res.status(500).send(err.message);
        }
    }
})

app.post('/signup-staff', authverify, officialAuth, async (req, res) => {
    // await officialAuth(req, res);
    // return/;
    var email: string = req.body.email;
    var password: string = req.body.password;
    var name: string = req.body.name;
    var club: string = req.body.club;
    var empid: number = req.body.empid;

    if (await User.exists({ "email": (email) })) {
        res.json({ "route": "login", "info": "User Already Exists" })
    }
    else {
        try {
            var profile = await Staff.create({ empid, club });
            var profile_id = profile._id;
            var user = await User.create({ name, email, password, profile: profile_id });
            console.log(user._id);
            var user_id = user._id;
            var token = jwt.sign({ user_id }, 'This is supposed to be secret , made with <3 by tba', { expiresIn: '180d' });
            res.status(201).json({ token, user, profile });
        } catch (err) {
            // console.log({ regNo, clubs, board })
            res.status(500).send(err.message);
        }
    }
})

app.post('/login', async (req, res) => {
    var email: string = req.body.email;
    var password: string = req.body.password;
    // console.log({ email,password })
    const loggingUser: Array<user> = await User.find({ email, password }).exec();
    console.log(loggingUser)
    if (loggingUser.length == 0) {
        res.json({ "route": "login", "info": (await User.exists({ "email": (email) })) ? "Password Incorrect" : "User Doesn't Exists" })
    }
    res.end()
})






app.get('/test', staffAuth, async (req, res) => {
    // console.log(jwt.verify(req.headers.authorization.split(" ")[1],'This is supposed to be secret , made with <3 by tba').user_id)
    try {
        var id = jwt.verify(req.headers.authorization.split(" ")[1], 'This is supposed to be secret , made with <3 by tba').user_id
        // var loggedInUserProfile = await Official.findById(loggedInUser.profile) 
        console.log(id)
        console.log(await staffcoordauth('668455f46dd8eaf1f83fa22a', id))
        console.log(await User.findById(id))

        res.end()
    } catch (error) {
        res.status(400).send(error)
    }

})
app.post('/jwt', (req, res) => {
    var user_id = req.body.id
    console.log(jwt.sign({ user_id }, 'This is supposed to be secret , made with <3 by tba', { expiresIn: '180d' }));
    res.end()
})






app.listen(port);

async function officialAuth(req: any, res: any, next: Function) {
    try {
        const token = jwt.verify(req.headers.authorization.split(" ")[1], 'This is supposed to be secret , made with <3 by tba');
        var loggedInUser = await User.findById(token.user_id);
        // console.log(loggedInUser)
        var loggedInUserProfile = await Official.findById(loggedInUser.profile);
        if (loggedInUserProfile == null || loggedInUserProfile.role != "TBA") {
            // console.log("loggedInUserProfile")

            res.status(404).send("Not Authorised");
        }
        else {
            // res.send("Authorised");
            next();
        }
    } catch (error) {
        res.send(error)
    }
}

async function staffAuth(req: any, res: any, next: Function) {
    try {
        const token = jwt.verify(req.headers.authorization.split(" ")[1], 'This is supposed to be secret , made with <3 by tba');
        console.log(token)
        var loggedInUser = await User.findById(token.user_id);
        // console.log(loggedInUser)
        var loggedInUserProfile = await Staff.findById(loggedInUser.profile);
        if (loggedInUserProfile == null) {
            // console.log("loggedInUserProfile")

            res.status(404).send("Not Authorised");
        }
        else {
            // res.send("Authorised");
            next();
        }
    } catch (error) {
        res.send(error)
    }
}

async function staffcoordauth(clubId: string, staffId: string) {
    console.log(staffId)
    if (staffId == undefined) {
        return false;
    }
    if (await Club.find({ staff: staffId }) != null) {
        return true;
    }
    return false;
}