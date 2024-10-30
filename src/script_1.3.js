// --- GENERAL
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

gsap.defaults({
  ease: "power3.out",
  duration: 1,
});
let easeIn = "power3.in";
let easeInOut = "power3.inOut";

let durationXs = 0.6;
let durationS = 0.75;
let durationL = 1.25;
let durationXL = 1.5;

const breakpoints = {
  mobile: 479,
  mobileLandscape: 767,
  tablet: 991,
};

let mm = gsap.matchMedia();

gsap.set('[data-visibility]', {visibility: "visible"});

function relaodBreakpoints() {
  function getCurrentBreakpoint() {
    const width = window.innerWidth;
    if (width <= breakpoints.mobile) return "mobile";
    if (width <= breakpoints.mobileLandscape) return "mobileLandscape";
    if (width <= breakpoints.tablet) return "tablet";
    return "desktop";
  }

  let currentBreakpoint = getCurrentBreakpoint();

  function checkAndReload() {
    const newBreakpoint = getCurrentBreakpoint();
    if (newBreakpoint !== currentBreakpoint) {
      currentBreakpoint = newBreakpoint;
      location.reload();
    }
  }

  window.addEventListener("resize", checkAndReload);

  window.addEventListener("load", checkAndReload);
}

function setupFormInteraction(options = {}) {
  const {
      formSelector = '.footer__form',
      inputSelector = '.footer__form--input',
      buttonSelector = '.footer__form--submit',
      externalInputSelector = '[data-testid="input"]',
      externalButtonSelector = '[data-testid="button"]'
  } = options;

  const yourForm = document.querySelector(formSelector);
  const yourInput = document.querySelector(inputSelector);
  const yourButton = document.querySelector(buttonSelector);
  
  const externalInput = document.querySelector(externalInputSelector);
  const externalButton = document.querySelector(externalButtonSelector);

  if (!yourForm || !yourInput || !yourButton) {
      console.error('Les éléments du formulaire personnalisé n\'ont pas été trouvés.');
      return;
  }

  yourInput.addEventListener('input', function() {
      if (externalInput) {
          externalInput.value = this.value;
      }
  });

  yourForm.addEventListener('submit', function(e) {
      e.preventDefault();
      if (externalButton) {
          externalButton.click();
      } else {
          console.warn('Le bouton du formulaire externe n\'a pas été trouvé.');
      }
  });

  //console.log('Interaction du formulaire configurée avec succès.');
}


// --- NAV
// Nav move scroll
let navbar = document.querySelector("[data-nav]");
let mobileMenuOpened = false;
let lastScrollPosition = 0;


// Nav Appears
function initNavAppear() {
  gsap.set(navbar, {/*yPercent: -150,*/ autoAlpha: 0});
  gsap.to(navbar, {yPercent: 0, autoAlpha: 1, duration: durationL }, 0.2)
}

function initScrollNav() {
  let showNav = gsap
    .from(navbar, {
      yPercent: -180,
      paused: true,
      ease: easeInOut,
    })
    .progress(1);

  ScrollTrigger.create({
    start: "top top",
    end: "max",
    onUpdate: (self) => {
      if (!mobileMenuOpened) {
        self.direction === -1 ? showNav.play() : showNav.reverse();
      }
    },
  });
}

// Nav dropdown
function initNavDropdown() {
    let dropdowns = navbar.querySelectorAll('[data-nav-dropdown]');
    if(dropdowns.lenght === 0) {return;}
    dropdowns.forEach((item) => {
        let submenu = item.querySelector('[data-nav-submenu]');
        //let links = submenu.querySelectorAll('.nav__submenu--link');
        let inner = submenu.querySelector('[data-submenu-inner]')

        gsap.set(submenu, {autoAlpha: 0});
        let submenuTimeline = gsap.timeline({paused: true});
        submenuTimeline.set(inner, {backdropFilter: "blur(16px)"})
        submenuTimeline.to(submenu, { autoAlpha: 1, yPercent: 0, duration: durationXs})
       // submenuTimeline.from(links, {opacity: 0, yPercent: 50, duration: durationXs, stagger: 0.1}, "<0.02")

        item.addEventListener("mouseenter", function () {
            submenuTimeline.play();
        });

        item.addEventListener("mouseleave", function () {
            submenuTimeline.reverse();
        })
    })
}

