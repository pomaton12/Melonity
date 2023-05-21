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

/***/ "./src/AutoStealBara.ts":
/*!******************************!*\
  !*** ./src/AutoStealBara.ts ***!
  \******************************/
/***/ (() => {

eval("const AutoStealBara = {};\r\nlet localHero;\r\nlet localPlayer;\r\nlet chargedStrikeAbility;\r\nlet enemyHeroes;\r\nlet phylacteryItem;\r\nlet damageFromPhylactery = 150;\r\nconst path_ = ['Heroes', 'Strength', 'Spirit Breaker'];\r\nlet isUiEnabled = Menu.AddToggle(path_, 'AutoSteal Phylactery', true)\r\n    .OnChange(state => {\r\n    isUiEnabled = state.newValue;\r\n})\r\n    .SetNameLocale('ru', 'АвтоСтил Phylactery')\r\n    .GetValue();\r\nfunction stop() {\r\n    localPlayer.PrepareUnitOrders(Enum.UnitOrder.DOTA_UNIT_ORDER_STOP, null, null, null, Enum.PlayerOrderIssuer.DOTA_ORDER_ISSUER_HERO_ONLY, localHero, false, true);\r\n}\r\nAutoStealBara.OnUpdate = () => {\r\n    if (localHero && isUiEnabled) {\r\n        if (localHero.GetUnitName() !== \"npc_dota_hero_spirit_breaker\")\r\n            return;\r\n        if (!chargedStrikeAbility) {\r\n            chargedStrikeAbility = localHero.GetAbilityByIndex(0);\r\n        }\r\n        phylacteryItem = localHero.GetItem(\"item_phylactery\", true);\r\n        if (phylacteryItem) {\r\n            if (Engine.OnceAt(2)) {\r\n                enemyHeroes = EntitySystem.GetHeroesList();\r\n            }\r\n            for (let i = 0; i < enemyHeroes.length; i++) {\r\n                let hero = enemyHeroes[i];\r\n                if (hero) {\r\n                    if (hero.GetTeamNum() !== localHero.GetTeamNum() && hero.GetHealth() <= damageFromPhylactery && chargedStrikeAbility.CanCast() && phylacteryItem.CanCast() && hero.IsAlive()) {\r\n                        chargedStrikeAbility.CastTarget(hero);\r\n                        if (Engine.OnceAt(0.6)) {\r\n                            stop();\r\n                        }\r\n                    }\r\n                }\r\n            }\r\n        }\r\n    }\r\n};\r\nAutoStealBara.OnScriptLoad = AutoStealBara.OnGameStart = () => {\r\n    localPlayer = EntitySystem.GetLocalPlayer();\r\n    localHero = EntitySystem.GetLocalHero();\r\n};\r\nAutoStealBara.OnGameEnd = () => {\r\n    localPlayer = null;\r\n    localHero = null;\r\n    chargedStrikeAbility = null;\r\n    phylacteryItem = null;\r\n};\r\nRegisterScript(AutoStealBara);\r\n\n\n//# sourceURL=webpack:///./src/AutoStealBara.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/AutoStealBara.ts"]();
/******/ 	
/******/ })()
;
