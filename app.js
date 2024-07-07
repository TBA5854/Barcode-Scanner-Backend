var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var Official = require('./models/officialModel');
var Staff = require('./models/staffModel');
var Club = require('./models/clubModel');
var Student = require('./models/studentModel');
var express = require('express');
var app = express();
var jwt = require('jsonwebtoken');
var mongooose = require('mongoose');
var User = require('./models/authModels');
var port = 3000;
function authverify(req, res, next) {
    var incomimg_token = req.headers.authorization;
    console.log(incomimg_token);
    if (!incomimg_token) {
        res.json("No token");
    }
    incomimg_token = incomimg_token.split(' ')[1];
    if (!incomimg_token) {
        res.json("No token");
    }
    console.log(incomimg_token);
    jwt.verify(incomimg_token, 'This is supposed to be secret , made with <3 by tba', function (err, decodedtoken) {
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
mongooose.connect('mongodb://eve:1234@localhost:27017/Events');
app.post('/signup-student', authverify, officialAuth, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var email, password, name, regNo, clubs, board, profile, profile_id, user, user_id, token, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = req.body.email;
                password = req.body.password;
                name = req.body.name;
                regNo = req.body.regNo;
                clubs = req.body.clubs;
                board = req.body.board;
                return [4 /*yield*/, User.exists({ "email": (email) })];
            case 1:
                if (!_a.sent()) return [3 /*break*/, 2];
                res.json({ "route": "login", "info": "User Already Exists" });
                return [3 /*break*/, 6];
            case 2:
                _a.trys.push([2, 5, , 6]);
                return [4 /*yield*/, Student.create({ regNo: regNo, clubs: clubs, board: board })];
            case 3:
                profile = _a.sent();
                profile_id = profile._id;
                return [4 /*yield*/, User.create({ name: name, email: email, password: password, profile: profile_id })];
            case 4:
                user = _a.sent();
                console.log(user._id);
                user_id = user._id;
                token = jwt.sign({ user_id: user_id }, 'This is supposed to be secret , made with <3 by tba', { expiresIn: '180d' });
                res.status(201).json({ token: token, user: user, profile: profile });
                return [3 /*break*/, 6];
            case 5:
                err_1 = _a.sent();
                console.log({ regNo: regNo, clubs: clubs, board: board });
                res.status(500).send(err_1.message);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
app.post('/signup-staff', authverify, officialAuth, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var email, password, name, club, empid, profile, profile_id, user, user_id, token, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = req.body.email;
                password = req.body.password;
                name = req.body.name;
                club = req.body.club;
                empid = req.body.empid;
                return [4 /*yield*/, User.exists({ "email": (email) })];
            case 1:
                if (!_a.sent()) return [3 /*break*/, 2];
                res.json({ "route": "login", "info": "User Already Exists" });
                return [3 /*break*/, 6];
            case 2:
                _a.trys.push([2, 5, , 6]);
                return [4 /*yield*/, Staff.create({ empid: empid, club: club })];
            case 3:
                profile = _a.sent();
                profile_id = profile._id;
                return [4 /*yield*/, User.create({ name: name, email: email, password: password, profile: profile_id })];
            case 4:
                user = _a.sent();
                console.log(user._id);
                user_id = user._id;
                token = jwt.sign({ user_id: user_id }, 'This is supposed to be secret , made with <3 by tba', { expiresIn: '180d' });
                res.status(201).json({ token: token, user: user, profile: profile });
                return [3 /*break*/, 6];
            case 5:
                err_2 = _a.sent();
                // console.log({ regNo, clubs, board })
                res.status(500).send(err_2.message);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
app.post('/login', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var email, password, loggingUser, _a, _b, _c;
    var _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                email = req.body.email;
                password = req.body.password;
                return [4 /*yield*/, User.find({ email: email, password: password }).exec()];
            case 1:
                loggingUser = _e.sent();
                console.log(loggingUser);
                if (!(loggingUser.length == 0)) return [3 /*break*/, 3];
                _b = (_a = res).json;
                _d = { "route": "login" };
                _c = "info";
                return [4 /*yield*/, User.exists({ "email": (email) })];
            case 2:
                _b.apply(_a, [(_d[_c] = (_e.sent()) ? "Password Incorrect" : "User Doesn't Exists", _d)]);
                _e.label = 3;
            case 3:
                res.end();
                return [2 /*return*/];
        }
    });
}); });
app.get('/test', staffAuth, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var id, _a, _b, _c, _d, error_1;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _e.trys.push([0, 3, , 4]);
                id = jwt.verify(req.headers.authorization.split(" ")[1], 'This is supposed to be secret , made with <3 by tba').user_id;
                // var loggedInUserProfile = await Official.findById(loggedInUser.profile) 
                console.log(id);
                _b = (_a = console).log;
                return [4 /*yield*/, staffcoordauth('668455f46dd8eaf1f83fa22a', id)];
            case 1:
                _b.apply(_a, [_e.sent()]);
                _d = (_c = console).log;
                return [4 /*yield*/, User.findById(id)];
            case 2:
                _d.apply(_c, [_e.sent()]);
                res.end();
                return [3 /*break*/, 4];
            case 3:
                error_1 = _e.sent();
                res.status(400).send(error_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.post('/jwt', function (req, res) {
    var user_id = req.body.id;
    console.log(jwt.sign({ user_id: user_id }, 'This is supposed to be secret , made with <3 by tba', { expiresIn: '180d' }));
    res.end();
});
app.listen(port);
function officialAuth(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var token, loggedInUser, loggedInUserProfile, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    token = jwt.verify(req.headers.authorization.split(" ")[1], 'This is supposed to be secret , made with <3 by tba');
                    return [4 /*yield*/, User.findById(token.user_id)];
                case 1:
                    loggedInUser = _a.sent();
                    return [4 /*yield*/, Official.findById(loggedInUser.profile)];
                case 2:
                    loggedInUserProfile = _a.sent();
                    if (loggedInUserProfile == null || loggedInUserProfile.role != "TBA") {
                        // console.log("loggedInUserProfile")
                        res.status(404).send("Not Authorised");
                    }
                    else {
                        // res.send("Authorised");
                        next();
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    res.send(error_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function staffAuth(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var token, loggedInUser, loggedInUserProfile, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    token = jwt.verify(req.headers.authorization.split(" ")[1], 'This is supposed to be secret , made with <3 by tba');
                    console.log(token);
                    return [4 /*yield*/, User.findById(token.user_id)];
                case 1:
                    loggedInUser = _a.sent();
                    return [4 /*yield*/, Staff.findById(loggedInUser.profile)];
                case 2:
                    loggedInUserProfile = _a.sent();
                    if (loggedInUserProfile == null) {
                        // console.log("loggedInUserProfile")
                        res.status(404).send("Not Authorised");
                    }
                    else {
                        // res.send("Authorised");
                        next();
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _a.sent();
                    res.send(error_3);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function staffcoordauth(clubId, staffId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log(staffId);
                    if (staffId == undefined) {
                        return [2 /*return*/, false];
                    }
                    return [4 /*yield*/, Club.find({ staff: staffId })];
                case 1:
                    if ((_a.sent()) != null) {
                        return [2 /*return*/, true];
                    }
                    return [2 /*return*/, false];
            }
        });
    });
}
