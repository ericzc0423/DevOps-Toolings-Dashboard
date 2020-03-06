var express = require('express')
,bodyParser = require('body-parser');
var app = express();
var cors = require('cors');
app.use(cors());
var fs = require('fs');
const exec = require('child_process').exec;

//app.use(express.bodyParser());

app.get('/endpoint', function(req, res){
	var obj = {}
	/*
	obj.title = 'title';
	obj.data = 'data';
	
	console.log('params: ' + JSON.stringify(req.params));
	console.log('body: ' + JSON.stringify(req.body));
	console.log('query: ' + JSON.stringify(req.query));
	*/
	res.header('Content-type','application/json');
	res.header('Charset','utf8');
	res.send(req.query.callback + '('+ JSON.stringify(obj) + ');');
});
app.use(bodyParser.json())

app.post('/endpoint', function(req, res){
	var obj = {};
//	console.log('body: ' + JSON.stringify(req.body));
	//res.send(req.body);
	console.log(req.body);      // your JSON
   res.send(req.body);    // echo the result back
let obj1=req.body;
	fs.writeFileSync('./JSON/data.json', JSON.stringify(obj1))
});

/*
app.post('/endpoint', function(req, res){
        var obj = {};
//      console.log('body: ' + JSON.stringify(req.body));
        //res.send(req.body);
        console.log(req.body);      // your JSON
   res.send(req.body);    // echo the result back
let obj1=req.body;
        fs.writeFileSync('./JSON/data.json', JSON.stringify(obj1))
});
*/

app.get('/ansible-ping', function(req, res){
exec('ansible-playbook "/etc/ansible/ping-1.yml" ', (e, stdout, stderr)=> {
    if (e instanceof Error) {
        console.error(e);
        throw e;
    }
   // console.log('stdout ', stdout);
   // console.log('stderr ', stderr);
res.send(stdout)
});

});
app.listen(3000);
