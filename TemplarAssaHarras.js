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
					console.log(Psi_MaxRange," ",RangeAttackMax);
					
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
			const dirEn2Me = (myHeroPos.sub(enemyHeroPos)).Normalized();

			let units = HeroLocal.GetUnitsInRadius(rangeAttack, Enum.TeamType.TEAM_ENEMY);
			let validUnits = [];

			for (let unit of units) {
				if (unit != targetEnemy && targetEnemy.GetAbsOrigin().Distance(unit.GetAbsOrigin()) < RangePsique && unit.GetAbsOrigin().sub(myHeroPos).Normalized().Dot(dirEn2Me) > 0.99 && unit.GetAbsOrigin().sub(enemyHeroPos).Normalized().Dot(dirEn2Me) < -0.99) {
					validUnits.push(unit);
				}
			}

			if (validUnits.length > 0) {
				// Buscar mejor posición para hacer harass
				let bestPos = null;
				let bestDist = -1;

				for (let unit of validUnits) {
					const enemyUnitPos = unit.GetAbsOrigin();
					const harassPos = enemyUnitPos.add(myHeroPos.sub(enemyUnitPos).Normalized().mul(enemyUnitPos.sub(enemyHeroPos).Length()));
					const dist = harassPos.Distance(myHeroPos);

					if (bestPos == null || dist < bestDist) {
						bestPos = harassPos;
						bestDist = dist;
					}
				}

				if (bestPos != null) {
					// Mover a la posición para hacer harass
					HeroLocal.MoveTo(bestPos);
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
