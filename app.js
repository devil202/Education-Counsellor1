var express=require("express"),
	socketIO=require('socket.io'),
	apiai=require("apiai"),
	http=require('http'),
	app=express();
	server=http.createServer(app),
	io=socketIO(server),

app.use(express.static('assets'));
app.set('view engine','ejs');

var api=apiai("fc37b7698854469caa1f6b5c6c40aa66");
 
function getAns(Question,callback) 
{
	var request = api.textRequest(Question.ques, {
    sessionId: '2363219a42fb448e828d114aedeacdd5'
	});

	request.on('response', function(response) {
	   callback(response); 
	});
	request.on('error', function(error) {
	   	callback('');
	});
	 
	request.end();

}

app.get("/",function(req,res)
{
	res.render('index');
});

app.get("/chat",function(req,res)
{
	res.render('chat');
});

io.on('connection',function(socket){
	console.log("user connected.");
	socket.on('question',function(message)
	{
		getAns(message,function(ans){
			if(ans!='')
				socket.emit('ans',ans.result.fulfillment.speech);
		});
	});
	socket.on('disconnect',function(){
			console.log("Connection Disconnected");
		});
});
server.listen(3000,function() {
	console.log("Messenger Online....");
});



