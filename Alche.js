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
  AutoSaverAlchemist.OnUpdate = () => {
        if (localHero && isUiEnabled) {
            if (localHero.GetUnitName() !== "npc_dota_hero_alchemist")
                return;
            const modifiers = localHero.GetModifiers();
            for (let modifier of modifiers) {
                if (modifier.GetName() === 'modifier_alchemist_unstable_concoction') {
                    const remainingTime = modifier.GetRemainingTime();
                    if (remainingTime <= -6.45) {
                        const manta = localHero.GetItem('item_manta', true);
                        const bkb = localHero.GetItem('item_black_king_bar', true);
                        if (itemSelection[1] && manta && manta.GetCooldown() === 0) {
                            manta.CastNoTarget();
                            return;
                        } else if (itemSelection[0] && (!manta || manta.GetCooldown() > 0) && bkb && bkb.GetCooldown() === 0) {
                            bkb.CastNoTarget();
                            return;
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
