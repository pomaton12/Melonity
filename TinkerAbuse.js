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
	const silences = [
		'modifier_orchid_malevolence',
		'modifier_bloodthorn',
		'modifier_skywrath_mage_ancient_seal',
		'modifier_drow_ranger_silence', // Agrega el modificador de silencio de Gust de Drow Ranger aquí
		'modifier_death_prophet_silence',
		'modifier_night_stalker_crippling_fear',
		'modifier_silencer_global_silence',
		'modifier_grimstroke_ink_swell_debuff',
		'modifier_silencer_word',
		'modifier_riki_smoke_screen',
		'modifier_disruptor_static_storm',
		'modifier_techies_blast_off',
		'modifier_enigma_malefice',
		'modifier_bloodseeker_blood_bath_silence', // Agrega el modificador de silencio de Blood Rite de Bloodseeker aquí
		'modifier_dark_willow_bramble_maze_thinker',
		'modifier_dark_willow_cursed_crown',
		'modifier_puck_silence',
		'modifier_faceless_void_time_dilation_slow',
		'modifier_invoker_cold_snap',
		'modifier_templar_assassin_trap_meld',
		'modifier_furion_wrath_of_nature_silence',
		'modifier_crystal_maiden_frostbite'
	];



	// options
	const path_ = ['Heroes', 'Intelligence', 'Tinker', 'Combo'];

	let MissileToggle = Menu.AddToggle(path_, 'Use missile in Range', true);
	MissileToggle.SetImage('panorama/images/spellicons/tinker_heat_seeking_missile_png.vtex_c');
		
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

	function isHeroSilenced(hero) {
	  for (let i = 0; i < silences.length; i++) {
		if (hero.HasModifier(silences[i])) {
		  return true;
		}
	  }

	  return false;
	}

	function findSafePosition(localHero, searchRadius) {
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





	function useEulAndBlinkToSafePosition() {
		const eul = GetCyclone();
		const blink = GetBlink();
		const rearm = localHero.GetAbilityByIndex(5);
		const nearbyEnemies = localHero.GetHeroesInRadius(1000, Enum.TeamType.TEAM_ENEMY).length;
		const isLowHealth = ((localHero.GetHealth() / localHero.GetMaxHealth()) * 100) < 25;
		
		if (!eul || !blink || !rearm ) {
			return;
		}
		
		const modifiers = localHero.GetModifiers();
		const isSilenced = modifiers.some(modifier => silences.includes(modifier.GetName()));
		//const isEstados = localHero.HasState(Enum.ModifierState.MODIFIER_STATE_SILENCED);
		
		if ((isSilenced  || isLowHealth ) && eul.CanCast()) {
			const searchRadius = 2000; // Radio de búsqueda alrededor del héroe
			const safePosition = findSafePosition(localHero, searchRadius);

			// Lanza Eul's Scepter en el héroe local utilizando Player.PrepareUnitOrders()
			myPlayer.PrepareUnitOrders(Enum.UnitOrder.DOTA_UNIT_ORDER_CAST_TARGET,localHero,null,eul,Enum.PlayerOrderIssuer.DOTA_ORDER_ISSUER_CURRENT_UNIT_ONLY, localHero);
			
			if(isLowHealth || nearbyEnemies > 2){
				// Espera a que Eul's Scepter termine
				setTimeout(() => {
					if (blink.CanCast()) {
						blink.CastPosition(safePosition);
						
						// Espera a que Blink Dagger termine
						setTimeout(() => {
							if (rearm.CanCast()) {
								rearm.CastNoTarget();
							}
						}, 1000);
					}
				}, 2.6 * 1000); // Espera 2.5 segundos para que el héroe esté en el aire antes de parpadear
			}
		}
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
