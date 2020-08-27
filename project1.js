gsap.registerPlugin(ScrollTrigger);

console.log("fuck me baby")
var navTab = document.getElementById("nav-tab");
var navLinkItem = document.getElementById("nav-link-item");
var navTabOpen = true;
var nav = document.querySelector("#nav-logo-tab-wrapper");
navTab.addEventListener('click', () => {
    if (navTabOpen) {
        navTab.classList.add('open');
        navLinkItem.style.display = "block";
        navTabOpen = false;
    } else {
        navTab.classList.remove('open');
        navLinkItem.style.display = "none";
        navTabOpen = true;
    }
});
window.addEventListener("scroll", () => {
        if (window.scrollY) {
            nav.classList.add("fixed")
        } else {
            nav.classList.remove("fixed")
        }

    })
    //GSAP ANIMATION CODE
    // gsap.to('#nav-logo-tab-wrapper', {
    //     duration: 1,
    //     backgroundColor: 'black',
    //     position: 'fixed',
    //     top: 0,
    //     left: 0,
    //     padding: '10',
    //     zIndex: 1000,
    //     scrollTrigger: {
    //         trigger: '#section2',
    //         // scrub: true,
    //         // markers: true,
    //         start: 'top-=650 top+=10',
    //         end: "top-=650 top+=10",
    //         toggleActions: 'none play reverse none'
    //     }
    // })
    // gsap.to("#main-wrapper", {
    //     duration: .7,
    //     marginTop: "4em",
    //     scrollTrigger: {
    //         trigger: "#section2",
    //         // markers: true,
    //         start: 'top-=650 top+=10',
    //         end: "top-=650 top+=10",
    //         toggleActions: 'play none none reverse'
    //     }
    // })
const fadeIn = document.querySelectorAll('.a-block');
fadeIn.forEach((fade) => {
    gsap.from(fade, {
        duration: 0.5,
        yPercent: 10,
        opacity: 0,
        scrollTrigger: {
            trigger: fade.querySelectorAll('.sec2-div-wrapper'),
            // markers: true,
            start: 'top+=50 bottom',
            end: 'bottom center+=100',
            toggleActions: 'play none none reverse',
        }
    })

})

function carousel() {
    const testimonials = document.querySelector('#t-reviews-wrapper');
    const arrayTestimonial = Array.from(testimonials.children);
    const firstTestimonial = arrayTestimonial[0];
    // let currentSlides = testimonials.querySelector(".t-review.currentSlides");
    let firstTestWidth = firstTestimonial.getBoundingClientRect().width + 30;
    // testimonials.style.left = `translateX(${firstTestWidth})`
    setTestWidth();
    var navDots = document.querySelector("#navDots");
    navDots.addEventListener("click", navClick)
    window.addEventListener('resize', setTestWidth)
    var interval = setInterval(() => { moveSlide(); }, 3000);

    function setTestWidth() {
        firstTestWidth = firstTestimonial.getBoundingClientRect().width + 30
        for (let i = 0; i < arrayTestimonial.length; i++) {
            let slides

            slides = arrayTestimonial[i]
            slides.style.left = firstTestWidth * (i) + "px"
        }
    }

    function moveTargetSlide(currentSlides, targetSlides, targetLocation) {

        if (currentSlides.id === "firstClone") {
            testimonials.style.transition = "none"
            testimonials.style.transform = `translateX(0)`
            currentSlides.classList.remove('currentSlides');
            arrayTestimonial[0].classList.add('currentSlides');
        } else if (currentSlides.id === "lastClone") {
            testimonials.style.transition = "none"
            testimonials.style.transform = `translateX(0)`
            currentSlides.classList.remove('currentSlides');
            targetSlides.classList.add('currentSlides');
        } else {
            testimonials.style.transition = "transform 0.7s ease-in-out"
            testimonials.style.transform = `translateX(${targetLocation})`
            currentSlides.classList.remove('currentSlides');
            targetSlides.classList.add('currentSlides');
        }

    }

    function moveSlide() {
        let currentSlides = testimonials.querySelector(".t-review.currentSlides");
        let nextSlides = currentSlides.nextElementSibling
        let nextSlidesLocation;
        currentSlides.id === "firstClone" ? nextSlidesLocation = 0 : nextSlidesLocation = `-${nextSlides.style.left}`
        navDotAnimation();

        moveTargetSlide(currentSlides, nextSlides, nextSlidesLocation)
    }

    function navDotAnimation() {
        let currentSlides = testimonials.querySelector(".t-review.currentSlides");
        let navDots = Array.from(document.getElementsByClassName('navDot'));
        if (currentSlides.id === "firstClone") return
        navDots.forEach((navDot) => { navDot.classList.toggle("currentNav") });
    }

    function navClick(e) {
        let currentSlides = testimonials.querySelector(".t-review.currentSlides");
        if (currentSlides.id === "firstClone") return
        let nextSlides = currentSlides.nextElementSibling
        let prevSlides = currentSlides.previousElementSibling
        if (e.target.classList.contains("prev")) {
            if (currentSlides.classList.contains("start")) return
            navDotAnimation()
            clearInterval(interval)
            moveTargetSlide(currentSlides, prevSlides, `${prevSlides.style.left}`)
            interval = setInterval(() => { moveSlide(); }, 3000);
        } else if (e.target.classList.contains("next")) {
            navDotAnimation()
            clearInterval(interval)
            moveTargetSlide(currentSlides, nextSlides, `-${nextSlides.style.left}`)
            interval = setInterval(() => { moveSlide(); }, 3000);
        }
    }


}
carousel();