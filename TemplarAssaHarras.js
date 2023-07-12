/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/TemplarHarras.ts":
/*!**********************************!*\
  !*** ./src/TemplarHarras.ts ***!
  \**********************************/
/***/ (() => {

	// Definición del objeto TemplarHarras
	const TemplarHarras = {};

	// Declaración de la variable localHero
	let localHero = null;
    let myPlayer = null;

	// Definición del array path_
	const path = ["Custom Scripts","Heroes","Agility"];
	const path_ = ["Custom Scripts","Heroes","Agility","Templar Assasin"];

	// Creación del toggle isUiEnabled
	let isUiEnabled = Menu.AddToggle(path_, 'Enable', true);
	let KeyBindOrderHarras = Menu.AddKeyBind(path_, 'Key', Enum.ButtonCode.KEY_NONE);

	Menu.SetImage(path_, 'panorama/images/heroes/icons/npc_dota_hero_templar_assassin_png.vtex_c');

	// Definición de la función OnUpdate
	TemplarHarras.OnUpdate = () => {
		if (localHero && isUiEnabled.GetValue()) {
			if (localHero.GetUnitName() !== "npc_dota_hero_templar_assassin") {
				return;
			}
			
			if (KeyBindOrderHarras.IsKeyDown()) {
				let Psi_Blades = localHero.GetAbilityByIndex(2);
				
				if (Psi_Blades != null) {
					let Psi_MaxRange = Psi_Blades.GetLevelSpecialValueFor("attack_spill_range");
					let AttackRangeBasic = localHero.GetAttackRange();
					let AttackRangeBuff = localHero.GetAttackRangeBonus();
					let RangeAttackMax = AttackRangeBasic + AttackRangeBuff;
										
					psiBladesHarass(localHero, RangeAttackMax, Psi_MaxRange);
					

				}
				
			}

		}
	};
	
	function psiBladesHarass(HeroLocal, rangeAttack, RangePsique) {
		
		
		const searchRadius = rangeAttack + RangePsique;

		// Buscar enemigos cercanos
		let enemyHeroesAll = HeroLocal.GetHeroesInRadius(searchRadius, Enum.TeamType.TEAM_ENEMY);
		let targetEnemy = null;
		let targetCreep = null;

		for (let enemy of enemyHeroesAll) {
			if (enemy != HeroLocal) {
				if (targetEnemy == null || HeroLocal.GetAbsOrigin().Distance(enemy.GetAbsOrigin()) < HeroLocal.GetAbsOrigin().Distance(targetEnemy.GetAbsOrigin())) {
					targetEnemy = enemy;
				}
			}
		}

		
		if (targetEnemy != null) {
			// Buscar unidades entre el enemigo y yo
			const enemyHeroPos = targetEnemy.GetAbsOrigin();
			const myHeroPos = HeroLocal.GetAbsOrigin();
			const dirEn2Me = (enemyHeroPos.sub(myHeroPos)).Normalized();

			let units = HeroLocal.GetUnitsInRadius(rangeAttack, Enum.TeamType.TEAM_ENEMY);

			for (let unit of units) {
				if (unit != targetEnemy && unit.IsCreep() && (unit.IsLaneCreep() || unit.IsNeutral()) && targetEnemy.GetAbsOrigin().Distance(unit.GetAbsOrigin()) < RangePsique && unit.GetAbsOrigin().sub(myHeroPos).Normalized().Dot(dirEn2Me) > 0.95 && unit.GetAbsOrigin().sub(enemyHeroPos).Normalized().Dot(dirEn2Me) < -0.95) {
					targetCreep = unit;
					break;
				}
			}
			

			let distance = 500 //-- distancia de zoom
			GameRules.GetGameMode().SetCameraDistanceOverride(distance);
			// Si encontramos un objetivo detrás del enemigo, casteamos Shackleshot
			if (Engine.OnceAt(0.2)) {
				if (targetCreep != null) {
						myPlayer.PrepareUnitOrders(Enum.UnitOrder.DOTA_UNIT_ORDER_ATTACK_TARGET, targetCreep, null, null, Enum.PlayerOrderIssuer.DOTA_ORDER_ISSUER_CURRENT_UNIT_ONLY, HeroLocal, false, true);

				} else{
					myPlayer.PrepareUnitOrders(Enum.UnitOrder.DOTA_UNIT_ORDER_MOVE_TO_POSITION, null, Input.GetWorldCursorPos(), null, Enum.PlayerOrderIssuer.DOTA_ORDER_ISSUER_CURRENT_UNIT_ONLY, HeroLocal, false, true);
				}
			}

		}
	}	
		
	

	// Definición de la función OnScriptLoad
	TemplarHarras.OnScriptLoad = TemplarHarras.OnGameStart = () => {
	  localHero = EntitySystem.GetLocalHero();
	  myPlayer = EntitySystem.GetLocalPlayer();
	};

	// Definición de la función OnGameEnd
	TemplarHarras.OnGameEnd = () => {
	  	localHero = null;
		myPlayer = null;

	};

	// Registro del script
	RegisterScript(TemplarHarras);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/TemplarHarras.ts"]();
/******/ 	
/******/ })()
;
