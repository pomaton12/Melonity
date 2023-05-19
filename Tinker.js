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
	const path_ = ['Heroes', 'Intelligence', 'Windranger', 'Gale Force'];

	// Creación del toggle isUiEnabled
	let isUiEnabled = Menu.AddToggle(path_, 'Gale Force Use', true)
		.OnChange(state => {
			isUiEnabled = state.newValue;
		})
		.SetNameLocale('ru', 'штормовая сила')
		.GetValue();


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
							let nearestEnemy = Game.FindNearestUnit("enemy", localHero.GetAbsOrigin(), false);
							if (nearestEnemy) {
								let targetPos = nearestEnemy.GetAbsOrigin();
								let myPos = localHero.GetAbsOrigin();
								let direction = (myPos - targetPos).Normalized();
								let distance = (myPos - targetPos).Length2D();
								if (distance <= 1000) {
									gale_force.CastPosition(targetPos);
								} else {
									var angle = Math.acos(direction.Dot(localHero.GetForwardVector())) * 180 / Math.PI;
									if (angle <= 90) {
										gale_force.CastPosition(myPos + direction * 1000);
									} else {
										gale_force.CastPosition(myPos - direction * 1000);
									}
								}
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
