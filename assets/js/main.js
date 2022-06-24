<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <link rel="stylesheet" href="assets/css/styles.css" />

    <!-- =====BOX ICONS===== -->
    <link
      href="https://cdn.jsdelivr.net/npm/boxicons@2.0.5/css/boxicons.min.css"
      rel="stylesheet"
    />

    <title>Yashmit's Portfolio</title>
  </head>
  <body>
    
    <!--===== HEADER =====-->
    <header class="l-header">
      <nav class="nav bd-grid">
        <div>
          <a href="#" class="nav__logo">Yashmit</a>
        </div>

        <div class="nav__menu" id="nav-menu">
          <ul class="nav__list">
            <li class="nav__item">
              <a href="#home" class="nav__link active">Home</a>
            </li>
            <li class="nav__item">
              <a href="#about" class="nav__link">About</a>
            </li>
            <li class="nav__item">
              <a href="#skills" class="nav__link">Skills</a>
            </li>
            <li class="nav__item">
              <a href="#work" class="nav__link">Work</a>
            </li>
            <li class="nav__item">
              <a href="#Gallery" class="nav__link">Gallery</a>
            </li>
            <img src="./assets/img/moon.png" alt="toggleable" id="icon">
          </ul>
        </div>

        <div class="nav__toggle" id="nav-toggle">
          <i class="bx bx-menu"></i>
        </div>
      </nav>
    </header>

    <main class="l-main">
      <!--===== HOME =====-->

      <section class="home bd-grid" id="home">
        <div class="home__data">
          <h1 class="home__title">
            Hi,<br />I'm <span class="home__title-color">Yashmit</span><br />
            Web Designer
          </h1>

          <a href="#" class="button">Contact</a>
        </div>

        <div class="home__social">
          <a href="" class="home__social-icon"
            ><i class="bx bxl-linkedin"></i
          ></a>
          <a href="" class="home__social-icon"
            ><i class="bx bxl-figma"></i
          ></a>
          <a href="" class="home__social-icon"><i class="bx bxl-github"></i></a>
        </div>

        <div class="home__img">
          <svg
            class="home__blob"
            viewBox="0 0 479 467"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <mask id="mask0" mask-type="alpha">
              <path
                d="M9.19024 145.964C34.0253 76.5814 114.865 54.7299 184.111 29.4823C245.804 6.98884 311.86 -14.9503 370.735 14.143C431.207 44.026 467.948 107.508 477.191 174.311C485.897 237.229 454.931 294.377 416.506 344.954C373.74 401.245 326.068 462.801 255.442 466.189C179.416 469.835 111.552 422.137 65.1576 361.805C17.4835 299.81 -17.1617 219.583 9.19024 145.964Z"
              />
            </mask>
            <g mask="url(#mask0)">
              <path
                d="M9.19024 145.964C34.0253 76.5814 114.865 54.7299 184.111 29.4823C245.804 6.98884 311.86 -14.9503 370.735 14.143C431.207 44.026 467.948 107.508 477.191 174.311C485.897 237.229 454.931 294.377 416.506 344.954C373.74 401.245 326.068 462.801 255.442 466.189C179.416 469.835 111.552 422.137 65.1576 361.805C17.4835 299.81 -17.1617 219.583 9.19024 145.964Z"
              />
              <image
                class="home__blob-img"
                x="50"
                y="60"
                href="assets/img/perfil.png"
              />
            </g>
          </svg>
        </div>
      </section>

      <!--===== ABOUT =====-->
      <section class="about section" id="about">
        <h2 class="section-title">About</h2>

        <div class="about__container bd-grid">
          <div class="about__img">
            <img src="assets/img/about.png" alt="" />
          </div>

          <div>
            <h2 class="about__subtitle">I'm Yashmit!</h2>
            <p class="about__text">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Voluptate cum expedita quo culpa tempora, assumenda, quis fugiat
              ut voluptates soluta, aut earum nemo recusandae cumque
              perferendis! Recusandae alias accusamus atque.
            </p>
          </div>
        </div>
      </section>

      <!--===== SKILLS =====-->
      <section class="skills section" id="skills">
        <h2 class="section-title">Skills</h2>

        <div class="skills__container bd-grid">
          <div>
            <h2 class="skills__subtitle">Profesional Skills</h2>
            <p class="skills__text">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit
              optio id vero amet, alias architecto consectetur error eum eaque
              sit.
            </p>
            <div>
              <div class="skills__data">
                <div class="skills__names">
                  <i class="bx bxl-html5 skills__icon"></i>
                  <span class="skills__name">Web devlopment</span>
                </div>
                <div class="skills__bar skills__web"></div>
                <div>
                  <span class="skills__percentage">95%</span>
                </div>
              </div>
              <div class="skills__data">
                <div class="skills__names">
                  <i class="bx bxl-react skills__icon"></i>
                  <span class="skills__name">React Native</span>
                </div>
                <div class="skills__bar skills__react_native"></div>
                <div>
                  <span class="skills__percentage">85%</span>
                </div>
              </div>
              <div class="skills__data">
                <div class="skills__names">
                  <i class="bx bx-bulb skills__icon"></i>
                  <span class="skills__name">Arduino</span>
                </div>
                <div class="skills__bar skills__arduino"></div>
                <div>
                  <span class="skills__percentage">85%</span>
                </div>
              </div>
              <div class="skills__data">
                <div class="skills__names">
                  <i class="bx bxs-paint skills__icon"></i>
                  <span class="skills__name">Digital Art</span>
                </div>
                <div class="skills__bar skills__digital_art"></div>
                <div>
                  <span class="skills__percentage">90%</span>
                </div>
              </div>
            </div>
          
          <div class="skills__data">
            <div class="skills__names">
              <i class="bx bxs-camera skills__icon"></i>
              <span class="skills__name">Photography</span>
            </div>
            <div class="skills__bar skills__photography"></div>
            <div>
              <span class="skills__percentage">90%</span>
            </div>
          </div>
            </div>
            <div>
              <img src="assets/img/soon.png" alt="" class="skills__img" />
            </div>
          </div>


          </div>

          
      </section>

      <!--===== WORK =====-->
      <section class="work section" id="work">
        <h2 class="section-title">Work</h2>

        <div class="work__container bd-grid">
          <a href="" class="work__img">
            <img src="assets/img/soon.png" alt="" />
          </a>
          <a href="" class="work__img">
            <img src="assets/img/soon.png" alt="" />
          </a>
          <a href="" class="work__img">
            <img src="assets/img/soon.png" alt="" />
          </a>
          <a href="" class="work__img">
            <img src="assets/img/soon.png" alt="" />
          </a>
          <a href="" class="work__img">
            <img src="assets/img/soon.png" alt="" />
          </a>
          <a href="" class="work__img">
            <img src="assets/img/soon.png" alt="" />
          </a>
        </div>
      </section>

      <!--===== Gallery =====-->
      <section class="Gallery section" id="Gallery">
        <h2 class="section-title">Gallery</h2>

        <body>
          <div class="container">
            
            <div class="box">
              <div class="dream">
                <img src="assets/img/soon.png" />
                <img src="assets/img/soon.png" />
                <img src="assets/img/soon.png" />
                <img src="assets/img/soon.png" />
                <img src="assets/img/soon.png" />
              </div>
      
              <div class="dream">
                <img src="assets/img/soon.png" />
                <img src="assets/img/soon.png" />
                <img src="assets/img/soon.png" />
                <img src="assets/img/soon.png" />
                <img src="assets/img/soon.png" />
              </div>
      
              <div class="dream">
                <img src="assets/img/soon.png" />
                <img src="assets/img/soon.png" />
                <img src="assets/img/soon.png" />
                <img src="assets/img/soon.png" />
                <img src="assets/img/soon.png" />
              </div>
            </div>
          </div>

      </section>
    </main>

    <!--===== FOOTER =====-->
    <footer class="footer">
      <p class="footer__title">Yashmit</p>
      <div class="footer__social">
        <a href="#" class="footer__icon"><i class="bx bxl-github"></i></a>
        <a href="#" class="footer__icon"><i class="bx bxl-instagram"></i></a>
        <a href="#Gallery" class="footer__icon"><i class="bx bx-camera"></i></a>
      </div>
      <p class="footer__copy">&#169; Yashmit. All rigths reserved</p>
    </footer>
    <div class="the-element ">
      <h2 id="asd"> Press 'Enter' To Auto-Scroll</h2>
    </div>


    <!--===== SCROLL REVEAL =====-->
    <script src="https://unpkg.com/scrollreveal"></script>

    <!--===== MAIN JS =====-->
    <script src="assets/js/main.js"></script>
  </body>
</html>
