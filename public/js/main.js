// chart
var data = [{
	labels: ["책과 유투브를 통해 계속해서 연습하고 있습니다."],
	datasets: [{
		label: '# of Votes',
		data: [85],
		backgroundColor: [
			'rgba(255, 99, 132, 0.2)'
		],
		borderColor: [
			'rgba(255, 99, 132, 1)'
		],
		hoverBackgroundColor: [
			'rgba(255, 99, 132, 0.6)'
		],
		borderWidth: 1
	}]
}, {
	labels: ["시간과 정성과의 싸움, 자신있습니다."],
	datasets: [{
		label: '# of Votes',
		data: [80],
		backgroundColor: [
			'rgba(54, 162, 235, 0.2)'
		],
		borderColor: [
			'rgba(54, 162, 235, 1)'
		],
		hoverBackgroundColor: [
			'rgba(54, 162, 235, 0.6)'
		],
		borderWidth: 1
	}]
}, {
	labels: ["웹표준을 준수하여 코딩을 하여 웹사이트를 구현할 수 있습니다."],
	datasets: [{
		label: '# of Votes',
		data: [85],
		backgroundColor: [
			'rgba(255, 205, 86, 0.2)'
		],
		borderColor: [
			'rgba(255, 205, 86, 1)'
		],
		hoverBackgroundColor: [
			'rgba(255, 205, 86, 0.6)'
		],
		borderWidth: 1
	}]
}, {
	labels: ["하나하나 정성들여 작업합니다."],
	datasets: [{
		label: '# of Votes',
		data: [85],
		backgroundColor: [
			'rgba(75, 192, 192, 0.2)'
		],
		borderColor: [
			'rgba(75, 192, 192, 1)'
		],
		hoverBackgroundColor: [
			'rgba(75, 192, 192, 0.6)'
		],
		borderWidth: 1
	}]
}, {
	labels: ["간단한 애니메이션을 구현해 낼 수 있습니다."],
	datasets: [{
		label: '# of Votes',
		data: [75],
		backgroundColor: [
			'rgba(255, 159, 64, 0.2)'
		],
		borderColor: [
			'rgba(255, 159, 64, 1)'
		],
		hoverBackgroundColor: [
			'rgba(255, 159, 64, 0.6)'
		],
		borderWidth: 1
	}]
}];
var option = [{
	legend: {
		display: false //차트 분류
	}, 
	cutoutPercentage: 30, //두께
	rotation: -0.5 * Math.PI, //돌아가는 시작점의 각도
	circumference: 1.6 * Math.PI,
	animation: {
		animateRotate: false, //차트가 나올 때 돌아가는 애니메이션을 막음
		animateScale: true //차트가 나올 때 작아졌다 커짐
	}
}, {
	legend: {
		display: false
	}, 
	cutoutPercentage: 30,
	circumference: 1.4 * Math.PI,
	animation: {
		animateRotate: false,
		animateScale: true
	}
}, {
	legend: {
		display: false
	}, 
	cutoutPercentage: 30,
	circumference: 1.6 * Math.PI,
	animation: {
		animateRotate: false,
		animateScale: true
	}
}, {
	legend: {
		display: false
	}, 
	cutoutPercentage: 30,
	circumference: 1.6 * Math.PI,
	animation: {
		animateRotate: false,
		animateScale: true
	}
}, {
	legend: {
		display: false
	}, 
	cutoutPercentage: 30,
	circumference: 1.3 * Math.PI,
	animation: {
		animateRotate: false,
		animateScale: true
	}
}];
var chart = [];

var ctx = $(".chart");



