// Lightweight data access layer to prepare for future backend integration.
// Tries API endpoints first, then falls back to local JSON under assets/data.
(function () {
    const cache = new Map();

    function getLang() {
        const lang = localStorage.getItem('lang');
        return lang === 'zh-CN' ? 'zh-CN' : 'en';
    }

    async function request(primaryUrl, fallbackUrl) {
        const cacheKey = primaryUrl || fallbackUrl;
        if (cache.has(cacheKey)) return cache.get(cacheKey);
        try {
            if (primaryUrl) {
                const res = await fetch(primaryUrl, { credentials: 'omit' });
                if (res.ok) {
                    const data = await res.json();
                    cache.set(cacheKey, data);
                    return data;
                }
            }
        } catch (_) {
            // ignore and try fallback
        }
        const res = await fetch(fallbackUrl, { credentials: 'omit' });
        const data = await res.json();
        cache.set(cacheKey, data);
        return data;
    }

    const DataAPI = {
        getLang,
        async getHome() {
            return request('/api/home', 'assets/data/home.json');
        },
        async getAbout() {
            return request('/api/about', 'assets/data/about.json');
        },
        async getSkills() {
            return request('/api/skills', 'assets/data/skills.json');
        },
        async getCertificates() {
            return request('/api/certificates', 'assets/data/certificates.json');
        },
        async getPortfolio() {
            const data = await request('/api/portfolio', 'assets/data/portfolio.json');
            return data.projects || [];
        },
        async getContact() {
            return request('/api/contact', 'assets/data/contact.json');
        },
        async getQualification() {
            return request('/api/qualification', 'assets/data/qualification.json');
        }
    };

    window.DataAPI = DataAPI;
})();


