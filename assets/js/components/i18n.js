class I18nManager {
    constructor() {
        this.currentLang = localStorage.getItem('lang') || 'en';
        this.translations = {};
        this.init();
    }

    async init() {
        try {
            // 加载翻译文件
            const response = await fetch(`assets/i18n/${this.currentLang}/common.json`);
            this.translations = await response.json();
            this.updateContent();
        } catch (error) {
            console.error('Error loading translations:', error);
        }
    }

    updateContent() {
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            element.textContent = this.getTranslation(key);
        });
    }

    getTranslation(key) {
        return key.split('.').reduce((obj, k) => obj && obj[k], this.translations) || key;
    }

    switchLanguage(lang) {
        this.currentLang = lang;
        localStorage.setItem('lang', lang);
        this.init();
    }
} 