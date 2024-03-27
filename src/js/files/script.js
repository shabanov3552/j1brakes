// Подключение функционала "Чертогов Фрилансера"
import { isMobile } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";

//#region select


$(document).ready(function () {
   $('select').selectpicker({
      dropupAuto: false,
      // mobile: true,
      // size: 8,
      doneButtonText: 'Search'
   });
});

//#endregion