// start
var WheelScroll = (function() {
	function WheelScroll(_opt) {
		var obj = this;  //this = function
		if(_opt) {
			if(_opt.page)  this.page = $(_opt.page);
			else this.page = $(".pages");
			if(_opt.speed) this.speed = _opt.speed;
			else this.speed = 200;
		}
		else {
			this.page = $(".pages");
			this.speed = 200;
			this.nav = null;
		}
		this.scTop = $(window).scrollTop();
		this.gap = [];
		this.oldNow = 0;
		this.now = 0;
		this.dir = 0;
		this.speedGap = 0;
		
		$(window).resize(function() {
			$(obj.page).each(function(i) {
				obj.gap[i] = $(this).offset().top; 
			});
		}).trigger("resize");
		this.init(this);
		if(_opt.nav) this.navAdd(obj, _opt.nav);
	}
		
	WheelScroll.prototype.init = function(obj) {
		var chartChk = true;
		$(window).scroll(function(){
			$(obj.page).each(function(i) {
				obj.gap[i] = $(this).offset().top; 
			});
			obj.scTop = $(window).scrollTop();	
			for(var i=0; i<obj.gap.length; i++) {
				if(obj.scTop <= obj.gap[i] + 500) {
					obj.now = i;
					break;
				}
			}
			console.log(obj.now)
			if(obj.now == 3 && chartChk) {
				chartChk = false;
				ctx.each(function (i) {
					chart[i] = new Chart($(this), {
						type: 'doughnut',
						data: data[i],
						options: option[i]
					});
				});
			}
		});
		iphoneAni();
	}
	WheelScroll.prototype.navAdd = function(obj, navObj) {
		$(navObj).on("click", function() {
			obj.oldNow = obj.now;
			obj.now = $(this).data("now");
			obj.animation(obj, null);
		});
	}
	WheelScroll.prototype.animation = function(obj, fn) {
		obj.speedGap = Math.abs(obj.now - obj.oldNow);
		$("html, body").stop().animate({"scrollTop":obj.gap[obj.now]+"px"}, obj.speed*obj.speedGap, fn);
	}
	return WheelScroll;
}());


//////// intro
// cloud 
function cloudAni() {
	$(".cloud").animate({"left":"-5440px"}, 300000, "linear", function(){
	   $(this).css({"left":"100%"});
	   cloudAni();
	});
 }
 cloudAni();

 // tit_move
$(".banner").mousemove(function (evt) {
	var delta = 50;
	var cX = evt.clientX;
	var cY = evt.clientY;
	//console.log(cX, cY);
	var iX = $(this).find(".tit_box").width() / 2;
	var iY = $(this).find(".tit_box").height() / 2;
	var mX = (iX - cX) / delta;
	var mY = (iY - cY) / delta;
	$(this).find(".tit_box").css("transform", "translate(" + mX + "px, " + mY + "px)");
});

// nav
function iphoneAni() {
	$(".iphone_nav").stop().animate({"bottom":"107%"}, 2000, "linear", function() {
		$(".iphone_nav").stop().animate({"right":"20%"}, 2000, "linear", function(){
			$(".cls_iphone").on("click", iphoneFn).trigger("click");
		});
		$(".sign_bt").hide();
	});
};
// toogle
var iphoneChk = false;
function iphoneFn(e) {
	if(iphoneChk) {
		//내려와 있다면
		$(".nav").stop().slideUp(700, function() {
			$(this).parent().stop().animate({"bottom":"107%"}, 1000);
			iphoneChk = false;
		});
	}
	else {
		//올라가 있다면
		if($(window).width() >= 1920) {
			$(this).parent().stop().animate({"bottom":"60%"}, 1000, function(){
				$(".nav").stop().slideDown(700);
			});
		}
		else if($(window).width() >= 1260) {
			$(this).parent().stop().animate({"bottom":"70%"}, 1000, function(){
				$(".nav").stop().slideDown(700);
			});
		}
		iphoneChk = true;
	}
}
$(".sign_bt").on("click", signFn);
function signFn(){
	$(".sign_bt").off("click");
	$(this).off("click");
	$("section").css({"display":"block"})
	iphoneAni();
	var pages = new WheelScroll({
		page: ".pages", 
		nav: ".nav_bt",
		speed: 700
	});
	$(".nav_bt").eq(2).trigger("click");
}

