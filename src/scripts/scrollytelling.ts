import scrollama from "scrollama";

// Scrollytelling for the landing route.
//
// Scrollama is a "step detector": it watches elements and tells us when each
// one scrolls into view (and, in progress mode, how far through it we are). It
// does NOT animate anything itself — we react to its callbacks with CSS classes
// and custom properties, while Motion stays dedicated to the page-load
// transition. The two never touch each other.

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
);

const revealSteps = document.querySelectorAll<HTMLElement>("[data-scrolly]");
const hero = document.querySelector<HTMLElement>("[data-scrolly-hero]");

// Bail out entirely when there is nothing to narrate or the visitor prefers
// reduced motion. In that case the inline guard in index.astro never adds the
// `scrolly-enabled` class, so every section stays fully visible by default.
if (!prefersReducedMotion.matches && revealSteps.length > 0) {
  // 1. Reveal-on-enter: each landing section fades + lifts into place the first
  //    time it crosses into view. `once: true` means it settles and stays put.
  const revealScroller = scrollama();
  revealScroller
    .setup({
      step: "[data-scrolly]",
      offset: 0.8,
      once: true,
    })
    .onStepEnter(({ element }) => {
      element.classList.add("is-inview");
    });

  // 2. Hero progress: as the visitor scrolls through the hero, Scrollama reports
  //    a 0 → 1 progress value. We pipe it into a CSS custom property and let the
  //    stylesheet drive the parallax (mountain drift, headline lift, cue fade).
  let heroScroller: ReturnType<typeof scrollama> | undefined;
  if (hero) {
    heroScroller = scrollama();
    heroScroller
      .setup({
        step: "[data-scrolly-hero]",
        progress: true,
        offset: 0,
      })
      .onStepProgress(({ progress }) => {
        hero.style.setProperty("--scrolly-progress", progress.toString());
      });
  }

  // Scrollama caches element geometry, so it must be recomputed on resize.
  let resizeFrame = 0;
  window.addEventListener("resize", () => {
    window.cancelAnimationFrame(resizeFrame);
    resizeFrame = window.requestAnimationFrame(() => {
      revealScroller.resize();
      heroScroller?.resize();
    });
  });
}
