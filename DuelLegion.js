/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/LegionUltiCast.ts":
/*!**********************************!*\
  !*** ./src/LegionUltiCast.ts ***!
  \**********************************/
/***/ (() => {

eval(`
	// Definición del objeto LegionUltiCast
	const LegionUltiCast = {};

	// Declaración de la variable localHero
	let localHero;

	// Definición del array path_
	const path_ = ['Heroes', 'Strength', 'Legion Commander'];

	// Creación del toggle isUiEnabled
	let isUiEnabled = Menu.AddToggle(path_, 'Use spell in Duel', true);
	isUiEnabled.SetImage('panorama\images\spellicons\legion_commander_overwhelming_odds_png.vtex_c');

	// Definición de la función OnUpdate
	let previousEnemyPositions = {};
	let bkbEnemies = {};
	//===============================
	LegionUltiCast.OnUpdate = () => {
		if (localHero && isUiEnabled.GetValue()) {
			if (localHero.GetUnitName() !== "npc_dota_hero_legion_commander"){
				return;
			}
		}
		
	    const modifiers = localHero.GetModifiers();
	    for (let modifier of modifiers) {
	      if (modifier.GetName() === 'modifier_commander_duel') {
		  // Nueva condición para activar Overwhelming siempre
		  let Overwhelming = localHero.GetAbilityByIndex(0);
		  if (Overwhelming && Overwhelming.IsExist() && Overwhelming.CanCast()) {
		    Overwhelming.CastNoTarget();
		  }
		  break;
	        }
             }
	};
	// Definición de la función OnScriptLoad
	LegionUltiCast.OnScriptLoad = LegionUltiCast.OnGameStart = () => {
	  localHero = EntitySystem.GetLocalHero();
	};

	// Definición de la función OnGameEnd
	LegionUltiCast.OnGameEnd = () => {
	  localHero = null;
	};

	// Registro del script
	RegisterScript(LegionUltiCast);

`);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/LegionUltiCast.ts"]();
/******/ 	
/******/ })()
;
