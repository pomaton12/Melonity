/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/AutoSaveMonkeyKing.ts":
/*!**********************************!*\
  !*** ./src/AutoSaveMonkeyKing.ts ***!
  \**********************************/
/***/ (() => {

eval(`
  // Definición del objeto AutoSaveMonkeyKing
  const AutoSaveMonkeyKing = {};

  // Declaración de la variable localHero
  let localHero;


  // Definición del array path_
  const path_ = ['Heroes', 'Agility', 'Monkey King', 'Use Best Abuse'];
 
  // Creación del toggle isUiEnabled
  let isUiEnabled = Menu.AddToggle(path_, 'Enable Script', true);
  
  let KeyBindUseTree = Menu.AddKeyBind(path_, 'Key in Combo', Enum.ButtonCode.KEY_NONE);
  
  

	// Definición de la función OnUpdate
	AutoSaveMonkeyKing.OnUpdate = () => {
        if (localHero && isUiEnabled) {
            if (localHero.GetUnitName() !== "npc_dota_hero_monkey_king"){
                return;
			}
			
			if (KeyBindUseTree.IsKeyDown()) {
				let abilityTD = localHero.GetAbilityByIndex(1); //monkey_king_tree_dance
				let abilityPS = localHero.GetAbilityByIndex(2); //monkey_king_primal_spring
				let nCastRange = abilityTD.GetCastRange();
				
				let tableNearbyTrees = Trees.InRadius(localHero.GetAbsOrigin(), nCastRange, true);
								
				console.log("Arbol = ",tableNearbyTrees);
			}

        }
    };


  // Definición de la función OnScriptLoad
  AutoSaveMonkeyKing.OnScriptLoad = AutoSaveMonkeyKing.OnGameStart = () => {
      localHero = EntitySystem.GetLocalHero();
  };

  // Definición de la función OnGameEnd
  AutoSaveMonkeyKing.OnGameEnd = () => {
      localHero = null;
  };

  // Registro del script
  RegisterScript(AutoSaveMonkeyKing);
`);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/AutoSaveMonkeyKing.ts"]();
/******/ 	
/******/ })()
;
