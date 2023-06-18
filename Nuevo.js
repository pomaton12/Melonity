/******/ (() => { // webpackBootstrap 
/******/ 	var __webpack_modules__ = ({

/***/ "./src/StornSpiritAbuse.ts":
/*!**********************************!*\
  !*** ./src/StornSpiritAbuse.ts ***!
  \**********************************/
/***/ (() => {

eval(`
	const StornSpiritAbuse = {};

	let localHero;
	let myPlayer;


	const path_ = ["Heroes", "Intelligence", "Storm Spirit"];
	
	let KeyBindOrderAgresive = Menu.AddKeyBind(path_, 'Agresive Ulti', Enum.ButtonCode.KEY_NONE);
	let KeyBindOrderUltiTP = Menu.AddKeyBind(path_, 'Save Tp to base', Enum.ButtonCode.KEY_NONE);

	KeyBindOrderAgresive.SetImage('panorama/images/spellicons/storm_spirit_ball_lightning_orchid_png.vtex_c');
	KeyBindOrderUltiTP.SetImage('panorama/images/spellicons/storm_spirit/ti8_retro_immortal/storm_spirit_ball_lightning_orchid_retro_png.vtex_c');

	function findSafePosition(localHero, searchRadius){
		const heroPosition = localHero.GetAbsOrigin();
		const enemyHeroes = localHero.GetHeroesInRadius(searchRadius, Enum.TeamType.TEAM_ENEMY);
		let maxDistance = 0;
		let safePosition = heroPosition;

		for (let angle = 0; angle < 360; angle += 10) {
			const dx = Math.cos(angle * (Math.PI / 180)) * searchRadius;
			const dy = Math.sin(angle * (Math.PI / 180)) * searchRadius;
			const candidatePosition = heroPosition.add(new Vector(dx, dy, 0));

			const distanceToClosestEnemy = enemyHeroes.reduce((minDistance, enemy) => {
				const distance = candidatePosition.Distance(enemy.GetAbsOrigin());
				return Math.min(minDistance, distance);
			}, Infinity);

	
			if (distanceToClosestEnemy > maxDistance) {
				maxDistance = distanceToClosestEnemy;
				safePosition = candidatePosition;
			}
		}

		return safePosition;
	}

	function HeroFuntainSafePos(PlayerhER) {
		let team = PlayerhER.GetTeamNum();
		let safe = null;
		if (team == 2) {
			safe = new Vector(-6746.22, -6212.06, 384);
		}
		else if (team == 3) {
			safe = new Vector(6700.91, 6136.91, 384);
		}
		return safe
	}
	
	StornSpiritAbuse.OnUpdate = () => {

		if (localHero && KeyBindOrderUltiTP.IsKeyDown()) {
			if (localHero.GetUnitName() !== "npc_dota_hero_storm_spirit") {
				return;
			}
			
			let Ultimate = localHero.GetAbilityByIndex(5);
			let safePosition = localHero.GetAbsOrigin();
			let FuntainSafePos = HeroFuntainSafePos(myPlayer);
			
			if (Engine.OnceAt(0.2)) {
				let enemyHeroes = localHero.GetHeroesInRadius(2500, Enum.TeamType.TEAM_ENEMY);				
				// Encuentra la posición más segura
				console.log(enemyHeroes);
				if (enemyHeroes) {
					safePosition = findSafePosition(localHero, 2500);
				} else {
					safePosition = FuntainSafePos;
					//safePosition = Input.GetWorldCursorPos();
				}
				
				//myPlayer.PrepareUnitOrders( Enum.UnitOrder.DOTA_UNIT_ORDER_CAST_POSITION,null,safePosition,Ultimate, Enum.PlayerOrderIssuer.DOTA_ORDER_ISSUER_CURRENT_UNIT_ONLY, localHero);
				//setTimeout(function() {}, 300);			
				Ultimate.CastPosition(safePosition);
				
				let tpitem = localHero.GetItem('item_tpscroll', true);
				if (tpitem && tpitem.CanCast()) {
					//myPlayer.PrepareUnitOrders(Enum.UnitOrder.DOTA_UNIT_ORDER_CAST_NO_TARGET,null,FuntainSafePos,tpitem,Enum.PlayerOrderIssuer.DOTA_ORDER_ISSUER_CURRENT_UNIT_ONLY, localHero);
					tpitem.CastPosition(FuntainSafePos);
				}
			}
	    }
	};

	StornSpiritAbuse.OnScriptLoad = StornSpiritAbuse.OnGameStart = () => {
	    localHero = EntitySystem.GetLocalHero();
	    myPlayer = EntitySystem.GetLocalPlayer();
	};

	StornSpiritAbuse.OnGameEnd = () => {
	    localHero = null;
	    myPlayer = null;
	};

	RegisterScript(StornSpiritAbuse);




`);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/StornSpiritAbuse.ts"]();
/******/ 	
/******/ })()
;
