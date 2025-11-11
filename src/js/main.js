document.addEventListener("DOMContentLoaded", () => {
  class ItcTabs {
    constructor(target, config) {
      const defaultConfig = {};
      this._config = Object.assign(defaultConfig, config);
      this._elTabs = typeof target === 'string' ? document.querySelector(target) : target;

      // Берём только верхнеуровневые кнопки и панели внутри контейнера
      // структура ожидается: .tabs__nav (верхняя) и .tabs__content (верхняя)
      this._elButtons = Array.from(this._elTabs.querySelectorAll(':scope > .tabs__nav .tabs__btn'));
      this._elPanes = Array.from(this._elTabs.querySelectorAll(':scope > .tabs__content > .tabs__pane'));

      this._eventShow = new Event('tab.itc.change');
      this._init();
      this._events();
    }

    _init() {
      this._elTabs.setAttribute('role', 'tablist');
      this._elButtons.forEach((el, index) => {
        el.dataset.index = index;
        el.setAttribute('role', 'tab');
        // защитно: если панель для этого индекса есть — пометить role
        if (this._elPanes[index]) {
          this._elPanes[index].setAttribute('role', 'tabpanel');
        }
      });
    }

    show(elLinkTarget) {
      const index = Number(elLinkTarget.dataset.index);
      const elPaneTarget = this._elPanes[index];
      const elLinkActive = this._elTabs.querySelector(':scope > .tabs__nav .tabs__btn.tabs__btn_active');
      const elPaneShow = this._elTabs.querySelector(':scope > .tabs__content > .tabs__pane.tabs__pane_show');

      if (elLinkTarget === elLinkActive) return;

      elLinkActive?.classList.remove('tabs__btn_active');
      elPaneShow?.classList.remove('tabs__pane_show');

      elLinkTarget.classList.add('tabs__btn_active');
      if (elPaneTarget) elPaneTarget.classList.add('tabs__pane_show');

      this._elTabs.dispatchEvent(this._eventShow);
      elLinkTarget.focus();
    }

    showByIndex(index) {
      const elLinkTarget = this._elButtons[index];
      if (elLinkTarget) this.show(elLinkTarget);
    }

    _events() {
      this._elTabs.addEventListener('click', (e) => {
        const target = e.target.closest('.tabs__btn');
        // убедимся, что найденная кнопка — именно верхнеуровневая (в списке текущих buttons)
        if (target && this._elButtons.includes(target)) {
          e.preventDefault();
          this.show(target);
        }
      });
    }
  }

  // Инициализируем все топ-уровневые блоки табов (.tabs и .tabs2 и т.д.)
  document.querySelectorAll('.tabs, .tabs2').forEach((tabsContainer) => {
    new ItcTabs(tabsContainer);
  });
});
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.geo__block input[type="search"]');
    const geoItems = document.querySelectorAll('.geo__item');

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase().trim();

        geoItems.forEach(item => {
            const title = item.querySelector('.geo__title').textContent.toLowerCase();
            if (title.includes(query)) {
                item.style.display = ''; // показываем элемент
            } else {
                item.style.display = 'none'; // скрываем элемент
            }
        });
    });
});
document.addEventListener('DOMContentLoaded', function() {
  const replaceBtn = document.querySelector('.local__replace');
  const inputFrom = document.querySelector('#local1');
  const inputTo = document.querySelector('#local2');

  if (replaceBtn && inputFrom && inputTo) {
    replaceBtn.addEventListener('click', function(e) {
      e.preventDefault();

      // сохраняем значение первого поля
      const temp = inputFrom.value;
      // меняем местами значения
      inputFrom.value = inputTo.value;
      inputTo.value = temp;

      // если есть активные label (например, с классом 'active'), обновляем их состояние
      inputFrom.dispatchEvent(new Event('input'));
      inputTo.dispatchEvent(new Event('input'));
    });
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const stage = document.querySelector('#stage');
  const progressLine = document.querySelector('.stage__progress-line');
  const dots = document.querySelectorAll('.stage__progress-dot');
  const items = document.querySelectorAll('.stage__item');

  // Проверяем, есть ли нужный блок
  if (!stage || !progressLine || items.length === 0) return;

  window.addEventListener('scroll', () => {
    const stageRect = stage.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const start = viewportHeight / 2;

    let progress = 0;
    items.forEach((item, index) => {
      const itemTop = item.getBoundingClientRect().top;
      if (itemTop < start) progress = index + 1;
    });

    const total = items.length;
    const percent = Math.min((progress / total) * 100, 100);

    progressLine.style.height = `${percent}%`;

    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index < progress);
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
  const btn = document.querySelector(".local__btn");
  const formBlock = document.querySelector(".header__info");

  if (!btn || !formBlock) return;

  // Скрываем форму по умолчанию
  formBlock.style.display = "none";

  btn.addEventListener("click", e => {
    e.preventDefault();
    btn.style.display = "none";
    formBlock.style.display = "block";

    // Плавное появление
    formBlock.style.opacity = 0;
    formBlock.style.transition = "opacity 0.5s ease";
    requestAnimationFrame(() => {
      formBlock.style.opacity = 1;
    });
  });
});
document.addEventListener('DOMContentLoaded', () => {
  const input = document.querySelector('#fileInput');
  const fileGroup = document.querySelector('.form__group_file');
  const fileInfo = fileGroup.querySelector('.file__info');

  // Создаём контейнер для выбранных файлов
  let fileListContainer = fileGroup.querySelector('.file__list');
  if (!fileListContainer) {
    fileListContainer = document.createElement('div');
    fileListContainer.classList.add('file__list');
    fileInfo.after(fileListContainer);
  }

  let selectedFiles = [];

  // Клик по области выбора файлов
  fileGroup.addEventListener('click', (e) => {
    // Если клик по input или по крестикам внутри списка — ничего не делаем
    if (
      e.target === input ||
      e.target.closest('.file__remove') ||
      e.target.closest('.file__list')
    ) return;

    input.click();
  });

  // Обновление списка файлов
  function updateFileList() {
    fileListContainer.innerHTML = '';

    selectedFiles.forEach((file, index) => {
      const fileItem = document.createElement('div');
      fileItem.classList.add('file__item');
      fileItem.innerHTML = `
        <span class="file__name-text">${file.name}</span>
        <span class="file__remove" data-index="${index}"></span>
      `;
      fileListContainer.appendChild(fileItem);
    });

    // Класс active, если есть файлы
    if (selectedFiles.length > 0) {
      fileListContainer.classList.add('active');
    } else {
      fileListContainer.classList.remove('active');
    }
  }

  // Выбор файлов
  input.addEventListener('change', () => {
    const files = Array.from(input.files);

    files.forEach(file => {
      if (selectedFiles.length < 5) {
        if (file.size <= 2 * 1024 * 1024) { // 2 МБ
          selectedFiles.push(file);
        } else {
          alert(`Файл "${file.name}" превышает размер 2 МБ`);
        }
      } else {
        alert('Можно выбрать максимум 5 файлов');
      }
    });

    updateFileList();
    input.value = ''; // сброс input для повторного выбора
  });

  // Удаление файла
  fileListContainer.addEventListener('click', (e) => {
    const removeBtn = e.target.closest('.file__remove');
    if (removeBtn) {
      const index = parseInt(removeBtn.dataset.index);
      selectedFiles.splice(index, 1);
      updateFileList();
    }
  });
});



document.addEventListener('DOMContentLoaded', function() {
  const copyBtns = document.querySelectorAll('.code__btn');

  copyBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const codeBlock = btn.closest('.code__block');
      const codeText = codeBlock.querySelector('.code__text').textContent.trim();

      navigator.clipboard.writeText(codeText)
        .then(() => {
          btn.textContent = 'Скопировано!';
          setTimeout(() => btn.textContent = 'Скопировать', 2000);
        })
        .catch(err => {
          console.error('Ошибка копирования:', err);
        });
    });
  });
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
  $('.a3, .nav__item p').click(function (e) {
    e.preventDefault();
    $('#popup-call3').arcticmodal({
    });
  });

});
document.addEventListener("DOMContentLoaded", () => {
  // --- popup1 ---
  const popupBg = document.querySelector('.popup__bg');
  const popup = document.querySelector('.popup');
  const openPopupButtons = document.querySelectorAll('section a.btn, .nav__call, .footer__call, .item__el');
  const closePopupButton = document.querySelector('.close-popup');

  openPopupButtons.forEach(button => {
    button.addEventListener('click', e => {
      e.preventDefault();
      popupBg.classList.add('active');
      popup.classList.add('active');
    });
  });

  if (closePopupButton) {
    closePopupButton.addEventListener('click', () => {
      popupBg.classList.remove('active');
      popup.classList.remove('active');
    });
  }

  document.addEventListener('click', e => {
    if (e.target === popupBg) {
      popupBg.classList.remove('active');
      popup.classList.remove('active');
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      popupBg.classList.remove('active');
      popup.classList.remove('active');
    }
  });

  // --- popup2 ---
  const popupBg2 = document.querySelector('.popup__bg2');
  const popup2 = document.querySelector('.popup2');
  const closePopupButton2 = document.querySelectorAll('.popup__bg2 .close-popup');

  closePopupButton2.forEach(btn => {
    btn.addEventListener('click', () => {
      popupBg2.classList.remove('active');
      popup2.classList.remove('active');
    });
  });

  document.addEventListener('click', e => {
    if (e.target === popupBg2) {
      popupBg2.classList.remove('active');
      popup2.classList.remove('active');
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      popupBg2.classList.remove('active');
      popup2.classList.remove('active');
    }
  });

  // ====== Дропдауны всех типов + подъем лейблов ======
  const lists = {
    city: ["Москва", "Санкт-Петербург", "Новосибирск", "Екатеринбург","Казань","Нижний Новгород","Самара","Ростов-на-Дону","Уфа","Красноярск","Владивосток","Пермь"],
    time: Array.from({ length: 24 * 2 }, (_, i) => { const h = Math.floor(i/2); const m = i%2===0?"00":"30"; return `${String(h).padStart(2,"0")}:${m}`; }),
    date: Array.from({ length: 7 }, (_, i) => { const d = new Date(); d.setDate(d.getDate()+i); return d.toLocaleDateString("ru-RU",{day:"2-digit",month:"2-digit",year:"numeric"}); }),
    documents: ["Паспорт","Заграничный паспорт","Водительское удостоверение","Свидетельство о рождении","ИНН","СНИЛС","Удостоверение личности моряка","Военный билет"],
    bodytype: ["Фургон","Тент","Рефрижератор","Открытая платформа","Контейнеровоз","Автовоз","Цистерна","Самосвал","Бортовой"],
    status: ["Создан","Ожидает отправки","В пути","На терминале","Доставлен","Отменён"],
    franchise: ["Микро (до 50 м²)","Мини (до 100 м²)","Стандарт (100–300 м²)","Флагман (более 300 м²)","Онлайн формат","Партнёрский пункт выдачи","Корнер в торговом центре"]
  };

  const allGroups = document.querySelectorAll('.form__group');

  allGroups.forEach(group => {
    const type = group.dataset.type;
    const field = group.querySelector('input');
    const dropdown = group.querySelector('.form__dropdown');
    if(!type || !field || !dropdown || !lists[type]) return;
    
    const items = lists[type];
    dropdown.innerHTML = items.map(i => `<li>${i}</li>`).join('');

    // открыть дропдаун на фокус
    field.addEventListener('focus', () => {
      closeAllDropdowns();
      dropdown.classList.add('active');
    });

    // фильтрация для текстовых списков
    if(["city","documents","bodytype","status","franchise"].includes(type)) {
      field.addEventListener('input', () => {
        const val = field.value.toLowerCase();
        dropdown.innerHTML = items.filter(i => i.toLowerCase().includes(val))
                                  .map(i => `<li>${i}</li>`).join('');
      });
    }

    // выбор значения
    dropdown.addEventListener('click', e => {
      if(e.target.tagName==='LI') {
        field.value = e.target.textContent;
        dropdown.classList.remove('active');
        field.classList.add('filled');
      }
    });
  });

  document.addEventListener('click', e => {
    if(!e.target.closest('.form__group')) closeAllDropdowns();
  });

  function closeAllDropdowns() {
    document.querySelectorAll('.form__dropdown').forEach(d => d.classList.remove('active'));
  }

  // подъем лейблов
  const allFields = document.querySelectorAll('.form__field, textarea');
  allFields.forEach(field => {
    const checkFilled = () => field.value.trim()!==""?field.classList.add('filled'):field.classList.remove('filled');
    field.addEventListener('input', checkFilled);
    checkFilled();
  });

  // --- Валидация и AJAX ---
  $(document).ready(function () {
    $('[data-submit]').on('click', function(e){ e.preventDefault(); $(this).parents('form').submit(); });

    $.validator.addMethod("regex", function(value, element, regexp){
      var re = new RegExp(regexp);
      return this.optional(element) || re.test(value);
    }, "Некорректный формат");

    function valEl(el) {
      el.find('.form__field').removeClass('error-input valid');
      el.find('label.error').remove();

      el.validate({
        errorPlacement: function(){},
        highlight: function(element){ $(element).addClass('error-input'); },
        unhighlight: function(element){ $(element).removeClass('error-input').addClass('valid'); },
        focusInvalid: false,
        rules:{
          name:{required:true},
          tel:{required:true,regex:'^([\\+]+)*[0-9\\x20\\x28\\x29\\-]{5,20}$'},
          local1:{required:true},
          text:{required:true},
          checkk:{required:true},
          check2:{required:true},
          check:{required:true}
        },
        messages:{
          name:{required:'Заполните поле'},
          tel:{required:'Заполните поле', regex:'Неверный формат телефона'},
          local1:{required:'Укажите город'},
          text:{required:'Введите сообщение'},
          checkk:{required:'Выберите вариант (до 10 м3 / более 10 м3)'},
          check2:{required:'Подтвердите согласие на обработку персональных данных'},
          check:{required:'Подтвердите согласие на обработку персональных данных'}
        },
        submitHandler:function(form){
          const $form=$(form);
          const radioChecked = $form.find('input[name="checkk"]:checked').length>0;
          const consent1 = $form.find('input[name="check2"]').is(':checked');
          const consent2 = $form.find('input[name="check"]').is(':checked');
          if(!radioChecked || !consent1 || !consent2){ alert('Пожалуйста, заполните все обязательные поля и отметьте согласия.'); return false; }

          $('#loader').fadeIn();
          $.ajax({ type:'POST', url:$form.attr('action'), data:$form.serialize() })
           .always(()=> {
              setTimeout(()=> $('#loader').fadeOut(),800);
              setTimeout(()=>{
                popupBg.classList.remove('active');
                popup.classList.remove('active');
                popupBg2.classList.add('active');
                popup2.classList.add('active');
                $form.trigger('reset');
                $form.find('.error-input').removeClass('error-input');
                allFields.forEach(f=>f.classList.remove('filled'));
              },1100);
           });
          return false;
        }
      });
    }

    $('.js-form').each(function(){ valEl($(this)); });

    // smooth scroll
    $('[data-scroll]').on('click', function(event){
      event.preventDefault();
      $('html, body').animate({ scrollTop: $($.attr(this,'data-scroll')).offset().top }, 2000);
    });
  });
});



