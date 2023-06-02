/******/ (() => { // webpackBootstrap 
/******/ 	var __webpack_modules__ = ({

/***/ "./src/LegionAbuse.ts":
/*!**********************************!*\
  !*** ./src/LegionAbuse.ts ***!
  \**********************************/
/***/ (() => {


eval(`
	const LegionAbuse = {};
	let localHero;
	let myPlayer;

	// options
	const path_ = ['Heroes', 'Strength', 'Legion Commander'];

	let OverwhelmingToggle = Menu.AddToggle(path_, 'Spell in Ulti', true);
	MissileToggle.SetImage('panorama/images/spellicons/legion_commander/immortal/legion_commander_overwhelming_odds_png.vtex_c');
		


	//=============================================================
	// Funcion Principal para Iniciar el CODIGO
	//=============================================================
	LegionAbuse.OnUpdate = () => {
		
		if (localHero && OverwhelmingToggle.GetValue()) {
			if (localHero.GetUnitName() !== "legion_commander") {
				return;
			}
			
			const OverwhelmingSpell = localHero.GetAbilityByIndex(0);
			const modifiers = localHero.GetModifiers();
			const UltimateInCast = modifiers.some(modifier => modifier.GetName() === 'modifier_legion_commander_duel');

			if(UltimateInCast){
				if(OverwhelmingSpell && OverwhelmingSpell.CanCast()){
					myPlayer.PrepareUnitOrders(Enum.UnitOrder.DOTA_UNIT_ORDER_CAST_NO_TARGET,null,null,OverwhelmingSpell,Enum.PlayerOrderIssuer.DOTA_ORDER_ISSUER_CURRENT_UNIT_ONLY, localHero);

				}		
			}
			
			
			
		}	
	};


	LegionAbuse.OnScriptLoad = LegionAbuse.OnGameStart = () => {
		localHero = EntitySystem.GetLocalHero();
		myPlayer = EntitySystem.GetLocalPlayer();
		
	};

	LegionAbuse.OnGameEnd = () => {
		localHero = null;
		myPlayer = null;


	};


	RegisterScript(LegionAbuse);

`);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/LegionAbuse.ts"]();
/******/ 	
/******/ })()
;
