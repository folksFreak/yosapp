function maximize(html_val, callback){
	$('#header').animate({height:"6%"},500,"linear",function(){
		//change content here
	});
	$('#footer').animate({height:"6%"},500,"linear",function(){
		//change content here
	});
	$('#bodybg').animate({height:"88%"},500);
	$('#bodybg').fadeOut(500, function(){
		$('#bodybg').html(html_val);
		$('#bodybg').css('background-color','white');
		$('#bodybg').fadeIn(400);
		if(callback) {
			callback();
		}
	});
}

//Logs in a user upon successful login
function log_in_user() {
	maximize(YW.CHATSCREEN())
}



/*

// tooltip that moves relative to the pointer

var tooltipSpan = document.getElementById('usernameLoginTooltip');
var initialLeft = parseInt($('#usernameLoginTooltip').css('left'));
var initialTop = parseInt($('#usernameLoginTooltip').css('top'));
window.onmousemove = function (e) {
    var x = e.clientX,
        y = e.clientY;
    
    tooltipSpan.style.left = (x-initialLeft-10) + 'px';
};
*/