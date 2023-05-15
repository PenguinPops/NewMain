const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const dots = [];

const DOT_RADIUS = 2;
const DOT_DISTANCE = 50;
const MAX_SPEED = 2;
const CIRCLE_RADIUS = 120;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
}

window.addEventListener("resize", resizeCanvas);

class Dot {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.originalX = x;
        this.originalY = y;
        this.dx = 0;
        this.dy = 0;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, DOT_RADIUS, 0, Math.PI * 2);
        ctx.fillStyle = "#777";
        ctx.fill();
    }

    reset() {
        this.x = Math.min(Math.max(this.originalX, 0), canvas.width);
        this.y = Math.min(Math.max(this.originalY, 0), canvas.height);
        this.dx = 0;
        this.dy = 0;
    }
}

function getDistance(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
}

function getAngle(a, b) {
    return Math.atan2(b.y - a.y, b.x - a.x);
}

let mouseX = canvas.width / 2;
let mouseY = canvas.height / 2;

canvas.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
});

function init() {
    dots.length = 0;
    for (let x = 0; x < canvas.width; x += DOT_DISTANCE) {
        for (let y = 0; y < canvas.height; y += DOT_DISTANCE) {
            const dot = new Dot(x, y);
            dots.push(dot);
        }
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // draw dots
    dots.forEach((dot) => dot.draw());
}

function mouseIsMoving() {
    return mouseX !== lastMouseX || mouseY !== lastMouseY;
}

resizeCanvas();
animate();

//panels

const slider = document.querySelector('.slider');
const sliderWidth = slider.clientWidth;
const slideCount = slider.children.length;
let currentSlide = 1;

// set the initial position of the slider
slider.scrollLeft = 0;

// function to move the slider to the next slide
function moveToNextSlide() {
    if (currentSlide >= slideCount) {
        currentSlide = 1;
        slider.scrollLeft = 0;
    } else {
        currentSlide++;
        slider.scrollLeft += sliderWidth;
    }
}

// set an interval to move the slider every 5 seconds
setInterval(moveToNextSlide, 4000);