const startBtn = document.getElementById('startBtn');
const surpriseBtn = document.getElementById('surpriseBtn');
const typingEl = document.getElementById('typing');
const lastScreen = document.getElementById('lastScreen');
const stars = document.getElementById('stars');
const surpriseImageInput = document.getElementById('surpriseImageInput');
const surpriseImage = document.getElementById('surpriseImage');

const message = "Senin varlığın hayatıma bir ışık gibi dokundu. Her anında güler yüzün, sakin duruşun ve sıcak kalbin beni etkiliyor. Bugün, senin doğum günün; umarım tüm hayallerin gerçek olur ve her günün senin için özel geçer. İyi ki varsın, Kader. ❤️";

let index = 0;

function typeText() {
    typingEl.textContent = message.slice(0, index);
    index++;

    if (index <= message.length) {
        setTimeout(typeText, 35);
    }
}

function createStars() {
    const ctx = stars.getContext('2d');
    const width = stars.width = window.innerWidth;
    const height = stars.height = window.innerHeight;
    const starCount = 180;
    const starsArray = [];

    for (let i = 0; i < starCount; i++) {
        starsArray.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 1.4 + 0.3,
            alpha: Math.random() * 0.8 + 0.2,
            speed: Math.random() * 0.18 + 0.05,
            phase: Math.random() * Math.PI * 2
        });
    }

    function draw() {
        ctx.clearRect(0, 0, width, height);
        for (const star of starsArray) {
            const twinkle = 0.7 + Math.sin(Date.now() / 600 + star.phase) * 0.25;
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255,255,255,${star.alpha * twinkle})`;
            ctx.fill();
            star.y += star.speed;
            if (star.y > height) {
                star.y = -2;
                star.x = Math.random() * width;
            }
        }
        requestAnimationFrame(draw);
    }

    draw();
}

startBtn?.addEventListener('click', () => {
    document.getElementById('story').scrollIntoView({ behavior: 'smooth', block: 'center' });
    typeText();
});

surpriseBtn?.addEventListener('click', () => {
    lastScreen.classList.add('show');
});

lastScreen?.addEventListener('click', (event) => {
    if (event.target === lastScreen) {
        lastScreen.classList.remove('show');
    }
});

surpriseImageInput?.addEventListener('change', (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
        if (typeof reader.result === 'string') {
            surpriseImage.src = reader.result;
        }
    };
    reader.readAsDataURL(file);
});

window.addEventListener('resize', () => {
    createStars();
});

createStars();
