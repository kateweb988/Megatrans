
document.addEventListener("DOMContentLoaded", () => {
  class ItcTabs {
    constructor(target, config) {
      const defaultConfig = {};
      this._config = Object.assign(defaultConfig, config);
      this._elTabs = typeof target === 'string' ? document.querySelector(target) : target;
      this._elButtons = this._elTabs.querySelectorAll('.tabs__btn');
      this._elPanes = this._elTabs.querySelectorAll('.tabs__pane');
      this._eventShow = new Event('tab.itc.change');
      this._init();
      this._events();
    }
    _init() {
      this._elTabs.setAttribute('role', 'tablist');
      this._elButtons.forEach((el, index) => {
        el.dataset.index = index;
        el.setAttribute('role', 'tab');
        this._elPanes[index].setAttribute('role', 'tabpanel');
      });
    }
    show(elLinkTarget) {
      const elPaneTarget = this._elPanes[elLinkTarget.dataset.index];
      const elLinkActive = this._elTabs.querySelector('.tabs__btn_active');
      const elPaneShow = this._elTabs.querySelector('.tabs__pane_show');
      if (elLinkTarget === elLinkActive) {
        return;
      }
      elLinkActive ? elLinkActive.classList.remove('tabs__btn_active') : null;
      elPaneShow ? elPaneShow.classList.remove('tabs__pane_show') : null;
      elLinkTarget.classList.add('tabs__btn_active');
      elPaneTarget.classList.add('tabs__pane_show');
      this._elTabs.dispatchEvent(this._eventShow);
      elLinkTarget.focus();
    }
    showByIndex(index) {
      const elLinkTarget = this._elButtons[index];
      elLinkTarget ? this.show(elLinkTarget) : null;
    };
    _events() {
      this._elTabs.addEventListener('click', (e) => {
        const target = e.target.closest('.tabs__btn');
        if (target) {
          e.preventDefault();
          this.show(target);
        }
      });
    }
  }

  // инициализация .tabs как табов
  new ItcTabs('.tabs');
});
document.addEventListener("DOMContentLoaded", () => {
  const stage = document.querySelector('#stage');
  const progressLine = document.querySelector('.stage__progress-line');
  const dots = document.querySelectorAll('.stage__progress-dot');
  const items = document.querySelectorAll('.stage__item');

  window.addEventListener('scroll', () => {
    const stageRect = stage.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const start = viewportHeight / 2;

    // общий прогресс по блокам
    let progress = 0;
    items.forEach((item, index) => {
      const itemTop = item.getBoundingClientRect().top;
      if (itemTop < start) progress = index + 1; // количество пройденных этапов
    });

    const total = items.length;
    const percent = (progress / total) * 100;

    progressLine.style.height = `${percent}%`;

    // подсветка точек
    dots.forEach((dot, index) => {
      if (index < progress) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  });
});
document.addEventListener("DOMContentLoaded", () => {
  class ItcTabs {
    constructor(target, config) {
      const defaultConfig = {};
      this._config = Object.assign(defaultConfig, config);
      this._elTabs = typeof target === 'string' ? document.querySelector(target) : target;
      this._elButtons = this._elTabs.querySelectorAll('.tabs__btn');
      this._elPanes = this._elTabs.querySelectorAll('.tabs__pane');
      this._eventShow = new Event('tab.itc.change');
      this._init();
      this._events();
    }
    _init() {
      this._elTabs.setAttribute('role', 'tablist');
      this._elButtons.forEach((el, index) => {
        el.dataset.index = index;
        el.setAttribute('role', 'tab');
        this._elPanes[index].setAttribute('role', 'tabpanel');
      });
    }
    show(elLinkTarget) {
      const elPaneTarget = this._elPanes[elLinkTarget.dataset.index];
      const elLinkActive = this._elTabs.querySelector('.tabs__btn_active');
      const elPaneShow = this._elTabs.querySelector('.tabs__pane_show');
      if (elLinkTarget === elLinkActive) {
        return;
      }
      elLinkActive ? elLinkActive.classList.remove('tabs__btn_active') : null;
      elPaneShow ? elPaneShow.classList.remove('tabs__pane_show') : null;
      elLinkTarget.classList.add('tabs__btn_active');
      elPaneTarget.classList.add('tabs__pane_show');
      this._elTabs.dispatchEvent(this._eventShow);
      elLinkTarget.focus();
    }
    showByIndex(index) {
      const elLinkTarget = this._elButtons[index];
      elLinkTarget ? this.show(elLinkTarget) : null;
    };
    _events() {
      this._elTabs.addEventListener('click', (e) => {
        const target = e.target.closest('.tabs__btn');
        if (target) {
          e.preventDefault();
          this.show(target);
        }
      });
    }
  }

  // инициализация .tabs как табов
  new ItcTabs('.tabs2');
});
window.addEventListener("DOMContentLoaded", function () {
  [].forEach.call(document.querySelectorAll('.tel'), function (input) {
    var keyCode;
    function mask(event) {
      event.keyCode && (keyCode = event.keyCode);
      var pos = this.selectionStart;
      if (pos < 3) event.preventDefault();
      var matrix = "+7 (___) ___ ____",
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, ""),
        new_value = matrix.replace(/[_\d]/g, function (a) {
          return i < val.length ? val.charAt(i++) || def.charAt(i) : a
        });
      i = new_value.indexOf("_");
      if (i != -1) {
        i < 5 && (i = 3);
        new_value = new_value.slice(0, i)
      }
      var reg = matrix.substr(0, this.value.length).replace(/_+/g,
        function (a) {
          return "\\d{1," + a.length + "}"
        }).replace(/[+()]/g, "\\$&");
      reg = new RegExp("^" + reg + "$");
      if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
      if (event.type == "blur" && this.value.length < 5) this.value = ""
    }

    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
    input.addEventListener("keydown", mask, false)

  });

});
document.addEventListener("DOMContentLoaded", () => {
  (function ($) {
    var elActive = '';
    $.fn.selectCF = function (options) {

      // option
      var settings = $.extend({
        color: "#888888", // color
        backgroundColor: "#FFFFFF", // background
        change: function () { }, // event change
      }, options);

      return this.each(function () {

        var selectParent = $(this);
        list = [],
          html = '';

        //parameter CSS
        var width = $(selectParent).width();

        $(selectParent).hide();
        if ($(selectParent).children('option').length == 0) { return; }
        $(selectParent).children('option').each(function () {
          if ($(this).is(':selected')) { s = 1; title = $(this).text(); } else { s = 0; }
          list.push({
            value: $(this).attr('value'),
            text: $(this).text(),
            selected: s,
          })
        })

        // style
        var style = " background: " + settings.backgroundColor + "; color: " + settings.color + " ";

        html += "<ul class='selectCF'>";
        html += "<li>";
        html += "<span class='arrowCF ion-chevron-right' style='" + style + "'></span>";
        html += "<span class='titleCF' style='" + style + "; width:" + width + "px'>" + title + "</span>";
        html += "<span class='searchCF' style='" + style + "; width:" + width + "px'><input style='color:" + settings.color + "' /></span>";
        html += "<ul>";
        $.each(list, function (k, v) {
          s = (v.selected == 1) ? "selected" : "";
          html += "<li value=" + v.value + " class='" + s + "'>" + v.text + "</li>";
        })
        html += "</ul>";
        html += "</li>";
        html += "</ul>";
        $(selectParent).after(html);
        var customSelect = $(this).next('ul.selectCF'); // add Html
        var seachEl = $(this).next('ul.selectCF').children('li').children('.searchCF');
        var seachElOption = $(this).next('ul.selectCF').children('li').children('ul').children('li');
        var seachElInput = $(this).next('ul.selectCF').children('li').children('.searchCF').children('input');

        // handle active select
        $(customSelect).unbind('click').bind('click', function (e) {
          e.stopPropagation();
          if ($(this).hasClass('onCF')) {
            elActive = '';
            $(this).removeClass('onCF');
            $(this).removeClass('searchActive'); $(seachElInput).val('');
            $(seachElOption).show();
          } else {
            if (elActive != '') {
              $(elActive).removeClass('onCF');
              $(elActive).removeClass('searchActive'); $(seachElInput).val('');
              $(seachElOption).show();
            }
            elActive = $(this);
            $(this).addClass('onCF');
            $(seachEl).children('input').focus();
          }
        })

        // handle choose option
        var optionSelect = $(customSelect).children('li').children('ul').children('li');
        $(optionSelect).bind('click', function (e) {
          var value = $(this).attr('value');
          if ($(this).hasClass('selected')) {
            //
          } else {
            $(optionSelect).removeClass('selected');
            $(this).addClass('selected');
            $(customSelect).children('li').children('.titleCF').html($(this).html());
            $(selectParent).val(value);
            settings.change.call(selectParent); // call event change
          }
        })

        // handle search 
        $(seachEl).children('input').bind('keyup', function (e) {
          var value = $(this).val();
          if (value) {
            $(customSelect).addClass('searchActive');
            $(seachElOption).each(function () {
              if ($(this).text().search(new RegExp(value, "i")) < 0) {
                // not item
                $(this).fadeOut();
              } else {
                // have item
                $(this).fadeIn();
              }
            })
          } else {
            $(customSelect).removeClass('searchActive');
            $(seachElOption).fadeIn();
          }
        })

      });
    };
    $(document).click(function () {
      if (elActive != '') {
        $(elActive).removeClass('onCF');
        $(elActive).removeClass('searchActive');
      }
    })
  }(jQuery));

  $(function () {
    var event_change = $('#event-change');
    $(".select").selectCF({
      change: function () {
        var value = $(this).val();
        var text = $(this).children('option:selected').html();
        console.log(value + ' : ' + text);
        event_change.html(value + ' : ' + text);
      }
    });
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const switchers = document.querySelectorAll(".switcher");

  switchers.forEach((switcher) => {
    const formFlex = switcher.closest(".form").querySelector(".form__flex");

    if (formFlex) {
      switcher.addEventListener("change", () => {
        formFlex.classList.toggle("active", switcher.checked);
      });
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  class ItcTabs {
    constructor(target, config) {
      const defaultConfig = {};
      this._config = Object.assign(defaultConfig, config);
      this._elTabs = typeof target === 'string' ? document.querySelector(target) : target;
      this._elButtons = this._elTabs.querySelectorAll('.tabs__btn');
      this._elPanes = this._elTabs.querySelectorAll('.tab-panel');
      this._eventShow = new Event('tab.itc.change');
      this._init();
      this._events();
      this._initSelect(); // добавлено
    }

    _init() {
      this._elTabs.setAttribute('role', 'tablist');
      this._elButtons.forEach((el, index) => {
        el.dataset.index = index;
        el.setAttribute('role', 'tab');
        this._elPanes[index].setAttribute('role', 'tabpanel');
      });
    }

    show(elLinkTarget) {
      const elPaneTarget = this._elPanes[elLinkTarget.dataset.index];
      const elLinkActive = this._elTabs.querySelector('.tabs__btn.active');
      const elPaneShow = this._elTabs.querySelector('.tab-panel.active');

      if (elLinkTarget === elLinkActive) return;

      elLinkActive?.classList.remove('active');
      elPaneShow?.classList.remove('active');

      elLinkTarget.classList.add('active');
      elPaneTarget.classList.add('active');

      // синхронизация select
      if (this._select) this._select.value = elLinkTarget.dataset.index;

      this._elTabs.dispatchEvent(this._eventShow);
    }

    showByIndex(index) {
      const elLinkTarget = this._elButtons[index];
      if (elLinkTarget) this.show(elLinkTarget);
    }

    _events() {
      this._elTabs.addEventListener('click', (e) => {
        const target = e.target.closest('.tabs__btn');
        if (target) {
          e.preventDefault();
          this.show(target);
        }
      });
    }

    // ==== новый метод ====
    _initSelect() {
      // контейнер для label + select
      const wrapper = document.createElement('div');
      wrapper.className = 'tabs__select-wrapper';

      // label
      const label = document.createElement('label');
      label.className = 'tabs__label';
      label.textContent = 'Выберите категорию';
      label.setAttribute('for', 'tabs-select');

      // select
      const select = document.createElement('select');
      select.className = 'tabs__select';
      select.id = 'tabs-select';

      this._elButtons.forEach((btn, i) => {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = btn.textContent.trim();
        if (btn.classList.contains('active')) option.selected = true;
        select.appendChild(option);
      });

      wrapper.appendChild(label);
      wrapper.appendChild(select);
      this._elTabs.prepend(wrapper);
      this._select = select;

      // обработчик выбора
      select.addEventListener('change', (e) => {
        const index = e.target.value;
        this.showByIndex(index);
      });

      // показать/скрыть при ресайзе
      const toggleVisibility = () => {
        const nav = this._elTabs.querySelector('.tabs__nav');
        if (window.innerWidth < 992) {
          wrapper.style.display = 'block';
          if (nav) nav.style.display = 'none';
        } else {
          wrapper.style.display = 'none';
          if (nav) nav.style.display = '';
        }
      };

      toggleVisibility();
      window.addEventListener('resize', toggleVisibility);
    }
  }

  // инициализация
  new ItcTabs('.tabs');
});

document.addEventListener("DOMContentLoaded", () => {
  const cities = [
    "Москва", "Санкт-Петербург", "Новосибирск", "Екатеринбург",
    "Казань", "Нижний Новгород", "Самара", "Ростов-на-Дону",
    "Уфа", "Красноярск", "Владивосток", "Пермь"
  ];

  // Берём все формы
  const forms = document.querySelectorAll(".form");

  forms.forEach(form => {
    // Находим пары инпут + дропдаун внутри формы
    const inputs = form.querySelectorAll(".form__group");

    inputs.forEach(group => {
      const field = group.querySelector("input");
      const dropdown = group.querySelector(".form__dropdown");

      if (!field || !dropdown) return;

      // Заполняем список городов
      dropdown.innerHTML = cities.map(c => `<li>${c}</li>`).join("");

      // Показ списка при фокусе
      field.addEventListener("focus", () => {
        closeAllDropdowns();
        dropdown.classList.add("active");
      });

      // Фильтрация по вводу
      field.addEventListener("input", () => {
        const value = field.value.toLowerCase();
        dropdown.innerHTML = cities
          .filter(c => c.toLowerCase().includes(value))
          .map(c => `<li>${c}</li>`)
          .join("");
      });

      // Выбор города
      dropdown.addEventListener("click", e => {
        if (e.target.tagName === "LI") {
          field.value = e.target.textContent;
          dropdown.classList.remove("active");
        }
      });
    });
  });

  // Закрытие всех списков при клике вне
  document.addEventListener("click", e => {
    if (!e.target.closest(".form__group")) {
      closeAllDropdowns();
    }
  });

  function closeAllDropdowns() {
    document.querySelectorAll(".form__dropdown").forEach(d => d.classList.remove("active"));
  }
});
document.addEventListener("DOMContentLoaded", () => {
  var accordeonButtons = document.getElementsByClassName("accordeon__button");

  //пишем событие при клике на кнопки - вызов функции toggle
  for (var i = 0; i < accordeonButtons.length; i++) {
    var accordeonButton = accordeonButtons[i];

    accordeonButton.addEventListener("click", toggleItems, false);
  }

  //пишем функцию
  function toggleItems() {

    // переменная кнопки(актульная) с классом
    var itemClass = this.className;

    // добавляем всем кнопкам класс close
    for (var i = 0; i < accordeonButtons.length; i++) {
      accordeonButtons[i].className = "accordeon__button closed";
    }

    // закрываем все открытые панели с текстом
    var pannels = document.getElementsByClassName("accordeon__panel");
    for (var z = 0; z < pannels.length; z++) {
      pannels[z].style.maxHeight = 0;
    }

    // проверка. если кнопка имеет класс close при нажатии
    // к актуальной(нажатой) кнопке добававляем активный класс
    // а панели - которая находится рядом задаем высоту
    if (itemClass == "accordeon__button closed") {
      this.className = "accordeon__button active";
      var panel = this.nextElementSibling;
      panel.style.maxHeight = panel.scrollHeight + "px";
    }

  }
});

document.addEventListener('DOMContentLoaded', function () {
  $('.articmodal-close').click(function (e) {
    $.arcticmodal('close');

  });
  $('.a1').click(function (e) {
    e.preventDefault();
    $('#popup-call').arcticmodal({
    });
  });
  $('.a2, .link').click(function (e) {
    e.preventDefault();
    $('#popup-call2').arcticmodal({
    });
  });

});
document.addEventListener("DOMContentLoaded", () => {
  $(document).ready(function () {
    $('[data-submit]').on('click', function (e) {
      e.preventDefault();
      $(this).parents('form').submit();
    })
    $.validator.addMethod(
      "regex",
      function (value, element, regexp) {
        var re = new RegExp(regexp);
        return this.optional(element) || re.test(value);
      },
      "Please check your input."
    );
    function valEl(el) {

      el.validate({
        rules: {
          tel: {
            required: true,
            regex: '^([\+]+)*[0-9\x20\x28\x29\-]{5,20}$'
          },
          name: {
            required: true
          },
          email: {
            required: true,
            email: true
          }
        },
        messages: {
          tel: {
            required: 'Заполните поле',
            regex: 'Телефон может содержать символы + - ()'
          },
          name: {
            required: 'Заполните поле',
          },
          text: {
            required: 'Заполните поле',
          },
          email: {
            required: 'Заполните поле',
            email: 'Неверный формат E-mail'
          }
        },
        submitHandler: function (form) {
          $('#loader').fadeIn();
          var $form = $(form);
          var $formId = $(form).attr('id');
          switch ($formId) {
            case 'popupResult':
              $.ajax({
                type: 'POST',
                url: $form.attr('action'),
                data: $form.serialize(),
              })
                .always(function (response) {
                  setTimeout(function () {
                    $('#loader').fadeOut();
                  }, 800);
                  setTimeout(function () {
                    $.arcticmodal('close');
                    $('#popup-thank').arcticmodal({});
                    $form.trigger('reset');
                    //строки для остлеживания целей в Я.Метрике и Google Analytics
                  }, 1100);

                });
              break;
          }
          return false;
        }
      })
    }

    $('.js-form').each(function () {
      valEl($(this));
    });
    $('[data-scroll]').on('click', function () {
      $('html, body').animate({
        scrollTop: $($.attr(this, 'data-scroll')).offset().top
      }, 2000);
      event.preventDefault();
    })
  });
});
// Скролл по якорям
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.go_to').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      const targetSelector = link.getAttribute('href');
      const targetElement = document.querySelector(targetSelector);
      if (targetElement) {
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 100;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});
document.addEventListener('DOMContentLoaded', function () {
  const links = document.querySelectorAll('.area__link');
  const images = document.querySelectorAll('.area__images img');
  const scale = document.querySelector('.area__scale');
  const fill = document.querySelector('.area__fill');
  const areaBox = document.getElementById('areaBox');

  const points = [];
  links.forEach((link, i) => {
    const point = document.createElement('div');
    point.className = 'area__scale-point';
    point.style.top = `${(i / (links.length - 1)) * 100}%`;
    scale.appendChild(point);
    points.push(point);
  });

  let currentFill = 0;
  let targetFill = 0;
  let baseSpeed = 0.02;
  let speed = baseSpeed;

  function animateFill() {
    if (Math.abs(targetFill - currentFill) > speed) {
      currentFill += (targetFill > currentFill ? speed : -speed);
    } else {
      currentFill = targetFill;
    }

    fill.style.height = `${currentFill}%`;

    // Определяем активную точку
    let activeIndex = 0;
    for (let i = 0; i < points.length; i++) {
      const pointPos = (i / (points.length - 1)) * 100;
      if (currentFill >= pointPos - 0.01) activeIndex = i;
    }

    // Обновляем точки
    points.forEach((point, i) => {
      // Красные для всех заполненных
      if (i < activeIndex) {
        point.style.background = 'red';
        point.style.width = '8px';
        point.style.height = '8px';
      } 
      // Активная точка — с картинкой
      else if (i === activeIndex) {
        point.style.background = 'url(../img/big-dot.svg) no-repeat center center';
        point.style.width = '16px';
        point.style.height = '16px';
      } 
      // Остальные — серые
      else {
        point.style.background = 'rgba(224, 224, 224, 1)';
        point.style.width = '8px';
        point.style.height = '8px';
      }
    });

    // Текст и картинки
    links.forEach((link, i) => link.classList.toggle('active', i === activeIndex));
    images.forEach((img, i) => img.classList.toggle('active', i === activeIndex));

    requestAnimationFrame(animateFill);
  }

  // Запуск при появлении блока
  let observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        targetFill = 100;
        animateFill();
      }
    });
  }, { threshold: 0.3 });

  observer.observe(areaBox);

  // Наведение ускоряет
  links.forEach(link => {
    link.addEventListener('mouseenter', () => {
      const index = parseInt(link.dataset.index);
      targetFill = (index / (links.length - 1)) * 100;
      speed = 1.5;
    });

    link.addEventListener('mouseleave', () => {
      targetFill = 100;
      speed = baseSpeed;
    });
  });
});
document.addEventListener('DOMContentLoaded', function () {
  // 1️⃣ Главный Swiper (если нужен на странице)
  const mainSwiper = new Swiper('.swiper-main', {
    slidesPerView: 7,
    slidesPerGroup: 7,
    spaceBetween: 0,
    navigation: {
      nextEl: '.swiper-button-next-main',
      prevEl: '.swiper-button-prev-main',
    },
    loop: false
  });

  // 2️⃣ YMaps + клики по городам
  const items = document.querySelectorAll('.geo__item');
  const geoItems = document.querySelector('.geo__items');
  const details = document.querySelector('.geo__details');
  const detailsContent = document.querySelector('.geo__details-content');
  const backBtn = document.querySelector('.geo__back');

  let myMap, clusterer;

  ymaps.ready(initMap);

  function initMap() {
    myMap = new ymaps.Map("map", {
      center: [55.773105, 37.736779],
      zoom: 4,
      controls: []
    });

    const geoObjects = Array.from(items).map(item => {
      const coords = item.dataset.coords.split(',').map(Number);
      const id = item.dataset.id;
      return new ymaps.Placemark(coords, {
        balloonContentBody: id
      }, {
        iconLayout: 'default#image',
        iconImageHref: 'img/map.svg',
        iconImageSize: [70, 70],
        iconImageOffset: [-35, -35]
      });
    });

    clusterer = new ymaps.Clusterer({
      clusterDisableClickZoom: false,
      clusterOpenBalloonOnClick: false
    });
    clusterer.add(geoObjects);
    myMap.geoObjects.add(clusterer);
    myMap.behaviors.disable('scrollZoom');
  }

  // 3️⃣ Клик по городу
  items.forEach(item => {
    item.addEventListener('click', () => {
      const coords = item.dataset.coords.split(',').map(Number);
      const id = item.dataset.id;

      myMap.setCenter(coords, 10, { duration: 500 });

      const content = document.querySelector(`#branch-content [data-id="${id}"]`);
      detailsContent.innerHTML = content ? content.innerHTML : '<p>Информация недоступна</p>';

      geoItems.classList.add('hidden');
      details.classList.add('active');

      // 4️⃣ Инициализация динамического Swiper после вставки контента
      const swiperEl = detailsContent.querySelector('.swiper-dynamic');
      if (swiperEl) {
        new Swiper(swiperEl, {
          slidesPerView: 7,
          slidesPerGroup: 7,
          spaceBetween: 0,
          navigation: {
            nextEl: detailsContent.querySelector('.swiper-button-next-dyn'),
            prevEl: detailsContent.querySelector('.swiper-button-prev-dyn')
          },
          loop: false
        });
      }
    });
  });

  // 5️⃣ Кнопка "Назад"
  backBtn.addEventListener('click', () => {
    details.classList.remove('active');
    geoItems.classList.remove('hidden');
    myMap.setCenter([55.773105, 37.736779], 4, { duration: 500 });
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const swiper1 = new Swiper('.swiper1', {
    slidesPerView: 1,
    loop: true,
    spaceBetween: 10,
    navigation: {
      nextEl: '.swiper-button-next1',
      prevEl: '.swiper-button-prev1',
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        spaceBetween: 0,
        loop: true,
        slidesPerView: 1
      },
      767: {
        spaceBetween: 10,
        slidesPerView: 1
      },
      992: {
        spaceBetween: 10,
        slidesPerView: 1
      },
      1200: {
        spaceBetween: 10,
        loop: true,
        slidesPerView: 1
      }
    }
  });
    const swiper2 = new Swiper('.swiper2', {
    slidesPerView: 4,
    loop: true,
    spaceBetween: 8,
    breakpoints: {
      // when window width is >= 320px
      320: {
        spaceBetween: 8,
        loop: true,
        slidesPerView: 1
      },
      767: {
        spaceBetween: 8,
        slidesPerView: 2
      },
      992: {
        spaceBetween: 8,
        slidesPerView: 3
      },
      1200: {
        spaceBetween: 8,
        loop: true,
        slidesPerView: 4
      }
    }
  });

  // const swiper3 = new Swiper('.swiper3', {
  //   slidesPerView: 7,
  //   spaceBetween: 0,
  //   slidesPerGroup: 7, // <-- перелистывать сразу 7 слайдов
  //   navigation: {
  //     nextEl: '.swiper-button-next3',
  //     prevEl: '.swiper-button-prev3',
  //   }
  // });

  const swiper4 = new Swiper('.swiper4', {
    slidesPerView: 7,
    slidesPerGroup: 7, // <-- перелистывать сразу 7 слайдов
    spaceBetween: 0,
    navigation: {
      nextEl: '.swiper-button-next4',
      prevEl: '.swiper-button-prev4',
    }
  });
});
document.addEventListener("DOMContentLoaded", function() {
  const footerItems = document.querySelectorAll(".footer__item");

  function initFooterAccordion() {
    if (window.innerWidth <= 768) {
      // Мобильный режим
      footerItems.forEach(item => {
        const title = item.querySelector("p");
        const list = item.querySelector("ul");

        if (!title || !list) return;

        list.style.maxHeight = "0";
        list.style.overflow = "hidden";
        list.style.transition = "max-height 0.3s ease";
        item.classList.remove("open");

        // Убираем возможные дубли слушателей
        title.onclick = () => {
          const isOpen = item.classList.contains("open");
          if (isOpen) {
            item.classList.remove("open");
            list.style.maxHeight = "0";
          } else {
            item.classList.add("open");
            list.style.maxHeight = list.scrollHeight + "px";
          }
        };
      });
    } else {
      // Десктоп: показываем всё и отключаем аккордеон
      footerItems.forEach(item => {
        const list = item.querySelector("ul");
        const title = item.querySelector("p");
        if (!list || !title) return;

        list.style.maxHeight = "none";
        list.style.overflow = "visible";
        item.classList.remove("open");

        title.onclick = null; // отключаем клик
      });
    }
  }

  // Инициализация при загрузке
  initFooterAccordion();

  // Переинициализация при изменении размера окна
  window.addEventListener("resize", initFooterAccordion);
});

document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.querySelector('.menu-btn');
  const menu = document.querySelector('.menu');
  const mainItems = document.querySelectorAll('.menu__main li');
  // const firstMain = document.querySelector('.menu__main li:first-child'); 
  // const secondMain = document.querySelector('.menu__main li:nth-child(2)'); 
  const list1 = document.querySelector('.menu__list_1');
  const list2 = document.querySelector('.menu__list_2');
  const menuArea = document.querySelector('.menu__area');
  const backBtn = document.querySelector('.menu__back');
  const menuRight = document.querySelector('.menu__right'); // 🔹 правая часть меню

  // Открытие/закрытие меню
  menuBtn.addEventListener('click', function () {
    menuBtn.classList.toggle('active');
    menu.classList.toggle('active');
    document.body.classList.toggle('no-scroll', menu.classList.contains('active'));
    // Сброс при закрытии
    if (!menu.classList.contains('active')) {
      resetActive();
      hideSubmenus();
      menuRight.classList.remove('active'); // 🔹 сброс
    }
  });

  // Сброс активных пунктов
  function resetActive() {
    mainItems.forEach(item => item.classList.remove('active'));
  }

  // Скрытие подменю
  function hideSubmenus() {
    list1.classList.remove('visible');
    list2.classList.remove('visible');
    menuArea.classList.remove('submenu-open');
    menuRight.classList.remove('active'); // 🔹 сброс
  }

  // Проверка мобильного режима
  function isMobile() {
    return window.innerWidth <= 1024;
  }

  // Действие для "Назад"
  backBtn.addEventListener('click', () => {
    hideSubmenus();
    backBtn.classList.remove('visible');
    menuRight.classList.remove('active'); // 🔹 при возврате убрать active
  });

  // Для десктопа — наведение
  firstMain.addEventListener('mouseenter', () => {
    if (!isMobile()) {
      resetActive();
      firstMain.classList.add('active');
      list1.classList.add('visible');
      list2.classList.remove('visible');
    }
  });

  secondMain.addEventListener('mouseenter', () => {
    if (!isMobile()) {
      resetActive();
      secondMain.classList.add('active');
      list2.classList.add('visible');
      list1.classList.remove('visible');
    }
  });

  menuArea.addEventListener('mouseleave', () => {
    if (!isMobile()) {
      resetActive();
      hideSubmenus();
    }
  });

  // Для мобильных — по клику
  firstMain.addEventListener('click', (e) => {
    if (isMobile()) {
      e.preventDefault();
      list1.classList.add('visible');
      list2.classList.remove('visible');
      menuArea.classList.add('submenu-open');
      backBtn.classList.add('visible');
      menuRight.classList.add('active'); // 🔹 добавляем класс
    }
  });

  secondMain.addEventListener('click', (e) => {
    if (isMobile()) {
      e.preventDefault();
      list2.classList.add('visible');
      list1.classList.remove('visible');
      menuArea.classList.add('submenu-open');
      backBtn.classList.add('visible');
      menuRight.classList.add('active'); // 🔹 добавляем класс
    }
  });
});
// Замена <img class="svg"> на inline SVG
document.addEventListener("DOMContentLoaded", () => {
  const svgImages = document.querySelectorAll('img.svg');

  svgImages.forEach(img => {
    const imgURL = img.getAttribute('src');

    fetch(imgURL)
      .then(response => response.text())
      .then(data => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, 'image/svg+xml');
        let svg = xmlDoc.querySelector('svg');

        if (!svg) return;

        // Перенос ID
        if (img.id) {
          svg.setAttribute('id', img.id);
        }

        // Перенос классов
        const classes = img.getAttribute('class');
        if (classes) {
          svg.setAttribute('class', `${classes} replaced-svg`);
        }

        // Удаление некорректных xmlns
        svg.removeAttribute('xmlns:a');

        // Добавление viewBox, если его нет
        if (!svg.getAttribute('viewBox') && svg.getAttribute('height') && svg.getAttribute('width')) {
          svg.setAttribute('viewBox', `0 0 ${svg.getAttribute('width')} ${svg.getAttribute('height')}`);
        }

        // Замена <img> на <svg>
        img.parentNode.replaceChild(svg, img);
      })
      .catch(error => {
        console.error(`Ошибка при загрузке SVG: ${imgURL}`, error);
      });
  });
});

