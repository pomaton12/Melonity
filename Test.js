/******/ (() => { // webpackBootstrap 
/******/ 	var __webpack_modules__ = ({

/***/ "./src/BestAutoLastHits.ts":
/*!**********************************!*\
  !*** ./src/BestAutoLastHits.ts ***!
  \**********************************/
/***/ (() => {

eval(`

	const BestAutoLastHits = {};

	let localHero;
	let myPlayer;

	const path_ = ['Creeps', 'Best AutoLastHit'];

	let enableToggle = Menu.AddToggle(path_, 'Enable', true);
	
	let KeyBindLastHit = Menu.AddKeyBind(path_, 'AutoLastHits', Enum.ButtonCode.KEY_NONE);
	
	let DisplayModeMove = Menu.AddComboBox(path_, 'Move', ['Holt key', 'One Key'],0)
		.OnChange(state =>{   	
		DisplayModeMove = state.newValue;
		})
		.GetValue();
	
	let DisplayModeHitCreep = Menu.AddComboBox(path_, 'Hit Creeps', ['Enemy creeps', 'Ally creeps', 'Both'],0)
		.OnChange(state =>{   	
		DisplayModeHitCreep = state.newValue;
		})
		.GetValue();
	
	let DisplayModeHitEnemy = Menu.AddComboBox(path_, 'Hit Enemies', ['No hit', 'without creep aggro', 'Aggression mode'],0)
		.OnChange(state =>{   	
		DisplayModeHitEnemy = state.newValue;
		})
		.GetValue();


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

	function SendOrderMovePos(vector) {
	    myPlayer.PrepareUnitOrders(Enum.UnitOrder.DOTA_UNIT_ORDER_MOVE_TO_POSITION, null, vector, null, Enum.PlayerOrderIssuer.DOTA_ORDER_ISSUER_CURRENT_UNIT_ONLY, localHero, false, true);
	}

	function getClosestCreep(creeps, target) {
	    let closestCreep = null;
	    for (const creep of creeps) {
		if (creep.IsCreep() && !creep.IsDormant() && creep.IsAlive()) {
		    closestCreep = creep;
		}
	    }
	    return closestCreep;
	}

	BestAutoLastHits.OnUpdate = () => {
		if (!localHero || !enableToggle.GetValue()) {
			return;
		}
		
		if (Input.IsKeyDown(KeyBindLastHit.GetValue())) {
			const attackRadius = 500;

			if (DisplayModeHitEnemy === 0) {
				const closestEnemyHero = getClosestEnemyHero(attackRadius);

				if (closestEnemyHero) {
					if (Engine.OnceAt(0.2)) {
						myPlayer.PrepareUnitOrders(Enum.UnitOrder.DOTA_UNIT_ORDER_ATTACK_TARGET, closestEnemyHero, null, null, Enum.PlayerOrderIssuer.DOTA_ORDER_ISSUER_PASSED_UNIT_ONLY, localHero, false, true);
					}
				}
			}

			if (DisplayModeHitCreep === 0) {
				const laneCreeps = localHero.GetUnitsInRadius(attackRadius, Enum.TeamType.TEAM_ENEMY);

				if (laneCreeps && laneCreeps.length > 0) {
					const closestCreep = getClosestCreep(laneCreeps, localHero.GetAbsOrigin());

					if (closestCreep && closestCreep.GetHealth() <= localHero.GetAttackDamage()) {
						if (Engine.OnceAt(0.2)) {
							myPlayer.PrepareUnitOrders(Enum.UnitOrder.DOTA_UNIT_ORDER_ATTACK_TARGET, closestCreep, null, null, Enum.PlayerOrderIssuer.DOTA_ORDER_ISSUER_PASSED_UNIT_ONLY, localHero, false, true);
						}
					}
				}
			}
		}
	};


	BestAutoLastHits.OnScriptLoad = BestAutoLastHits.OnGameStart = () => {
	    localHero = EntitySystem.GetLocalHero();
	    myPlayer = EntitySystem.GetLocalPlayer();
	};

	BestAutoLastHits.OnGameEnd = () => {
	    localHero = null;
	    myPlayer = null;
	};

	RegisterScript(BestAutoLastHits);



`);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/BestAutoLastHits.ts"]();
/******/ 	
/******/ })()
;
