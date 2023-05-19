/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/AutoSaverWindrunner.ts":
/*!**********************************!*\
  !*** ./src/AutoSaverWindrunner.ts ***!
  \**********************************/
/***/ (() => {

eval(`
	// Definición del objeto AutoSaverAlchemist
	const AutoSaverWindrunner = {};

	// Declaración de la variable localHero
	let localHero;

	// Definición del array path_
	const path_ = ['Heroes', 'Intelligence', 'Windranger'];

	// Creación del toggle isUiEnabled
	let isUiEnabled = Menu.AddToggle(path_, 'Gale Force Use', true);
	isUiEnabled.SetImage('panorama/images/items/stormcrafter_png.vtex_c');

	// Definición de la función OnUpdate
	AutoSaverWindrunner.OnUpdate = () => {
		if (localHero && isUiEnabled) {
			if (localHero.GetUnitName() !== "npc_dota_hero_windrunner")
				return;
			const modifiers = localHero.GetModifiers();
			for (let modifier of modifiers) {
				if (modifier.GetName() === 'modifier_windrunner_focusfire') {
					const remainingTime = modifier.GetRemainingTime();
					if (remainingTime <= 20) {
						let gale_force = localHero.GetAbilityByIndex(3);
						if (gale_force && gale_force.IsExist() && gale_force.CanCast()) {
							let enemies = localHero.GetHeroesInRadius(1000, Enum.TeamType.TEAM_ENEMY).length;

							let vec1 = localHero.GetAbsOrigin();
							let vec2 = Input.GetWorldCursorPos();
							let pos1 = (vec1.x ? (vec1) : (vec1.GetAbsOrigin ? (vec1.GetAbsOrigin()) : (0)));
							let pos2 = (vec2.x ? (vec2) : (vec2.GetAbsOrigin ? (vec2.GetAbsOrigin()) : (0)));
							let distance = pos1 && pos2 && pos1.sub(pos2).Length2D();
							
							let target = EntitySystem.GetLocalHero();
							let rotation = target.GetRotation();
							let radians = rotation.y * Math.PI / 180;
							let direction = new Vector2(Math.cos(radians), -Math.sin(radians));
							
							if (distance <= 1000) {
								gale_force.CastPosition(target.GetAbsOrigin().add(direction.mul(500)));
							}
						}
					}
				}
			}
		}
	};

	// Definición de la función OnScriptLoad
	AutoSaverWindrunner.OnScriptLoad = AutoSaverWindrunner.OnGameStart = () => {
		localHero = EntitySystem.GetLocalHero();
	};

	// Definición de la función OnGameEnd
	AutoSaverWindrunner.OnGameEnd = () => {
		localHero = null;
	};

	// Registro del script
	RegisterScript(AutoSaverWindrunner);

`);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/AutoSaverWindrunner.ts"]();
/******/ 	
/******/ })()
;
