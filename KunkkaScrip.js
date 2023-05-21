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

eval(`
  const AutoStealBara = {};
  let local;
  let localPlayer;
  let chargedStrike;
  let enemyHeroes;
  let phylacteryItem;
  let damageFromPhylactery = 1000;
  const path_ = ['Heroes', 'Strength', 'Kunkka'];
  let isUiEnabled = Menu.AddToggle(path_, 'Torrent Storm Use', true);
  isUiEnabled.SetImage('panorama/images/spellicons/kunkka_torrent_storm_png.vtex_c');

  function stop() {
      localPlayer.PrepareUnitOrders(Enum.UnitOrder.DOTA_UNIT_ORDER_STOP, null, null, null, Enum.PlayerOrderIssuer.DOTA_ORDER_ISSUER_HERO_ONLY, localHero, false, true);
  }

  AutoStealBara.OnUpdate = () => {
      if (localHero && isUiEnabled) {
          if (localHero.GetUnitName() !== "npc_dota_hero_kunkka")
              return;
          if (!chargedStrike) {
              chargedStrike = localHero.GetAbilityByIndex(3);
          }
          phylacteryItem = localHero.GetItem("item_phylactery", true);
          if (phylacteryItem) {
              if (Engine.OnceAt(2)) {
                  enemyHeroes = EntitySystem.GetHeroesList();
              }
              for (let i = 0; i < enemyHeroes.length; i++) {
                  let hero = enemyHeroes[i];
                  if (hero) {
                      if (hero.GetTeamNum() !== localHero.GetTeamNum() && hero.GetHealth() <= damageFromPhylactery && chargedStrike.CanCast() && phylacteryItem.CanCast() && hero.IsAlive()) {
                          //chargedStrike.CastTarget(hero); // Si es targeteable un hero objetivo
                          chargedStrike.CastPosition(localHero.GetAbsOrigin());
                          
                          if (Engine.OnceAt(0.6)) {
                              stop();
                          }
                      }
                  }
              }
          }
      }
  };

  AutoStealBara.OnScriptLoad = AutoStealBara.OnGameStart = () => {
      localPlayer = EntitySystem.GetLocalPlayer();
      localHero = EntitySystem.GetLocalHero();
  };

  AutoStealBara.OnGameEnd = () => {
      localPlayer = null;
      localHero = null;
      chargedStrike = null;
      phylacteryItem = null;
  };

  RegisterScript(AutoStealBara);
`);
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
