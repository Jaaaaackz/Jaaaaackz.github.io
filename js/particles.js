document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('#page-header');
    const canvas = document.createElement('canvas');
    header.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = header.offsetWidth;
    canvas.height = header.offsetHeight;

    // ���������߼�
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x > canvas.width) this.x = 0;
            if (this.y > canvas.height) this.y = 0;
        }
        draw() {
            ctx.fillStyle = 'rgba(255,255,255,0.2)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // ���� 50 ������
    const particles = Array.from({ length: 50 }, () => new Particle());
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(animate);
    }
    animate();
});