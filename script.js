function chooseCount(){
	count = parseInt(document.querySelector("#count").value);
	while(count > snowFail.length){
		snowFail.push(new snowBall(false));
	}
	while(count < snowFail.length){
		snowFail.splice(snowFail.length - 1, 1);
	}
}
function chooseFurry(){
	furry = parseInt(document.querySelector("#furry").value);
}
function chooseSize(){
	size = document.querySelector("#size").value * 1;
}
function chooseSpeed(){
	speed = document.querySelector("#speed").value * 1;
}
function correct(){
	let tempSpeed = speed;
	speed = 0;
	for(let i = 0; i < snowFail.length; i++){
		//snowFail[i].newSize = snowFail[i].size * size;
		//snowFail[i].imgData.src = drawSnowflake(snowFail[i], ctxTemp);
	}
	speed = tempSpeed;
}
document.addEventListener("DOMContentLoaded", ()=>{
	chooseCount();
	chooseFurry();
	chooseSize();
	chooseSpeed();
}, false)

var speed = 1;
var size = 3;
var furry = 2;
var count = 30;
let dxMax = 60, dxMin = -60;
let dyMax = 100, dyMin = 20;
let mouseX, mouseY;
document.querySelector("canvas").addEventListener('mousedown', function(e){
	document.querySelector(".inputs").style.display = "block";
	mouseX = e.pageX - e.target.offsetLeft;
	mouseY = e.pageY - e.target.offsetTop;
	let minI = -1;
	let minDist = -1;
	let dist = 0;
	console.log(mouseX, mouseY);
	for(i in snowFail){
		dist = Math.sqrt((mouseX - snowFail[i].x)*(mouseX - snowFail[i].x) + (mouseY - snowFail[i].y)*(mouseY - snowFail[i].y));
		if(snowFail[i].size * size > dist){
			if(dist < minDist || minDist == -1){
				minDist = dist;
				minI = i;
			}
		}
	}
	if(minI != -1){ snowFail.splice(minI, 1);
		document.querySelector("#count").value--;
	}
});
class snowBall{
	constructor(start){
		let dx = Math.floor(dxMin + Math.random() * (dxMax - dxMin + 1));
		let dy = Math.floor(dyMin + Math.random() * (dyMax - dyMin + 1));
		this.size = Math.floor(4 + Math.random() * (6 - 4 + 1));
		this.newSize = 200;
		this.furriness = Math.floor(furry + Math.random() * (furry + 8 - furry + 1));
		this.rad = Math.floor(0 + Math.random() * (2 * Math.PI - 0 + 1));
		this.dRad = Math.random() -0.5;
		this.x = Math.floor(0 + Math.random() * (800 - 0 + 1));
		this.y = start ? -size * this.size : Math.floor(0 + Math.random() * (800 - 0 + 1));
		this.dx = dx;
		this.dy = dy;
		this.dxt = dx;
		this.dyt = dy;
		this.ddx = 60;
		this.sizeX = 0.1;
		this.sizeY = 0.1;
		this.options = []
		for(let i = 0; i < this.furriness; i++){
			this.options.push({
				len: Math.floor(10 + Math.random() * (30 - 10 + 1)),
				withS: Math.floor(7 + Math.random() * (10 - 7 + 1)),
				y: Math.floor(10 + Math.random() * (70 - 10 + 1)),
				cute: Math.floor(1 + Math.random() * (4 - 1 + 1))
			})
		}
		this.imgData = new Image();
		this.imgData.src = drawSnowflake(this, ctxTemp);
	}
}
let ctx = document.querySelector("canvas").getContext("2d"); //Получаем контекст
let canvasTemp = document.createElement("canvas");
canvasTemp.setAttribute("width", "400");
canvasTemp.setAttribute("height", "400");
let ctxTemp = canvasTemp.getContext("2d"); 
var snowFail = [];
var snowDown = [];
let last;
let allTime = 0;
let tempTime = 0;
function play(){
	let now = Date.now();
	let dt = (now - last)/1000;
	update(dt);
	render(dt);
	last = now;
	requestAnimFrame(play);
}
function preload(){
	for(let i = 0; i < 30; i++){ //SnowFall
		snowFail.push(new snowBall(false));
	}
	for(let i = 0; i <= 10; i++){ //SnowDown
		let min = 10;
		let max = 30;
		let a = Math.floor(min + Math.random() * (max - min + 1));
		let b = Math.floor(min + Math.random() * (max - min + 1));
		snowDown.push({
			x: a,
			y: b
		});
	}
}
function update(dt){
	dt *= speed;
	allTime += dt;
	for(i in snowFail){
		snowFail[i].x += snowFail[i].dxt * dt;
		snowFail[i].y += snowFail[i].dyt * dt;
		snowFail[i].rad += snowFail[i].dRad * dt;
		if(Math.floor(allTime) != tempTime){
			snowFail[i].dx = Math.floor(-60 + Math.random() * (60 + 60 + 1));
		}
		if(snowFail[i].dxt < snowFail[i].dx){
			snowFail[i].dxt += snowFail[i].ddx*dt;
		}else if(snowFail[i].dxt > snowFail[i].dx){
			snowFail[i].dxt -= snowFail[i].ddx*dt;
		}
		if(snowFail[i].y > 600 + snowFail[i].size * size || snowFail[i].x < -snowFail[i].size * size || snowFail[i].x > 800 + snowFail[i].size * size){
			snowFail.splice(i, 1);
			snowFail.push(new snowBall(true));
		}
	}
	tempTime = Math.floor(allTime);
}
function render(){
	ctx.clearRect(0,0, 800, 600);
	ctxTemp.clearRect(0,0, 800, 600);
	ctx.fillStyle = "#002";
	ctx.fillRect(0, 0, 800, 600);
	
	ctx.fillStyle = "white";
	ctx.beginPath(); //Снеговик, body
	ctx.arc(100,550,60,0,2*Math.PI);
	ctx.closePath();
	ctx.arc(100,470,47,0,2*Math.PI);
	ctx.closePath();
	ctx.arc(100,400,40,0,2*Math.PI);
	ctx.closePath();
	ctx.fill();

	ctx.beginPath(); //Снег, который лежит
	ctx.moveTo(0, 550);
	for(let i = 0; i <= 10; i++){
		ctx.quadraticCurveTo(30 + 200 * i + snowDown[i].x, 550 + snowDown[i].y, 100+200 * i, 550);
		ctx.quadraticCurveTo(130 + 200 * i + snowDown[i].x, 550 - snowDown[i].y, 200+200 * i, 550);
	}
	ctx.lineTo(11 * 200, 600);
	ctx.lineTo(0, 600);
	ctx.fill();
	ctx.closePath();
	
	ctx.fillStyle = "#fff"; //Снег, который падает
	for(i in snowFail){
		let tempSize = snowFail[i].size * size;
		let x = snowFail[i].x - tempSize;
		let y = snowFail[i].y - tempSize;
		ctx.save();
		ctx.translate(snowFail[i].x, snowFail[i].y);
		ctx.rotate(snowFail[i].rad);
		ctx.drawImage(snowFail[i].imgData, 0, 0, snowFail[i].newSize * 2, snowFail[i].newSize * 2, -tempSize, -tempSize, tempSize * 2, tempSize * 2);
		ctx.restore();
	}
}
function drawSnowflake(obj, ctx){
	ctx.clearRect(0,0, 500, 500);
	obj = JSON.parse(JSON.stringify(obj));
	obj.size = obj.newSize;
	obj.x = obj.size;
	obj.y = obj.size;
	obj.size/=100;
	for(j in obj.options){
		for(k in obj.options[j]){
			if(k != "cute")
			obj.options[j][k] *= obj.size;
		}
	}
	ctx.save();
	ctx.translate(obj.x, obj.y);
	ctx.rotate(obj.rad);
	ctx.fillStyle = "#fff";
	ctx.beginPath(); //Круг
	ctx.arc(0,0,20 * obj.size,0,2*Math.PI);
	ctx.fill();
	ctx.closePath();
	for(let i = 0; i < 6; i++){
		let angle = 2 * Math.PI / 6;
		let len = 100 * obj.size;
		let withS = 7 * obj.size;
		ctx.rotate(angle);
		ctx.beginPath();
		ctx.moveTo(-withS, 0);
		ctx.lineTo(0, len);
		ctx.lineTo(withS, 0);
		ctx.fill();
		ctx.closePath();
		
		for(j in obj.options){
			ctx.beginPath(); //Left midle1
			ctx.moveTo(0, obj.options[j].y + obj.options[j].withS);
			ctx.lineTo(obj.options[j].len, obj.options[j].y + obj.options[j].withS * obj.options[j].cute);
			ctx.lineTo(0, obj.options[j].y);
			ctx.fill();
			ctx.closePath();
			ctx.beginPath(); //Right midle2
			ctx.moveTo(0, obj.options[j].y + obj.options[j].withS);
			ctx.lineTo(-obj.options[j].len, obj.options[j].y + obj.options[j].withS * obj.options[j].cute);
			ctx.lineTo(0, obj.options[j].y);
			ctx.fill();
			ctx.closePath();
		}
	}
	ctx.restore(); 
	return canvasTemp.toDataURL();
}
var requestAnimFrame = (function() {
	return window.requestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	window.oRequestAnimationFrame ||
	window.msRequestAnimationFrame ||
	function(callback) {
		window.setTimeout(callback, 50);
	};
})();

preload();
last = Date.now();
play();