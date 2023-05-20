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

eval(`
  // Definición del objeto AutoSaverAlchemist
  const AutoSaverAlchemist = {};

  // Declaración de la variable localHero
  let localHero;

  // Definición del array path_
  const path_ = ['Heroes', 'Strength', 'Alchemist', 'Evader'];

  // Creación del toggle isUiEnabled
  let isUiEnabled = Menu.AddToggle(path_, 'Evader conconcoction', true)
      .OnChange(state => {
          isUiEnabled = state.newValue;
      })
      .SetNameLocale('ru', 'Автододж бутылки')
      .GetValue();

  // Creación del multiselect itemSelection
  let itemSelection = Menu.AddMultiSelect(path_, 'Item selection', ['panorama/images/items/black_king_bar_png.vtex_c', 'panorama/images/items/manta_png.vtex_c'], [true, true])
      .OnChange((state) => {
          itemSelection = state.newValue;
      })
      .SetNameLocale('ru', 'Выбор предмета')
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
            // Nueva condición para activar BKB si el enemigo tiene activado Blade Mail
            let enemies = localHero.GetHeroesInRadius(1000, Enum.TeamType.TEAM_ENEMY);
            for (let enemy of enemies) {
              if (enemy.HasModifier("modifier_item_blade_mail_reflect")) {
                let bkb = localHero.GetItem('item_black_king_bar', true);
                if (bkb && bkb.CanCast()) {
                  bkb.CastNoTarget();
                }
              }
            }

            let gale_force = localHero.GetAbilityByIndex(3);
            if (gale_force && gale_force.IsExist() && gale_force.CanCast()) {
              enemies = localHero.GetHeroesInRadius(1000, Enum.TeamType.TEAM_ENEMY);
              for (let enemy of enemies) {
                let enemyId = enemy.GetPlayerID();
                let isAttacking = enemy.IsAttacking() && enemy.GetAttackTarget() === localHero;
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
                  let pushDirection;
                  if (isAttacking) {
                    pushDirection = vec2.sub(vec1).Normalized();
                  } else if (isEscaping) {
                    pushDirection = vec1.sub(vec2).Normalized();
                  } else {
                    continue;
                  }
                  gale_force.CastPosition(vec1.add(pushDirection));
                }
              }
            }
          }
        }
      }
    }
  };


  // Definición de la función OnScriptLoad
  AutoSaverAlchemist.OnScriptLoad = AutoSaverAlchemist.OnGameStart = () => {
      localHero = EntitySystem.GetLocalHero();
  };

  // Definición de la función OnGameEnd
  AutoSaverAlchemist.OnGameEnd = () => {
      localHero = null;
  };

  // Registro del script
  RegisterScript(AutoSaverAlchemist);
`);

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
