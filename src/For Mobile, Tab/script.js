document.querySelectorAll('.page img').forEach((img) => {
    img.addEventListener('contextmenu', (e) => e.preventDefault());
    let pressTimer;
    img.addEventListener('touchstart', (e) => {
        pressTimer = setTimeout(() => {
            e.preventDefault();
        }, 500);
    });

    img.addEventListener('touchend', () => {
        clearTimeout(pressTimer);
    });

    img.addEventListener('touchmove', () => {
        clearTimeout(pressTimer);
    });
});

document.addEventListener("DOMContentLoaded", function () {
  const backToTopBtn = document.querySelector(".back-top-wrapper");

  // Start hidden
  gsap.set(backToTopBtn, { autoAlpha: 0, y: 100 });

  // Trigger visibility based on #growth-section
  ScrollTrigger.create({
    trigger: ".page_service_02",
    start: "bottom bottom", // When bottom of #growth-section hits bottom of viewport
    onEnter: () => {
      gsap.to(backToTopBtn, {
        autoAlpha: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    },
    onLeaveBack: () => {
      gsap.to(backToTopBtn, {
        autoAlpha: 0,
        y: 100,
        duration: 0.5,
        ease: "power2.in",
      });
    },
  });

  // Smooth scroll to top when clicked
  backToTopBtn.addEventListener("click", () => {
    gsap.to(window, {
      scrollTo: { y: 0, autoKill: true },
      duration: 1.5,
      ease: "power2.out",
    });
  });
});


window.addEventListener("DOMContentLoaded", () => {
  textAnimationScroll();
});