//////// main
var Num;
var NumOld;
$(".tit_line").mouseenter(function() {
	NumOld = Num;
	Num = $(this).index();
	//console.log(portNumOld, portNum);
	$(".tit_line").css({"border-top":"0"});
	$(".tit_line").children("h3").css({"color":"#222"});
	$(".site_right").css({"background-color":"#3e7cce"});
	if(Num == 0) {
		$(this).css({"border-top":"1px solid #3e7cce"});
		$(this).children("h3").css({"color":"#3e7cce"});
	}
	else if(Num == 1) {
		$(this).css({"border-top":"1px solid #dd3055"});
		$(this).children("h3").css({"color":"#dd3055"});
		$(".site_right").css({"background-color":"#dd3055"});
	}
	else if(Num == 2) {
		$(this).css({"border-top":"1px solid #dd3055"});
		$(this).children("h3").css({"color":"#dd3055"});
		$(".site_right").css({"background-color":"#dd3055"});
	}
	else if(Num == 3) {
		$(this).css({"border-top":"1px solid #ffc116"});
		$(this).children("h3").css({"color":"#ffc116"});
		$(".site_right").css({"background-color":"#ffc116"});
	}
	else {
		$(this).css({"border-top":"1px solid #019751"});
		$(this).children("h3").css({"color":"#019751"});
		$(".site_right").css({"background-color":"#019751"});
	}
	$(".cards").eq(NumOld).stop().animate({"margin-top":"200px", "opacity":0}, 600, function () {
		$(this).hide();
	});
	$(".cards").eq(Num).css({"margin-top":"200px", "opacity":0, "display":"block"}).stop().animate({"margin-top":0, "opacity":1}, 600);
});
$(".tit_line").eq(0).trigger("mouseenter");


//weather
$("#modal_open").click(function(){
	$("#modal").show();
});
$("#modal_close").click(function(){
	$("#modal").hide();
});


$.ajax({
	url: "../json/city.json",
	type: "get",
	dataType: "json",
	success: function(data){
		var city = data.cities;
		var html = '';
		for(i=0; i<city.length; i++){
			html = '<option value="'+city[i].id+'">'+city[i].name+'</option>';
			$("#area").append(html);
		}
		$("#area").trigger("change");
	},
	error: function(xhr, status, error){
		console.log(xhr, status, error);
	}
});
//오늘의 날씨
$("#area").change(function(){
	var id = $(this).val();
	var city = $(this).find('option:selected').text();
	var appid = "9850c950c6a3c3a3ca7a04a13d867c1a";
	var units = "metric";
	var dt = new Date();
	var date = dt.getFullYear()+"년 "+(dt.getMonth()+1)+"월 "+dt.getDate()+"일";
	$.ajax({
		url: "https://api.openweathermap.org/data/2.5/weather",
		type: "get",
		dataType: "json",
		data: {
			id: id,
			appid: appid,
			units: units
		},
		success: function(data){
			document.querySelector(".dl_icon").src = "../img/weather/"+data.weather[0].icon+".mp4";
			document.querySelector("#weather_wrap").load();
			$(".dl_area > span").html(city);
			$(".dl_date").html(date);
			$(".dl_temp").html(data.main.temp+'℃(최고: '+data.main.temp_max+'℃/최저: '+data.main.temp_min+'℃)');
			$(".dl_desc").html(data.weather[0].description);
			//console.log(data.main.temp);
			//console.log(data.main.temp_max);
			//console.log(data.main.temp_min);
			//console.log(data.weather[0].description);
			//console.log(data.weather[0].icon);
			$("#modal").hide();
		},
		error: function(xhr, status, error){
			console.log(xhr, status, error);
		}
	});
});

//////// about
var n = 1;
var interval;
$("#slides").find(".slide").each(function(){
	var html = '<span class="w3-bar-item" onclick="paging(this);">●</span>';
	$(this).parent().next().find(".pager").append(html);
});
interval = setInterval(slide, 5000);
function slide() {
	$("#slides").parent().find(".pager").find("span").removeClass("w3-text-amber");
	$("#slides").parent().find(".pager").find("span").eq(n).addClass("w3-text-amber");
	$("#slides").stop().animate({"left":-(n*100)+"%"}, 1000, function(){
		if(n == 4) {
			n = 0;
			$(this).css({"left":0});
		}
		n++;
	});
}
function paging(obj) {
	n = $(obj).index();
	clearInterval(interval);
	slide();
	interval = setInterval(slide, 5000);
}
$("#slides").hover(function(){
	clearInterval(interval);
}, function(){
	interval = setInterval(slide, 5000);
});

// reset
window.onbeforeunload = function () {
	window.scrollTo(0, 0);
}
