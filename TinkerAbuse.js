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
	let lastBlinkTime = 0;

	// options
	const path_ = ['Heroes', 'Intelligence', 'Tinker', 'Combo'];

	let MissileToggle = Menu.AddToggle(path_, 'Use missile in Range', true);
	MissileToggle.SetImage('panorama/images/spellicons/tinker_heat_seeking_missile_png.vtex_c');
	
	let DogdeMatrixToggle = Menu.AddToggle(path_, 'Dogde Defense Matrix', true);
	DogdeMatrixToggle.SetImage('panorama/images/spellicons/tinker_defense_matrix_png.vtex_c');
	
	let EulSafePosToggle = Menu.AddToggle(path_, 'Eul Safe Pos', true);
	EulSafePosToggle.SetImage('panorama/images/items/cyclone_razor_arcana_alt1_png.vtex_c');

	// Funcion Blink
	function GetBlink() {
        return localHero.GetItem('item_blink', true) ||
            localHero.GetItem('item_overwhelming_blink', true) ||
            localHero.GetItem('item_arcane_blink', true) ||
            localHero.GetItem('item_swift_blink', true);
    }

	// Funcion Blink
	function GetCyclone() {
        return localHero.GetItem('item_cyclone', true) ||
		localHero.GetItem('item_wind_waker', true);
    }

	function useEulAndBlinkToSafePosition() {
		const eul = GetCyclone();
		const blink = GetBlink();
		const rearm = localHero.GetAbilityByIndex(5);

		if (!eul || !blink || !rearm) {
			return;
		}

		const isSilenced = localHero.IsSilenced();
		const isRearmOnCooldown = rearm.GetCooldown() > 0;
		const isLowHealth = ((localHero.GetHealth() / localHero.GetMaxHealth()) * 100) < 30;

		if ((isSilenced || isRearmOnCooldown || isLowHealth) && eul.CanCast()) {
			eul.CastTarget(localHero);
			const searchRadius = 1200; // Radio de búsqueda alrededor del héroe
			const treeRadius = 200; // Radio de búsqueda de árboles
			const safePosition = findSafePosition(localHero, searchRadius, treeRadius);
			
			// Espera a que Eul's Scepter termine
			$.Schedule(eul.GetSpecialValueFor('cyclone_duration'), () => {
				if (blink.CanCast()) {
					blink.CastPosition(safePosition);
					// Espera a que Blink Dagger termine
					$.Schedule(blink.GetCastPoint(), () => {
						if (rearm.CanCast()) {
							rearm.CastNoTarget();
						}
					});
				}
			});
		}
	}

	function findSafePosition(localHero, searchRadius, treeRadius){
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

			const isNearTree = GameUI.FindTrees(candidatePosition, treeRadius).length > 0;

			if (distanceToClosestEnemy > maxDistance && isNearTree) {
				maxDistance = distanceToClosestEnemy;
				safePosition = candidatePosition;
			}
		}

		return safePosition;
	}




	//=============================================================
	// Funcion Principal para Iniciar el CODIGO
	//=============================================================
	TinkerLastHit.OnUpdate = () => {
		
		if (localHero && MissileToggle.GetValue()) {
			if (localHero.GetUnitName() !== "npc_dota_hero_tinker") {
				return;
			}

			// Check if Blink Dagger was used
			const blinkDagger = GetBlink();
			if (blinkDagger && blinkDagger.GetCooldown()) {

				// Find visible enemy heroes within 2000 radius
				let enemyInRadius = localHero.GetHeroesInRadius(1999, Enum.TeamType.TEAM_ENEMY).length;
				if (enemyInRadius > 0) {

					// Cast Tinker's second ability on the first enemy hero found
					const missileAbility = localHero.GetAbilityByIndex(1);
					if (missileAbility && missileAbility.IsExist() && missileAbility.CanCast()) {
						missileAbility.CastNoTarget();
					}
				}

			}
		}
		
		
	    if (localHero && EulSafePosToggle.GetValue()) {
			useEulAndBlinkToSafePosition();
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
