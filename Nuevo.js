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

	KeyBindOrderAgresive.SetImage('panorama\images\spellicons\storm_spirit_ball_lightning_orchid_png.vtex_c');
	KeyBindOrderUltiTP.SetImage('panorama\images\spellicons\storm_spirit\ti8_retro_immortal\storm_spirit_ball_lightning_orchid_retro_png.vtex_c');

	function findSafePosition(hero, enemies) {
		let safePosition = null;
		let maxDistance = 0;
		let heroPosition = hero.GetPosition();

		// Itera sobre todas las posiciones posibles en el radio
		for (let angle = 0; angle < 360; angle += 1) {
			for (let radius = 0; radius <= 5000; radius += 100) {
				let position = {
					x: heroPosition.x + radius * Math.cos(angle * Math.PI / 180),
					y: heroPosition.y + radius * Math.sin(angle * Math.PI / 180)
				};

				// Calcula la distancia mínima a todos los enemigos
				let minDistance = Math.min(...enemies.map(enemy => distance(position, enemy.GetPosition())));

				// Si esta posición es más segura que la posición segura actual, actualízala
				if (minDistance > maxDistance) {
					maxDistance = minDistance;
					safePosition = position;
				}
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
			
			let Ultimate = localHero.GetAbilityByIndex(3);
			let safePosition = localHero.GetPosition();
			let enemyHeroes = EntitySystem.GetEnemyHeroes();
			let FuntainSafePos = HeroFuntainSafePos(myPlayer);

			// Encuentra la posición más segura
			if (enemyHeroes) {
				safePosition = findSafePosition(localHero, enemyHeroes);
			} else {
				safePosition = FuntainSafePos;
			}
			
			myPlayer.PrepareUnitOrders(Enum.UnitOrder.DOTA_UNIT_ORDER_CAST_NO_TARGET,null,safePosition,Ultimate,Enum.PlayerOrderIssuer.DOTA_ORDER_ISSUER_CURRENT_UNIT_ONLY, localHero);
			
			let tpitem = localHero.GetItem('item_tpscroll', true);
			if (tpitem && tpitem.CanCast()) {
				myPlayer.PrepareUnitOrders(Enum.UnitOrder.DOTA_UNIT_ORDER_CAST_NO_TARGET,null,FuntainSafePos,tpitem,Enum.PlayerOrderIssuer.DOTA_ORDER_ISSUER_CURRENT_UNIT_ONLY, localHero);

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
