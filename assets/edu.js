socket=io();
socket.on('connect',function()
{
	console.log("Connected to Server.");
})
socket.on('ans',function(ans)
{
	console.log(ans);
})

$("#chat-input").on('submit',function(e)
{
	var message=$("#chat").val();
	window.scrollTo(0,document.body.scrollHeight);
	$(".result").append(`<div class="user-req" style="
	display: inline-block;
  padding: 15px 25px;
  border: 1px solid #eee;
  border-radius: 3px;
  margin-bottom: 5px;
  font-size: 16px;
  background-color: #efefef;
  float: left;
  margin-right: 15px;
  margin-top: 15px;
  margin-left: 15px;
	clear: both;
	">${message}</div><br>`)
	window.scrollTo(0,document.body.scrollHeight);
	e.preventDefault();
	socket.emit('question',
	{
		ques:$("#chat").val()
	});
});
socket.on('ans',function(message){
	window.scrollTo(0,document.body.scrollHeight);
	$(".result").append(`<div class="server-res" style="
	color: white;
	background-color: #4286f4;
	float: right;
	margin-top: 15px;
	margin-right: 15px;
	margin-left: 15px;
	display: inline-block;
	padding: 15px 25px;
	border-radius: 3px;
	border: 1px solid #eee;
	margin-bottom: 75px;
	font-size: 16px;
	font-weight: 300;
	clear: both;
	max-width:600px;
	">${message}</div><br>
	`);
	window.scrollTo(0,document.body.scrollHeight);
});
// function ScrollToBottom() {
// 	window.scrollTo(0,document.body.scrollHeight);
// }
// socket.on('newMessage',function(message){
//  	// console.log("new message from:",message.from,"\nmessage: ",message.message,"\nCreated At: ",message.time);
//  	$("#list").append(`<li>${message.from}:${message.message}</li>`);
//  	setPos();
//  });
// window.scrollTo(0,document.body.scrollHeight);
// $("body").scrollTop(10000000);
// setInterval(()=>{
// 	window.scrollTo(0,document.body.scrollHeight);
// },100);
