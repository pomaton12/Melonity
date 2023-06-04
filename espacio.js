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

	const path_ = ['Heroes', 'Intelligence', 'Nature´s Prophet'];

	// Creación del toggle isUiEnabled
	let isUiEnabled = Menu.AddToggle(path_, 'Unit Attack Block', true);
	isUiEnabled.SetImage('panorama/images/spellicons/furion_force_of_nature_png.vtex_c');
	

	const MIN_DISTANCE_TO_BLOCK = 100; // Distancia mínima para bloquear al enemigo

	FurionTrendAbuse.OnUpdate = () => {
		if (!localHero || !isUiEnabled.GetValue()) {
			return;
		}

		const target = myPlayer.GetAttackTarget();
		if (!target) {
			return;
		}

		const furionUnits = EntitySystem.GetEntitiesList().filter((entity) => {
			return entity.IsControllableByPlayer(myPlayer.GetPlayerID()) &&
				entity.GetUnitName().includes("npc_dota_furion_treant");
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
