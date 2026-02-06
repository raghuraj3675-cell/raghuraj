document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links li');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('toggle');
    });

    // Close mobile menu when a link is clicked
    navLinksItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('toggle');
        });
    });

    // Scroll Animation (Fade In)
    const fadeElems = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.2, // Element appears when 20% visible
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function (entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    fadeElems.forEach(elem => {
        appearOnScroll.observe(elem);
    });

    // Smooth Scrolling for Anchor Links (Optional enhanced behavior)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            navLinks.classList.remove('active'); // Ensure menu closes

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// --- Background Animation (Mechanical + AI Theme) ---
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];
let gears = [];

// Resize Canvas
function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
}
window.addEventListener('resize', resize);
resize();

// Particle Class (AI Nodes)
class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5; // Slow movement
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(148, 163, 184, 0.5)'; // Slate-400
        ctx.fill();
    }
}

// Gear Class (Mechanical)
class Gear {
    constructor(x, y, radius, speed) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed = speed;
        this.angle = Math.random() * Math.PI * 2;
        this.teeth = Math.floor(radius / 5) + 5;
    }

    update() {
        this.angle += this.speed;
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        // Gear Body
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.1)'; // Cyan-400 very low opacity
        ctx.lineWidth = 2;
        ctx.beginPath();
        const outerRadius = this.radius;
        const innerRadius = this.radius - 5;

        for (let i = 0; i < this.teeth * 2; i++) {
            const r = (i % 2 === 0) ? outerRadius : innerRadius;
            const a = (Math.PI * 2 * i) / (this.teeth * 2);
            const tx = Math.cos(a) * r;
            const ty = Math.sin(a) * r;
            if (i === 0) ctx.moveTo(tx, ty);
            else ctx.lineTo(tx, ty);
        }
        ctx.closePath();
        ctx.stroke();

        // Inner circle (dashed)
        ctx.beginPath();
        ctx.setLineDash([5, 5]);
        ctx.arc(0, 0, this.radius * 0.6, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.05)';
        ctx.stroke();

        ctx.restore();
    }
}

// Initialize Elements
function init() {
    particles = [];
    gears = [];

    // Create Particles (100)
    for (let i = 0; i < 60; i++) {
        particles.push(new Particle());
    }

    // Create Gears (Background floating schematics)
    for (let i = 0; i < 8; i++) {
        gears.push(new Gear(
            Math.random() * width,
            Math.random() * height,
            Math.random() * 60 + 30, // Radius 30-90
            (Math.random() - 0.5) * 0.002 // Very slow rotation
        ));
    }
}

// Animation Loop
function animate() {
    ctx.clearRect(0, 0, width, height);

    // Update and Draw Gears first (background layer)
    gears.forEach(gear => {
        gear.update();
        gear.draw();
    });

    // Update and Draw Particles (AI Network)
    particles.forEach(p => {
        p.update();
        p.draw();
    });

    // Draw Connections (AI Neural Lines)
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(148, 163, 184, ${0.1 - distance / 1500})`; // Fade out
                ctx.lineWidth = 1;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }

    requestAnimationFrame(animate);
}

init();
animate();

// --- AI Chat Box Logic ---
const chatWidget = document.getElementById('chat-widget');
const chatToggle = document.getElementById('chat-toggle');
const chatBox = document.getElementById('chat-box');
const closeChat = document.getElementById('close-chat');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');
const chatMessages = document.getElementById('chat-messages');

// Toggle Chat Box
function toggleChat() {
    chatBox.classList.toggle('active');
    if (chatBox.classList.contains('active')) {
        chatInput.focus();
    }
}

chatToggle.addEventListener('click', toggleChat);
closeChat.addEventListener('click', toggleChat);

// Send Message
function sendMessage() {
    const text = chatInput.value.trim();
    if (text === '') return;

    // Add User Message
    addMessage(text, 'user');
    chatInput.value = '';

    // Simulate AI Response
    setTimeout(() => {
        getAIResponse(text);
    }, 1000);
}

sendBtn.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Add Message to Chat
function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
    messageDiv.textContent = text;

    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Generate AI Response (Simple Rule-based)
function getAIResponse(userText) {
    const lowerText = userText.toLowerCase();
    let response = "I'm currently just a simulation, but Raghuraj would love to hear from you via email!";

    if (lowerText.includes('hello') || lowerText.includes('hi')) {
        response = "Hello! Thanks for visiting my portfolio. How can I help you regarding my work?";
    } else if (lowerText.includes('project') || lowerText.includes('work')) {
        response = "I have worked on several exciting projects including the Contactless Braking System. Check out the Projects section!";
    } else if (lowerText.includes('contact') || lowerText.includes('email')) {
        response = "You can contact me at raghuraj3675@gmail.com or +91 7904027430.";
    } else if (lowerText.includes('skill') || lowerText.includes('tool')) {
        response = "I am proficient in SolidWorks, AutoCAD, Hypermesh, and Python for automation.";
    }

    addMessage(response, 'bot');
}