document.addEventListener("DOMContentLoaded", () => {
  const inputs = document.querySelectorAll(".form__field");

  inputs.forEach((input) => {
    // при вводе текста
    input.addEventListener("input", () => {
      if (input.value.trim() !== "") {
        input.classList.add("filled");
      } else {
        input.classList.remove("filled");
      }
    });

    // при загрузке страницы, если форма уже с данными
    if (input.value.trim() !== "") {
      input.classList.add("filled");
    }
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
        point.style.background = 'url(img/big-dot.svg) no-repeat center center';
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
  // === НАСТРОЙКА Swiper (если есть) ===
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

  // ==========================
  // === ОБЩИЕ ПЕРЕМЕННЫЕ ===
  // ==========================
  const geoSections = document.querySelectorAll('.geo');
  let myMap, clusterer;

  ymaps.ready(initMap);

  function initMap() {
    myMap = new ymaps.Map("map", {
      center: [55.773105, 37.736779],
      zoom: 4,
      controls: []
    });

    const zoomControl = new ymaps.control.ZoomControl({
      options: { size: 'small', position: { top: 10, right: 10 } }
    });
    const fullscreenControl = new ymaps.control.FullscreenControl({
      options: { position: { top: 10, right: 60 } }
    });

    myMap.controls.add(zoomControl);
    myMap.controls.add(fullscreenControl);
    myMap.behaviors.disable('scrollZoom');

    clusterer = new ymaps.Clusterer({
      clusterDisableClickZoom: false,
      clusterOpenBalloonOnClick: false
    });

    // все элементы карты
    const allItems = document.querySelectorAll('.geo__item');
    const geoObjects = Array.from(allItems).map(item => {
      const coords = item.dataset.coords.split(',').map(Number);
      const id = item.dataset.id;
      const mark = new ymaps.Placemark(coords, {
        balloonContentBody: item.querySelector('.geo__title').textContent
      }, {
        iconLayout: 'default#image',
        iconImageHref: 'img/map.svg',
        iconImageSize: [70, 70],
        iconImageOffset: [-35, -35]
      });
      mark.properties.set('cityId', id);
      return mark;
    });

    clusterer.add(geoObjects);
    myMap.geoObjects.add(clusterer);
  }

  // ===============================
  // === ВАРИАНТ 1: geo-contacts ===
  // ===============================
  const geoContacts = document.querySelector('.geo-contacts');
  if (geoContacts) {
    const items = geoContacts.querySelectorAll('.geo__item');
    const geoItems = geoContacts.querySelector('.geo__items');
    const details = geoContacts.querySelector('.geo__details');
    const detailsContent = geoContacts.querySelector('.geo__details-content');
    const backBtn = geoContacts.querySelector('.geo__back');
    const citySelect = geoContacts.querySelector('#citySelect');

    let allPlacemarks = [];

    // ждём, пока карта загрузится
    ymaps.ready(() => {
      allPlacemarks = myMap.geoObjects.toArray()[0].getGeoObjects(); // достаем все точки из кластера
    });

    if (citySelect) {
      citySelect.addEventListener('change', function () {
        const selectedCity = this.value;

        if (selectedCity === 'all') {
          myMap.setCenter([55.773105, 37.736779], 4, { duration: 500 });
          items.forEach(el => (el.style.display = ''));
          return;
        }

        const filteredItems = Array.from(items).filter(el => el.dataset.id === selectedCity);
        const coords = filteredItems[0]?.dataset.coords.split(',').map(Number);
        if (!coords) return;

        myMap.setCenter(coords, 10, { duration: 500 });

        // фильтруем отображение карточек
        items.forEach(el => el.style.display = el.dataset.id === selectedCity ? '' : 'none');
      });
    }

    // клики по филиалам
    items.forEach(item => {
      item.addEventListener('click', () => {
        const coords = item.dataset.coords.split(',').map(Number);
        const id = item.dataset.id;
        myMap.setCenter(coords, 10, { duration: 500 });

        const content = document.querySelector(`#branch-content [data-id="${id}"]`);
        detailsContent.innerHTML = content ? content.innerHTML : '<p>Информация недоступна</p>';
        geoItems.classList.add('hidden');
        details.classList.add('active');
      });
    });

    backBtn?.addEventListener('click', () => {
      details.classList.remove('active');
      geoItems.classList.remove('hidden');
      myMap.setCenter([55.773105, 37.736779], 4, { duration: 500 });
    });
  }

  // ================================
  // === ВАРИАНТ 2: обычные geo ====
  // ================================
  geoSections.forEach(section => {
    if (section.classList.contains('geo-contacts')) return; // пропускаем "особый" блок

    const items = section.querySelectorAll('.geo__item');
    const geoItems = section.querySelector('.geo__items');
    const details = section.querySelector('.geo__details');
    const detailsContent = section.querySelector('.geo__details-content');
    const backBtn = section.querySelector('.geo__back');

    if (!items.length) return;

    items.forEach(item => {
      item.addEventListener('click', () => {
        const coords = item.dataset.coords.split(',').map(Number);
        const id = item.dataset.id;

        myMap.setCenter(coords, 10, { duration: 500 });

        const content = document.querySelector(`#branch-content [data-id="${id}"]`);
        detailsContent.innerHTML = content ? content.innerHTML : '<p>Информация недоступна</p>';

        geoItems.classList.add('hidden');
        details.classList.add('active');
      });
    });

    backBtn?.addEventListener('click', () => {
      details.classList.remove('active');
      geoItems.classList.remove('hidden');
      myMap.setCenter([55.773105, 37.736779], 4, { duration: 500 });
    });
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

