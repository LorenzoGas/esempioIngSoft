var express = require("express");
var bodyParser = require("body-parser");

var app = express();
var router = express.Router();
var port = process.env.PORT || 8080;
var db = new Array();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
class assignment{
   constructor(ass_id,ass_type,student,content){
       this.ass_id = ass_id;
       this.ass_type = ass_type;
       this.student = student;
       this.content = content;
   }
}
db.push(new assignment(1234, "tipo", "The Bunk", "content"));

router.get('/', function (req, res) {
    res.json({message: 'welcome to the test!'});    
});

router.route('/functionality')
    .get(function (req, res) {
        console.log('GET');
        res.send(db);
    })
    .post(function (req, res) {
        console.log('POST');
        db.push(new assignment(req.body.ass_id, req.body.ass_type,req.body.student,req.body.content));
        console.log('added id: '+req.body.ass_id+' to DB');
        res.send(db[db.length-1]);
    })

router.route('/functionality/:id')
    .delete(function (req, res) {
        console.log('DELETE');
        const id = req.params.id;
        if (!id) res.sendStatus(404);
        const index = db.findIndex(assignment => {return assignment.ass_id === id});
        db.delete(index);
        console.log('deleted item id: '+id);
        res.sendStatus(204);
    })

app.use('/api', router);

app.listen(port, function () {
    console.log('App listening on port '+ port);
});
    