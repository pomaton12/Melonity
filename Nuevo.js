/******/ (() => { // webpackBootstrap 
/******/ 	var __webpack_modules__ = ({

/***/ "./src/StornSpiritAbuse.ts":
/*!**********************************!*\
  !*** ./src/StornSpiritAbuse.ts ***!
  \**********************************/
/***/ (() => {

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
        'item_dagon_5', 'item_heavens_halberd', 'item_diffusal_blade', 'item_disperser', 'item_harpoon', 'item_force_staff',
		'item_cyclone', 'item_rod_of_atos', 'item_abyssal_blade', 'item_orchid', 'item_bloodthorn', 'item_sheepstick',
		'item_nullifier', 'item_ethereal_blade', 'item_force_boots', 'item_book_of_shadows'
    ];
	
	
	let isUiEnabled = Menu.AddToggle(path_, 'Enable', true);
	let KeyBindOrderAgresive = Menu.AddKeyBind(path_, 'Key', Enum.ButtonCode.KEY_NONE);
	
	let menu_ItemsList = Menu.AddMultiSelect(path_, 'Item', ['panorama/images/items/black_king_bar_png.vtex_c','panorama/images/items/bloodstone_png.vtex_c','panorama/images/items/refresher_png.vtex_c','panorama/images/items/ex_machina_png.vtex_c', 'panorama/images/items/orchid_png.vtex_c', 'panorama/images/items/bloodthorn_png.vtex_c'], [true, true, true, true, true, true])
		.OnChange((state) => {menu_ItemsList = state.newValue;})
		.GetValue();
	
	let menu_AbilitiesList = Menu.AddMultiSelect(path_, 'Spells', ['panorama/images/spellicons/storm_spirit_static_remnant_png.vtex_c', 'panorama/images/spellicons/storm_spirit_electric_vortex_png.vtex_c', 'panorama/images/spellicons/storm_spirit_overload_png.vtex_c', 'panorama/images/spellicons/storm_spirit_ball_lightning_png.vtex_c'], [true, true, true, true])
		.OnChange((state) => {menu_AbilitiesList = state.newValue;})
		.GetValue();
		
	let menu_LinkensItems = CreatePrioritySelect([...path_, 'Linkens Breaker Settings'], 'Linkens Breaker', linkBreakers, true);
	//let menu_LinkensItems = Menu.AddPrioritySelect([...path_, 'Linkens Breaker Settings'], 'Linkens Breaker', ['panorama/images/items/black_king_bar_png.vtex_c','panorama/images/items/bloodstone_png.vtex_c','panorama/images/items/refresher_png.vtex_c','panorama/images/items/ex_machina_png.vtex_c', 'panorama/images/items/orchid_png.vtex_c', 'panorama/images/items/bloodthorn_png.vtex_c'], [true, true, true, true, true, true])
		//.OnChange((state) => {menu_LinkensItems = state.newValue;})
		//.GetValue();
		
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
	Menu.SetImage(['Custom Scripts', 'Heroes'], '~/menu/40x40/heroes.png');
    Menu.SetImage(['Custom Scripts', 'Heroes', 'Intelligence'], '~/menu/40x40/Intelligence.png');
    Menu.SetImage(path_, 'panorama/images/heroes/icons/npc_dota_hero_storm_spirit_png.vtex_c');
	Menu.GetFolder([...path_, 'Linkens Breaker Settings']).SetImage('panorama/images/items/sphere_png.vtex_c');
	
	
	function GetImagesPath(name, full) {
		if (name.startsWith('item_')) {
			return `panorama/images/items/${name.slice(5)}_png.vtex_c`;
		}
		else if (name.startsWith('npc_dota_hero')) {
			if (full) {
				return `panorama/images/heroes/${name}_png.vtex_c`;
			}
			else {
				return `panorama/images/heroes/icons/${name}_png.vtex_c`;
			}
		}
		else if (name.startsWith('npc_dota_neutral')) {
			return `panorama/images/heroes/${name}_png.vtex_c`;
		}
		else {
			return `panorama/images/spellicons/${name}_png.vtex_c`;
		}
	}
	
	function CreatePrioritySelect(path, name, iconsArray, default_value = true) {
		let icons = [];
		for (let q of iconsArray) {
			icons.push(GetImagesPath(q));
		}
		let a = Menu.AddPrioritySelect(path, name, icons, default_value);

		return {
			GetOption: () => {
				return a;
			},
			GetValue: () => {
				let t = [];
				for (let e of a.GetValue()) {
					t.push(iconsArray[e]);
				}
				return t;
			}
		};
	}
	
		
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
	
	function CustomCanCast(item) {
        let owner = item.GetOwner(), hasModf = owner.HasState(Enum.ModifierState.MODIFIER_STATE_MUTED)
            || owner.HasState(Enum.ModifierState.MODIFIER_STATE_STUNNED)
            || owner.HasState(Enum.ModifierState.MODIFIER_STATE_HEXED)
            || owner.HasState(Enum.ModifierState.MODIFIER_STATE_INVULNERABLE)
            || owner.HasState(Enum.ModifierState.MODIFIER_STATE_FROZEN)
            || owner.HasState(Enum.ModifierState.MODIFIER_STATE_FEARED)
            || owner.HasState(Enum.ModifierState.MODIFIER_STATE_TAUNTED);
        return item && !hasModf && owner.GetMana() >= item.GetManaCost() && item.IsCastable(owner.GetMana());
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
						let EnemiVortexPull = localHero.HasModifier("modifier_storm_spirit_electric_vortex_pull");
						
						// Nueva condición para activar BKB si el enemigo tiene activado Blade Mail
						let BkBEnemiPrevention = localHero.GetHeroesInRadius(700, Enum.TeamType.TEAM_ENEMY);
						if (BkBEnemiPrevention.length >= 3) {
							let bkb = localHero.GetItem('item_black_king_bar', true);
							if (bkb && bkb.CanCast() && localHero.HasModifier("modifier_black_king_bar_immune") === false) {
								bkb.CastNoTarget();
							}
						}
						
						if (localHero.GetMana() > SafeManaUI && Ultimate && Ultimate.IsExist() && Ultimate.CanCast() && menu_AbilitiesList[3]) {
							if (dist > attackRange ) {	

								let speedUlti = 0;
								const ultiLevel = Ultimate.GetLevel();
								
								if (ultiLevel === 1) {
									speedUlti = 1400;
								} else if (ultiLevel === 2) {
									speedUlti = 1850;
								} else {
									speedUlti = 2300;
								}

								const travel_time = dist / (speedUlti + 1);
								const castpointTimee = 0.3;
								const delay = travel_time + castpointTimee;
								const BestPost = GetPredictedPosition(comboTarget, delay);

								myPlayer.PrepareUnitOrders( Enum.UnitOrder.DOTA_UNIT_ORDER_CAST_POSITION,null,BestPost,Ultimate, Enum.PlayerOrderIssuer.DOTA_ORDER_ISSUER_CURRENT_UNIT_ONLY, localHero);
							}
						}
						
						let [linken, mirror] = [comboTarget.GetItem('item_sphere', true), comboTarget.GetItem('item_mirror_shield', false)];
                        if (linken && linken.CanCast() || mirror && mirror.CanCast()) {
                            let linkenBrokItems = menu_LinkensItems.GetValue();
                            for (let brokObj of linkenBrokItems) {
                                let vi = localHero.GetItem(brokObj, false);
                                if (vi) {
                                    if (vi.IsExist() && CustomCanCast(vi)) {
                                        vi.CastTarget(comboTarget);
                                        break;
                                    }
                                }
                            }
                        }
						
						if (AghanimsScepter || AghanimsPavise) {

							let enemiesInVortexRange = localHero.GetHeroesInRadius(470, Enum.TeamType.TEAM_ENEMY);
							if (enemiesInVortexRange.length > 2 && electric_vortex && electric_vortex.CanCast()) {
								electric_vortex.CastNoTarget();
								
								let bloodstone = localHero.GetItem('item_bloodstone', true);
								if(menu_ItemsList[1] && bloodstone && bloodstone.CanCast()){
									bloodstone.CastNoTarget();
								}
							}
						}
						
						if (menu_ItemsList[2] ) { 
							let RefresherOrb = localHero.GetItem('item_refresher', true);
							if (RefresherOrb && CustomCanCast(RefresherOrb) && electric_vortex && !electric_vortex.CanCast() && !EnemiVortexPull) { 
								RefresherOrb.CastNoTarget();
							}
							
						} else {
							if ( menu_ItemsList[3]) { 
								let ex_machina = localHero.GetItem('item_ex_machina', true);
								if (ex_machina && CustomCanCast(ex_machina) && electric_vortex && !electric_vortex.CanCast() && !EnemiVortexPull) { 
									ex_machina.CastNoTarget();
								}
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
                            
                            if (electric_vortex && electric_vortex.IsExist() && electric_vortex.CanCast() && !Modifier1 && !EnemiVortexPull) {
								
								if (AghanimsScepter || AghanimsPavise) {
									if (TargetInRadius(comboTarget, 470, localHero)) {
										electric_vortex.CastNoTarget();
									}
								}else {
									if (TargetInRadius(comboTarget, 295, localHero)) {
										electric_vortex.CastTarget(comboTarget);
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
								
								let EnemiPrevention = localHero.GetHeroesInRadius(480, Enum.TeamType.TEAM_ENEMY);

								if (comboTarget.IsAttacking() || EnemiPrevention.length >= 3) {
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
	
	//Funciones Para precedir pos
	function GetPredictedPosition(HeroEnemigo, delay) {
		const pos = HeroEnemigo.GetAbsOrigin();
		if (CantMove(HeroEnemigo)) {
			return pos;
		}
		if (!HeroEnemigo.IsRunning() || !delay) {
			return pos;
		}

		const dir = HeroEnemigo.GetRotation().GetForward().Normalized();
		const speed = FGetMoveSpeed(HeroEnemigo);

		return pos.add(dir.Scaled(speed * delay));
	}

	function CantMove(HeroEnemigo) {
		if (!HeroEnemigo){
			return false;
		}

		if ( HeroEnemigo.HasState(Enum.ModifierState.MODIFIER_STATE_ROOTED) || GetStunTimeLeft(HeroEnemigo) >= 1){
			return true;
		}
		if (HeroEnemigo.HasModifier("modifier_axe_berserkers_call")){
			return true;
		}
		if (HeroEnemigo.HasModifier("modifier_legion_commander_duel")){
			return true;
		}

		return false;
	}

	function GetStunTimeLeft(HeroEnemigo) {
		let mod = HeroEnemigo.GetModifier("modifier_stunned");
		if (!mod){
			return 0;
		}
		return Math.max(Modifier.GetDieTime(mod) - GameRules.GetGameTime(), 0);
	}

	function FGetMoveSpeed(HeroEnemigo) {
		let base_speed = HeroEnemigo.GetBaseSpeed();
		let bonus_speed = HeroEnemigo.GetMoveSpeed() - HeroEnemigo.GetBaseSpeed();

		// when affected by ice wall, assume move speed as 100 for convenience
		if (HeroEnemigo.HasModifier("modifier_invoker_ice_wall_slow_debuff")){
			return 100;
		}

		if (HeroEnemigo.HasModifier("modifier_item_diffusal_blade_slow")){
			return 100;
		}

		// when get hexed, move speed = 140/100 + bonus_speed
		if (GetHexTimeLeft(HeroEnemigo) > 0){
			return 140 + bonus_speed;
		}

		return base_speed + bonus_speed;
	}

	function GetHexTimeLeft(HeroEnemigo) {
		let mod;
		let mod1 = HeroEnemigo.GetModifier("modifier_sheepstick_debuff");
		let mod2 = HeroEnemigo.GetModifier("modifier_lion_voodoo");
		let mod3 = HeroEnemigo.GetModifier("modifier_shadow_shaman_voodoo");

		if (mod1){
			mod = mod1;
		}
		if (mod2){
			mod = mod2;
		}
		if (mod3){
			mod = mod3;
		}

		if (!mod){
			return 0;
		}
		return Math.max(Modifier.GetDieTime(mod) - GameRules.GetGameTime(), 0);
	}

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
