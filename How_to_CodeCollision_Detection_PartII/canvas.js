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

function Particle(x, y, radius, color){
	this.x = x;
	this.y = y;
	this.velocity = {
		x: Math.random() - 0.5,
		y: Math.random() - 0.5
	}
	this.radius = radius;
	this.color = color;

	this.draw = function(){
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		c.strokeStyle = this.color;
		c.stroke();
		c.closePath();
	}

	this.update = particles => {
		
		this.draw();

		for(let i = 0;i < particles.length;i++){
			if(this === particles[i]) continue;

			if(getDistance(this.x, this.y, particles[i].x, particles[i].y) - this.radius * 2 < 0){
				console.log('has collided');
			}
		}
	
		if(this.x - this.radius <= 0 || this.x + this.radius >= innerWidth){
			this.velocity.x = -this.velocity.x;
		}

		if(this.y - this.radius <= 0 || this.y + this.radius >= innerHeight){
			this.velocity.y = -this.velocity.y;
		}

		this.x += this.velocity.x;
		this.y += this.velocity.y;
	}
}

let particles;

function init(){
	particles = [];

	for(let i = 0;i < 4;i++){
		const radius = 80;
		let x = randomIntFromRange(radius, canvas.width - radius);
		let y = randomIntFromRange(radius, canvas.height - radius);
		const color = 'blue';

		if(i !== 0){
			for(let j = 0;j < particles.length;j++){
				if(getDistance(x, y, particles[j].x, particles[j].y) - radius * 2 < 0){
					x = randomIntFromRange(radius, canvas.width - radius);
					y = randomIntFromRange(radius, canvas.height - radius);

					j = -1;
				}
			}
		}
		
		particles.push(new Particle(x, y, radius, color));

	}




}

init();

function animate(){
	requestAnimationFrame(animate);
	c.clearRect(0, 0, canvas.width, canvas.height);

	particles.forEach(particle => {particle.update(particles);});

}

animate();
