/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/HitRunHeros.ts":
/*!**********************************!*\
  !*** ./src/HitRunHeros.ts ***!
  \**********************************/
/***/ (() => {

eval(`
	// Definición del objeto HitRunHeros
	const HitRunHeros = {};

	// Declaración de la variable localHero
	let localHero;

	// Definición del array path_
	const path_ = ['Heroes', 'Orbwalking'];

	// Creación del toggle isUiEnabled1  para habilidad 4
	let isUiEnabled1 = Menu.AddToggle(path_, 'Orbwalking Enable', true);
	isUiEnabled1.SetImage('panorama/images/spellicons/kunkka_torrent_storm_png.vtex_c');
		
	// Creación del target hero o posicion del mouse
	let DisplayMode = Menu.AddComboBox(PATH, 'Display', ['To Enemy', 'Mouse position'], 1)
	.OnChange(state => DisplayMode = state.newValue)
	.GetValue()
	.SetImage('panorama\images\hud\reborn\icon_speed_psd.vtex_c');

	// Definición de la función OnUpdate
	let previousEnemyPositions = {};
	let bkbEnemies = {};
	//===============================
	HitRunHeros.OnUpdate = () => {
		if (localHero && isUiEnabled1) {
			if (localHero.GetUnitName() !== "npc_dota_hero_windrunner")
			  return;
		}
	  
	  	if (localHero && DisplayMode) {

		}
	  
	};
	// Definición de la función OnScriptLoad
	HitRunHeros.OnScriptLoad = HitRunHeros.OnGameStart = () => {
	  localHero = EntitySystem.GetLocalHero();
	};

	// Definición de la función OnGameEnd
	HitRunHeros.OnGameEnd = () => {
	  localHero = null;
	};

	// Registro del script
	RegisterScript(HitRunHeros);

`);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/HitRunHeros.ts"]();
/******/ 	
/******/ })()
;
