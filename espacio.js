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

	const MIN_DISTANCE_TO_BLOCK = 150; // Distancia mínima para bloquear al enemigo
	
	
	function getClosestEnemyHero(radius) {
	    const enemyHeroes = EntitySystem.GetHeroesList().filter(
		(hero) => !hero.IsIllusion() && !hero.IsMeepoClone() && !hero.IsSameTeam(localHero) && hero.IsAlive() && !hero.IsIllusion()
	    );
	    
	    if (!enemyHeroes || enemyHeroes.length <= 0) {
		return;
	    }

	    let closestHero = null;
	    let closestDistance = Number.MAX_VALUE;

	    for (const hero of enemyHeroes) {
		const distance = localHero.GetAbsOrigin().sub(hero.GetAbsOrigin()).Length2D();
		if (distance < radius && distance < closestDistance) {
		    closestHero = hero;
		    closestDistance = distance;
		}
	    }

	    return closestHero;
	}
	

	FurionTrendAbuse.OnUpdate = () => {
		if (localHero && isUiEnabled.GetValue()) {

			if (localHero.GetUnitName() !== "npc_dota_hero_furion") {
				return;
			}

			if (KeyBindOrder.IsKeyDown()) {

				const furionUnits = localHero.GetUnitsInRadius(500, Enum.TeamType.TEAM_FRIEND);
				

				if(furionUnits){

					furionUnits.forEach((unit) => {
						console.log("Unidad",unit);
						if(unit && unit.IsAlive() && !unit.IsDormant() && localHero.GetOwner(unit)){
							const target = getClosestEnemyHero(1000);
							const targetPos = target.GetAbsOrigin();
							const unitPos = unit.GetAbsOrigin();
							const distanceToTarget = unitPos.Distance(targetPos);

							//if (distanceToTarget < MIN_DISTANCE_TO_BLOCK) {
								const dir = target.GetRotation().GetForward().Normalized();
								const blockingPos = targetPos.add(dir.mul(new Vector(150, 150, 0)));
								
								if (Engine.OnceAt(0.2)) {
									myPlayer.PrepareUnitOrders(Enum.UnitOrder.DOTA_UNIT_ORDER_MOVE_TO_POSITION,null,blockingPos,null,Enum.PlayerOrderIssuer.DOTA_ORDER_ISSUER_PASSED_UNIT_ONLY, unit, false, true);
								}
								
							// else {
								//unit.Attack(target, false);
							//}
						}
					});
					
				}
			
			}
		
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
