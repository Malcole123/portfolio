AOS.init();


const openAboutCard = (where)=>{
    let modal_ = document.querySelector(".app_modal");
    let title= document.getElementById("modal_body_title");
    title.textContent = where
    modal_.classList.add("show_modal");
    showModalSection(where)
}



const closeAboutCard = (where)=>{
    let modal_ = document.querySelector(".app_modal");
    const modal_body = document.querySelectorAll(".app_modal_body_body");
    modal_body.forEach((card,index)=>{
        card.classList.add("d-none")
    })
    modal_.classList.remove("show_modal")
}

const showModalSection = (where)=>{
    let area_ = document.getElementById(`${where}_about_area`);
    area_.classList.remove("d-none")
}

const cards = document.querySelectorAll(".display_chip");
cards.forEach((card,index)=>{
    card.addEventListener('click', ()=>{
        let title_ = card.getAttribute("data-modal-control")
        openAboutCard(title_)
    })
})

let close = document.getElementById("closeAppModal");
close.addEventListener('click', ()=>{
    closeAboutCard()
})

const menuBtn = document.querySelector(".menu_icon");
menuBtn.addEventListener('click', ()=>{
    const navLink = document.querySelector(".nav_links");
    navLink.classList.toggle("show_nav_links")
})