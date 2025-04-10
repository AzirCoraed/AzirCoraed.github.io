/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close');

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener('click',()=>{
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose){
    navClose.addEventListener('click',()=>{
        navMenu.classList.remove('show-menu')
    })
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // 点击每个菜单链接后收起菜单栏
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== ACCORDION SKILLS ====================*/
const skillsContent = document.getElementsByClassName('skills__content'),
      skillsHeader = document.querySelectorAll('.skills__header')

      function toggleSkills() {
        let itemClass = this.parentNode.className

        for(i = 0; i < skillsContent.length; i++) {
          skillsContent[i].className = 'skills__content skills__close'
        }
        if(itemClass === 'skills__content skills__close'){
          this.parentNode.className = 'skills__content skills__open'
        }
      }
      
      skillsHeader.forEach((el) => {
        el.addEventListener('click', toggleSkills)
      })

/*==================== QUALIFICATION TABS ====================*/
const tabs = document.querySelectorAll('[data-target]'),
      tabContents = document.querySelectorAll('[data-content]')

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    console.log('click disparado')
    const target = document.querySelector(tab.dataset.target)

    tabContents.forEach(tabContent => {
      tabContent.classList.remove('qualification__active')
    })
    target.classList.add('qualification__active')

    tabs.forEach(tab => {
      tab.classList.remove('qualification__active')
    })
    tab.classList.add('qualification__active')
  })
})

/*==================== CERTIFICATES FILTER ====================*/
const certificatesFilters = document.querySelectorAll('.certificates__filter');
const certificatesItems = document.querySelectorAll('.certificates__item');

function filterCertificates(filterValue) {
  certificatesItems.forEach(item => {
    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
      item.style.display = 'block';
      item.classList.remove('hide');
    } else {
      item.classList.add('hide');
      setTimeout(() => {
        item.style.display = 'none';
      }, 300);
    }
  });
}

certificatesFilters.forEach(filter => {
  filter.addEventListener('click', () => {
    const activeFilter = document.querySelector('.certificates__filter.active-filter');
    if (activeFilter) {
      activeFilter.classList.remove('active-filter');
    }
    filter.classList.add('active-filter');
    
    const filterValue = filter.getAttribute('data-filter');
    filterCertificates(filterValue);
  });
});

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    sections.forEach(current =>{
        const sectionHeight = current.clientHeight
        const sectionTop = current.getBoundingClientRect().top;
        const sectionId = current.getAttribute('id')
        // section 位于视口中间时添加样式 active-link
        if(sectionTop <= window.innerHeight / 2 && sectionTop + sectionHeight >= window.innerHeight / 2){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*==================== CHANGE BACKGROUND HEADER ====================*/ 
function scrollHeader(){
    const nav = document.getElementById('header')
    if(this.scrollY >= 80) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header')
  }
  window.addEventListener('scroll', scrollHeader)

/*==================== SHOW SCROLL UP ====================*/ 
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    if(this.scrollY >= 560) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
  }
  window.addEventListener('scroll', scrollUp)

/*==================== 深色主题切换 ====================*/
const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'uil-sun';

// 从本地存储获取用户之前的主题选择
const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

// 获取当前主题状态
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun';

// 如果用户之前选择过主题，则应用该主题
if (selectedTheme) {
    // 添加或移除深色主题类
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
    // 更新图标
    themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme);
}

// 主题切换按钮点击事件
themeButton.addEventListener('click', () => {
    // 切换深色主题类
    document.body.classList.toggle(darkTheme);
    // 切换图标
    themeButton.classList.toggle(iconTheme);
    
    // 保存用户的选择到本地存储
    localStorage.setItem('selected-theme', getCurrentTheme());
    localStorage.setItem('selected-icon', getCurrentIcon());
});

// 滚动显示动画
const scrollReveal = () => {
    const elements = document.querySelectorAll('.scroll-reveal');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(element => observer.observe(element));
};

// 滚动进度条
const createScrollProgress = () => {
    const progress = document.createElement('div');
    progress.className = 'scroll-progress';
    document.body.appendChild(progress);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progress.style.transform = `scaleX(${scrolled / 100})`;
    });
};

// 初始化动画
document.addEventListener('DOMContentLoaded', () => {
    scrollReveal();
    createScrollProgress();
    
    // 为需要动画的元素添加类
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('scroll-reveal');
    });
});