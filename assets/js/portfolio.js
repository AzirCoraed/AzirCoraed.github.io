class PortfolioManager {
    constructor() {
        this.container = document.querySelector('.portfolio__container');
        this.filters = document.querySelectorAll('.portfolio__filter');
        this.projects = [];
        this.translations = {};
        this._initToken = 0;
        this._isListening = false;
        
        this.init();
        this.listenToLanguageChange();
    }

    async init() {
        const token = ++this._initToken;
        try {
            if (!this.container) return;
            this.container.innerHTML = `<div class="portfolio__empty">${(localStorage.getItem('lang') || 'en') === 'en' ? 'Loading projects…' : '项目加载中…'}</div>`;

            const currentLang = localStorage.getItem('lang') || 'en';
            const langPath = currentLang === 'en' ? 'en' : 'zh-CN';
            
            const translationResponse = await fetch(`assets/i18n/${langPath}/common.json`, { cache: 'no-store' });
            if (token !== this._initToken) return;
            if (!translationResponse.ok) throw new Error(`i18n load failed: ${translationResponse.status}`);
            this.translations = await translationResponse.json();
            if (token !== this._initToken) return;

            // 通过统一的数据访问层获取作品集，优先 API，回退本地 JSON
            const projects = await (window.DataAPI && window.DataAPI.getPortfolio ? window.DataAPI.getPortfolio() : (async () => {
                const res = await fetch('assets/data/portfolio.json', { cache: 'no-store' });
                const data = await res.json();
                return data.projects || [];
            })());
            if (token !== this._initToken) return;
            this.projects = projects;
            
            // 更新过滤器文本
            this.updateFilterLabels();
            
            this.renderProjects('all');
            this.bindFilterEvents();
        } catch (error) {
            if (!this.container) return;
            const isEnglish = (localStorage.getItem('lang') || 'en') === 'en';
            this.container.innerHTML = `<div class="portfolio__empty">${isEnglish ? 'Failed to load projects. Please refresh.' : '项目加载失败，请刷新重试。'}</div>`;
        }
    }

    renderProjects(filter) {
        if (!this.container) return;
        if (!Array.isArray(this.projects)) this.projects = [];

        const filteredProjects = filter === 'all' 
            ? this.projects 
            : this.projects.filter(project => this.normalizeCategoryToFilter(project.category) === filter);

        if (!filteredProjects.length) {
            const isEnglish = (localStorage.getItem('lang') || 'en') === 'en';
            this.container.innerHTML = `<div class="portfolio__empty">${isEnglish ? 'No projects.' : '暂无项目。'}</div>`;
            return;
        }

        const cards = [];
        for (let i = 0; i < filteredProjects.length; i++) {
            try {
                cards.push(this.createProjectCard(filteredProjects[i]));
            } catch (_) {
            }
        }
        this.container.innerHTML = cards.join('');
    }

    createProjectCard(project) {
        const currentLang = localStorage.getItem('lang') || 'en';
        const i18n = this.translations && this.translations.portfolio ? this.translations.portfolio : null;

        const isEnglish = currentLang === 'en';
        const filterKey = this.normalizeCategoryToFilter(project.category);
        const reverseCategoryMap = {
            'deep-learning': 'Deep Learning',
            'machine-learning': 'Machine Learning',
            'data-analysis': 'Data Analysis'
        };
        const categoryDisplayKey = reverseCategoryMap[filterKey];
        const categoryLabel = (this.translations?.portfolio?.categories?.[categoryDisplayKey]) || project.category || '';

        // 修复角色显示
        const roleLabel = isEnglish ? 'Role' : (i18n?.labels?.role || '担任角色');
        const roleText = isEnglish ? (project.role_en || project.role || '') : (project.role || project.role_en || '');
        
        // 修复技术栈标签显示
        const techStackLabel = isEnglish ? 'Tech Stack' : (i18n?.labels?.tech_stack || '技术栈');
        
        // 修复其他标签显示
        const achievementsLabel = isEnglish ? 'Achievements' : (i18n?.labels?.achievements || '项目成果');
        const viewDetailsLabel = isEnglish ? 'View Details' : (i18n?.labels?.view_details || '查看详情');

        const image = typeof project.image === 'string' ? project.image : '';
        const isGif = image.toLowerCase().endsWith('.gif');
        const techStack = Array.isArray(project.tech_stack) ? project.tech_stack : [];
        const achievements = Array.isArray(isEnglish ? project.achievements_en : project.achievements)
            ? (isEnglish ? project.achievements_en : project.achievements)
            : [];
        const title = isEnglish ? (project.title_en || project.title || '') : (project.title || project.title_en || '');
        const description = isEnglish ? (project.description_en || project.description || '') : (project.description || project.description_en || '');
        const period = project.period || '';
        const github = project.github || '#';

        return `
            <div class="portfolio__content">
                <div class="portfolio__img">
                    <img 
                        src="${image}" 
                        alt="${title}" 
                        onerror="this.src='assets/img/portfolio1.jpg'"
                        loading="lazy"
                        class="portfolio__image ${isGif ? 'portfolio__image--gif' : ''}"
                    >
                    ${isGif ? '<span class="portfolio__gif-badge">GIF</span>' : ''}
                </div>
                
                <div class="portfolio__data">
                    <div class="portfolio__header">
                        <h3 class="portfolio__title">${title}</h3>
                        <span class="portfolio__period">
                            <i class="uil uil-calendar-alt"></i>
                            ${period}
                        </span>
                    </div>
                    
                    <div class="portfolio__role">
                        <i class="uil uil-user-circle"></i>
                        <span>${roleLabel}: ${roleText}</span>
                    </div>

                    <div class="portfolio__category">
                        <i class="uil uil-tag-alt"></i>
                        <span>${categoryLabel}</span>
                    </div>

                    <div class="portfolio__tech">
                        <span class="portfolio__tech-label">${techStackLabel}:</span>
                        ${techStack.map(tech => `
                            <span class="portfolio__tech-tag">${tech}</span>
                        `).join('')}
                    </div>

                    <p class="portfolio__description">
                        ${description}
                    </p>
                    
                    <div class="portfolio__achievements">
                        <h4 class="portfolio__achievements-title">
                            ${achievementsLabel}
                        </h4>
                        <ul class="portfolio__achievements-list">
                            ${achievements.map(item => `
                                <li>
                                    <i class="uil uil-check-circle"></i>
                                    <span>${item}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>

                    <a href="${github}" target="_blank" class="button button--flex button--small portfolio__button">
                        <span>${viewDetailsLabel}</span>
                        <i class="uil uil-github-alt button__icon"></i>
                    </a>
                </div>
            </div>
        `;
    }

    bindFilterEvents() {
        this.filters.forEach(filter => {
            filter.addEventListener('click', () => {
                // 更新激活状态
                this.filters.forEach(f => f.classList.remove('active-filter'));
                filter.classList.add('active-filter');
                
                // 筛选项目
                const filterValue = filter.getAttribute('data-filter');
                this.renderProjects(filterValue);
            });
        });
    }

    // 监听语言切换
    listenToLanguageChange() {
        if (this._isListening) return;
        this._isListening = true;
        window.addEventListener('languageChanged', async (event) => {
            const newLang = event.detail.language;
            localStorage.setItem('lang', newLang);
            await this.init();
        });
    }

    // 添加过滤器标签更新方法
    updateFilterLabels() {
        const currentLang = localStorage.getItem('lang') || 'en';
        const i18n = this.translations.portfolio;
        
        if (i18n && i18n.filters) {
            this.filters.forEach(filter => {
                const filterKey = filter.getAttribute('data-filter');
                const translationKey = filterKey; // 保持与 JSON 一致的键（包含连字符）
                if (i18n.filters[translationKey]) {
                    filter.textContent = i18n.filters[translationKey];
                }
            });
        }
    }

    // 将项目类别映射到过滤键，保证筛选一致
    normalizeCategoryToFilter(category) {
        if (!category) return 'data-analysis';
        const key = String(category).trim().toLowerCase();
        if (key === 'deep learning' || key === 'deep-learning') return 'deep-learning';
        if (key === 'machine learning' || key === 'machine-learning') return 'machine-learning';
        if (key === 'data analysis' || key === 'data-analysis' || key === 'data analytics') return 'data-analysis';
        // 兼容非标准类别
        if (key === 'python') return 'data-analysis';
        return 'data-analysis';
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioManager();
});
