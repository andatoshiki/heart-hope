import { animate } from "motion";

const enterTransition = {
  duration: 0.48,
  ease: [0.22, 1, 0.36, 1],
} as const;

const exitTransition = {
  duration: 0.24,
  ease: [0.4, 0, 1, 1],
} as const;

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
);
const canvas = document.querySelector<HTMLElement>(".site-canvas");

if (!canvas || prefersReducedMotion.matches) {
  document.documentElement.classList.remove("motion-enabled");
} else {
  let isNavigating = false;

  const enterAnimation = animate(
    canvas,
    { transform: ["translateY(8px)", "translateY(0px)"] },
    enterTransition,
  );

  void Promise.resolve(enterAnimation).finally(() => {
    document.documentElement.classList.remove("motion-enabled");
  });

  document.addEventListener("click", async (event) => {
    if (
      isNavigating ||
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    const target = event.target;
    const anchor =
      target instanceof Element ? target.closest<HTMLAnchorElement>("a") : null;

    if (
      !anchor ||
      anchor.target ||
      anchor.download ||
      anchor.hasAttribute("data-no-page-transition")
    ) {
      return;
    }

    const destination = new URL(anchor.href, window.location.href);
    const isSameDocument =
      destination.pathname === window.location.pathname &&
      destination.search === window.location.search;

    if (
      destination.origin !== window.location.origin ||
      destination.protocol !== window.location.protocol ||
      isSameDocument
    ) {
      return;
    }

    event.preventDefault();
    isNavigating = true;
    enterAnimation.stop();
    document.documentElement.classList.remove("motion-enabled");
    document.body.setAttribute("aria-busy", "true");
    canvas.style.pointerEvents = "none";

    try {
      await animate(
        canvas,
        { transform: ["translateY(0px)", "translateY(-6px)"] },
        exitTransition,
      );
    } finally {
      window.location.assign(destination.href);
    }
  });
}
