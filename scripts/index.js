document.addEventListener('DOMContentLoaded', () => {
  // Плавный переход
  const anchors = document.querySelectorAll('.nav__list a[href*="#"]');

  for (let anchor of anchors) {
    anchor.addEventListener('click', e => {
      e.preventDefault();

      const sectionID = anchor.getAttribute('href').substr(1);

      document.getElementById(sectionID).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  }

  const searchBtn = document.querySelector('.search-btn');

  // Поиск
  searchBtn.addEventListener('click', e => {
    e.stopPropagation()
    search(this);
  })

  const logInBtn = document.querySelector('.login-btn');

  //Вход
  logInBtn.addEventListener('click', modalOpen);

  // Валидатор логин
  const validation = new JustValidate('.log-in__form', {
    errorLabelStyle: {
      color: '#D52B1E',
      fontSize: '12px',
      lineHeight: '12px',
      paddingLeft: '32px',
      top: '9px',
      position: 'absolute'
    },
    errorFieldCssClass: 'is-invalid',
  });

  validation
    .addField('#name', [
      {
        rule: 'minLength',
        value: 3,
        errorMessage: 'Ошибка'
      },
      {
        rule: 'maxLength',
        value: 30,
        errorMessage: 'Ошибка'
      },
      {
        rule: 'required',
        errorMessage: 'Ошибка',
      },
    ])
    .addField('#password', [
      {
        rule: 'required',
        errorMessage: 'Ошибка',
      },
      {
        rule: 'password',
        errorMessage: 'Ошибка',
      },
    ]);

  // Кнопка показать еще
  const moreBtn = document.querySelector('.more__btn');

  moreBtn.addEventListener('click', () => showMore(moreBtn));

  // Селект
  const select = document.querySelector('.broadcast__select');
  const choices = new Choices(select, {
    itemSelectText: '',
    shouldSort: false,
    searchEnabled: false,
    position: 'bottom',
  });

  select.addEventListener('change', changeBroadcastContent);

  // Аккордеон
  $('.accordion').accordion({
    heightStyle: 'content',
    active: false
  });

  const accordionBtn = document.querySelectorAll('.guests-item__container');
  const accordionList = document.querySelector('.guests__list');
  accordionBtn[0].lastElementChild.classList.add('guests-item__btn--active');

  accordionBtn.forEach(btn => {
    btn.setAttribute('tabindex', '0');

    btn.addEventListener('click', e => {
      if (!e.target.lastElementChild.classList.contains('guests-item__btn--active')) {
        accordionBtn[0].lastElementChild.classList.remove('guests-item__btn--active');
        e.target.lastElementChild.classList.add('guests-item__btn--active');
      }

      accordionList.addEventListener('click', function (ev) {

        const inArea = ev.composedPath().includes(e.target.parentElement);

        if (!inArea && e.target.lastElementChild.classList.contains('guests-item__btn--active')) {
          e.target.lastElementChild.classList.remove('guests-item__btn--active');
        }
      })
    })

    btn.addEventListener('keydown', key => {
      if (key.key === 'Enter') {

        key.target.lastElementChild.classList.add('guests-item__btn--active');
        accordionList.addEventListener('keydown', function (evKey) {
          if (evKey.key === 'Enter') {

            const inArea = evKey.composedPath().includes(key.target.parentElement);

            if (!inArea && key.target.lastElementChild.classList.contains('guests-item__btn--active')) {
              key.target.lastElementChild.classList.remove('guests-item__btn--active');
            }
          }
        })
      }
    })
  })

  // Гости
  const guestTab = document.querySelectorAll('.guests-content__item');
  const guestImg = document.querySelector('.guests__img');
  const guestContent = document.querySelector('.guests-right__content');
  const guestsName = document.querySelector('.guests__name');
  const guestDescr = document.querySelector('.guests__description')

  guestTab.forEach(tab => {
    tab.addEventListener('click', function (e) {
      guestImg.srcset = e.target.dataset.src;

      guestContent.classList.add('guests-right__content--active');
      guestsName.innerHTML = `${e.target.innerHTML}`;
      guestDescr.innerHTML = `${e.target.firstElementChild.innerHTML}`;
    })

    tab.addEventListener('keydown', function (event) {

      if (event.key === 'Enter') {
        event.target.parentElement.parentElement.firstElementChild.lastElementChild.classList.add('guests-item__btn--active')

        guestImg.srcset = event.target.dataset.src;

        guestContent.classList.add('guests-right__content--active');
        guestsName.innerHTML = `${event.target.innerHTML}`;
        guestDescr.innerHTML = `${event.target.firstElementChild.innerHTML}`;
      }
    })

    if (window.innerWidth <= 576) {
      tab.addEventListener('click', () => {
        document.getElementById('guests-right').scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      })
    }
  });

  //SWIPER в плейлистах

  const swiper = new Swiper('.swiper', {
    loop: true,

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    slidesPerView: '4',
    breakpoints: {
      1920: {
        slidesPerView: '4',
        spaceBetween: 30,
      },
      1366: {
        slidesPerView: '4',
      },
      992: {
        slidesPerView: '2',
        spaceBetween: 30,
      },

      576: {
        slidesPerView: '2',
        spaceBetween: 30,
      },

      320: {
        slidesPerView: 'auto',
        spaceBetween: 20,
      },
    }
  });

  mobileSlider();

  window.addEventListener('resize', () => {
    mobileSlider();
  })

  //Валидатор формы

  const form = document.querySelector('.about__form');
  const successModalBox = document.createElement('div');
  const successModal = document.createElement('div');
  const successMsg = document.createElement('p');
  successMsg.textContent = 'Отправлено!';
  successMsg.style.fontSize = '30px';
  successModalBox.append(successModal);
  successModal.append(successMsg);
  successModalBox.append(successModal)
  form.append(successModalBox);
  successModal.classList.add('modal-success');
  successModalBox.classList.add('modal-success-box')

  const validate = new JustValidate('.about__form', {
    errorLabelStyle: {
      color: '#D52B1E',
      fontSize: '12px',
      lineHeight: '12px',
      paddingLeft: '32px',
      top: '9px',
      position: 'absolute'
    },
    errorFieldCssClass: 'is-invalid',
  });

  validate
    .addField('#about-name', [
      {
        rule: 'required',
        errorMessage: 'Ошибка',
      },
    ])
    .addField('#about-mail', [
      {
        rule: 'required',
        errorMessage: 'Ошибка',
      },
    ])
    .onSuccess(event => {
      successModalBox.classList.add('open');

      setTimeout(() => successModalBox.classList.remove('open'), 3000)
      event.target.reset();
    });

  form.addEventListener('submit', function (event) {
    if (!event.target.checkValidity()) {
      const inputFields = form.querySelectorAll('input');

      inputFields.forEach(input => {
        if (!input.validity.valid) {
          input.focus();
          return false
        }
      })
    }
  });

  // кнопка disabled

  const checkbox = document.querySelector('.about__checkbox');
  const checkBtn = document.querySelector('.about__btn');

  checkbox.addEventListener('click', function () {
    if (checkbox.checked == false) {
      checkBtn.disabled = true;
    } else if (checkbox.checked == true) {
      checkBtn.disabled = false;
    }
  });

  // BURGER MENU

  const burgerBtn = document.querySelector('.burger');
  const menu = document.querySelector('.header-top__nav');
  let menuLinks = document.querySelectorAll('.nav__link');
  const menuBottom = document.querySelector('.header-bottom__nav');

  if (document.documentElement.clientWidth < 577) {

    showMenu(menu, menuBottom, logInBtn);

    burgerBtn.addEventListener('click', function () {
      openBurgerMenu(this, menu, menuBottom)
    })

    menuLinks.forEach(function (el) {
      el.addEventListener('click', function () {
        burgerBtn.classList.remove('burger--active');
        menu.classList.remove('header-top__nav--active');
        menuBottom.classList.remove('header-bottom__nav--active');
        document.body.classList.remove('stop-scroll');
      })
    })

  } else {
    burgerBtn.addEventListener('click', function () {
      burgerBtn.classList.toggle('burger--active');
      menu.classList.toggle('header-top__nav--active');

      document.body.classList.toggle('stop-scroll');
    });

    menuLinks.forEach(function (el) {
      el.addEventListener('click', function () {
        burgerBtn.classList.remove('burger--active');
        menu.classList.remove('header-top__nav--active');
        document.body.classList.remove('stop-scroll');
      })
    })
  }

  // Кнопка в эфире

  const air = document.querySelector('.air');
  const btnPlay = document.querySelectorAll('.header-bottom__btn')

  air.addEventListener('click', function () {
    air.classList.toggle('air--active');
    btnPlay.forEach(element => {
      element.classList.toggle('header-bottom__btn--active');
    })
  })

  // статистика действий

  const stats = document.querySelectorAll('.stats__link');

  stats.forEach(stat => {
    stat.addEventListener('click', function () {
      this.classList.toggle('stats__link--active')

      this.classList.contains('stats__link--active') ?
        this.children[1].textContent = +this.children[1].textContent + 1 :
        this.children[1].textContent = +this.children[1].textContent - 1
    })
  })

  // Кнопки паузы

  const headerPauseIcon = `<svg width="20" height="20" viewBox="2 2 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#clip0_24531_3491)">
  <path d="M12 2C6.475 2 2 6.475 2 12C2 17.525 6.475 22 12 22C17.525 22 22 17.525 22 12C22 6.475 17.525 2 12 2Z" fill="#A1A6B4"/>
  <rect x="9" y="8" width="2" height="8" rx="1" fill="white"/>
  <rect x="13" y="8" width="2" height="8" rx="1" fill="white"/>
  </g>
  <defs>
  <clipPath id="clip0_24531_3491">
  <rect width="24" height="24" fill="white"/>
  </clipPath>
  </defs>
  </svg>`
  const headerPlayIcon = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M10 0C4.475 0 0 4.475 0 10C0 15.525 4.475 20 10 20C15.525 20 20 15.525 20 10C20 4.475 15.525 0 10 0ZM8 14.5V5.5L14 10L8 14.5Z"
    fill="#A1A6B4" />
</svg>`;
  const podcastsPauseIcon = `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="24" cy="24" r="20" stroke="#A1A6B4" stroke-width="2"/>
<rect x="19" y="15" width="2" height="18" rx="1" fill="#A1A6B4"/>
<rect x="27" y="15" width="2" height="18" rx="1" fill="#A1A6B4"/>
</svg>`;
  const podcastsPlayIcon = `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="24" cy="24" r="20" fill="transparent" stroke="#A1A6B4" stroke-width="2" />
<path
  d="M21.6924 31.7965L31.5716 24.7996C32.1428 24.3998 32.1428 23.6002 31.5716 23.2004L21.6924 16.2035C20.9943 15.7037 20 16.1835 20 17.0031V30.9969C20 31.8165 20.9943 32.2963 21.6924 31.7965Z"
  fill="#A1A6B4" />
</svg>`

  const headerPlayBtn = document.querySelectorAll('.header-bottom__btn');
  const playBtns = document.querySelectorAll('.btn-play');
  const articles = document.querySelectorAll('.playlist__article');

  headerPlayBtn.forEach(btn => {
    btn.addEventListener('mouseup', function (e) {

      if (e.currentTarget.firstElementChild.dataset.play === 'play') {
        e.currentTarget.firstElementChild.dataset.play = 'no';
        e.currentTarget.firstElementChild.innerHTML = headerPlayIcon;
        return
      }

      playBtns.forEach(playBtn => {
        playBtn.firstElementChild.dataset.play = 'no';
        playBtn.firstElementChild.innerHTML = podcastsPlayIcon;
      })

      headerPlayBtn.forEach(playBtn => {
        playBtn.firstElementChild.dataset.play = 'no';
        playBtn.firstElementChild.innerHTML = headerPlayIcon;
      })

      articles.forEach(playBtn => {
        playBtn.classList.remove('playing');
      })

      if (e.currentTarget.firstElementChild.dataset.play === 'no') {
        e.currentTarget.firstElementChild.dataset.play = 'play';
        e.currentTarget.firstElementChild.innerHTML = headerPauseIcon;
      }
    })
  })

  playBtns.forEach(btn => {
    btn.addEventListener('mouseup', function (e) {

      if (e.currentTarget.firstElementChild.dataset.play === 'play') {
        e.currentTarget.firstElementChild.innerHTML = podcastsPlayIcon;
        return
      }

      playBtns.forEach(playBtn => {
        playBtn.firstElementChild.dataset.play = 'no';
        playBtn.firstElementChild.innerHTML = podcastsPlayIcon;
      })

      headerPlayBtn.forEach(playBtn => {
        playBtn.firstElementChild.dataset.play = 'no';
        playBtn.firstElementChild.innerHTML = headerPlayIcon;
      })

      articles.forEach(playBtn => {
        playBtn.classList.remove('playing');
      })

      e.currentTarget.firstElementChild.dataset.play = 'play';
      e.currentTarget.firstElementChild.innerHTML = podcastsPauseIcon;
    })
  })

  articles.forEach(btn => {
    btn.addEventListener('mouseup', function (e) {
      if (e.currentTarget.classList.contains('playing')) {
        e.currentTarget.classList.remove('playing');
        return
      }

      articles.forEach(playBtn => {
        playBtn.classList.remove('playing');
      })

      playBtns.forEach(playBtn => {
        playBtn.firstElementChild.dataset.play = 'no';
        playBtn.firstElementChild.innerHTML = podcastsPlayIcon;
      })

      headerPlayBtn.forEach(playBtn => {
        playBtn.firstElementChild.dataset.play = 'no';
        playBtn.firstElementChild.innerHTML = headerPlayIcon;
      })

      btn.classList.add('playing');
    })
  })
})


function search(btn) {
  const searchContent = document.querySelector('.search')
  searchContent.classList.add('search--active')

  document.addEventListener('click', function (e) {

    const inArea = e.composedPath().includes(searchContent || btn);

    if (!inArea) {
      searchContent.classList.remove('search--active');
    }
  });

  document.addEventListener('keydown', function (esc) {
    if (esc.key === 'Escape') {
      searchContent.classList.remove('search--active');
    }
  });
}

function modalOpen() {
  const closeBtn = document.querySelector('.log-in-close');
  const login = document.querySelector('.log-in');
  const header = document.querySelector('.header');
  const main = document.querySelector('.main');
  const modal = document.querySelector('.log-in');

  let lastFocusedElement;

  login.classList.add('log-in--active');
  header.classList.add('class--shadow');
  main.classList.add('class--shadow');

  document.body.classList.add('stop-scroll');

  function modalShow() {
    lastFocusedElement = document.activeElement;
    modal.focus();
  }

  function removeModal() {
    lastFocusedElement.focus();
  }

  modalShow();

  closeBtn.addEventListener('click', function () {
    login.classList.remove('log-in--active');
    header.classList.remove('class--shadow');
    main.classList.remove('class--shadow');
    document.body.classList.remove('stop-scroll');

    removeModal();
  });

  window.addEventListener('keydown', function (esc) {

    if (esc.key === 'Escape') {
      login.classList.remove('log-in--active');
      header.classList.remove('class--shadow');
      main.classList.remove('class--shadow');
      document.body.classList.remove('stop-scroll');

      removeModal();
    }
  })
}

function showMore(btn) {
  const podcastItem = document.querySelectorAll('.podcasts__item');

  podcastItem.forEach(el => {
    el.classList.add('podcasts__item--visible');
  });

  btn.closest('.podcasts__more').classList.add('podcasts__more--hidden');
}

function changeBroadcastContent() {
  const brodcastList = document.querySelector('.broadcast__list');
  brodcastList.innerHTML = '';

  switch (this.textContent) {
    case 'Татьяна Флеганова':
      brodcastList.append(
        createBroadcastItem('О людях и книгах', 'Анонсируется отдельно', 1),
        createBroadcastItem('Графомания td', 'По понедельникам в 10:00', 2)
      );
      break;
    case 'Анна Васильева':
      brodcastList.append(
        createBroadcastItem('О людях и книгах', 'Анонсируется отдельно', 1),
        createBroadcastItem('Не Рим, не Троя', 'По вторникам в 12:00', 3),
        createBroadcastItem('Эрудит', 'По пятницам в 17:00', 4)
      );
      break;
    case 'Пётр Дмитриевский':
      brodcastList.append(
        createBroadcastItem('Графомания td', 'По понедельникам в 10:00', 2),
        createBroadcastItem('Эрудит', 'По пятницам в 17:00', 4),
        createBroadcastItem('Тонкости эпох', 'По субботам в 10:00', 5)
      );
      break;
    case 'Дмитрий Гутенберг':
      brodcastList.append(
        createBroadcastItem('О людях и книгах', 'Анонсируется отдельно', 1),
        createBroadcastItem('Графомания td', 'По понедельникам в 10:00', 2),
        createBroadcastItem('Не Рим, не Троя', 'По вторникам в 12:00', 3),
        createBroadcastItem('Эрудит', 'По пятницам в 17:00', 4),
        createBroadcastItem('Тонкости эпох', 'По субботам в 10:00', 5),
        createBroadcastItem('Живые мысли', 'По воскресеньям в 15:30', 6)
      );
    default:
      break;
  }
}

function createBroadcastItem(header, descr, num) {
  const item = document.createElement('li');
  item.classList.add('broadcast__item');

  const article = document.createElement('article');
  article.classList.add('broadcast__article');

  const imgBox = document.createElement('div');
  imgBox.classList.add('broadcast__img', `broadcast__img--${num}`);

  const content = document.createElement('div');
  content.classList.add('broadcast-article__content');

  const articleHeader = document.createElement('h3');
  articleHeader.classList.add('broadcast-article__title');
  articleHeader.textContent = header;

  const notice = document.createElement('span');
  notice.classList.add('broadcast-article__description');
  notice.textContent = descr;

  const btnDetails = document.createElement('a');
  btnDetails.classList.add('btn-details');
  btnDetails.setAttribute('href', '#!')
  btnDetails.innerHTML = `Подробнее
                          <svg width="21" height="8" viewBox="0 0 21 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path
                             d="M20.3536 4.35355C20.5488 4.15829 20.5488 3.84171 20.3536 3.64645L17.1716 0.464466C16.9763 0.269204 16.6597 0.269204 16.4645 0.464466C16.2692 0.659728 16.2692 0.976311 16.4645 1.17157L19.2929 4L16.4645 6.82843C16.2692 7.02369 16.2692 7.34027 16.4645 7.53553C16.6597 7.7308 16.9763 7.7308 17.1716 7.53553L20.3536 4.35355ZM0 4.5H20V3.5H0V4.5Z"
                             fill="#121723" />
                          </svg>`

  content.append(articleHeader, notice, btnDetails);
  article.append(imgBox, content);
  item.append(article);

  return item
}

function mobileSlider() {
  const swiperRadio = document.querySelector('.swiper-radio');

  let mySwiper = new Swiper(swiperRadio, {
    spaceBetween: 57,
    slidesPerView: 'auto',
  });

  if (window.innerWidth <= 576 && swiperRadio.dataset.mobile == 'false') {
    swiperRadio.dataset.mobile = 'true';
  }

  if (window.innerWidth > 576) {
    swiperRadio.dataset.mobile = 'false';

    mySwiper.destroy();
  }
}

function openBurgerMenu(btn, menu, menuBottom) {
  btn.classList.toggle('burger--active');
  menu.classList.toggle('header-top__nav--active');
  menuBottom.classList.toggle('header-bottom__nav--active');

  document.body.classList.toggle('stop-scroll');
}

function showMenu(menu, menuBottom, logInBtn) {
  menu.setAttribute('tabindex', '0');
  menuBottom.setAttribute('tabindex', '0');
  logInBtn.setAttribute('tabindex', '-1');

  menu.focus();
  menuBottom.focus();
}
