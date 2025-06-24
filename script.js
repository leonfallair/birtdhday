// birthday_animation.js

// Herz-Canvas-Animation (pulsierend)
const canvasHeart = document.getElementById('canvas-heart');
const ctxHeart = canvasHeart.getContext('2d');
canvasHeart.width = window.innerWidth;
canvasHeart.height = window.innerHeight;

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
}

function animateHeart() {
    ctxHeart.clearRect(0, 0, canvasHeart.width, canvasHeart.height);

    if (scale >= 1.2) grow = false;
    if (scale <= 0.9) grow = true;
    scale += grow ? 0.01 : -0.01;

    drawHeart(canvasHeart.width / 2, canvasHeart.height / 2 - 100, 50 * scale);
    requestAnimationFrame(animateHeart);
}

animateHeart();

// Ballon-Canvas-Animation
const canvasBalloon = document.getElementById('canvas-balloons');
const ctxBalloon = canvasBalloon.getContext('2d');
canvasBalloon.width = window.innerWidth;
canvasBalloon.height = window.innerHeight;

const balloons = [];
const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#8BC34A', '#FF9800'];

for (let i = 0; i < 20; i++) {
    balloons.push({
        x: Math.random() * canvasBalloon.width,
        y: canvasBalloon.height + Math.random() * 300,
        radius: 20 + Math.random() * 20,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: 0.5 + Math.random(),
    });
}

function drawBalloon(b) {
    ctxBalloon.beginPath();
    ctxBalloon.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
    ctxBalloon.fillStyle = b.color;
    ctxBalloon.fill();
    ctxBalloon.beginPath();
    ctxBalloon.moveTo(b.x, b.y + b.radius);
    ctxBalloon.lineTo(b.x, b.y + b.radius + 30);
    ctxBalloon.strokeStyle = '#555';
    ctxBalloon.stroke();
}

function animateBalloons() {
    ctxBalloon.clearRect(0, 0, canvasBalloon.width, canvasBalloon.height);
    balloons.forEach(b => {
        b.y -= b.speed;
        if (b.y < -50) b.y = canvasBalloon.height + 50;
        drawBalloon(b);
    });
    requestAnimationFrame(animateBalloons);
}

animateBalloons();
