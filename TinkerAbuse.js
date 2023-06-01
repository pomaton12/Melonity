/******/ (() => { // webpackBootstrap 
/******/ 	var __webpack_modules__ = ({

/***/ "./src/TinkerLastHit.ts":
/*!**********************************!*\
  !*** ./src/TinkerLastHit.ts ***!
  \**********************************/
/***/ (() => {


eval(`
	const TinkerLastHit = {};
	let localHero;
	let myPlayer;

	// options
	const path_ = ['Heroes', 'Strength', 'Tinker'];

	let MissileToggle = Menu.AddToggle(path_, 'Use missile in Range', true);
	MissileToggle.SetImage('panorama/images/spellicons/tinker_heat_seeking_missile_png.vtex_c');
	
	let DogdeMatrixToggle = Menu.AddToggle(path_, 'Dogde Defense Matrix', true);
	DogdeMatrixToggle.SetImage('panorama/images/spellicons/tinker_defense_matrix_png.vtex_c');
	
	let EulSafePosToggle = Menu.AddToggle(path_, 'Eul Safe Pos', true);
	MissileToggle.SetImage('panorama/images/econ/items/crystal_maiden/euls_scepterdivinity_png.vtex_c');


	//=============================================================
	// Funcion Principal para Iniciar el CODIGO
	//=============================================================
	TinkerLastHit.OnUpdate = () => {
		
		if (localHero && MissileToggle.GetValue()) {
			if (localHero.GetUnitName() !== "npc_dota_hero_windrunner") {
				return;
			}
			
			
			
			
		}

	};


	TinkerLastHit.OnScriptLoad = TinkerLastHit.OnGameStart = () => {
		localHero = EntitySystem.GetLocalHero();
		myPlayer = EntitySystem.GetLocalPlayer();
		
	};

	TinkerLastHit.OnGameEnd = () => {
		localHero = null;
		myPlayer = null;


	};


	RegisterScript(TinkerLastHit);

`);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/TinkerLastHit.ts"]();
/******/ 	
/******/ })()
;
