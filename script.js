/* ==========================================================
   Nepashya Foundation
   Global Script v3.0
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ===============================
       Sticky Navbar
    =============================== */

    const navbar = document.querySelector(".navbar");

    function navbarScroll() {
        if (!navbar) return;

        if (window.scrollY > 40) {
            navbar.style.boxShadow = "0 15px 40px rgba(0,0,0,.08)";
        } else {
            navbar.style.boxShadow = "none";
        }
    }

    navbarScroll();
    window.addEventListener("scroll", navbarScroll);

    /* ===============================
       Scroll Animation
    =============================== */

    const observer = new IntersectionObserver((entries)=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                entry.target.classList.add("show");

            }

        });

    },{

        threshold:.15

    });

    document.querySelectorAll(".section,.card,.stat,.trust-grid div,.founder").forEach(item=>{

        item.classList.add("hidden-animation");

        observer.observe(item);

    });

    /* ===============================
       Counter Animation
    =============================== */

    const counters=document.querySelectorAll(".stat h3");

    counters.forEach(counter=>{

        const txt=counter.innerText;

        const num=parseInt(txt);

        if(isNaN(num)) return;

        let current=0;

        const speed=Math.max(20,num/60);

        const update=()=>{

            current+=speed;

            if(current<num){

                counter.innerText=Math.floor(current)+"+";

                requestAnimationFrame(update);

            }

            else{

                counter.innerText=txt;

            }

        };

        update();

    });

    /* ===============================
       Back To Top
    =============================== */

    const topBtn=document.createElement("button");

    topBtn.innerHTML="↑";

    topBtn.id="topBtn";

    document.body.appendChild(topBtn);

    topBtn.onclick=()=>{

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    };

    window.addEventListener("scroll",()=>{

        if(window.scrollY>500){

            topBtn.style.opacity="1";
            topBtn.style.visibility="visible";

        }

        else{

            topBtn.style.opacity="0";
            topBtn.style.visibility="hidden";

        }

    });

    /* ===============================
       Dark Mode
    =============================== */

    const darkBtn=document.createElement("button");

    darkBtn.innerHTML="🌙";

    darkBtn.id="darkToggle";

    document.body.appendChild(darkBtn);

    darkBtn.onclick=()=>{

        document.body.classList.toggle("dark");

        localStorage.setItem(

            "theme",

            document.body.classList.contains("dark")?"dark":"light"

        );

    };

    if(localStorage.getItem("theme")==="dark"){

        document.body.classList.add("dark");

    }

});
