// 统一的 JSON 驱动多语言渲染器（兼容现有 [i18n] 平铺键）
(function () {
    const TRANSLATION_DIR = 'assets/i18n';

    // 将历史存储的 'cn' 迁移为 'zh-CN'
    const raw = localStorage.getItem('lang');
    if (raw === 'cn') {
        localStorage.setItem('lang', 'zh-CN');
    }

    let currentLang = localStorage.getItem('lang') || 'en';
    if (currentLang !== 'en' && currentLang !== 'zh-CN') {
        currentLang = 'en';
        localStorage.setItem('lang', 'en');
    }

    let translations = {};

    function setHtmlLangAttr(lang) {
        document.documentElement.setAttribute('lang', lang === 'zh-CN' ? 'zh-CN' : 'en');
    }

    function updateTranslateButton() {
        const translateBtn = document.getElementById('nav__translate');
        if (translateBtn) {
            translateBtn.textContent = currentLang === 'en' ? '中文' : 'EN';
        }
    }

    function getByPath(obj, path) {
        return path.split('.').reduce((o, k) => (o && o[k] != null ? o[k] : undefined), obj);
    }

    // 平铺键到嵌套键的可选映射（仅覆盖必要项）
    const flatKeyMap = {
        // 导航
        'home': 'nav.home',
        'about': 'nav.about',
        'skills': 'nav.skills',
        'portfolio': 'nav.portfolio',
        'contact': 'nav.contact',
        // 首页
        'home__title': 'home.title',
        'home__subtitle': 'home.subtitle',
        'home__description': 'home.description',
        'home__contact': 'home.contact',
        'home__scroll-name': 'home.scroll',
        // 关于
        'about__title': 'about.title',
        'about__subtitle': 'about.subtitle',
        'about__description': 'about.description',
        'about__info-name1': 'about.info.experience',
        'about__info-name2': 'about.info.projects',
        'about__info-name3': 'about.info.internships',
        // 作品集标题
        'portfolio__title': 'portfolio.title',
        'portfolio__subtitle': 'portfolio.subtitle'
    };

    function resolveTranslation(key) {
        // 1) 直接平铺键
        if (translations[key] != null) return translations[key];
        // 2) 平铺键映射到嵌套
        const mapped = flatKeyMap[key];
        if (mapped) {
            const val = getByPath(translations, mapped);
            if (val != null) return val;
        }
        // 3) 直接按点路径取嵌套
        if (key.includes('.')) {
            const val = getByPath(translations, key);
            if (val != null) return val;
        }
        return undefined;
    }

    function translatePage() {
        document.querySelectorAll('[i18n]').forEach(el => {
            const key = el.getAttribute('i18n');
            const text = resolveTranslation(key);
            if (typeof text === 'string') {
                el.innerHTML = text;
            }
        });
    }

    async function loadTranslations(lang) {
        const langPath = lang === 'en' ? 'en' : 'zh-CN';
        const res = await fetch(`${TRANSLATION_DIR}/${langPath}/common.json`);
        translations = await res.json();
    }

    async function applyLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('lang', currentLang);
        setHtmlLangAttr(currentLang);
        await loadTranslations(currentLang);
        translatePage();
        updateTranslateButton();
        // 通知其他模块（如 portfolio.js）
        const event = new CustomEvent('languageChanged', { detail: { language: currentLang } });
        window.dispatchEvent(event);
    }

    document.addEventListener('DOMContentLoaded', async () => {
        setHtmlLangAttr(currentLang);
        await applyLanguage(currentLang);
        const trigger = document.getElementById('translate');
        if (trigger) {
            trigger.addEventListener('click', async () => {
                const next = currentLang === 'en' ? 'zh-CN' : 'en';
                await applyLanguage(next);
            });
        }
    });
})();
