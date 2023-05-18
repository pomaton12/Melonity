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

/***/ "./src/AutoSaveAlchemist.ts":
/*!**********************************!*\
  !*** ./src/AutoSaveAlchemist.ts ***!
  \**********************************/
/***/ (() => {

eval("const AutoSaverAlchemist = {};\r\nlet localHero;\r\nconst path_ = ['Heroes', 'Strength', 'Alchemist', 'Evader'];\r\nlet isUiEnabled = Menu.AddToggle(path_, 'Evader conconcoction', true)\r\n    .OnChange(state => {\r\n    isUiEnabled = state.newValue;\r\n})\r\n    .SetNameLocale('ru', 'Автододж бутылки')\r\n    .GetValue();\r\nlet itemSelection = Menu.AddMultiSelect(path_, 'Item selection', ['panorama/images/items/black_king_bar_png.vtex_c', 'panorama/images/items/manta_png.vtex_c'], [true, true])\r\n    .OnChange((state) => { itemSelection = state.newValue; })\r\n    .SetNameLocale('ru', 'Выбор предмета')\r\n    .GetValue();\r\nAutoSaverAlchemist.OnUpdate = () => {\r\n    if (localHero && isUiEnabled) {\r\n        if (localHero.GetUnitName() !== \"npc_dota_hero_alchemist\")\r\n            return;\r\n        const modifiers = localHero.GetModifiers();\r\n        for (let modifier of modifiers) {\r\n            if (modifier.GetName() === 'modifier_alchemist_unstable_concoction') {\r\n                const remainingTime = modifier.GetRemainingTime();\r\n                if (remainingTime <= -6.45) {\r\n                    const manta = localHero.GetItem('item_manta', true);\r\n                    const bkb = localHero.GetItem('item_black_king_bar', true);\r\n                    if (itemSelection[1] && manta && manta.GetCooldown() === 0) {\r\n                        manta.CastNoTarget();\r\n                    }\r\n                    if (itemSelection[0] && bkb && bkb.GetCooldown() === 0) {\r\n                        bkb.CastNoTarget();\r\n                    }\r\n                }\r\n            }\r\n        }\r\n    }\r\n};\r\nAutoSaverAlchemist.OnScriptLoad = AutoSaverAlchemist.OnGameStart = () => {\r\n    localHero = EntitySystem.GetLocalHero();\r\n};\r\nAutoSaverAlchemist.OnGameEnd = () => {\r\n    localHero = null;\r\n};\r\nRegisterScript(AutoSaverAlchemist);\r\n\n\n//# sourceURL=webpack:///./src/AutoSaveAlchemist.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/AutoSaveAlchemist.ts"]();
/******/ 	
/******/ })()
;
