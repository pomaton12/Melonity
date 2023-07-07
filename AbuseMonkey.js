/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/AutoSaveMonkeyKing.ts":
/*!**********************************!*\
  !*** ./src/AutoSaveMonkeyKing.ts ***!
  \**********************************/
/***/ (() => {


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
				
				let tableNearbyTrees = localHero.GetTreesInRadius(nCastRange);
											
				let nearestTree = null;
				let nearestTreeDistance = Infinity;
				for (const tree of tableNearbyTrees) {
					const distance = hero.GetAbsOrigin().Distance(tree.GetAbsOrigin());
					if (distance < nearestTreeDistance) {
						nearestTree = tree;
						nearestTreeDistance = distance;
					}
				}
				if (nearestTree) {
					// hacer algo con el árbol más cercano, como destruirlo
					console.log("El árbol más cercano está a una distancia de " + nearestTreeDistance + " unidades.");
				} else {
					console.log("No hay árboles cercanos.");
				}
				
				
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
