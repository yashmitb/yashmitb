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
  // first visit: follow the system preference instead of forcing dark
  const systemLight = window.matchMedia("(prefers-color-scheme: light)").matches;
  applyTheme(stored ? stored : systemLight ? "light" : "dark");

  function toggleTheme() {
    const next = body.classList.contains("light-theme") ? "dark" : "light";
    applyTheme(next);
    try {
      localStorage.setItem("theme", next);
    } catch (e) {}
  }
  if (themeBtn) themeBtn.addEventListener("click", toggleTheme);

  /* ---------- Mobile menu ---------- */
  const burger = document.getElementById("burger");
  const navList = document.getElementById("nav-list");
  const scrim = document.getElementById("nav-scrim");
  let closeMobileMenu = function () {};
  if (burger && navList) {
    const burgerIcon = burger.querySelector("i");
    const setMenu = function (open) {
      navList.classList.toggle("show", open);
      if (scrim) scrim.classList.toggle("show", open);
      document.body.classList.toggle("menu-open", open);
      if (burgerIcon) burgerIcon.className = open ? "bx bx-x" : "bx bx-menu";
    };
    closeMobileMenu = function () {
      setMenu(false);
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

  /* ---------- Back to top ---------- */
  const toTop = document.getElementById("to-top");
  if (toTop) {
    window.addEventListener(
      "scroll",
      function () {
        toTop.classList.toggle("show", (window.scrollY || 0) > 700);
      },
      { passive: true }
    );
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
    });
  }

  /* ---------- Toast ---------- */
  const toastEl = document.getElementById("toast");
  let toastTimer = null;
  function toast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toastEl.classList.remove("show");
    }, 2200);
  }

  function copyText(text, doneMsg) {
    function done() {
      toast(doneMsg);
    }
    // if the clipboard is unavailable, still surface the text
    function fallback() {
      legacyCopy(text) ? done() : toast(text);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, fallback);
    } else {
      fallback();
    }
  }
  function legacyCopy(text) {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try {
      ok = document.execCommand("copy");
    } catch (e) {}
    ta.remove();
    return ok;
  }

  /* ---------- Magnetic buttons (desktop, motion-safe) ---------- */
  if (finePointer && !prefersReduced) {
    document
      .querySelectorAll(".btn, .social-icon, .to-top")
      .forEach(function (el) {
        el.addEventListener("pointermove", function (e) {
          const r = el.getBoundingClientRect();
          const dx = e.clientX - (r.left + r.width / 2);
          const dy = e.clientY - (r.top + r.height / 2);
          el.style.translate =
            (dx * 0.18).toFixed(1) + "px " + (dy * 0.18).toFixed(1) + "px";
        });
        el.addEventListener("pointerleave", function () {
          el.style.translate = "";
        });
      });
  }

  /* ---------- Barrel roll easter egg ---------- */
  function barrelRoll() {
    if (prefersReduced) {
      toast("Motion is reduced on this device — no rolls today 🙂");
      return;
    }
    const main = document.querySelector("main");
    if (!main || main.classList.contains("barrel-roll")) return;
    // rotate around the center of the current viewport, not the page
    const rect = main.getBoundingClientRect();
    const cy = window.innerHeight / 2 - rect.top;
    main.style.transformOrigin = "50% " + cy + "px";
    main.classList.add("barrel-roll");
    setTimeout(function () {
      main.classList.remove("barrel-roll");
      main.style.transformOrigin = "";
    }, 1300);
  }

  /* ---------- Command palette (⌘K / Ctrl+K) ---------- */
  const palette = document.getElementById("palette");
  const paletteInput = document.getElementById("palette-input");
  const paletteList = document.getElementById("palette-list");
  const paletteTrigger = document.getElementById("palette-trigger");
  const paletteScrim = document.getElementById("palette-scrim");
  const paletteClose = document.getElementById("palette-close");

  if (palette && paletteInput && paletteList) {
    const EMAIL = "ybhaverisetti@ucsd.edu";
    const COMMANDS = [
      // sections
      { label: "Home", type: "Section", icon: "bx-home-alt", keywords: "top start hero", go: "home" },
      { label: "About", type: "Section", icon: "bx-user", keywords: "bio who", go: "about" },
      { label: "Experience", type: "Section", icon: "bx-briefcase", keywords: "work jobs research roles", go: "experience" },
      { label: "Skills", type: "Section", icon: "bx-wrench", keywords: "toolkit stack technologies languages", go: "skills" },
      { label: "Projects", type: "Section", icon: "bx-grid-alt", keywords: "work portfolio builds", go: "projects" },
      { label: "Leadership", type: "Section", icon: "bx-medal", keywords: "activities clubs eagle scout robotics", go: "leadership" },
      { label: "Contact", type: "Section", icon: "bx-envelope", keywords: "reach hire touch", go: "contact" },
      // projects
      { label: "GradeHQ — live demo", type: "Project", icon: "bx-calculator", keywords: "grade calculator nextjs", url: "https://gradehq.vercel.app" },
      { label: "Cut — live demo", type: "Project", icon: "bx-camera", keywords: "calorie nutrition tracker ai", url: "https://cut-eta.vercel.app" },
      { label: "TritonSpend — code", type: "Project", icon: "bx-wallet", keywords: "finance budgeting react native", url: "https://github.com/CSES-Open-Source/TritonSpend" },
      { label: "Croptimization — code", type: "Project", icon: "bx-leaf", keywords: "agriculture ml research tensorflow", url: "https://github.com/yashmitb/Crop-Web" },
      { label: "GestAR — code", type: "Project", icon: "bx-hand-up", keywords: "gesture asl recognition unity arduino", url: "https://github.com/yashmitb/GestAR_MLbackend" },
      { label: "SmartBins AI — code", type: "Project", icon: "bx-recycle", keywords: "waste trash vision iot", url: "https://github.com/yashmitb/SmartBins-AI" },
      { label: "CleanPlate — code", type: "Project", icon: "bx-restaurant", keywords: "food waste dining", url: "https://github.com/yashmitb/CleanPlate-Backend" },
      { label: "Reporter — code", type: "Project", icon: "bx-shield-quarter", keywords: "crime civic web", url: "https://github.com/yashmitb/reporter-main" },
      // links
      { label: "GitHub profile", type: "Link", icon: "bxl-github", keywords: "code repos", url: "https://github.com/yashmitb" },
      { label: "LinkedIn", type: "Link", icon: "bxl-linkedin", keywords: "connect network", url: "https://www.linkedin.com/in/yashmitb" },
      { label: "Devpost", type: "Link", icon: "bx-code-block", keywords: "hackathons", url: "https://devpost.com/yashmitb" },
      { label: "Figma", type: "Link", icon: "bxl-figma", keywords: "design", url: "https://www.figma.com/@yashmit" },
      { label: "Hire me on Fiverr", type: "Link", icon: "bx-store-alt", keywords: "freelance gig", url: "https://www.fiverr.com/s/qDm1Xzg" },
      // actions
      { label: "View résumé", type: "Action", icon: "bx-file", keywords: "resume cv", nav: "resume/" },
      { label: "Download résumé PDF", type: "Action", icon: "bx-download", keywords: "resume cv pdf save", url: "Yashmit_s_College_Resume.pdf" },
      { label: "Toggle light / dark theme", type: "Action", icon: "bx-moon", keywords: "mode appearance color scheme", run: toggleTheme },
      {
        label: "Copy email address",
        type: "Action",
        icon: "bx-copy",
        keywords: "contact " + EMAIL,
        run: function () {
          copyText(EMAIL, "Email copied to clipboard ✓");
        },
      },
      { label: "Send me an email", type: "Action", icon: "bx-envelope", keywords: "mail contact reach", nav: "mailto:" + EMAIL },
      { label: "Do a barrel roll", type: "Fun", icon: "bx-refresh", keywords: "easter egg spin roll fun surprise", run: barrelRoll, keepQuery: true },
    ];

    let open = false;
    let results = COMMANDS;
    let active = 0;
    let lastFocused = null;

    /* accent-fold ("résumé" → "resume") keeping a map back to original indices */
    function fold(str) {
      const chars = [];
      const map = [];
      for (let i = 0; i < str.length; i++) {
        const d = str[i].normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        for (let j = 0; j < d.length; j++) {
          chars.push(d[j]);
          map.push(i);
        }
      }
      return { text: chars.join("").toLowerCase(), map: map };
    }

    /* subsequence fuzzy match; bonuses for word starts + consecutive runs */
    function fuzzy(query, text) {
      const q = fold(query).text;
      const folded = fold(text);
      const t = folded.text;
      let qi = 0;
      let score = 0;
      let streak = 0;
      const idx = [];
      for (let ti = 0; ti < t.length && qi < q.length; ti++) {
        if (t[ti] === q[qi]) {
          idx.push(folded.map[ti]);
          streak++;
          score += 1 + streak * 2 + (ti === 0 || t[ti - 1] === " " ? 6 : 0);
          qi++;
        } else {
          streak = 0;
        }
      }
      return qi === q.length ? { score: score, indices: idx } : null;
    }

    function highlight(label, indices) {
      let out = "";
      let set = {};
      indices.forEach(function (i) {
        set[i] = true;
      });
      for (let i = 0; i < label.length; i++) {
        const ch = label[i]
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
        out += set[i] ? "<mark>" + ch + "</mark>" : ch;
      }
      return out;
    }

    function search(query) {
      if (!query.trim()) {
        return COMMANDS.map(function (c) {
          return { cmd: c, indices: [] };
        });
      }
      const scored = [];
      COMMANDS.forEach(function (c) {
        const inLabel = fuzzy(query, c.label);
        if (inLabel) {
          scored.push({ cmd: c, score: inLabel.score + 10, indices: inLabel.indices });
          return;
        }
        const inKeys = fuzzy(query, c.keywords + " " + c.type);
        if (inKeys) scored.push({ cmd: c, score: inKeys.score, indices: [] });
      });
      scored.sort(function (a, b) {
        return b.score - a.score;
      });
      return scored;
    }

    function render() {
      paletteList.innerHTML = "";
      if (!results.length) {
        const empty = document.createElement("li");
        empty.className = "palette__empty";
        empty.textContent = "No matches — try “projects”, “resume”, or “email”.";
        paletteList.appendChild(empty);
        paletteInput.setAttribute("aria-activedescendant", "");
        return;
      }
      results.forEach(function (r, i) {
        const li = document.createElement("li");
        li.className = "palette__item" + (i === active ? " is-active" : "");
        li.id = "palette-item-" + i;
        li.setAttribute("role", "option");
        li.setAttribute("aria-selected", i === active ? "true" : "false");
        li.innerHTML =
          '<i class="bx ' +
          r.cmd.icon +
          '" aria-hidden="true"></i><span class="label">' +
          (r.indices.length ? highlight(r.cmd.label, r.indices) : highlight(r.cmd.label, [])) +
          '</span><span class="type">' +
          r.cmd.type +
          "</span>";
        li.addEventListener("click", function () {
          execute(r.cmd);
        });
        li.addEventListener("pointermove", function () {
          if (active !== i) {
            active = i;
            updateActive();
          }
        });
        paletteList.appendChild(li);
      });
      updateActive();
    }

    function updateActive() {
      const items = paletteList.querySelectorAll(".palette__item");
      items.forEach(function (item, i) {
        item.classList.toggle("is-active", i === active);
        item.setAttribute("aria-selected", i === active ? "true" : "false");
      });
      const el = items[active];
      if (el) {
        el.scrollIntoView({ block: "nearest" });
        paletteInput.setAttribute("aria-activedescendant", el.id);
      }
    }

    function openPalette() {
      if (open) return;
      open = true;
      lastFocused = document.activeElement;
      closeMobileMenu();
      palette.hidden = false;
      document.body.classList.add("menu-open");
      paletteInput.value = "";
      results = search("");
      active = 0;
      render();
      paletteInput.focus();
    }

    function closePalette() {
      if (!open) return;
      open = false;
      palette.hidden = true;
      document.body.classList.remove("menu-open");
      if (lastFocused && lastFocused.focus) lastFocused.focus();
    }

    function execute(cmd) {
      if (cmd.go) {
        closePalette();
        const target = document.getElementById(cmd.go);
        if (target)
          target.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth" });
        return;
      }
      if (cmd.url) {
        closePalette();
        window.open(cmd.url, "_blank", "noopener");
        return;
      }
      if (cmd.nav) {
        closePalette();
        window.location.href = cmd.nav;
        return;
      }
      if (cmd.run) {
        closePalette();
        cmd.run();
      }
    }

    paletteInput.addEventListener("input", function () {
      results = search(paletteInput.value);
      active = 0;
      render();
    });

    paletteInput.addEventListener("keydown", function (e) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (results.length) {
          active = (active + 1) % results.length;
          updateActive();
        }
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (results.length) {
          active = (active - 1 + results.length) % results.length;
          updateActive();
        }
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (results[active]) execute(results[active].cmd);
      } else if (e.key === "Tab") {
        // tiny focus trap: input <-> esc button
        e.preventDefault();
        if (paletteClose) paletteClose.focus();
      }
    });
    if (paletteClose) {
      paletteClose.addEventListener("click", closePalette);
      paletteClose.addEventListener("keydown", function (e) {
        if (e.key === "Tab") {
          e.preventDefault();
          paletteInput.focus();
        }
      });
    }

    document.addEventListener("keydown", function (e) {
      if ((e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "K")) {
        e.preventDefault();
        open ? closePalette() : openPalette();
      } else if (open && e.key === "Escape") {
        e.preventDefault();
        closePalette();
      }
    });

    if (paletteTrigger) {
      paletteTrigger.addEventListener("click", openPalette);
      // show the right modifier key for the platform
      const isMac = /Mac|iPhone|iPad|iPod/.test(navigator.platform || "");
      const kbd = paletteTrigger.querySelector(".palette-trigger__kbd");
      if (kbd && !isMac) kbd.textContent = "Ctrl K";
      const footKbd = document.querySelector(".footer__hint kbd");
      if (footKbd && !isMac) footKbd.textContent = "Ctrl";
    }
    if (paletteScrim) paletteScrim.addEventListener("click", closePalette);
  }

  /* ---------- Device-orientation parallax + liquid-glass light (phones) ----
     DISABLED for now — felt awkward. No motion-permission prompt, no tilt.
     Left intact below (commented out) so we can revisit and refine it later.

     Tilt your phone and the whole hero responds with depth: the aurora
     parallaxes, the portrait rotates, glass tiles catch a moving highlight,
     and project cards glint. Touch devices only; desktop keeps the mouse
     interactions above. iOS 13+ grants motion access on the first tap.

     We publish two normalized signals to the root as CSS variables:
       --tx  left/right tilt   (-1 … 1)
       --ty  front/back tilt   (-1 … 1)
     CSS (gated by body.tilt-on) turns those into parallax + light. */
  /*
  (function () {
    if (prefersReduced) return;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (!coarse || typeof window.DeviceOrientationEvent === "undefined") return;

    const root = document.documentElement;
    const portrait = document.querySelector(".portrait");

    const RANGE = 26; // degrees of tilt mapped to the full effect
    const ROT = 16; // portrait max rotation in degrees
    let started = false;
    let base = null;
    let tgtX = 0,
      tgtY = 0,
      curX = 0,
      curY = 0;

    function clamp(v) {
      return Math.max(-1, Math.min(1, v));
    }

    function loop() {
      curX += (tgtX - curX) * 0.12;
      curY += (tgtY - curY) * 0.12;
      root.style.setProperty("--tx", curX.toFixed(3));
      root.style.setProperty("--ty", curY.toFixed(3));
      if (portrait) {
        portrait.style.transform =
          "perspective(900px) rotateX(" +
          (-curY * ROT).toFixed(2) +
          "deg) rotateY(" +
          (curX * ROT).toFixed(2) +
          "deg)";
      }
      requestAnimationFrame(loop);
    }

    function onOrient(e) {
      if (e.gamma == null || e.beta == null) return;
      if (!base) base = { g: e.gamma, b: e.beta };
      tgtX = clamp((e.gamma - base.g) / RANGE); // left-right
      tgtY = clamp((e.beta - base.b) / RANGE); // front-back
    }

    function start() {
      if (started) return;
      started = true;
      document.body.classList.add("tilt-on");
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
  */
})();
