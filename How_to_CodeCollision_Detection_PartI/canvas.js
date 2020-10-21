var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

// c.fillStyle = 'rgba(255, 0, 0, 0.5)';
// c.fillRect(100, 100, 100, 100);
// c.fillStyle = 'rgba(0, 0, 255, 0.5)';
// c.fillRect(400, 100, 100, 100);
// c.fillStyle = 'rgba(0, 255, 0, 0.5)';
// c.fillRect(300, 300, 100, 100);
// console.log(canvas);

// //Line
// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(300, 100);
// c.lineTo(400, 300);
// c.strokeStyle = "#fa34a3";
// c.stroke();

//Arc / Circle
//c.beginPath();
//c.arc(300, 300, 30, 0, Math.PI * 2, false);
//c.strokeStyle = 'blue';
//c.stroke();

// for(var i = 0;i < 100;i++){
//     var x = Math.random() * window.innerWidth;
//     var y = Math.random() * window.innerHeight;
//     c.beginPath();
//     c.arc(x, y, 30, 0, Math.PI * 2, false);
//     c.strokeStyle = 'blue';
//     c.stroke();
// }​

var mouse = {
	x: 10,
	y: 10
}

var colors = [
	'#ffaa33',
	'#99ffaaa',
	'#00ff00',
	'#4411aa',
	'#ff1100',
]

window.addEventListener('mousemove',
	function(event){
		mouse.x = event.x;
		mouse.y = event.y;
})

addEventListener("click", function(){
	init();
});

window.addEventListener('resize', function(){
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	init();
})

function randomIntFromRange(min, max){
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors){
	return colors[Math.floor(Math.random() * colors.length)];
}

function getDistance(x1, y1, x2, y2){
	let xDistance = x2 - x1;
	let yDistance = y2 - y1;

	return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

function Circle(x, y, radius, color){
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.color = color;

	this.draw = function(){
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		c.fillStyle = this.color;
		c.fill();
		c.stroke();
		c.closePath();
	}

	this.update = function(){
		
		this.draw();
	}
}

let circle1;
let circle2;
function init(){
	circle1 = new Circle(300, 300, 100, 'black');
	circle2 = new Circle(undefined, undefined, 30, 'red');
}

init();

function animate(){
	requestAnimationFrame(animate);
	c.clearRect(0, 0, canvas.width, canvas.height);

	circle1.update();
	circle2.x = mouse.x;
	circle2.y = mouse.y;
	circle2.update();

	if(getDistance(circle1.x, circle1.y, circle2.x, circle2.y) 
		< circle1.radius + circle2.radius){
		circle1.color = 'red';
	}
	else{
		circle1.color = 'black';
	}

}

animate();
