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
				const currentTime = GameRules.GetGameTime();
				const lastBlinkTime = localHero.GetLastAbilityCastTime(blinkDagger);

				// Check if less than 1 second has passed since Blink Dagger was used
				if (currentTime - lastBlinkTime <= 1) {
					// Find visible enemy heroes within 2000 radius
					const enemies = EntitySystem.GetHeroesList().filter(hero => {
						return hero.IsAlive() && hero.IsVisible() && hero.IsEnemy(localHero) && hero.GetRangeTo(localHero) <= 2000;
					});

					if (enemies.length > 0) {
						// Cast Tinker's second ability on the first enemy hero found
						const missileAbility = localHero.GetAbilityByName("tinker_heat_seeking_missile");
						if (missileAbility && missileAbility.IsCooldownReady()) {
							const target = enemies[0];
							localHero.CastAbilityNoTarget(missileAbility);
						}
					}
				}
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