function openNavMobile(){
  let openBtn = document.querySelector('[data-nav-mobile-btn]')
  let panel = document.querySelector('[data-nav-mobile-menu]')
  let links = document.querySelectorAll('[data-nav-mobile-link]')
  let closeIcon = document.querySelector('.nav__mobile-btn--icon')
  let openIcon = document.querySelector('.nav__mobile-btn--close-line')

  let tl = gsap.timeline({paused: true})

  tl.from(panel, {autoAlpha: 0, duration: durationXs})
  tl.to(closeIcon, {opacity: 0}, '<')
  tl.to(openIcon, {opacity: 1}, '<')

  openBtn.addEventListener("click", () => {
    if (tl.progress() === 0) {
      tl.play();
      mobileMenuOpened = true;
      lastScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
      // Fixer le menu en position ouverte
      gsap.to(navbar, { yPercent: 0, duration: durationXs });
    } else {
      tl.reverse();
      mobileMenuOpened = false;
      
    }
  });

  window.addEventListener('scroll', () => {
    if (!mobileMenuOpened) {
      let currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
      if (currentScrollPosition !== lastScrollPosition) {
        lastScrollPosition = currentScrollPosition;
        ScrollTrigger.update();
      }
    }
  });

  function openMobileDropdown() {
    let btns = panel.querySelectorAll("[data-nav-mobile-dropdown]")

    btns.forEach((item) => {
      let icon = item.querySelector('.nav__mobile-link--icon')
      let background = item.querySelector('.nav__mobile-dropdown--background')
      let dropdownTl = gsap.timeline({paused: true})
      dropdownTl.to(item, {height: "auto", ease: easeInOut})
      dropdownTl.from(background, {opacity: 0,}, "<")
      dropdownTl.to(icon, {rotateZ: "180deg"}, 0)

      item.addEventListener("click", () => {
        if (dropdownTl.progress() === 0) {
          dropdownTl.play();
        } else {
          dropdownTl.reverse();
        }
      })
    })
  }
  openMobileDropdown();
}

// --- GLOBAL

  function initFadeUp() {
    let items = document.querySelectorAll('[data-fade-up]');
    if(items.lenght === 0) {return;}
    items.forEach((item) => {
      let tl = gsap.timeline({scrollTrigger: {trigger: item, start: 'top 80%'}});
      tl.from(item, {opacity: 0, yPercent: 30, duration: durationL});
    })
  }

  function initCanvas() {
    let canvas = document.querySelector("[data-canvas]");
    if(!canvas) {return;}
      gsap.from(canvas, {opacity: 0, duration: durationL}, 0.75)
  }

  function initTransition() {

    let transitionWrap = document.querySelector("[data-transition]");
    let tl = gsap.timeline();
    tl.set(transitionWrap, {autoAlpha: 0})

    // link click
    $("a:not(.excluded-class)").on("click", function (e) {
      let currentUrl = $(this).attr("href");
      if ($(this).prop("hostname") === window.location.host && !currentUrl.includes("#") && $(this).attr("target") !== "_blank") {
        e.preventDefault();
        // lenis.stop();
        let tl = gsap.timeline({ onComplete: () => (window.location.href = currentUrl) });
      //tl.set(".transition_wrap", {display: "flex"})
        tl.fromTo(transitionWrap, {autoAlpha: 0},  {autoAlpha: 1})
      }
    });
    // On Back Button Tap
    window.onpageshow = function (event) {
      if (event.persisted) window.location.reload();
    };
  }

// --- HERO MAIN

