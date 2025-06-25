// birthday_animation.js

// Use only one canvas for both heart and balloons
const canvasHeart = document.getElementById('canvas-heart');
const ctxHeart = canvasHeart.getContext('2d');
canvasHeart.width = window.innerWidth;
canvasHeart.height = window.innerHeight;

// Balloons setup
const balloons = [];
const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#8BC34A', '#FF9800'];

for (let i = 0; i < 20; i++) {
    balloons.push({
        x: Math.random() * canvasHeart.width,
        y: canvasHeart.height + Math.random() * 300,
        radius: 20 + Math.random() * 20,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: 0.5 + Math.random(),
    });
}

function drawBalloon(b) {
    ctxHeart.beginPath();
    ctxHeart.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
    ctxHeart.fillStyle = b.color;
    ctxHeart.fill();
    ctxHeart.beginPath();
    ctxHeart.moveTo(b.x, b.y + b.radius);
    ctxHeart.lineTo(b.x, b.y + b.radius + 30);
    ctxHeart.strokeStyle = '#555';
    ctxHeart.stroke();
}

// Heart animation variables
let scale = 1;
let grow = true;

function drawHeart(x, y, size) {
    ctxHeart.beginPath();
    ctxHeart.moveTo(x, y);
    ctxHeart.bezierCurveTo(x, y - size / 2, x - size, y - size / 2, x - size, y);
    ctxHeart.bezierCurveTo(x - size, y + size, x, y + size * 1.5, x, y + size * 2);
    ctxHeart.bezierCurveTo(x, y + size * 1.5, x + size, y + size, x + size, y);
    ctxHeart.bezierCurveTo(x + size, y - size / 2, x, y - size / 2, x, y);
    ctxHeart.closePath();
    ctxHeart.fillStyle = 'red';
    ctxHeart.fill();

    // Zahl 23 in die Mitte des Herzens zeichnen
    ctxHeart.save();
    ctxHeart.font = `${size * 0.9}px Comic Sans MS, cursive, sans-serif`;
    ctxHeart.fillStyle = 'white';
    ctxHeart.textAlign = 'center';
    ctxHeart.textBaseline = 'middle';
    ctxHeart.fillText('23', x, y + size * 0.7);
    ctxHeart.restore();
}

function animate() {
    ctxHeart.clearRect(0, 0, canvasHeart.width, canvasHeart.height);

    // Animate balloons
    balloons.forEach(b => {
        b.y -= b.speed;
        if (b.y < -50) b.y = canvasHeart.height + 50;
        drawBalloon(b);
    });

    // Animate heart
    if (scale >= 1.2) grow = false;
    if (scale <= 0.9) grow = true;
    scale += grow ? 0.01 : -0.01;
    drawHeart(canvasHeart.width / 2, canvasHeart.height / 2 - 100, 50 * scale);

    requestAnimationFrame(animate);
}

animate();

// Elephant-Canvas-Animation
const canvasElephant = document.createElement('canvas');
canvasElephant.id = 'canvas-elephant';
canvasElephant.style.position = 'absolute';
canvasElephant.style.top = '0';
canvasElephant.style.left = '0';
canvasElephant.style.pointerEvents = 'none';
canvasElephant.width = window.innerWidth;
canvasElephant.height = window.innerHeight;
document.body.appendChild(canvasElephant);

const ctxElephant = canvasElephant.getContext('2d');

let elephantX = -200;
let elephantY = canvasElephant.height - 180;
let elephantSpeed = 2;

function drawElephant(x, y, scale = 1) {
    ctxElephant.save();
    ctxElephant.translate(x, y);
    ctxElephant.scale(scale, scale);

    // Body
    ctxElephant.beginPath();
    ctxElephant.ellipse(100, 80, 80, 50, 0, 0, Math.PI * 2);
    ctxElephant.fillStyle = '#b0bec5';
    ctxElephant.fill();

    // Head
    ctxElephant.beginPath();
    ctxElephant.ellipse(180, 70, 40, 35, 0, 0, Math.PI * 2);
    ctxElephant.fillStyle = '#b0bec5';
    ctxElephant.fill();

    // Ear
    ctxElephant.beginPath();
    ctxElephant.ellipse(150, 90, 30, 40, Math.PI / 4, 0, Math.PI * 2);
    ctxElephant.fillStyle = '#90a4ae';
    ctxElephant.fill();

    // Trunk (animated up and down)
    let trunkOffset = Math.sin(Date.now() / 400) * 10;
    ctxElephant.beginPath();
    ctxElephant.moveTo(210, 80);
    ctxElephant.bezierCurveTo(230, 90 + trunkOffset, 220, 120 + trunkOffset, 200, 120 + trunkOffset);
    ctxElephant.lineWidth = 12;
    ctxElephant.strokeStyle = '#b0bec5';
    ctxElephant.stroke();

    // Eye
    ctxElephant.beginPath();
    ctxElephant.arc(195, 65, 4, 0, Math.PI * 2);
    ctxElephant.fillStyle = '#222';
    ctxElephant.fill();

    // Legs
    for (let i = 0; i < 4; i++) {
        ctxElephant.beginPath();
        ctxElephant.rect(70 + i * 30, 120, 15, 40);
        ctxElephant.fillStyle = '#b0bec5';
        ctxElephant.fill();
    }

    ctxElephant.restore();
}

function animateElephant() {
    ctxElephant.clearRect(0, 0, canvasElephant.width, canvasElephant.height);
    drawElephant(elephantX, elephantY, 1.1);
    elephantX += elephantSpeed;
    if (elephantX > canvasElephant.width + 100) elephantX = -200;
    requestAnimationFrame(animateElephant);
}

animateElephant();
