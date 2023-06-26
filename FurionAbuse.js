/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/CreatePanel.ts":
/*!**********************************!*\
  !*** ./src/CreatePanel.ts ***!
  \**********************************/
/***/ (() => {

	// Definición del objeto CreatePanel
	const CreatePanel = {};

	// Declaración de la variable localHero
	let localHero;

	// Definición del array path_
	// Definición del array path_
	const path_ = ["Custom Scripts","Player"];

	// Creación del toggle isUiEnabled
	let isUiEnabled = Menu.AddToggle(path_, 'Skill Alert', true);


	// Definición de la función OnUpdate
	CreatePanel.OnUpdate = () => {
        if (localHero && isUiEnabled.GetValue()) {
			

        }
    };		
	
	
  // Definición de la función OnScriptLoad
  CreatePanel.OnScriptLoad = CreatePanel.OnGameStart = () => {
      localHero = EntitySystem.GetLocalHero();
  };

  // Definición de la función OnGameEnd
  CreatePanel.OnGameEnd = () => {
      localHero = null;
  };

  // Registro del script
  RegisterScript(CreatePanel);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/CreatePanel.ts"]();
/******/ 	
/******/ })()
;
