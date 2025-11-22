class PixelTransition {
    constructor(container, options = {}) {
        this.container = container;
        this.columnCount = options.columnCount || 20;
        this.animationDelay = options.animationDelay || 0.03;
        this.startDelay = options.startDelay || 0; // Delay before animation starts
        this.autoStart = options.autoStart !== false; // Auto-start by default
        this.init();
    }

    shuffle(array) {
        const arr = [...array];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    createBlocks() {
        const blockSize = window.innerWidth * 0.05;
        const nbOfBlocks = Math.ceil(window.innerHeight / blockSize);
        const shuffledIndexes = this.shuffle([...Array(nbOfBlocks)].map((_, i) => i));
        
        return shuffledIndexes.map((randomIndex) => {
            const block = document.createElement('div');
            block.className = 'pixel-block';
            block.style.animationDelay = `${this.animationDelay * randomIndex}s`;
            return block;
        });
    }

    init() {
        this.container.innerHTML = '';
        this.container.className = 'pixel-background';
        
        for (let i = 0; i < this.columnCount; i++) {
            const column = document.createElement('div');
            column.className = 'pixel-column';
            
            const blocks = this.createBlocks();
            blocks.forEach(block => column.appendChild(block));
            
            this.container.appendChild(column);
        }

        // Auto-start with delay if enabled
        if (this.autoStart) {
            setTimeout(() => {
                this.start();
            }, this.startDelay);
        }
    }

    start() {
        requestAnimationFrame(() => {
            this.container.classList.add('animating');
        });

        // Remove the overlay after animation completes
        const maxDelay = this.animationDelay * Math.ceil(window.innerHeight / (window.innerWidth * 0.05));
        setTimeout(() => {
            this.container.style.pointerEvents = 'none';
        }, (maxDelay + 0.5) * 1000);
    }

    destroy() {
        this.container.innerHTML = '';
    }
}

// Export for Astro
if (typeof window !== 'undefined') {
    window.PixelTransition = PixelTransition;
}

export default PixelTransition;