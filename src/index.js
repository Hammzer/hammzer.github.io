// Site configuration
import "./output.css";
import "./styles.css";
import "./burger.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);
// Initialize site content
document.addEventListener("DOMContentLoaded", async () => {

  var burger = document.querySelector(".menu ");
  var menuContent = document.querySelector(".menu-overlay");
  var blackOverlay = document.querySelector(".menu-black-overlay")

  var jellyfish = document.querySelector(".jellyfish");
  var aquarium1 = document.querySelector(".aquarium-1");
  var aquarium2 = document.querySelector(".aquarium-2");
  var cave1 = document.querySelector(".cave-1");
  var dwarves1 = document.querySelector(".dwarves1");
  var dwarves2 = document.querySelector(".dwarves2");

  var bg2 = document.querySelector(".bg-2");
  var text2 = document.querySelector(".text-2");

  burger.addEventListener("change", () => {
    console.log(burger.checked);
    if (burger.checked) {
      gsap.fromTo(menuContent, { opacity: 0, x: "100%" }, { opacity: 1, x: "0", duration: 0.5 });
      gsap.to(blackOverlay, {display: "block", opacity:0.5, duration: 0.5})
    } else {
      gsap.fromTo(menuContent, { opacity: 1, x: "0" }, { opacity: 0, x: "100%", duration: 0.5 });
      gsap.to(blackOverlay, {display: "none", opacity:0, duration: 0.5})
    }
  });

  let tl1 = gsap.timeline({
    scrollTrigger: {
      trigger: ".section1",
      start: "top center",
      end: "center+=20% top",
      scrub: true,
    },
  });

  tl1
    .fromTo(dwarves1, { y: "100%" }, { y: "-50%", duration: 1 })
    .fromTo(aquarium1, { y: "100%" }, { y: "-50%", duration: 1 }, "<=")
    .fromTo(aquarium2, { y: "20%" }, { y: "-20%", duration: 1 }, "<=")

    .fromTo(
      jellyfish,
      { translateY: "-50%" },
      { translateY: "100%", duration: 1 },
      "<="
    )
    .fromTo(cave1, { y: "-10%" }, { y: "5%", duration: 1 }, "<=");

  let tl2 = gsap.timeline({
    scrollTrigger: {
      trigger: ".section2",
      start: "top center",
      end: "center+=20% top",
      scrub: true,
    },
  });

  tl2
    .fromTo(dwarves2, { y: "0" }, { y: "10%", duration: 1 })
    .fromTo(bg2, { y: "0" }, { y: "-20%", duration: 1 }, "<=")
    .fromTo(text2, { y: "50%" }, { y: "-20%", duration: 1 }, "<=");

  let mouseDown = false;
  // Track mouse down and up states to change emoji
  document.addEventListener("mousedown", () => {
    mouseDown = true;
    updateCursor();
  });

  document.addEventListener("mouseup", () => {
    mouseDown = false;
    updateCursor();
  });

  // Function to update the emoji based on mouse state
  var r = document.querySelector(":root");

  function updateCursor() {
    if (mouseDown) {
      console.log("mouse down");
      document.documentElement.style.cssText = `--cursor: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'  width='40' height='48' viewport='0 0 100 100' style='fill:black;font-size:24px;'><text y='50%'>✊</text></svg>") 16 0,auto;`;
    } else {
      document.documentElement.style.cssText = `--cursor: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'  width='40' height='48' viewport='0 0 100 100' style='fill:black;font-size:24px;'><text y='50%'>🖐️</text></svg>") 16 0,auto;`;
    }
  }

  const options = {
    fullScreen: {
      enable: false,
    },
    fpsLimit: 120,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: "push",
        },
        onHover: {
          enable: false,
          mode: "repulse",
        },
        resize: true,
      },
      modes: {
        push: {
          quantity: 4,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: "#ffffff",
      },
      move: {
        enable: true,
        speed: {
          min: 0.1,
          max: 1,
        },
        direction: "none",
        random: false,
        straight: false,
        outModes: {
          default: "out",
        },
      },
      number: {
        density: {
          enable: true,
          width: 400,
          height: 400,
        },
        value: 120,
      },
      size: {
        value: {
          min: 0.6,
          max: 1.4,
        },
      },
      opacity: {
        value: {
          min: 0.1,
          max: 1,
        },
        animation: {
          enable: true,
          speed: 3,
          sync: false,
          startValue: "random",
        },
      },
    },
    detectRetina: true,
  };

  tsParticles.load("tsparticles", options);
});

// Lenis initialization
const initSmoothScrolling = () => {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: "vertical",
    gestureDirection: "vertical",
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  });

  // Connect Lenis to GSAP ScrollTrigger
  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);
  return lenis;
};

// Initialize Lenis
const lenis = initSmoothScrolling();
