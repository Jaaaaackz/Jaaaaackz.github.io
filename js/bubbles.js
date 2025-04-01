document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('#page-header');

    // 生成气泡函数（保持不变）
    function createBubble() {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        const size = Math.random() * 60 + 20;
        const left = Math.random() * 100;
        const delay = Math.random() * 5;
        bubble.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${left}%;
            animation-delay: ${delay}s;
        `;
        header.appendChild(bubble);
    }

    // 初始化生成 20 个气泡
    for (let i = 0; i < 30; i++) createBubble();

    // ✅ 核心修复：动态获取所有气泡 + 事件委托
    header.addEventListener('mousemove', (e) => {
        // 每次事件触发时重新查询所有气泡
        const bubbles = document.querySelectorAll('.bubble');
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        bubbles.forEach(bubble => {
            const rect = bubble.getBoundingClientRect();
            const distX = mouseX - (rect.left + rect.width / 2);
            const distY = mouseY - (rect.top + rect.height / 2);
            const distance = Math.sqrt(distX * distX + distY * distY);

            if (distance < 150) {
                const angle = Math.atan2(distY, distX);
                const moveX = Math.cos(angle) * 20;
                const moveY = Math.sin(angle) * 20;
                bubble.style.transform = `translate(${moveX}px, ${moveY}px)`;
            } else {
                bubble.style.transform = ''; // 重置位置
            }
        });
    });

    // ✅ 动态添加新气泡的示例（测试用）
    // 假设滚动到页面底部时生成新气泡
    window.addEventListener('scroll', () => {
        if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
            createBubble(); // 添加新气泡
        }
    });
});