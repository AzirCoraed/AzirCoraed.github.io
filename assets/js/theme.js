class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        this.currentTheme = localStorage.getItem('theme');
        
        this.init();
        this.bindEvents();
    }

    init() {
        // 优先使用用户已保存的主题
        if (this.currentTheme) {
            document.documentElement.setAttribute('data-theme', this.currentTheme);
        }
        // 否则使用系统主题
        else if (this.prefersDark.matches) {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
    }

    bindEvents() {
        // 主题切换按钮点击事件
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
        
        // 监听系统主题变化
        this.prefersDark.addEventListener('change', (e) => {
            if (!this.currentTheme) {
                document.documentElement.setAttribute(
                    'data-theme',
                    e.matches ? 'dark' : 'light'
                );
            }
        });
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        this.currentTheme = newTheme;
    }
}

// 初始化主题管理器
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
}); 