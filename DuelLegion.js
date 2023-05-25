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
	const path_ = ['Heroes', 'Intelligence', 'Legion Commander'];

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
		
		if (Game.IsInDuel(localHero)) {
			Abilities.CastAbilityNoTarget(localHero, 0);
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
