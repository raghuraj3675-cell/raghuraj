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
const quickReplies = document.querySelectorAll('.reply-btn');

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
function sendMessage(text = null) {
    const messageText = text || chatInput.value.trim();
    if (messageText === '') return;

    // Add User Message
    addMessage(messageText, 'user');
    if (!text) chatInput.value = '';

    // Show Typing Indicator
    showTypingIndicator();

    // Simulate AI Response Delay
    const delay = Math.random() * 1000 + 1000; // 1-2 seconds
    setTimeout(() => {
        hideTypingIndicator();
        getAIResponse(messageText);
    }, delay);
}

sendBtn.addEventListener('click', () => sendMessage());
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Handle Quick Replies
quickReplies.forEach(btn => {
    btn.addEventListener('click', () => {
        sendMessage(btn.textContent);
    });
});

// Add Message to Chat
function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.classList.add(sender === 'user' ? 'user-message' : 'bot-message');

    const contentDiv = document.createElement('div');
    contentDiv.classList.add('message-content');
    contentDiv.textContent = text;

    messageDiv.appendChild(contentDiv);
    chatMessages.appendChild(messageDiv);

    // Auto scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Typing Indicator Functions
function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.classList.add('message', 'bot-message', 'typing-container');
    typingDiv.innerHTML = `
        <div class="typing">
            <span></span>
            <span></span>
            <span></span>
        </div>
    `;
    typingDiv.id = 'typing-indicator';
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function hideTypingIndicator() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) {
        indicator.remove();
    }
}

// Generate AI Response
function getAIResponse(userText) {
    const lowerText = userText.toLowerCase();
    let response = "";

    const responses = {
        greeting: [
            "Hello there! I'm Raghuraj's AI assistant. Ready to explore his mechanical engineering journey?",
            "Hi! 👋 Great to see you here. How can I help you learn more about Raghuraj's work?",
            "Greetings! Looking for something specific in Raghuraj's portfolio?"
        ],
        projects: [
            "Raghuraj has worked on some fascinating projects! The 'Contactless Braking System' is a highlight. He also designed a 'Smart Energy Lighting System'. Which one would you like to know more about?",
            "His project portfolio includes innovative designs in SolidWorks and AutoCAD. You should definitely check out the 'Contactless Braking System' in the Projects section!"
        ],
        skills: [
            "He's proficient in SolidWorks (3D Modeling), AutoCAD (2D/3D), Hypermesh (FEA), and Python for automation. A quite versatile toolkit for a Mechanical Engineer, don't you think?",
            "Technical expertise includes mechanical design, simulation, and some coding with Python. He loves combining engineering with technology!"
        ],
        contact: [
            "You can reach Raghuraj directly at raghuraj3675@gmail.com or call him at +91 7904027430. He's usually quite responsive!",
            "Feel free to connect with him on LinkedIn or drop an email at raghuraj3675@gmail.com. All contact details are in the Contact section below."
        ],
        default: [
            "That's an interesting question! While I'm a specialized assistant for this portfolio, Raghuraj would be happy to discuss that with you directly via email.",
            "I'm learning more about Raghuraj every day! For specific inquiries, reaching out via the contact form or email is your best bet.",
            "I'm not quite sure about that, but I can tell you all about Raghuraj's mechanical engineering skills and projects!"
        ]
    };

    if (lowerText.includes('hello') || lowerText.includes('hi') || lowerText.includes('hey')) {
        response = getRandom(responses.greeting);
    } else if (lowerText.includes('project') || lowerText.includes('work') || lowerText.includes('braking') || lowerText.includes('lighting')) {
        response = getRandom(responses.projects);
    } else if (lowerText.includes('skill') || lowerText.includes('tool') || lowerText.includes('software') || lowerText.includes('python')) {
        response = getRandom(responses.skills);
    } else if (lowerText.includes('contact') || lowerText.includes('email') || lowerText.includes('phone') || lowerText.includes('reach')) {
        response = getRandom(responses.contact);
    } else {
        response = getRandom(responses.default);
    }

    addMessage(response, 'bot');
}

function getRandom(array) {
    return array[Math.floor(Math.random() * array.length)];
}

