/*===== MENU SHOW =====*/
const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId);

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("show");
    });
  }
};
showMenu("nav-toggle", "nav-menu");

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  // When we click on each nav__link, we remove the show-menu class
  navMenu.classList.remove("show");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.add("active");
    } else {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.remove("active");
    }
  });
}
window.addEventListener("scroll", scrollActive);

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2000,
  delay: 100,
  //     reset: true
});

sr.reveal(".home__data, .about__img, .skills__subtitle, .skills__text", {});
sr.reveal(
  ".home__img, .about__subtitle, .about__text, .skills__img, .container, img, .box, .dream ",
  {
    delay: 400,
  }
);
sr.reveal(".home__social-icon", { interval: 200 });
sr.reveal(".skills__data, .work__img, .contact__input", { interval: 200 });

/*==================== MAKE THEME TOGGLE ====================*/

var icon = document.getElementById("icon");

if (localStorage.getItem("theme") == null) {
  localStorage.setItem("theme", "light");
}

let localData = localStorage.getItem("theme");

if (localData == "light") {
  icon.src = "../assets/img/moon.png";
  document.body.classList.remove("dark-theme");
} else if (localData == "dark") {
  icon.src = "../assets/img/sun.png";
  document.body.classList.add("dark-theme");
}

icon.onclick = function () {
  document.body.classList.toggle("dark-theme");
  if (document.body.classList.contains("dark-theme")) {
    icon.src = "../assets/img/sun.png";
    localStorage.setItem("theme", "dark");
  } else {
    icon.src = "../assets/img/moon.png";
    localStorage.setItem("theme", "light");
  }
};

let scrollerID;
let paused = true;
let speed = 4; // 1 - Fast | 2 - Medium | 3 - Slow
let interval = speed * 5;

function startScroll() {
  let id = setInterval(function () {
    window.scrollBy(0, 2);
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      // Reached end of page
      stopScroll();
    }
  }, interval);
  return id;
}

function stopScroll() {
  clearInterval(scrollerID);
}

document.body.addEventListener(
  "keypress",
  function (event) {
    if (event.which == 13 || event.keyCode == 13) {
      // It's the 'Enter' key
      if (paused == true) {
        scrollerID = startScroll();
        paused = false;
        console.log("asd");
        // document.getElementById("the-element").style.animation = "fadeOut 3s";
        document.getElementById("asd").style.display = "none";
      } else {
        stopScroll();
        paused = true;
      }
    }
  },
  true
);
