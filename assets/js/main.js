/* =============================================================
   Yashmit Bhaverisetti — Portfolio interactions
   ============================================================= */
(function () {
  "use strict";

  /* ---------- Clean URL: drop index.html from the address bar ---------- */
  try {
    if (/\/index\.html$/.test(location.pathname) && window.history.replaceState) {
      var clean = location.pathname.replace(/index\.html$/, "");
      window.history.replaceState(null, "", clean + location.search + location.hash);
    }
  } catch (e) {}

  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const finePointer = window.matchMedia("(pointer: fine)").matches;

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Theme toggle ---------- */
  const body = document.body;
  const themeBtn = document.getElementById("theme-toggle");
  const themeIcon = themeBtn ? themeBtn.querySelector("i") : null;

  function applyTheme(theme) {
    const isLight = theme === "light";
    body.classList.toggle("light-theme", isLight);
    body.classList.toggle("dark-theme", !isLight);
    if (themeIcon) {
      themeIcon.className = isLight ? "bx bx-sun" : "bx bx-moon";
    }
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", isLight ? "#eef1f8" : "#06070d");
  }

  let stored = null;
  try {
    stored = localStorage.getItem("theme");
  } catch (e) {}
  applyTheme(stored === "light" ? "light" : "dark");

  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      const next = body.classList.contains("light-theme") ? "dark" : "light";
      applyTheme(next);
      try {
        localStorage.setItem("theme", next);
      } catch (e) {}
    });
  }

  /* ---------- Mobile menu ---------- */
  const burger = document.getElementById("burger");
  const navList = document.getElementById("nav-list");
  const scrim = document.getElementById("nav-scrim");
  if (burger && navList) {
    const burgerIcon = burger.querySelector("i");
    const setMenu = function (open) {
      navList.classList.toggle("show", open);
      if (scrim) scrim.classList.toggle("show", open);
      document.body.classList.toggle("menu-open", open);
      if (burgerIcon) burgerIcon.className = open ? "bx bx-x" : "bx bx-menu";
    };
    burger.addEventListener("click", function () {
      setMenu(!navList.classList.contains("show"));
    });
    navList.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        setMenu(false);
      });
    });
    if (scrim) {
      scrim.addEventListener("click", function () {
        setMenu(false);
      });
    }
  }

  /* ---------- Nav scrolled state + scroll progress ---------- */
  const nav = document.getElementById("nav");
  const progress = document.getElementById("progress");

  function onScroll() {
    const y = window.scrollY || window.pageYOffset;
    if (nav) nav.classList.toggle("scrolled", y > 24);
    if (progress) {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const pct = h > 0 ? (y / h) * 100 : 0;
      progress.style.width = pct + "%";
    }
  }
  let ticking = false;
  window.addEventListener(
    "scroll",
    function () {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          onScroll();
          ticking = false;
        });
        ticking = true;
      }
    },
    { passive: true }
  );
  onScroll();

  /* ---------- Active section link ---------- */
  const sections = Array.prototype.slice.call(
    document.querySelectorAll("section[id], header[id]")
  );
  const linkMap = {};
  document.querySelectorAll(".nav__link").forEach(function (link) {
    const id = link.getAttribute("href").replace("#", "");
    linkMap[id] = link;
  });

  if ("IntersectionObserver" in window && sections.length) {
    const navObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            Object.keys(linkMap).forEach(function (key) {
              linkMap[key].classList.toggle("active", key === id);
            });
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach(function (s) {
      navObserver.observe(s);
    });
  }

  /* ---------- Reveal on scroll ---------- */
  const reveals = Array.prototype.slice.call(
    document.querySelectorAll(".reveal")
  );
  if (prefersReduced || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) {
      el.classList.add("in");
    });
  } else {
    const revealObserver = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            obs.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 }
    );
    reveals.forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  /* ---------- Animated stat counters ---------- */
  const counters = Array.prototype.slice.call(
    document.querySelectorAll("[data-count]")
  );
  function animateCount(el) {
    const target = parseFloat(el.getAttribute("data-count"));
    const decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
    const suffix = el.getAttribute("data-suffix") || "";
    if (prefersReduced) {
      el.textContent = target.toFixed(decimals) + suffix;
      return;
    }
    const duration = 1400;
    const start = performance.now();
    function frame(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * eased).toFixed(decimals) + suffix;
      if (p < 1) requestAnimationFrame(frame);
      else el.textContent = target.toFixed(decimals) + suffix;
    }
    requestAnimationFrame(frame);
  }
  if (counters.length && "IntersectionObserver" in window) {
    const countObserver = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach(function (c) {
      countObserver.observe(c);
    });
  }

  /* ---------- Draggable nav (liquid feel, desktop pointers only) ---------- */
  if (nav && !prefersReduced && finePointer) {
    let dragging = false;
    let startX = 0;
    let startY = 0;
    let pid = null;

    // rubber-band resistance — the further you pull, the harder it resists
    function damp(d) {
      return Math.sign(d) * Math.pow(Math.abs(d), 0.82);
    }
    function setOffset(x, y) {
      nav.style.transform =
        "translate(calc(-50% + " + x + "px), " + y + "px)";
    }

    nav.addEventListener("pointerdown", function (e) {
      // let links, buttons, and the menu stay clickable
      if (e.target.closest("a, button")) return;
      dragging = true;
      pid = e.pointerId;
      startX = e.clientX;
      startY = e.clientY;
      nav.classList.add("dragging");
      nav.classList.remove("nav--return");
      try {
        nav.setPointerCapture(pid);
      } catch (err) {}
    });

    nav.addEventListener("pointermove", function (e) {
      if (!dragging) return;
      setOffset(damp(e.clientX - startX), damp(e.clientY - startY));
    });

    function release() {
      if (!dragging) return;
      dragging = false;
      if (pid !== null) {
        try {
          nav.releasePointerCapture(pid);
        } catch (err) {}
        pid = null;
      }
      nav.classList.remove("dragging");
      nav.classList.add("nav--return");
      // spring back home
      nav.style.transform = "translateX(-50%)";
      setTimeout(function () {
        nav.classList.remove("nav--return");
        nav.style.transform = "";
      }, 650);
    }
    nav.addEventListener("pointerup", release);
    nav.addEventListener("pointercancel", release);
  }

  /* ---------- Pointer-tracked glare + subtle tilt ---------- */
  const fine = window.matchMedia("(pointer: fine)").matches;
  if (fine && !prefersReduced) {
    // Card glare
    document.querySelectorAll(".card").forEach(function (card) {
      card.addEventListener("pointermove", function (e) {
        const r = card.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width) * 100;
        const y = ((e.clientY - r.top) / r.height) * 100;
        card.style.setProperty("--mx", x + "%");
        card.style.setProperty("--my", y + "%");
      });
    });

    // 3D tilt
    document.querySelectorAll("[data-tilt]").forEach(function (el) {
      const MAX = el.classList.contains("card") ? 6 : 9;
      let raf = null;
      el.addEventListener("pointermove", function (e) {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(function () {
          el.style.transform =
            "perspective(900px) rotateX(" +
            (-py * MAX).toFixed(2) +
            "deg) rotateY(" +
            (px * MAX).toFixed(2) +
            "deg)";
        });
      });
      el.addEventListener("pointerleave", function () {
        if (raf) cancelAnimationFrame(raf);
        el.style.transform = "";
      });
    });
  }

  /* ---------- Device-orientation tilt for the portrait (phones) ----------
     Tilt your phone → the hero portrait tilts with it. Touch devices only;
     desktop keeps the mouse tilt above. iOS 13+ needs a tap to grant motion
     access, so we request permission on the first user tap. */
  (function () {
    if (prefersReduced) return;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (!coarse || typeof window.DeviceOrientationEvent === "undefined") return;

    const portrait = document.querySelector(".portrait");
    if (!portrait) return;

    const MAX = 18; // degrees
    let started = false;
    let base = null;
    let curX = 0,
      curY = 0,
      tgtX = 0,
      tgtY = 0;

    function clamp(v) {
      return Math.max(-MAX, Math.min(MAX, v));
    }

    function loop() {
      curX += (tgtX - curX) * 0.14;
      curY += (tgtY - curY) * 0.14;
      portrait.style.transform =
        "perspective(900px) rotateX(" +
        curX.toFixed(2) +
        "deg) rotateY(" +
        curY.toFixed(2) +
        "deg)";
      requestAnimationFrame(loop);
    }

    function onOrient(e) {
      if (e.gamma == null || e.beta == null) return;
      if (!base) base = { g: e.gamma, b: e.beta };
      tgtY = clamp((e.gamma - base.g) * 0.9); // left-right → rotateY
      tgtX = clamp((base.b - e.beta) * 0.9); // front-back → rotateX
    }

    function start() {
      if (started) return;
      started = true;
      window.addEventListener("deviceorientation", onOrient);
      requestAnimationFrame(loop);
    }

    if (typeof DeviceOrientationEvent.requestPermission === "function") {
      // iOS 13+ — must ask from a user gesture
      const arm = function () {
        window.removeEventListener("touchend", arm);
        window.removeEventListener("click", arm);
        DeviceOrientationEvent.requestPermission()
          .then(function (state) {
            if (state === "granted") start();
          })
          .catch(function () {});
      };
      window.addEventListener("touchend", arm, { passive: true });
      window.addEventListener("click", arm);
    } else {
      // Android / others — fires automatically in a secure context
      start();
    }
  })();
})();
