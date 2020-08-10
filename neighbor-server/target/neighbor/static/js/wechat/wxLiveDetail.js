mui.init()
mui('.mui-scroll-wrapper').scroll();
var ws = new WebSocket('ws://' + '139.196.235.228' + ':8878');
var msgObj = {};
var liverName = $('body').data('liverName');
var liverId = $('body').data('liverId');
var userId = $('body').data('userId');
ws.onopen = function(evt) {
	heartCheck.start();
	msgObj.status = 'onopen';
	msgObj.roomId = $('body').data('roomId');
	msgObj.userId = $('body').data('userId');
	msgObj.userName = $('body').data('userName');
	msgObj.levelName = $('body').data('levelName');
	ws.send(JSON.stringify(msgObj));
	$('#liveVideoChatSend').addClass('live-msg-send');
	$('#liveVideoChatInput').removeAttr('readonly').val('');
};

ws.onmessage = function(evt) {
	heartCheck.reset();
	console.log(evt.data);
	var item  = '';
	var o = JSON.parse(evt.data);
	if(o.type == 'system'){
		item = sysNote(o)
	}
	if(o.type == 'msg'){
		item = chatHtml(o)
	}
	$('ul.live-chat-ul').append(item.html);
};

ws.onclose = function(evt) {
	ws = new WebSocket('ws://' + '139.196.235.228' + ':8878');
};

$('body').on('tap','.live-msg-send',function(){
	if($('#liveVideoChatInput').val() !=''){
		msgObj.status = 'onmessage';
		msgObj.message = $('#liveVideoChatInput').val();
		ws.send(JSON.stringify(msgObj));
		$('#liveVideoChatInput').removeAttr('readonly').val('');
	}
})

$('body').on('tap','#liveVideoChatInput',function(){
	var target = this;
	setTimeout(function(){
		 target.scrollIntoView(true);
	},100)
})


function chatHtml(o){
	var r = {};
	if(o.userId == userId){
		o.userName = '我';
	}
	if(o.userId == liverId){
		html = '<li class="live-chat-item live-chat-liver"><em class="live-chat-menber-level">' + o.levelName;
		html += '</em>' + o.userName; 
		html += ':<span>' + o.message;
		html += '</span></li>'
	}else{
		html = '<li class="live-chat-item"><em class="live-chat-menber-level">' + (o.levelName == '' ? '微信用户' : o.levelName);
		html += '</em>' + o.userName; 
		html += ':<span>' + o.message;
		html += '</span></li>'
	}
	r.html = html;
	return r;
}

function sysNote(o){
	var r = {};
	r.html = '<div class="live-system-item">' + o.message + '</div>'
	r.onlineNumber = o.onlineNumber;
	return r;
}

var heartCheck = {
	    timeout: 60000,//60s
	    timeoutObj: null,
	    reset: function(){
	        clearTimeout(this.timeoutObj);
	　　　　 this.start();
	    },
	    start: function(){
	        this.timeoutObj = setTimeout(function(){
	            ws.send('{status:"heart"}');
	        }, this.timeout)
	    }
	}