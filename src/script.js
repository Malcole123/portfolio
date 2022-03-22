const menuButton = document.querySelector('.menu-button');
const menu = document.querySelector('.menu')
const contactButton = document.querySelector('.contact-button');
const impressionArea = document.querySelector('.first_impressions');
const skillCards = document.querySelectorAll('.skill-card');

menuButton.addEventListener('click', ()=>{
    let curr_class = menu.className
    if(curr_class.includes('menu-open')){
        menu.classList.remove('menu-open')
    }else{
        menu.classList.add('menu-open')
    }
})

let impressOption = {
    root_margin:'-150px',
    threshold:0.4,

}
const lazyLoad = (el_name, targ_class)=>{
    let element = document.querySelectorAll(`.${el_name}`);
    var base_time = 1200
    element.forEach((el)=>{
        setTimeout(()=>{
            el.classList.add(targ_class)
        },base_time);
        base_time+=200
    })
}
let impressObserver = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
        if(entry.isIntersecting){
            lazyLoad('skill_upsell','remove-hidden')
        }
    })
}, impressOption)

impressObserver.observe(impressionArea)



window.addEventListener('scroll', ()=>{
    let current = window.scrollY;
    if(current > 2){
        contactButton.classList.add('scroll-contact')
    }else{
        contactButton.classList.remove('scroll-contact')
    }
})
