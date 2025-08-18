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
        // 1) 优先使用平铺键到嵌套键的映射（避免与同名对象冲突，如 'portfolio'/'about'）
        const mapped = flatKeyMap[key];
        if (mapped) {
            const val = getByPath(translations, mapped);
            if (typeof val === 'string') return val;
        }
        // 2) 支持点路径直接取嵌套
        if (key.includes('.')) {
            const val = getByPath(translations, key);
            if (typeof val === 'string') return val;
        }
        // 3) 仅当为字符串时才返回直接平铺键，防止返回对象导致跳过后续逻辑
        const direct = translations[key];
        if (typeof direct === 'string') return direct;
        return undefined;
    }

    function translatePage() {
        // 翻译纯文本
        document.querySelectorAll('[i18n]').forEach(el => {
            const key = el.getAttribute('i18n');
            const text = resolveTranslation(key);
            if (typeof text === 'string') {
                el.innerHTML = text;
            }
        });

        // 翻译占位符等属性
        document.querySelectorAll('[data-i18n-attr]').forEach(el => {
            // data-i18n-attr="placeholder:title" => 占位符使用 key 'title'
            const spec = el.getAttribute('data-i18n-attr');
            // 允许多个，用分号分隔，如 "placeholder:contact__me;title:contact__me"
            spec.split(';').forEach(pair => {
                const [attr, key] = pair.split(':').map(s => s && s.trim());
                if (!attr || !key) return;
                const text = resolveTranslation(key);
                if (typeof text === 'string') {
                    el.setAttribute(attr, text);
                }
            });
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
