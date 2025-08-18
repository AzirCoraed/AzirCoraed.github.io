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
// Certificates will be rendered from data layer later (prepare for CRUD),
// keep filter UI logic minimal and data-driven.
(() => {
  const filters = document.querySelectorAll('.certificates__filter');
  const items = document.querySelectorAll('.certificates__item');
  if (!filters.length || !items.length) return;
  const apply = (value) => {
    items.forEach(item => {
      const matched = value === 'all' || item.getAttribute('data-category') === value;
      item.style.display = matched ? 'block' : 'none';
      item.classList.toggle('hide', !matched);
    });
  };
  filters.forEach(btn => btn.addEventListener('click', () => {
    document.querySelector('.certificates__filter.active-filter')?.classList.remove('active-filter');
    btn.classList.add('active-filter');
    apply(btn.getAttribute('data-filter'));
  }));
})();

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

/* 深色主题切换逻辑已统一至 assets/js/theme.js（基于 data-theme） */

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
    // 先为需要动画的元素添加类，再启动观察器，避免未被观察导致元素保持透明
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('scroll-reveal');
    });
    scrollReveal();
    createScrollProgress();
});