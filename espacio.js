/******/ (() => { // webpackBootstrap 
/******/ 	var __webpack_modules__ = ({

/***/ "./src/FurionTrendAbuse.ts":
/*!**********************************!*\
  !*** ./src/FurionTrendAbuse.ts ***!
  \**********************************/
/***/ (() => {

eval(`

	const FurionTrendAbuse = {};

	let localHero;
	let myPlayer;
	let Particle_ID = null;
	let createDrawRadius = 0;

	const path_ = ["Heroes", "Intelligence", "Nature's Prophet","Unit Attack Block"];

	// Creación del toggle isUiEnabled
	let isUiEnabled = Menu.AddToggle(path_, 'Enable', true);
	
	let KeyBindOrder = Menu.AddKeyBind(path_, 'Key of Combo', Enum.ButtonCode.KEY_NONE);
	
	Menu.GetFolder(["Heroes", "Intelligence", "Nature's Prophet","Unit Attack Block"]).SetImage('panorama/images/spellicons/furion_force_of_nature_png.vtex_c');

	const MIN_DISTANCE_TO_BLOCK = 100; // Distancia mínima para bloquear al enemigo

	FurionTrendAbuse.OnUpdate = () => {
		if (!localHero || !isUiEnabled.GetValue()) {
			return;
		}

		if (KeyBindOrder.IsKeyDown()) {

			const furionUnits = EntitySystem.GetEntitiesList().filter((entity) => {
				return entity.GetUnitName().includes("npc_dota_furion_treant") &&
					entity.GetPlayerOwnerID() === myPlayer.GetPlayerID();
			});


			furionUnits.forEach((unit) => {
				const targetPos = target.GetAbsOrigin();
				const unitPos = unit.GetAbsOrigin();
				const distanceToTarget = unitPos.Distance(targetPos);

				if (distanceToTarget < MIN_DISTANCE_TO_BLOCK) {
					const angle = unitPos.AngleBetween(targetPos);
					const blockingPos = targetPos.Extend(unitPos, MIN_DISTANCE_TO_BLOCK);
					unit.MoveTo(blockingPos);
				} else {
					unit.Attack(target, false);
				}
			});
		
		}
		
		
		
	};



	FurionTrendAbuse.OnScriptLoad = FurionTrendAbuse.OnGameStart = () => {
	    localHero = EntitySystem.GetLocalHero();
	    myPlayer = EntitySystem.GetLocalPlayer();
	};

	FurionTrendAbuse.OnGameEnd = () => {
	    localHero = null;
	    myPlayer = null;
	};

	RegisterScript(FurionTrendAbuse);



`);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/FurionTrendAbuse.ts"]();
/******/ 	
/******/ })()
;
