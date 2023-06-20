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
	let comboTarget;

	const path_ = ["Custom Scripts","Heroes", "Intelligence", "Storm Spirit"];
	const path_Ulti = ["Custom Scripts","Heroes", "Intelligence", "Storm Spirit","Agresive Best Ulti"];
	
	 const item_Images = [
        'item_soul_ring', 'item_armlet', 'item_mjollnir', 'item_blink', 'item_abyssal_blade', 'item_fallen_sky',
        'item_glimmer_cape', 'item_manta', 'item_illusionsts_cape', 'item_demonicon', 'item_sheepstick', 'item_orchid',
        'item_bloodthorn', 'item_nullifier', 'item_rod_of_atos', 'item_gungir', 'item_diffusal_blade', 'item_bullwhip',
        'item_ethereal_blade', 'item_dagon_5', 'item_heavens_halberd', 'item_veil_of_discord', 'item_urn_of_shadows', 'item_spirit_vessel',
        'item_medallion_of_courage', 'item_solar_crest', 'item_pipe', 'item_hood_of_defiance', 'item_eternal_shroud', 'item_lotus_orb',
        'item_black_king_bar', 'item_minotaur_horn', 'item_essence_ring', 'item_blade_mail', 'item_shivas_guard', 'item_crimson_guard',
        'item_ancient_janggo', 'item_ex_machina', 'item_mask_of_madness'
    ];
    const abilities = ['storm_spirit_static_remnant', 'storm_spirit_electric_vortex', 'storm_spirit_overload', 'storm_spirit_ball_lightning'];
    const linkBreakers = [
        'item_psychic_headband', 'item_force_staff', 'item_hurricane_pike', 'item_cyclone', 'item_wind_waker', 'item_paintball',
        'centaur_double_edge', 'item_dagon_5', 'item_nullifier', 'item_rod_of_atos', 'item_orchid', 'item_bloodthorn', 'item_abyssal_blade',
        'item_diffusal_blade', 'item_heavens_halberd', 'item_ethereal_blade', 'item_sheepstick'
    ];
	
	let isUiEnabled = Menu.AddToggle(path_, 'Enable', true);
	let KeyBindOrderAgresive = Menu.AddKeyBind(path_, 'Key', Enum.ButtonCode.KEY_NONE);
	
	let menu_ItemsList = lib_1.CreateMultiSelect(path_, 'Items', item_Images, true);
    let menu_AbilitiesList = lib_1.CreateMultiSelect(path_, 'Abilities', abilities, true);
    let menu_LinkensItems = lib_1.CreatePrioritySelect([...path_, 'Linkens Breaker Settings'], 'Linkens Breaker', linkBreakers, true);
	
	
	let SafeManaUI = Menu.AddSlider(path_Ulti, 'Save Mana', 1, 500, 300)
        .OnChange(state => SafeManaUI = state.newValue)
        .GetValue();
		
	let DistanceCastUI = Menu.AddSlider(path_Ulti, 'Save Range in combo', 1, 350, 300)
		.OnChange(state => DistanceCastUI = state.newValue)
		.GetValue();


	Menu.GetFolder(path_Ulti).SetImage('panorama/images/spellicons/storm_spirit_ball_lightning_orchid_png.vtex_c');
	
	function GetNearHeroInRadius(MyHero){
		const mousePos = Input.GetWorldCursorPos();
		const enemies = MyHero.GetHeroesInRadius(1200, Enum.TeamType.TEAM_ENEMY);
		enemies.sort((a, b) => {
			const distA = a.GetAbsOrigin().Distance(MyHero.GetAbsOrigin());
			const distB = b.GetAbsOrigin().Distance(MyHero.GetAbsOrigin());
			return distA - distB;
		});
		let targetE = null;
		for (const enemy of enemies) {
			const dist = enemy.GetAbsOrigin().Distance(mousePos);
			if (dist <= 150 || targetE == null) {
				targetE = enemy;
			}
		}
		return targetE;
	}
	
	StornSpiritAbuse.OnUpdate = () => {
		
		if (localHero && isUiEnabled.GetValue()) {
			if (localHero.GetUnitName() !== "npc_dota_hero_storm_spirit") {
				return;
			}				
					
			if (KeyBindOrderAgresive.IsKeyDown()) {
				
				if (comboTarget && !comboTarget.IsAlive()){
						comboTarget = null;
				}
			
				// Obtén las otras habilidades y el modificador
				let Ability1 = localHero.GetAbilityByIndex(0);
				let Ability2 = localHero.GetAbilityByIndex(1);
				let Ability3 = localHero.GetAbilityByIndex(2);
				let Ultimate = localHero.GetAbilityByIndex(5);
				
				let target = GetNearHeroInRadius(localHero);

				if (!comboTarget && target && target.IsExist())
					comboTarget = target;
				else if (!comboTarget) {
					comboTarget = null;
					if (Engine.OnceAt(0.2))
						SendOrderMovePos(Input.GetWorldCursorPos());
				}
                

				if (Engine.OnceAt(0.2)) {

					if (comboTarget != null) {
						// Nueva condición para activar BKB si el enemigo tiene activado Blade Mail
						let BkBEnemiPrevention = localHero.GetHeroesInRadius(800, Enum.TeamType.TEAM_ENEMY);
						if (BkBEnemiPrevention.length >= 3) {
							let bkb = localHero.GetItem('item_black_king_bar', true);
							if (bkb && bkb.CanCast() && localHero.HasModifier("modifier_black_king_bar_immune") === false) {
								bkb.CastNoTarget();
							}
						}
												
						const localHeroPosition = localHero.GetAbsOrigin();
						const EnemyHero = comboTarget;
						const attackRange = localHero.GetAttackRange();
						const enemyHeroPosition = EnemyHero.GetAbsOrigin();
						const dist = localHeroPosition.Distance(enemyHeroPosition);
						const attackSpeed = localHero.GetAttacksPerSecond();
						const attackTime = 1 / attackSpeed;
						const Idealdirection = (enemyHeroPosition.sub(localHeroPosition)).Normalized();
						//console.log("Prueba error",Idealdirection);
						let Modifier1 = localHero.HasModifier("modifier_storm_spirit_overload");
						let Modifier2 = localHero.HasModifier("modifier_storm_spirit_electric_rave");

						// Comprueba si las otras habilidades están en cooldown o si el modificador está activo
						if (localHero.GetMana() > SafeManaUI && Ultimate && Ultimate.IsExist() && Ultimate.CanCast()) {
							if (dist > attackRange) {
								
										myPlayer.PrepareUnitOrders( Enum.UnitOrder.DOTA_UNIT_ORDER_CAST_POSITION,null,enemyHeroPosition,Ultimate, Enum.PlayerOrderIssuer.DOTA_ORDER_ISSUER_CURRENT_UNIT_ONLY, localHero);
										setTimeout(function() {}, attackTime*1000);
							} else{
							if (!Ability1.IsInAbilityPhase() && !Ability2.IsInAbilityPhase() && !Modifier1 && !Modifier2) {
									
									if (EnemyHero.IsAttacking()) {
											// Calcula una nueva posición detrás del enemigo
											
												let IdealPosition = localHeroPosition.add(Idealdirection.mul(new Vector(DistanceCastUI, DistanceCastUI, 0)));
												myPlayer.PrepareUnitOrders(Enum.UnitOrder.DOTA_UNIT_ORDER_CAST_POSITION,null,IdealPosition,Ultimate, Enum.PlayerOrderIssuer.DOTA_ORDER_ISSUER_CURRENT_UNIT_ONLY, localHero);
												myPlayer.PrepareUnitOrders(Enum.UnitOrder.DOTA_UNIT_ORDER_ATTACK_TARGET, EnemyHero, enemyHeroPosition, null, Enum.PlayerOrderIssuer.DOTA_ORDER_ISSUER_CURRENT_UNIT_ONLY, localHero, false, true);
												setTimeout(function() {}, attackTime*1000);
									}
								}
							}
						}
						
					}
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
