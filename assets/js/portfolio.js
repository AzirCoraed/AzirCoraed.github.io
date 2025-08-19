class PortfolioManager {
    constructor() {
        this.container = document.querySelector('.portfolio__container');
        this.filters = document.querySelectorAll('.portfolio__filter');
        this.projects = [];
        this.translations = {};
        
        this.init();
        this.listenToLanguageChange();
    }

    async init() {
        try {
            const currentLang = localStorage.getItem('lang') || 'en';
            const langPath = currentLang === 'en' ? 'en' : 'zh-CN';
            
            const translationResponse = await fetch(`assets/i18n/${langPath}/common.json`);
            this.translations = await translationResponse.json();

            // 通过统一的数据访问层获取作品集，优先 API，回退本地 JSON
            const projects = await (window.DataAPI && window.DataAPI.getPortfolio ? window.DataAPI.getPortfolio() : (async () => {
                const res = await fetch('assets/data/portfolio.json');
                const data = await res.json();
                return data.projects || [];
            })());
            this.projects = projects;
            
            // 更新过滤器文本
            this.updateFilterLabels();
            
            this.renderProjects('all');
            this.bindFilterEvents();
        } catch (error) {
            console.error('Error in init:', error);
        }
    }

    renderProjects(filter) {
        if (!this.projects || !this.translations) {
            console.error('Projects or translations not loaded');
            return;
        }

        const filteredProjects = filter === 'all' 
            ? this.projects 
            : this.projects.filter(project => this.normalizeCategoryToFilter(project.category) === filter);
        
        this.container.innerHTML = filteredProjects.map(project => this.createProjectCard(project)).join('');
    }

    createProjectCard(project) {
        const currentLang = localStorage.getItem('lang') || 'en';
        const i18n = this.translations.portfolio;
        
        if (!i18n) {
            console.error('Translations not found');
            return '';
        }

        const isEnglish = currentLang === 'en';
        const filterKey = this.normalizeCategoryToFilter(project.category);
        const reverseCategoryMap = {
            'deep-learning': 'Deep Learning',
            'machine-learning': 'Machine Learning',
            'data-analysis': 'Data Analysis'
        };
        const categoryDisplayKey = reverseCategoryMap[filterKey];
        const categoryLabel = (this.translations.portfolio?.categories?.[categoryDisplayKey]) || project.category;

        // 修复角色显示
        const roleLabel = isEnglish ? 'Role' : i18n.labels.role;
        const roleText = isEnglish ? project.role_en : project.role;
        
        // 修复技术栈标签显示
        const techStackLabel = isEnglish ? 'Tech Stack' : i18n.labels.tech_stack;
        
        // 修复其他标签显示
        const achievementsLabel = isEnglish ? 'Achievements' : i18n.labels.achievements;
        const viewDetailsLabel = isEnglish ? 'View Details' : i18n.labels.view_details;

        return `
            <div class="portfolio__content">
                <div class="portfolio__img">
                    <img 
                        src="${project.image}" 
                        alt="${isEnglish ? project.title_en : project.title}" 
                        onerror="this.src='assets/img/portfolio1.jpg'"
                        loading="lazy"
                        class="portfolio__image ${project.image.endsWith('.gif') ? 'portfolio__image--gif' : ''}"
                    >
                    ${project.image.endsWith('.gif') ? '<span class="portfolio__gif-badge">GIF</span>' : ''}
                </div>
                
                <div class="portfolio__data">
                    <div class="portfolio__header">
                        <h3 class="portfolio__title">${isEnglish ? project.title_en : project.title}</h3>
                        <span class="portfolio__period">
                            <i class="uil uil-calendar-alt"></i>
                            ${project.period}
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
                        ${project.tech_stack.map(tech => `
                            <span class="portfolio__tech-tag">${tech}</span>
                        `).join('')}
                    </div>

                    <p class="portfolio__description">
                        ${isEnglish ? project.description_en : project.description}
                    </p>
                    
                    <div class="portfolio__achievements">
                        <h4 class="portfolio__achievements-title">
                            ${achievementsLabel}
                        </h4>
                        <ul class="portfolio__achievements-list">
                            ${(isEnglish ? project.achievements_en : project.achievements).map(item => `
                                <li>
                                    <i class="uil uil-check-circle"></i>
                                    <span>${item}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>

                    <a href="${project.github}" target="_blank" class="button button--flex button--small portfolio__button">
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
        window.addEventListener('languageChanged', async (event) => {
            const newLang = event.detail.language;
            console.log('Language changed event received:', newLang);
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
    const portfolioManager = new PortfolioManager();
    portfolioManager.listenToLanguageChange();
});