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
  let Ancient = Game.GetGameEntityByIndex(0);

  // Definición del array path_
  const path_ = ['Heroes', 'Agility', 'Monkey King', 'Use Best Abuse'];
 
  // Creación del toggle isUiEnabled
  let isUiEnabled = Menu.AddToggle(path_, 'Enable Script', true);
  
  let KeyBindUseTree = Menu.AddKeyBind(path_, 'Key in Combo', Enum.ButtonCode.KEY_NONE);
  
  
	function GetFurthestTree(trees) {
		if (Ancient === null) {
			return null;
		}

		let furthest = null;
		let fDist = 10000;

		for (const tree of trees) {
			const dist = Ancient.GetAbsOrigin().Distance(tree.GetAbsOrigin());

			if (dist < fDist) {
				furthest = tree;
				fDist = dist;
			}
		}

		return furthest;
	}  


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
				
				let tableNearbyTrees = localHero.GetNearbyTrees( nCastRange );
				
				let treeOK = GetFurthestTree(trees);
				
				console.log("Arbol = ",treeOK);
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
