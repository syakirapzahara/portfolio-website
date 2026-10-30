(() => {
  const still = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Pen-stroke underline under each section heading.
  document.querySelectorAll("h2").forEach((h) => {
    h.insertAdjacentHTML(
      "beforeend",
      '<svg class="draw ul" viewBox="0 0 120 8" aria-hidden="true" focusable="false">' +
        '<path pathLength="1" d="M2 5 C 30 1, 62 7, 118 3"/></svg>',
    );
  });

  const targets = document.querySelectorAll(".reveal, .draw");
  if (still || !("IntersectionObserver" in window)) {
    targets.forEach((t) => t.classList.add("in"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.2 },
  );
  targets.forEach((t) => io.observe(t));
})();
