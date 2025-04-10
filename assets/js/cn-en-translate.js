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
        'download__transcript': '下载成绩单',
        'about__courses-title': '主修课程',
        'course1': '数据结构与算法',
        'course2': '机器学习',
        'course3': '大数据技术',
        'course4': '统计分析',
        'course5': '数据库系统',
        'course6': '数据挖掘',

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
        'footer__copy': '© 2024 Coraed. 保留所有权利。',

        // 证书与奖项
        'certificates__filter-all': "全部",
        'certificates__filter-competition': "竞赛奖项",
        'certificates__filter-certification': "专业认证",
        
        'certificates__title': "证书与奖项",
        'certificates__subtitle': "学术成就展示",
        
        'math_modeling_2023__title': "2023年全国大学生数学建模竞赛广东省分赛三等奖",
        'math_modeling_2023__details': "C题 蔬菜类商品的自动定价与补货决策",
        
        'math_competition_2021__title': "2021年东莞理工学院数学竞赛（理工类）三等奖",
        'math_competition_2021__details': "2021年暨第十三届全国大学生数学竞赛校内选拔赛获奖",
        
        'math_modeling_2022__title': "2022年全国大学生数学建模竞赛广东省分赛三等奖",
        'math_modeling_2022__details': "B题 无人机纯方位无源定位",
        
        'math_competition_2023__title': "2023年东莞理工学院数学竞赛（理工类）二等奖",
        'math_competition_2023__details': "东莞理工学院数学竞赛二等奖获得者",
        
        'hcia__title': "华为HCIA大数据认证",
        'hcia__details': "华为认证 ICT 初级工程师 - 大数据方向",
        
        'hcip__title': "华为HCIP大数据开发认证",
        'hcip__details': "华为认证 ICT 高级工程师 - 大数据开发方向"
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
        'download__transcript': 'Download Transcript',
        'about__courses-title': 'Major Courses',
        'course1': 'Data Structures and Algorithms',
        'course2': 'Machine Learning',
        'course3': 'Big Data Technologies',
        'course4': 'Statistical Analysis',
        'course5': 'Database Systems',
        'course6': 'Data Mining',

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
        'footer__copy': '© 2024 Coraed. All rights reserved.',

        // Certificates & Awards
        'certificates__filter-all': "All",
        'certificates__filter-competition': "Competitions",
        'certificates__filter-certification': "Certifications",
        
        'certificates__title': "Certificates & Awards",
        'certificates__subtitle': "Academic Achievements",
        
        'math_modeling_2023__title': "Third Prize, Contemporary Undergraduate Mathematical Contest in Modeling (Guangdong)",
        'math_modeling_2023__details': "Topic C: Optimization of Pricing and Inventory Strategies for Agricultural Products",
        
        'math_modeling_2022__title': "Third Prize, Contemporary Undergraduate Mathematical Contest in Modeling (Guangdong)",
        'math_modeling_2022__details': "Topic B: Research on UAV Passive Positioning Based on Pure Bearing Measurement",
        
        'math_competition_2021__title': "Third Prize, DGUT Mathematics Competition for Science and Engineering",
        'math_competition_2021__details': "Preliminary Round of the 13th China Undergraduate Mathematical Contest",
        
        'math_competition_2023__title': "Second Prize, DGUT Mathematics Competition for Science and Engineering",
        'math_competition_2023__details': "Annual University Mathematics Competition for STEM Students",
        
        'hcia__title': "Huawei HCIA-BigData Certification",
        'hcia__details': "Huawei Certified ICT Associate - Big Data Architecture and Applications",
        
        'hcip__title': "Huawei HCIP-BigData Developer Certification",
        'hcip__details': "Huawei Certified ICT Professional - Advanced Big Data Development and Analytics"
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
