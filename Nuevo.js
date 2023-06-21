/******/ (() => { // webpackBootstrap 
/******/ 	var __webpack_modules__ = ({

/***/ "./src/StornSpiritAbuse.ts":
/*!**********************************!*\
  !*** ./src/StornSpiritAbuse.ts ***!
  \**********************************/
/***/ (() => {

eval(`
	const StornSpiritAbuse = {};

	let localHero = null;
	let myPlayer = null;
	let comboTarget = null;
	let particle = null;
	let enemyList = [];

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
	
	let menu_ItemsList = Menu.AddMultiSelect(path_, 'Item', ['panorama/images/items/black_king_bar_png.vtex_c', 'panorama/images/items/orchid_png.vtex_c', 'panorama/images/items/bloodthorn_png.vtex_c'], [true, true, true])
		.OnChange((state) => {menu_ItemsList = state.newValue;})
		.GetValue();
	
	let menu_AbilitiesList = Menu.AddMultiSelect(path_, 'Spells', ['panorama/images/spellicons/storm_spirit_static_remnant_png.vtex_c', 'panorama/images/spellicons/storm_spirit_electric_vortex_png.vtex_c', 'panorama/images/spellicons/storm_spirit_overload_png.vtex_c', 'panorama/images/spellicons/storm_spirit_ball_lightning_png.vtex_c'], [true, true, true, true])
		.OnChange((state) => {menu_AbilitiesList = state.newValue;})
		.GetValue();
		
	let menu_LinkensItems = Menu.AddPrioritySelect([...path_, 'Linkens Breaker Settings'], 'Linkens Breaker', ['panorama/images/items/orchid_png.vtex_c', 'panorama/images/items/bloodthorn_png.vtex_c'], [true, true])
		.OnChange((state) => {menu_LinkensItems = state.newValue;})
		.GetValue();
		
	let menu_SearchRadius = Menu.AddSlider(path_Ulti, 'Distance Ulti Cast', 500, 2000, 1200)
        .OnChange(state => menu_SearchRadius = state.newValue)
        .GetValue();
		
	let SafeManaUI = Menu.AddSlider(path_Ulti, 'Save Mana', 1, 500, 300)
        .OnChange(state => SafeManaUI = state.newValue)
        .GetValue();
		
	let DistanceCastUI = Menu.AddSlider(path_Ulti, 'Save Range in combo', 1, 350, 300)
		.OnChange(state => DistanceCastUI = state.newValue)
		.GetValue();


	Menu.GetFolder(path_Ulti).SetImage('panorama/images/spellicons/storm_spirit_ball_lightning_orchid_png.vtex_c');
		
	function GetNearHeroInRadius(vector, radius = menu_SearchRadius) {
        let en = enemyList;
        if (en.length == 0)
            return undefined;
        let accessHero = Array(enemyList.length);
        en.forEach((object) => {
            if (object.GetAbsOrigin().Distance(vector) <= radius) {
                accessHero.push([object, object.GetAbsOrigin().Distance(vector)]);
            }
        });
        accessHero.sort((a, b) => {
            return (a[1] - b[1]);
        });
        return accessHero[0] ? accessHero[0][0] : undefined;
    }
	
	function SendOrderMovePos(vector, myHero) {
        myPlayer.PrepareUnitOrders(Enum.UnitOrder.DOTA_UNIT_ORDER_MOVE_TO_POSITION, null, vector, null, Enum.PlayerOrderIssuer.DOTA_ORDER_ISSUER_CURRENT_UNIT_ONLY, myHero, false, true);
    }
	
	function TargetInRadius(target, radius, sourceHero, team = Enum.TeamType.TEAM_ENEMY) {
        let er = sourceHero.GetHeroesInRadius(radius, team);
        if (er) {
            for (let enemy of er) {
                if (enemy == target)
                    return true;
            }
        }
        return false;
    }
	
	StornSpiritAbuse.OnDraw = () => {
        if (localHero && isUiEnabled.GetValue()) {
			if (localHero.GetUnitName() !== "npc_dota_hero_storm_spirit") {
				return;
			}
			
            if (comboTarget) {
                if (!particle) {
                    particle = Particle.Create('particles/ui_mouseactions/range_finder_tower_aoe.vpcf', Enum.ParticleAttachment.PATTACH_INVALID, comboTarget);
                    particle.SetControl(2, EntitySystem.GetLocalHero().GetAbsOrigin());
                    particle.SetControl(6, new Vector(1, 0, 0));
                    particle.SetControl(7, comboTarget.GetAbsOrigin());
                }
                else {
                    particle.SetControl(2, EntitySystem.GetLocalHero().GetAbsOrigin());
                    particle.SetControl(7, comboTarget.GetAbsOrigin());
                }
            }
            else {
                if (particle) {
                    particle.Destroy();
                    particle = null;
                }
            }
        }
    };
	
	StornSpiritAbuse.OnUpdate = () => {
		
		if (localHero && isUiEnabled.GetValue()) {
			if (localHero.GetUnitName() !== "npc_dota_hero_storm_spirit") {
				return;
			}

			if (enemyList.length < 5) {
                enemyList = [];
                let heroes = EntitySystem.GetHeroesList();
                if (heroes) {
                    for (let hero of heroes) {
                        if (hero && !hero.IsIllusion() && !hero.IsMeepoClone() && hero.IsHero() && hero.IsAlive() &&
                            !hero.IsDormant() && !hero.IsSameTeam(localHero)) {
                            enemyList.push(hero);
                        }
                    }
                }
            }
					
			if (KeyBindOrderAgresive.IsKeyDown()) {
				
				if (comboTarget && !comboTarget.IsAlive()){
						comboTarget = null;
				}
			
				// Obtén las otras habilidades y el modificador
				let static_remnant = localHero.GetAbilityByIndex(0);
				let electric_vortex = localHero.GetAbilityByIndex(1);
				let overload = localHero.GetAbilityByIndex(2);
				let Ultimate = localHero.GetAbilityByIndex(5);
				
				let target = GetNearHeroInRadius(Input.GetWorldCursorPos());

				if (!comboTarget && target && target.IsExist())
					comboTarget = target;
				else if (!comboTarget) {
					comboTarget = null;
					if (Engine.OnceAt(0.2)){
						SendOrderMovePos(Input.GetWorldCursorPos(), localHero);
					}
				}
                

				if (Engine.OnceAt(0.2)) {

					if (comboTarget && comboTarget.IsExist()) {
						const localHeroPosition = localHero.GetAbsOrigin();
						const attackRange = localHero.GetAttackRange();
						const enemyHeroPosition = comboTarget.GetAbsOrigin();
						const dist = localHeroPosition.Distance(enemyHeroPosition);
						
						let Modifier1 = localHero.HasModifier("modifier_storm_spirit_overload");
						let Modifier2 = localHero.HasModifier("modifier_storm_spirit_electric_rave");
						let AghanimsScepter = localHero.GetItem('item_ultimate_scepter', true);
						let AghanimsPavise = localHero.HasModifier("modifier_item_ultimate_scepter_consumed");
						let ShardPavise = localHero.HasModifier("modifier_item_aghanims_shard");
						
						// Nueva condición para activar BKB si el enemigo tiene activado Blade Mail
						let BkBEnemiPrevention = localHero.GetHeroesInRadius(700, Enum.TeamType.TEAM_ENEMY);
						if (BkBEnemiPrevention.length >= 3) {
							let bkb = localHero.GetItem('item_black_king_bar', true);
							if (bkb && bkb.CanCast() && localHero.HasModifier("modifier_black_king_bar_immune") === false) {
								bkb.CastNoTarget();
							}
						}
						
						if (localHero.GetMana() > SafeManaUI && Ultimate && Ultimate.IsExist() && Ultimate.CanCast() && menu_AbilitiesList[3]) {
							if (menu_SearchRadius > dist > attackRange ) {								
								myPlayer.PrepareUnitOrders( Enum.UnitOrder.DOTA_UNIT_ORDER_CAST_POSITION,null,enemyHeroPosition,Ultimate, Enum.PlayerOrderIssuer.DOTA_ORDER_ISSUER_CURRENT_UNIT_ONLY, localHero);
							}
						}
						
						if (AghanimsScepter || AghanimsPavise) { 

							let enemiesInVortexRange = localHero.GetHeroesInRadius(470, Enum.TeamType.TEAM_ENEMY);
							if (enemiesInVortexRange.length > 2 && electric_vortex && electric_vortex.CanCast()) {
								electric_vortex.CastNoTarget(); // Cast Electric Vortex si hay enemigos en rango
							}
						}
						

						
						if (menu_AbilitiesList[0]) {
                            
                            if (static_remnant && static_remnant.IsExist() && static_remnant.CanCast() && !Modifier1) {
                                if (TargetInRadius(comboTarget, 280, localHero)) {
                                    static_remnant.CastNoTarget();
                                }
							}
                        }
						
						if (menu_AbilitiesList[1]) {
                            
                            if (electric_vortex && electric_vortex.IsExist() && electric_vortex.CanCast() && !Modifier1 ) {
								
								if (AghanimsScepter || AghanimsPavise) {
									if (TargetInRadius(comboTarget, 470, localHero)) {
										electric_vortex.CastNoTarget();
									} else{									
										SendOrderMovePos(comboTarget.GetAbsOrigin(), localHero);
									}
								}else {
									if (TargetInRadius(comboTarget, 295, localHero)) {
										electric_vortex.CastTarget(comboTarget);
									} else{									
										SendOrderMovePos(comboTarget.GetAbsOrigin(), localHero);
									}
								}
							}
                        }
						
						if (menu_AbilitiesList[2]) {
                            
                            if (overload && overload.IsExist() && overload.CanCast() && !Modifier1 && ShardPavise ) {
                                if (TargetInRadius(comboTarget, 470, localHero)) {
                                    overload.CastNoTarget();
                                }
							}
                        }
												
						const attackSpeed = localHero.GetAttacksPerSecond();
						const attackTime = 1 / attackSpeed;
						const Idealdirection = (enemyHeroPosition.sub(localHeroPosition)).Normalized();

						// Comprueba si las otras habilidades están en cooldown o si el modificador está activo
						if (localHero.GetMana() > SafeManaUI && Ultimate && Ultimate.IsExist() && Ultimate.CanCast() && menu_AbilitiesList[3]) {

							if (!static_remnant.IsInAbilityPhase() && !electric_vortex.IsInAbilityPhase() && !Modifier1 && !Modifier2) {
								
								if (comboTarget.IsAttacking()) {
									// Calcula una nueva posición detrás del enemigo									
									let IdealPosition = localHeroPosition.add(Idealdirection.mul(new Vector(DistanceCastUI, DistanceCastUI, 0)));
									myPlayer.PrepareUnitOrders(Enum.UnitOrder.DOTA_UNIT_ORDER_CAST_POSITION,null,IdealPosition,Ultimate, Enum.PlayerOrderIssuer.DOTA_ORDER_ISSUER_CURRENT_UNIT_ONLY, localHero);
								}
							}

						}
						
						let [order, target, pos] = [Enum.UnitOrder.DOTA_UNIT_ORDER_ATTACK_TARGET, comboTarget, comboTarget.GetAbsOrigin()];
						if (comboTarget.HasState(Enum.ModifierState.MODIFIER_STATE_ATTACK_IMMUNE) ||
							comboTarget.HasState(Enum.ModifierState.MODIFIER_STATE_INVULNERABLE) ||
							comboTarget.HasState(Enum.ModifierState.MODIFIER_STATE_MAGIC_IMMUNE) ||
							comboTarget.HasState(Enum.ModifierState.MODIFIER_STATE_UNTARGETABLE)) {
							order = Enum.UnitOrder.DOTA_UNIT_ORDER_MOVE_TO_POSITION;
							target = null;
							pos = Input.GetWorldCursorPos();
						}
						myPlayer.PrepareUnitOrders(order, target, pos, null, Enum.PlayerOrderIssuer.DOTA_ORDER_ISSUER_CURRENT_UNIT_ONLY, localHero, false, true);
					
					}
				}
			} else{
				comboTarget = null;
			}
			
		}
	};

	StornSpiritAbuse.OnScriptLoad = StornSpiritAbuse.OnGameStart = () => {
	    localHero = EntitySystem.GetLocalHero();
	    myPlayer = EntitySystem.GetLocalPlayer();
		enemyList = [];
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
