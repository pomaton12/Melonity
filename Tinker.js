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
	let localHero;

	const path_ = ['Heroes', 'Intelligence', 'Windranger'];
	let isUiEnabled = Menu.AddToggle(path_, 'Gale Force Use', true);
	isUiEnabled.SetImage('panorama/images/spellicons/windrunner_gale_force_png.vtex_c');

	let previousEnemyPositions = {};

	AutoSaverWindrunner.OnUpdate = () => {
	  if (!localHero || !isUiEnabled.GetValue()) return;

	  if (localHero.GetUnitName() !== "npc_dota_hero_windrunner") return;

	  const modifiers = localHero.GetModifiers();
	  for (let modifier of modifiers) {
	    if (modifier.GetName() === 'modifier_windrunner_focusfire') {
	      const remainingTime = modifier.GetRemainingTime();
	      if (remainingTime <= 20) {
		let gale_force = localHero.GetAbilityByIndex(3);
		if (gale_force && gale_force.IsExist() && gale_force.CanCast()) {
		  let enemies = localHero.GetHeroesInRadius(1000, Enum.TeamType.TEAM_ENEMY);
		  for (let enemy of enemies) {
		    let enemyId = enemy.GetPlayerID();
		    let isAttacking = enemy.IsAttacking() === CBaseAnimating.AttackState.ABILITY && enemy.GetAttackTarget() === localHero;
		    let currentPosition = enemy.GetAbsOrigin();
		    let isEscaping = false;

		    if (previousEnemyPositions[enemyId]) {
		      let previousPosition = previousEnemyPositions[enemyId];
		      let distanceMoved = currentPosition.sub(previousPosition).Length2D();
		      isEscaping = distanceMoved > 0 && !isAttacking;
		    }

		    previousEnemyPositions[enemyId] = currentPosition;

		    let vec1 = localHero.GetAbsOrigin();
		    let vec2 = enemy.GetAbsOrigin();
		    let distance = vec1.sub(vec2).Length2D();

		    if (distance <= 1000) {
		      if (enemy.HasModifier('modifier_windrunner_shackleshot') || enemy.HasModifier('modifier_sheepstick_debuff') || enemy.HasModifier('modifier_black_king_bar_immune')) {
			continue;
		      }

		      let pushDirection;
		      if (isAttacking) {
			pushDirection = vec2.sub(vec1).Normalized();
		      } else if (isEscaping) {
			pushDirection = vec1.sub(vec2).Normalized();
		      } else {
			continue;
		      }
		      gale_force.CastPosition(localHero.GetAbsOrigin().add(pushDirection.mul(300)));
		    }
		  }
		}
	      }
	    }
	  }
	};

	AutoSaverWindrunner.OnScriptLoad = AutoSaverWindrunner.OnGameStart = () => {
	  localHero = EntitySystem.GetLocalHero();
	};

	AutoSaverWindrunner.OnGameEnd = () => {
	  localHero = null;
	};

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
