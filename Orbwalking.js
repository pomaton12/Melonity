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

	// Creación del toggle isUiEnabled1  para activar Orbwalking
	let isUiEnabled1 = Menu.AddToggle(path_, 'Orbwalking Enable', true);
	
	// Asignacion de una tecla key bin
	let KeyBindOrbwalk = Menu.AddKeyBind(path_, 'KeyBind of OrbWalk', Enum.ButtonCode.KEY_NONE);
	
	// Creación del target hero o posicion del mouse
	let DisplayMode = Menu.AddComboBox(path_, 'Display', ['To Enemy', 'Mouse position'], 1)
	.OnChange(state => DisplayMode = state.newValue)
	.GetValue();
	
	Menu.GetFolder(['Heroes', 'Orbwalking']).SetImage('panorama/images/hud/reborn/icon_damage_psd.vtex_c');
	// Definición de la función OnUpdate
	let lastAttackTime = 0;
	
	//===============================
HitRunHeros.OnUpdate = () => {
  if (localHero || isUiEnabled1) {

  }
  
  if (localHero || KeyBindOrbwalk) {

  }

  if (localHero || DisplayMode) {

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
