/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/AutoSaverWindrunner.ts":
/*!**********************************!*\
  !*** ./src/AutoSaverWindrunner.ts ***!
  \**********************************/
/***/ (() => {

eval(`
	// Definición del objeto AutoSaverWindrunner
	const AutoSaverWindrunner = {};

	// Declaración de variables
	let localHero;
	let myPlayer;
	let posFIN;
	let posFIN1;
	let previousEnemyPositions = {};
	let bkbEnemies = {};

	// Definición del array path_
	const path_ = ['Heroes', 'Intelligence', 'Windranger'];

	// Creación de la interfaz de usuario
	let isUiEnabled = Menu.AddToggle(['Heroes', 'Intelligence', 'Windranger'], 'GaleForce Use in Ulti', true)
		.SetTip('Enable or disable the use of Gale Force during Windranger ultimate ability');
	isUiEnabled.SetImage('panorama/images/spellicons/windrunner_gale_force_png.vtex_c');

	let isUiEnabledDogde = Menu.AddToggle(path_, 'Use to Dogde', true);
	isUiEnabledDogde.SetImage('panorama/images/spellicons/windrunner_gale_force_png.vtex_c');

	// Función que se ejecuta en cada actualización del juego
	AutoSaverWindrunner.OnUpdate = () => {
		// Verificar si el héroe local es Windranger y si la opción "Use to Dogde" está habilitada
		if (localHero && isUiEnabledDogde.GetValue()) {
			if (localHero.GetUnitName() !== "npc_dota_hero_windrunner") {
				return;
			}

			// Obtener los enemigos cercanos
			let enemies = localHero.GetHeroesInRadius(400, Enum.TeamType.TEAM_ENEMY);
			let enemyPositions = {};
			let galeForce = localHero.GetAbilityByIndex(3);

			if (enemies) {
				// Iterar sobre los enemigos cercanos
				for (let enemy of enemies) {
					let enemyId = enemy.GetPlayerID();

					// Verificar si se puede lanzar Gale Force
					if (galeForce && galeForce.IsExist() && galeForce.CanCast()) {
						let herolPosition = localHero.GetAbsOrigin();
						enemyPositions[enemyId] = enemy.GetAbsOrigin();
						let posINI = enemyPositions[enemyId];

						if (Engine.OnceAt(0.2)) {
							posFIN1 = enemy.GetAbsOrigin();      
						}

						if (posINI.x === posFIN1.x && posINI.y === posFIN1.y) {
							continue;
						}

						const enemyDirection = (posFIN1.sub(posINI)).Normalized();

						enemyPositions[enemyId] = posFIN1;

						const enemyPosition = enemy.GetAbsOrigin();
						const oppositeDirection = enemyDirection.mul(new Vector(-1, -1, -1));
						let pushPosition = enemyPosition.add(oppositeDirection.mul(new Vector(100, 100, 0)));

						// Lanzar Gale Force en la dirección opuesta desde la posición del héroe enemigo
						myPlayer.PrepareUnitOrders(30, null, enemyPosition, galeForce, Enum.PlayerOrderIssuer.DOTA_ORDER_ISSUER_HERO_ONLY, localHero);
						galeForce.CastPosition(pushPosition);
						setTimeout(function() {}, 300);

						// Activar Windrun siempre
						let windrun = localHero.GetAbilityByIndex(2);
						if (windrun && windrun.IsExist() && windrun.CanCast()) {
							windrun.CastNoTarget();
						}
					}
				}
			}
		}

		// Verificar si el héroe local es Windranger y si la opción "GaleForce Use in Ulti" está habilitada
		if (localHero && isUiEnabled.GetValue()) {
			if (localHero.GetUnitName() !== "npc_dota_hero_windrunner") {
				return;
			}

			// Obtener los modificadores del héroe local
			const modifiers = localHero.GetModifiers();

			// Iterar sobre los modificadores
			for (let modifier of modifiers) {
				if (modifier.GetName() === 'modifier_windrunner_focusfire') {
					const remainingTime = modifier.GetRemainingTime();

					// Verificar si el modificador "modifier_windrunner_focusfire" está activo
					if (remainingTime <= 20) {
						// Activar Windrun siempre
						let windrun = localHero.GetAbilityByIndex(2);
						if (windrun && windrun.IsExist() && windrun.CanCast()) {
							windrun.CastNoTarget();
						}

						// Verificar si hay suficientes enemigos cercanos para activar BKB
						let enemies = localHero.GetHeroesInRadius(1000, Enum.TeamType.TEAM_ENEMY);
						if (enemies.length >= 3) {
							let bkb = localHero.GetItem('item_black_king_bar', true);
							if (bkb && bkb.CanCast()) {
								bkb.CastNoTarget();
							}
						}

						// Verificar si algún enemigo cercano tiene activado Blade Mail
						for (let enemy of enemies) {
							if (enemy.HasModifier("modifier_item_blade_mail_reflect")) {
								let bkb = localHero.GetItem('item_black_king_bar', true);
								if (bkb && bkb.CanCast()) {
									bkb.CastNoTarget();
								}
							}
							
							if (enemy.HasModifier("modifier_black_king_bar_immune") === false ) {
								let disperserI = localHero.GetItem('item_disperser', true);
								let diffusalI = localHero.GetItem('item_diffusal_blade', true);
								if (disperserI && disperserI.CanCast()) {
									disperserI.CastNoTarget();
								}
								if (diffusalI && diffusalI.CanCast()) {
									diffusalI.CastNoTarget();
								}
								
							}
							
							
						}

						// Obtener los enemigos cercanos
						let gale_force = localHero.GetAbilityByIndex(3);
						let enemyPositions = {};
						if (gale_force && gale_force.IsExist() && gale_force.CanCast()) {
							enemies = localHero.GetHeroesInRadius(1000, Enum.TeamType.TEAM_ENEMY);

							// Iterar sobre los enemigos cercanos
							for (let enemy of enemies) {
								let enemyId = enemy.GetPlayerID();

								// Verificar si el enemigo está lo suficientemente cerca
								let vec1 = localHero.GetAbsOrigin();
								let vec2 = enemy.GetAbsOrigin();
								let distance = vec1.sub(vec2).Length2D();
								if (distance <= 1000) {
									// Actualizar la posición inicial del enemigo en cada iteración
									enemyPositions[enemyId] = enemy.GetAbsOrigin();

									// Calcular la dirección en la que el enemigo está viendo
									let posINI = enemyPositions[enemyId];
									if (Engine.OnceAt(0.2)) {
										posFIN = enemy.GetAbsOrigin();      
									}
									if (posINI.x === posFIN.x && posINI.y === posFIN.y) {
										continue;
									}
									const enemyDirection = (posFIN.sub(posINI)).Normalized();
									enemyPositions[enemyId] = posFIN;

									// Calcular la dirección opuesta
									const enemyPosition = enemy.GetAbsOrigin();
									const oppositeDirection = enemyDirection.mul(new Vector(-1, -1, -1));

									// Lanzar Gale Force en la dirección opuesta desde la posición del héroe enemigo
									let pushPosition = enemyPosition.add(oppositeDirection.mul(new Vector(100, 100, 0)));
									myPlayer.PrepareUnitOrders(30, null, enemyPosition, gale_force, Enum.PlayerOrderIssuer.DOTA_ORDER_ISSUER_HERO_ONLY, localHero);

									// Verificar si el enemigo tiene activado BKB antes de lanzar Gale Force
									if (enemy.HasModifier("modifier_black_king_bar_immune") === false ) {
										gale_force.CastPosition(pushPosition);
										setTimeout(function() {}, 300);
									}
								}
							}
						}

						// Verificar si el modificador "modifier_windrunner_focusfire" ha terminado
						if (!modifiers.some(modifier => modifier.GetName() === 'modifier_windrunner_focusfire')) {
							break;
						}
					}
				}
			}
		}
	};

	// Función que se ejecuta cuando se carga el script
	AutoSaverWindrunner.OnScriptLoad = AutoSaverWindrunner.OnGameStart = () => {
		localHero = EntitySystem.GetLocalHero();
		myPlayer = EntitySystem.GetLocalPlayer();
	};

	// Función que se ejecuta cuando termina el juego
	AutoSaverWindrunner.OnGameEnd = () => {
		localHero = null;
	};

	// Registro del script
	RegisterScript(AutoSaverWindrunner);


`);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/AutoSaverWindrunner.ts"]();
/******/ 	
/******/ })()
;
