(() => {
  // ===== fixed header height -> CSS var =====
  const header = document.querySelector(".header");

  function updateHeaderOffset() {
    if (!header) return;
    const h = Math.ceil(header.getBoundingClientRect().height);
    document.documentElement.style.setProperty("--header-offset", `${h}px`);
  }

  window.addEventListener("load", updateHeaderOffset);
  window.addEventListener("resize", updateHeaderOffset);
  updateHeaderOffset();

  // ===== Carousel =====
  function initCarousel(root) {
    const items = Array.from(root.querySelectorAll(".carousel__item"));
    const captionEl = root.querySelector("[data-carousel-caption]");
    const dotsEl = root.querySelector("[data-carousel-dots]");
    const prevBtn = root.querySelector("[data-carousel-prev]");
    const nextBtn = root.querySelector("[data-carousel-next]");

    if (!items.length) return;

    let index = 0;

    // dots
    const dots = items.map((_, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "carousel__dot";
      b.setAttribute("aria-label", `スライド ${i + 1}`);
      b.addEventListener("click", () => set(i));
      if (dotsEl) dotsEl.appendChild(b);
      return b;
    });

    function set(i) {
      index = (i + items.length) % items.length;

      items.forEach((el, k) => el.classList.toggle("is-active", k === index));
      dots.forEach((el, k) => el.setAttribute("aria-current", String(k === index)));

      const cap = items[index].getAttribute("data-caption") || "";
      if (captionEl) captionEl.textContent = cap;
    }

    prevBtn?.addEventListener("click", () => set(index - 1));
    nextBtn?.addEventListener("click", () => set(index + 1));

    // 1枚だけなら操作UIを隠す
    if (items.length === 1) {
      if (prevBtn) prevBtn.style.visibility = "hidden";
      if (nextBtn) nextBtn.style.visibility = "hidden";
      if (dotsEl) dotsEl.style.visibility = "hidden";
    }

    set(0);
  }

  document.querySelectorAll("[data-carousel]").forEach(initCarousel);
})();
