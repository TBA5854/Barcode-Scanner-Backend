const jwt = require('jsonwebtoken');
const mongooose = require('mongoose')
const User = require('./models/authModels')

mongooose.connect('mongodb://eve:1234@localhost:27017/Events')

var tmp = async () => {
    var t =[]
    t = await User.find({}, { "_id": 1 })
    return t
}
async function test() {
    // setTimeout(() => {
    //     console.log(h)
    // }, 5000);
    var h = await tmp().then(
        (ok:any) => {
            console.log("Hello")
            ok.forEach(element => {
                // console.log(element)
                var ele = element._id;
                console.log(jwt.sign({ ele }, 'This is supposed to be secret , made with <3 by tba', { expiresIn: '180d' }));
            });
            return ok
        },
        (err: never[]) => {
        // if (err) {
            return []
        // }
    },

    );

    
}
test();