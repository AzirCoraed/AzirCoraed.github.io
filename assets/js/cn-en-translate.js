$(document).ready(function () {
    /*默认语言*/
    const lang = localStorage.getItem("lang");
    const defaultLang = lang ? lang : "en";
    
    // 应用翻译
    applyTranslation(defaultLang);
    
    /*中英文切换按钮*/
    const text = defaultLang == "cn" ? "中/En" : "En/中";
    $("#nav__translate").text(text);
    
    $("#translate").click(function (e) {
        const currentLang = localStorage.getItem("lang") ? localStorage.getItem("lang") : defaultLang;
        const targetLang = currentLang == "cn" ? "en" : "cn";
        const text = targetLang == "cn" ? "中/En" : "En/中";
        $("#nav__translate").text(text);
        
        // 切换语言时应用翻译
        applyTranslation(targetLang);
        localStorage.setItem("lang", targetLang);
    });
});

// 应用翻译的函数
function applyTranslation(lang) {
    $("[i18n]").each(function() {
        const key = $(this).attr("i18n");
        if (messages[lang] && messages[lang][key]) {
            $(this).html(messages[lang][key]);
        }
    });
}

const messages = {
    'cn': {
        // 导航栏
        'home': '首页',
        'about': '关于',
        'skills': '技能',
        'qualification': '资质',
        'portfolio': '作品集',
        'contact': '联系',

        // 首页
        'home__title': 'Coraed',
        'home__subtitle': '数据科学与大数据技术专业',
        'home__description': '热衷于数据科学和人工智能领域的研究与应用',
        'contact__me': '联系我',

        // 关于
        'about__title': 'About Me',
        'about__subtitle': 'My Introduction',
        'about__description': '数据科学专业学生，具有扎实的数学基础和编程能力，对机器学习和深度学习有浓厚兴趣。',
        'download__cv': '下载简历',

        // 技能
        'skills__title': 'Skills',
        'skills__subtitle': 'Proficiency',

        // 资质认证
        'education': '教育经历',
        'work': '工作经历',
        'qualification1__title': '数据科学与大数据技术专业',
        'qualification1__subtitle': '东莞理工学院',
        'qualification2__title': '机器学习\n深度学习',
        'qualification2__subtitle': '自学',
        'qualification3__title': 'AI开发\nStable Diffusion\n大语言模型LLM',
        'qualification3__subtitle': '自学',
        'qualification4__title': '广州统计师事务所（数据分析）',
        'qualification4__subtitle': '广州',

        // 作品集
        'portfolio__title': 'Portfolio',
        'portfolio__subtitle': 'Recent Projects',
        'portfolio__description': 'View Details',

        // 联系方式
        'contact__title': 'Contact Me',
        'contact__subtitle': 'Get in touch',
        'tel': 'Call Me',
        'tel__number': '+86 131 8905 0890',
        'email': '邮箱',
        'location': '位置',
        'location__detail': '中国广州',
        'send__message': '发送消息',
        'write__me': '给我写信',
        'project__in__mind': '有项目想法？',

        // 页脚
        'footer__title': '数据科学 & AI',
        'footer__subtitle': '让数据创造价值',
        'footer__copy': '© 2024 Coraed. 保留所有权利。'
    },
    'en': {
        // Navigation
        'home': 'Home',
        'about': 'About',
        'skills': 'Skills',
        'qualification': 'Qualification',
        'portfolio': 'Portfolio',
        'contact': 'Contact',

        // Home
        'home__title': 'Coraed',
        'home__subtitle': 'Data Science and Big Data Technology',
        'home__description': 'Passionate about research and applications in Data Science and AI',
        'contact__me': 'Contact Me',

        // About
        'about__title': 'About Me',
        'about__subtitle': 'My Introduction',
        'about__description': 'Data Science student with solid mathematical foundation and programming skills, deeply interested in Machine Learning and Deep Learning.',
        'download__cv': 'Download CV',

        // Skills
        'skills__title': 'Skills',
        'skills__subtitle': 'Proficiency',

        // Qualification
        'education': 'Education',
        'work': 'Work',
        'qualification1__title': 'Data Science and Big Data Technology',
        'qualification1__subtitle': 'Dongguan University of Technology',
        'qualification2__title': 'Machine Learning\nDeep Learning',
        'qualification2__subtitle': 'Self-Study',
        'qualification3__title': 'AI Development\nStableDiffusion\nLLM',
        'qualification3__subtitle': 'Self-Study',
        'qualification4__title': 'Data Analytics',
        'qualification4__subtitle': 'GUANGZHOU',

        // Portfolio
        'portfolio__title': 'Portfolio',
        'portfolio__subtitle': 'Recent Projects',
        'portfolio__description': 'View Details',

        // Contact
        'contact__title': 'Contact Me',
        'contact__subtitle': 'Get in touch',
        'tel': 'Call Me',
        'tel__number': '+86 131 8905 0890',
        'email': 'Email',
        'location': 'Location',
        'location__detail': 'GUANGZHOU, CHN',
        'send__message': 'Send Message',
        'write__me': 'Write me',
        'project__in__mind': 'Project in mind?',

        // Footer
        'footer__title': 'Data Science & AI',
        'footer__subtitle': 'Making Data Valuable',
        'footer__copy': '© 2024 Coraed. All rights reserved.'
    }
};

// 初始化
let currentLang = localStorage.getItem('lang') || 'en';

window.onload = () => {
    translatePage();
    updateTranslateButton();
};

// 更新翻译按钮文本
function updateTranslateButton() {
    const translateBtn = document.getElementById('nav__translate');
    if (translateBtn) {
        translateBtn.textContent = currentLang === 'en' ? '中文' : 'EN';
    }
}

// 翻译页面
function translatePage() {
    const elements = document.querySelectorAll('[i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('i18n');
        if (messages[currentLang] && messages[currentLang][key]) {
            element.innerHTML = messages[currentLang][key];
        }
    });
}

// 绑定事件
document.getElementById('translate').addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'cn' : 'en';
    localStorage.setItem('lang', currentLang);
    
    translatePage();
    updateTranslateButton();
    
    // 触发语言切换事件
    const event = new CustomEvent('languageChanged', { 
        detail: { language: currentLang } 
    });
    window.dispatchEvent(event);
});
