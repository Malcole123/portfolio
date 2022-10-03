
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
const navLinks = document.querySelectorAll('.navlink_menu_item');
let navLink = document.querySelector(".nav_links");

navLinks.forEach((link,index)=>{
    link.addEventListener('click', ()=>{
        if(window.innerWidth <= 1086){
            setTimeout(()=>{
                navLink.classList.remove("show_nav_links")
            },300)
        }
    })
})


menuBtn.addEventListener('click', ()=>{
    navLink.classList.toggle("show_nav_links")
})

class Cannon {
    constructor(fixedPoint, rotate, cannon, cannonBall){
        //Document
        this.docDimensions = {
            height:0,
            width:0,
        }

        //Cannon
        this.fixedPoint_id = fixedPoint
        this.rotatePoint_id = rotate
        this.mousePosition = {
            x:0,
            y:0,
        },
        this.fixedPoint = null;
        this.rotatePoint = null;
        this.cannon = document.getElementById(cannon);
        this.rotateAngle = 0
        //Cannon ball
        this.ball = document.getElementById(cannonBall);
        this.ballPosition = {
            x:0,
            y:0,
        }
    }
    setMousePosition(event){
        this.mousePosition.x  = event.clientX;
        this.mousePosition.y = event.clientY;
    }

    setElements(){
        this.fixedPoint = document.getElementById(this.fixedPoint_id);
        this.rotatePoint = document.getElementById(this.rotatePoint_id); 
        this.findBallPosition();
        console.log(this.ballPosition)
    }
    findBallPosition(){
        let start_position = this.ball.getBoundingClientRect();
        let body_ = document.querySelector("body");
        let body_rect = body_.getBoundingClientRect();
        this.docDimensions.height = body_rect.height;
        this.docDimensions.width = body_rect.right;
        //Find  Y position using distance from bottom 
        this.ballPosition.y = start_position.top-  body_rect.top
        this.ballPosition.x = start_position.x;
    }
    changeBallPosition(x,y){
        this.ball.style.position = "fixed";
        this.ball.style.zIndex = "99"
        this.ball.style.top = `${y}px`;
        this.ball.style.left = `${x}px`;
        //Moving ball absolute in con
        this.ball.style.background = "#f44336"
    }

    rotate(){
        this.rotatePoint.style.transform = `rotate(${this.rotateAngle}deg)`
    }
    

}

const cannon = new Cannon("fixed_point", "rotate_cannon", "cannon_", "cannonBall");


let formProg_ = document.getElementById("formLoader");
const submitForm = async(event)=>{
    formProg_.classList.remove("d-none")
    let form = event.currentTarget;
    let val_arr = ['Name', 'Email', 'Message'];
    let input_arr = [];
    //least efficient way, Done to show for each loops in project portfolio
    val_arr.forEach((val_, index)=>{
        let el_ = document.getElementById(`_id_${val_}`);
        if(el_ !== null && el_ !== undefined){
            input_arr.push(el_.value)
        }
    })

    const showFinalArea = (where_)=>{
        let area = document.getElementById(`${where_}SentArea`);
        area.classList.replace("d-none", "d-block")
    }
    const removeSpinner = (final_state)=>{
        setTimeout(()=>{
            formProg_.classList.add("d-none");
            showFinalArea(final_state);
        },1200)
    }
    await fetch("/contact/collect", {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            name:input_arr[0],
            email:input_arr[1],
            message:input_arr[2],
        })
    }).then(res=>res.json()).then(data=>{
        form.classList.add("d-none")
        if(data.completed){
            removeSpinner('success');
        }else{
            removeSpinner('error');
        }
    }).catch(error=>{
        removeSpinner('error');
    })

}

let form = document.getElementById("contactForm_");

form.addEventListener('submit', (event)=>{
    event.preventDefault();
    submitForm(event)
})

//Preview

