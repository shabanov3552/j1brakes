// Подключение функционала "Чертогов Фрилансера"
import { isMobile } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";


//#region Табы главная авто, смена по ховеру

$('.products-tabs__link').hover(function () {
   $(this)
      .addClass('_active').siblings().removeClass('_active')
      .closest('div.products-tabs').find('div.products-tabs__item').removeClass('_active').eq($(this).index()).addClass('_active');
});


//#endregion

//#region select


$(document).ready(function () {
   $('select').selectpicker({
      dropupAuto: false,
      doneButtonText: 'Search'
   });
});

//#endregion