function initHeroMain() {
    let title = document.querySelector("[data-hero-main-title] .g_heading_rich h1");

    if(!title) {return;}
    let paragraph = document.querySelector("[data-hero-main-paragraph] .g_paragraph_rich p");
    let eyebrow = document.querySelector("[data-hero-main-eyebrow]");
    let btnList = document.querySelector("[data-hero-main-btn-list]");
    let marquee = document.querySelector("[data-hero-main-customer-marquee]");

    const tl = gsap.timeline();
    mm.add('(min-width: 480px)', () => {
      tl.from([title, paragraph, eyebrow, btnList, marquee], {opacity: 0}, 0.75)
    })
  }
  

  // --- Products

  function initProducts() {
    let svgs = document.querySelectorAll('.products__visual--img');

    if(svgs.lenght === 0) {return;}

    svgs.forEach((item) => {
      let gradient = item.querySelector('.products__svg--gradient');
      let main = item.querySelector('.products__svg--main');

      let tl = gsap.timeline({scrollTrigger: {trigger: item, start: 'top 80%', scrub: false}});

      tl.from(item, {opacity: 0});
    })
  }

  function initFadeList() {
    let lists = document.querySelectorAll('[data-fade-item-wrap]');

    if(lists.lenght === 0) {return;}
    
    lists.forEach((list) =>{
      let items = list.querySelectorAll('[data-fade-item]');
      let tl = gsap.timeline({scrollTrigger: {trigger: list, start: 'top 80%'}});
    tl.from(items, {opacity: 0, stagger: 0.2, duration: durationL});
    })
  }

  function initCtaPath() {
    let pathTopLeft = document.getElementById('path-top-left')
    let pathCenterLeft = document.getElementById('path-center-left')
    let pathBottomLeft = document.getElementById('path-bottom-left')
    let pathTopRight = document.getElementById('path-top-right')
    let pathCenterRight = document.getElementById('path-center-right')
    let pathBottomRight = document.getElementById('path-bottom-right')

    let blurTopLeft = document.querySelectorAll('.cta-s__svg--blur.is--top-left')
    let blurCenterLeft = document.querySelectorAll('.cta-s__svg--blur.is--center-left')
    let blurBottomLeft = document.querySelectorAll('.cta-s__svg--blur.is--bottom-left')
    let blurTopRight = document.querySelectorAll('.cta-s__svg--blur.is--top-right')
    let blurCenterRight = document.querySelectorAll('.cta-s__svg--blur.is--center-right')
    let blurBottomRight = document.querySelectorAll('.cta-s__svg--blur.is--bottom-right')

    let rectangles = document.querySelectorAll('.cta-s__svg--rect')

    if(rectangles.length === 0) {return;}

    let tl = gsap.timeline({repeat: -1})

    tl.to(blurTopLeft, {
      duration: 5, 
      motionPath: {
          path: pathTopLeft, 
          align: pathTopLeft,
          alignOrigin: [0.5, 0.5],
          autoRotate: true,
          start: 0.15
      },
    }), "0";

    tl.to(blurCenterLeft, {
      duration: 5, 
      motionPath: {
          path: pathCenterLeft, 
          align: pathCenterLeft,
          alignOrigin: [0.5, 0.5],
          autoRotate: true,
          start: 0.15
      },
  }, "<0.5");

tl.to(blurBottomLeft, {
  duration: 5, 
  motionPath: {
      path: pathBottomLeft, 
      align: pathBottomLeft,
      alignOrigin: [0.5, 0.5],
      autoRotate: true,
      start: 0.15
  },
}, "<-0.4");

tl.to(blurTopRight, {
  duration: 5, 
  motionPath: {
    path: pathTopRight, 
    align: pathTopRight,
    alignOrigin: [0.5, 0.5],
    autoRotate: true,
    start: 1,
    end: 0.1
  },
  ease: "none"
}, 3);

tl.to(blurCenterRight, {
duration: 5, 
motionPath: {
    path: pathCenterRight, 
    align: pathCenterRight,
    alignOrigin: [0.5, 0.5],
    autoRotate: true,
    start: 1,
  end: 0.1
},
ease: "none"
}, "<");

tl.to(blurBottomRight, {
duration: 5, 
motionPath: {
  path: pathBottomRight, 
  align: pathBottomRight,
  alignOrigin: [0.5, 0.5],
  autoRotate: true,
  start: 1,
  end: 0.1
},
ease: "none"
}, "<");

gsap.from(rectangles, {
  opacity: 0,
  stagger: {each: 0.5, from: "end"},
  repeat: -1,
  yoyo: true,
  ease: "none"
}, 0);

  }

 /* function initFeaturesMobileDropdown() {

        
      let wrap = document.querySelector('.features-list__content.is--mobile');
      let containers = document.querySelectorAll('.features-list__item--w');
      let items = document.querySelectorAll('.features-list__mobile-item');
      
      mm.add("(max-width: 479px)", () => {
        gsap.set(items, {height: "4.25rem"});
        items.forEach((item) => {
            let tl = gsap.timeline({paused: true});
            let header = item.querySelector('.features-list__mobile-header')
            let visual = item.querySelector('.features-list__visual')
            let content = item.querySelector('.features-list__content')

            // Masquer initialement le contenu
            gsap.set(content, {opacity: 0, display: 'none'});


            tl.set(content, {display: 'block'}) /
            
            tl.to(item, {height: "auto", ease: easeInOut, duration: durationS}, "<")
            tl.to(content, {opacity: 1, duration: durationS}, "<")
            tl.from(visual, {opacity: 0, duration: durationS}, "<")
            tl.to(header, {opacity: 0, duration: 0.1}, "<0.1")

            if(item == items[0]) {
              tl.play();
            }

            item.addEventListener('click', () => {
              if (tl.progress() === 0) {
                tl.play();
              } else {
                tl.reverse();
              }
            });
          })
  });
}*/

  function initPricingHero() {
    let title = document.querySelector('[data-pricing-title]')
    if(!title) {return;}
    let subtitle = document.querySelector('[data-pricing-subtitle]')
    let selector = document.querySelector('[data-pricing-selector]')
    let cards = document.querySelectorAll('[data-pricing-card="monthly"]')
    let background = document.querySelector('[data-pricing-background]')

    let tl = gsap.timeline()

    tl.from([background, title, subtitle], {opacity: 0}, 0.5)
    tl.from(cards, { opacity: 0}, "<0.25")
  }

  function initContact() {
    let content = document.querySelector('[data-contact-hero-content]')
    if(!content) {return;}
    let ctaWrap = document.querySelector('[data-contact-cta-wrap]')
    let backgrounds = document.querySelectorAll('[data-contact-background]')

    let tl = gsap.timeline()

    tl.from([content, backgrounds, ctaWrap], {opacity: 0}, 0.5)
  }


  function initGlobal() {
    relaodBreakpoints();
    setupFormInteraction();
    initScrollNav();
    initNavAppear();
    initNavDropdown();
    openNavMobile();
    initFadeUp();
    initCanvas();
    initTransition();
    initHeroMain();
    initProducts();
    initFadeList();
    initCtaPath();
    initPricingHero();
    initContact();
  }

  initGlobal();



