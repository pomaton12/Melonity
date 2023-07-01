/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/MorphlingUltiAbuse.ts":
/*!**********************************!*\
  !*** ./src/MorphlingUltiAbuse.ts ***!
  \**********************************/
/***/ (() => {

	// Definición del objeto MorphlingUltiAbuse
	const MorphlingUltiAbuse = {};

	// Declaración de la variable localHero
	let localHero = null;
	let myPlayer = null;
	let comboTarget = null;
	let particle = null;
	let particleKill = null;
	let timeParticle = 0;
	
	let enemyList = [];
	
	
	let cooldowns = [];
	let EnemeyDraw = [];
	let isMonitoring = false;
	//let monitorKey = Enum.ButtonCode.KEY_X;
	
	// Definición del array path_
	const path_ = ["Custom Scripts","Heroes","Agility","Morphling"];
	const path_1 = ["Custom Scripts","Heroes","Agility","Morphling","Best Ulti Cast"];
	const path_2 = ["Custom Scripts","Heroes","Agility","Morphling","Auto Shift Dogde"];

	const item_Images = [
	'item_soul_ring', 'item_armlet', 'item_mjollnir', 'item_blink', 'item_abyssal_blade', 'item_fallen_sky',
	'item_glimmer_cape', 'item_manta', 'item_refresher', 'item_disperser', 'item_sheepstick', 'item_orchid',
	'item_bloodthorn', 'item_nullifier', 'item_rod_of_atos', 'item_gungir', 'item_diffusal_blade', 'item_bullwhip',
	'item_ethereal_blade', 'item_dagon_5', 'item_heavens_halberd', 'item_veil_of_discord', 'item_urn_of_shadows', 'item_spirit_vessel',
	'item_medallion_of_courage', 'item_solar_crest', 'item_pipe', 'item_hood_of_defiance', 'item_eternal_shroud', 'item_lotus_orb',
	'item_black_king_bar', 'item_harpoon', 'item_essence_ring', 'item_blade_mail', 'item_shivas_guard', 'item_crimson_guard',
	'item_ancient_janggo', 'item_ex_machina', 'item_revenants_brooch', 'item_bloodstone'
	];
    //const abilities = ['storm_spirit_static_remnant', 'storm_spirit_electric_vortex', 'storm_spirit_overload', 'storm_spirit_ball_lightning'];
    const linkBreakers = [
        'item_dagon_5', 'item_heavens_halberd', 'item_diffusal_blade', 'item_disperser', 'item_harpoon', 'item_force_staff',
		'item_cyclone', 'item_rod_of_atos', 'item_abyssal_blade', 'item_orchid', 'item_bloodthorn', 'item_sheepstick',
		'item_nullifier', 'item_ethereal_blade', 'item_force_boots', 'item_book_of_shadows'
    ];
	
	// Creación del toggle isUiEnabled
	let isUiEnabled = Menu.AddToggle(path_, 'Enable', true);
	let KeyBindOrderAgresive = Menu.AddKeyBind(path_, 'Key', Enum.ButtonCode.KEY_NONE);
	let menu_ItemsList = CreateMultiSelect(path_, 'Items', item_Images, true);
	
	let menu_AbilitiesList = Menu.AddMultiSelect(path_, 'Spells', ['panorama/images/spellicons/morphling_waveform_png.vtex_c', 'panorama/images/spellicons/morphling_adaptive_strike_agi_png.vtex_c', 'panorama/images/spellicons/morphling_adaptive_strike_str_png.vtex_c', 'panorama/images/spellicons/morphling_replicate_png.vtex_c'], [true, true, true, true])
		.OnChange((state) => {menu_AbilitiesList = state.newValue;})
		.GetValue();
				
	let menu_LinkensItems = CreatePrioritySelect([...path_, 'Linkens Breaker Settings'], 'Linkens Breaker', linkBreakers, true);
	
	
	
	let KeyBindPanel = Menu.AddKeyBind(path_1, 'Panel Open', Enum.ButtonCode.KEY_NONE);
	
	let ShiftEnabled = Menu.AddToggle(path_2, 'Enable', true);
	
	let HealthUI = Menu.AddSlider(path_2, 'HP % less Automatic', 1, 100, 30)
	.OnChange(state => HealthUI = state.newValue)
	.GetValue();
	
	
	Menu.SetImage(['Custom Scripts', 'Heroes'], '~/menu/40x40/heroes.png');
    //Menu.SetImage(['Custom Scripts', 'Heroes', 'Agility']).SetImage('panorama/images/primary_attribute_icons/primary_attribute_icon_agility_psd.vtex_c');
    Menu.SetImage(path_, 'panorama/images/heroes/icons/npc_dota_hero_morphling_png.vtex_c');
	Menu.GetFolder([...path_, 'Linkens Breaker Settings']).SetImage('panorama/images/hud/reborn/minimap_gemdrop_psd.vtex_c');
	Menu.SetImage(path_1, 'panorama/images/spellicons/morphling_replicate_png.vtex_c');
	Menu.SetImage(path_2, 'panorama/images/spellicons/morphling_morph_str_png.vtex_c');


	
	
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
	
	function CreateMultiSelect(path, name, iconsArray, default_value = true) {
		let icons = [];
		for (let q of iconsArray) {
			icons.push(GetImagesPath(q));
		}
		let a = Menu.AddMultiSelect(path, name, icons, default_value);

		return {
			GetOption: () => {
				return a;
			},
			IsEnabled: (name) => {
				let n = name;
				if (typeof name === 'object') {
					if (name.GetEntityName()) {
						n = name.GetEntityName();
					}
					if (name.GetName()) {
						n = name.GetName();
					}
				}
				return a.GetValue()[iconsArray.indexOf(n)];
			}
		};
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
	
	function GetNearHeroInRadius(vector, radius = 1000) {
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
	
	
	MorphlingUltiAbuse.OnEntityKilled = (event) =>{
		if (localHero && isUiEnabled.GetValue()) {
			if (localHero.GetUnitName() !== "npc_dota_hero_morphling") {
				return;
			}
			console.log("funciona",event)
			let killedUnit = EntIndexToHScript(event.entindex_killed);
			console.log("enemigo",killedUnit)
			// Comprueba si la entidad asesinada es un héroe enemigo
			if( killedUnit.IsHero() && killedUnit.GetTeamNumber() !== event.attacker.GetTeamNumber() ){
				console.log("¡Has matado a un héroe enemigo!",killedUnit)
			//Realiza acciones adicionales aquí, como actualizar el puntaje del jugador o reproducir efectos visuales y de sonido
			}
		}
	}
	
	MorphlingUltiAbuse.OnDraw = () => {
        if (localHero && isUiEnabled.GetValue()) {
			if (localHero.GetUnitName() !== "npc_dota_hero_morphling") {
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

	// Definición de la función OnUpdate
	MorphlingUltiAbuse.OnUpdate = () => {
			
        if (localHero && isUiEnabled.GetValue()) {			
			if (localHero.GetUnitName() !== "npc_dota_hero_morphling") {
				return;
			}
			
			let [sizescrx,sizescry] = Renderer.GetScreenSize();
			let xposG = sizescrx/2-100;
			let yposG = sizescry/2-100;
			let Xtemp = sizescrx/2-100;

			let sizeBarxG = 120 / 3 * 0.75;
			let sizeBaryG = sizeBarxG*0.9; 

		
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
			
			
			for (let hero of enemyList) {

				if (hero) {
		

					let heroNAME = hero.GetUnitName();
					let IdHERO = hero.GetPlayerID();
					let keyHero = IdHERO + heroNAME;
					// Si la habilidad no está en la lista, agregarla
					if (!EnemeyDraw[keyHero]) {
						EnemeyDraw[keyHero] = [IdHERO, heroNAME, 0, 0, true];
					}

					// Actualizar la posición de la habilidad en la lista
					EnemeyDraw[keyHero][2] = xposG;
					EnemeyDraw[keyHero][3] = yposG;
				
					xposG = xposG + sizeBarxG+5;
					for (let i = 0; i < 5; i++) {
						let ability = hero.GetAbilityByIndex(i);
						//console.log(ability);
						if (ability != null) {
							let AbilNAME = ability.GetName();
							
							let key = IdHERO+ heroNAME + AbilNAME;

							// Si la habilidad no está en la lista, agregarla
							if (!cooldowns[key]) {
								cooldowns[key] = [IdHERO, heroNAME, AbilNAME, 0, 0, false, true];
							}

							// Actualizar la posición de la habilidad en la lista
							cooldowns[key][3] = xposG;
							cooldowns[key][4] = yposG;


							if (!ability.IsPassive()) {
								const behaviorR = ability.GetBehavior();
								if (ability.IsExist() && AbilNAME !== "generic_hidden" && !(behaviorR & Enum.AbilityBehavior.DOTA_ABILITY_BEHAVIOR_TOGGLE)) {
									cooldowns[key][5] = true;
								}
							} else{

								cooldowns[key][5] = false;
							}
								
							xposG = xposG + sizeBarxG;
						}
					}
					yposG = yposG + sizeBaryG;
					xposG = Xtemp;
				}
			}
		
			if (KeyBindOrderAgresive.IsKeyDown()) {
				
				if (comboTarget && !comboTarget.IsAlive()){
						comboTarget = null;
				}
				
				let Waveform = localHero.GetAbilityByIndex(0);
				let AdaptiveStrike_AGI = localHero.GetAbilityByIndex(1);
				let AdaptiveStrike_STR = localHero.GetAbilityByIndex(2);
				let Ultimate = localHero.GetAbilityByIndex(5);
				let SheepstickHexx = localHero.GetItem('item_sheepstick', true);
				
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
				
					let MyModBkb = localHero.HasModifier("modifier_black_king_bar_immune");
					
					if (comboTarget && comboTarget.HasModifier('modifier_item_blade_mail_reflect') && !MyModBkb) {
						let bkbItemMy = localHero.GetItem('item_black_king_bar', true);
						if(menu_ItemsList.IsEnabled('item_black_king_bar') && bkbItemMy && CustomCanCast(bkbItemMy) && TargetInRadius(comboTarget, 1000, localHero)){
							bkbItemMy.CastNoTarget();
						} else{
							SendOrderMovePos(Input.GetWorldCursorPos(), localHero);
							return;
						}
                    }
					
					if (comboTarget && comboTarget.HasModifier("modifier_item_lotus_orb_active") && !MyModBkb) {
						let bkbItemMy = localHero.GetItem('item_black_king_bar', true);
						if(menu_ItemsList.IsEnabled('item_black_king_bar') && bkbItemMy && CustomCanCast(bkbItemMy) && TargetInRadius(comboTarget, 1000, localHero)){
							bkbItemMy.CastNoTarget();
						} else{
							myPlayer.PrepareUnitOrders(Enum.UnitOrder.DOTA_UNIT_ORDER_ATTACK_TARGET, comboTarget, null, null, Enum.PlayerOrderIssuer.DOTA_ORDER_ISSUER_CURRENT_UNIT_ONLY, localHero, false, true);	
							return;
						}
                    }

					if (comboTarget && comboTarget.IsExist()) {		
					
						const localHeroPosition = localHero.GetAbsOrigin();
						const attackRange = localHero.GetAttackRange();
						const enemyHeroPosition = comboTarget.GetAbsOrigin();
						const dist = localHeroPosition.Distance(enemyHeroPosition)-58;
						const dist2 = enemyHeroPosition.sub(localHeroPosition).Length()
					
						let ModifierReplicate = localHero.HasModifier("modifier_morphling_replicate_manager"); //  replicate tiempo o duracion
						let ModifierNormal = localHero.HasModifier("modifier_morphling_morph"); //
						let ModifierHybrid = localHero.HasModifier("modifier_morphling_replicate"); //
						//modifier_morphling_morph /// Normal
						//modifier_morphling_replicate  Tranformado
						//let Abilulti = localHero.GetAbilityByIndex(5)
						//let AbilHybrid = localHero.GetAbilityByIndex(6)
						
						//console.log(Abilulti.GetName());
						//console.log(AbilHybrid.GetName());
						
						if (ModifierReplicate && ModifierHybrid) {
							for (let i = 0; i < 5; i++) {
								let AbilHybrid = localHero.GetAbilityByIndex(i);
								
								if(AbilHybrid != null) {
									
									let AbilHybridName = AbilHybrid.GetName();
							
									for (let key in cooldowns) {
										let abilityList = cooldowns[key];
										if (abilityList[2] === AbilHybridName && abilityList[5] === true && abilityList[6] === true)  {

											if (AbilHybrid && AbilHybrid.IsExist() && AbilHybrid.CanCast() && AbilHybrid.IsCastable(localHero.GetMana()) && localHero.GetMana() >= AbilHybrid.GetManaCost()){
																					
												const behavior = AbilHybrid.GetBehavior();
												if ((behavior & Enum.AbilityBehavior.DOTA_ABILITY_BEHAVIOR_NO_TARGET) && !(behavior & Enum.AbilityBehavior.DOTA_ABILITY_BEHAVIOR_TOGGLE)) {
													// La habilidad es activable.
													console.log("La habilidad es activable.");
													let aoe_radius = AbilHybrid.GetLevelSpecialValueFor("radius");
													let AttackRangeBasic = localHero.GetAttackRange();
													let AttackRangeBuff = localHero.GetAttackRangeBonus();
													let RangeAttackMax = AttackRangeBasic + AttackRangeBuff;														

													let castRange = 0;
													if(aoe_radius > 0){
														castRange = aoe_radius;
													} else {
														castRange = RangeAttackMax;
													}
																										
													if (comboTarget.IsPositionInRange(localHero.GetAbsOrigin(), castRange, 0)) {
														let maxCharges = AbilHybrid.GetLevelSpecialValueFor("max_charges");
														
														if(maxCharges > 0){
															let Charges = AbilHybrid.GetLevelSpecialValueFor("charge_restore_time");
															console.log("rest counter ",Charges);
															if(0 >= Charges){
																AbilHybrid.CastNoTarget();
															}
														} else{
															AbilHybrid.CastNoTarget();
														}
														
													}
												} else if (behavior & Enum.AbilityBehavior.DOTA_ABILITY_BEHAVIOR_UNIT_TARGET) {
													const targetTeam = AbilHybrid.GetTargetTeam();
													if (targetTeam & Enum.TargetTeam.DOTA_UNIT_TARGET_TEAM_FRIENDLY) {
														// La habilidad es de tipo con objetivo y se puede usar en unidades aliadas, incluyéndose a uno mismo.
														console.log("Cast Aliados y yo");
														AbilHybrid.CastTarget(localHero);
													} else if (targetTeam & Enum.TargetTeam.DOTA_UNIT_TARGET_TEAM_ENEMY) {
														// La habilidad es de tipo con objetivo y solo se puede usar en unidades enemigas.
														let  castRange = AbilHybrid.GetCastRange();
														//let castRangeBonus = localHero.GetCastRangeBonus();
														if (TargetInRadius(comboTarget, castRange, localHero)) {
															console.log("Cast Enemigos");
															AbilHybrid.CastTarget(comboTarget);
														}
													}
												} else if (behavior & Enum.AbilityBehavior.DOTA_ABILITY_BEHAVIOR_POINT) {
													// La habilidad es de tipo con objetivo y requiere una ubicación en el mapa.
													console.log("Casteo en una posicion");
													//console.log(AbilHybrid.GetLevelSpecialValueFor("speed"));
													
													let  castRange = AbilHybrid.GetCastRange();
													if (TargetInRadius(comboTarget, castRange, localHero)) {
													
														
														
														let speedUlti = AbilHybrid.GetLevelSpecialValueFor("speed");
														let travel_time = 0;
														if(speedUlti > 0){
															travel_time = castRange / (speedUlti + 1);
														}	else{
															travel_time = 0.1;
														}
														const castpointTimee = AbilHybrid.GetCastPoint();
														const delay = travel_time + castpointTimee;
														const BestPost = GetPredictedPosition(comboTarget, delay);
														//const BestPost = Post.add(new Vector(50, 50, 0));
														//console.log(speedUlti);
														//console.log(castpointTimee);
														
														myPlayer.PrepareUnitOrders( Enum.UnitOrder.DOTA_UNIT_ORDER_CAST_POSITION,null,BestPost,AbilHybrid, Enum.PlayerOrderIssuer.DOTA_ORDER_ISSUER_CURRENT_UNIT_ONLY, localHero);

													}
													
													
												} else if (behavior & Enum.AbilityBehavior.DOTA_ABILITY_BEHAVIOR_DIRECTIONAL) {
													// La habilidad es de tipo direccional.
													console.log("Casteo en una dirección");
													let  castRange = AbilHybrid.GetCastRange();
													if (TargetInRadius(comboTarget, castRange, localHero)) {
														const localHePos = localHero.GetAbsOrigin();
														const enemyHePos = comboTarget.GetAbsOrigin();
														const Idealdirection = (enemyHePos.sub(localHePos)).Normalized();
														let IdealPosition = enemyHePos.add(Idealdirection.mul(new Vector(100, 100, 0)));
													
														const travel_time = 0.1;
														const castpointTimee = AbilHybrid.GetCastPoint();
														const delay = travel_time + castpointTimee;
														const BestPost = GetPredictedPosition(comboTarget, delay);
													
														myPlayer.PrepareUnitOrders(30, null, localHePos, AbilHybrid, Enum.PlayerOrderIssuer.DOTA_ORDER_ISSUER_HERO_ONLY, localHero);
														AbilHybrid.CastPosition(enemyHePos);
														setTimeout(function() {}, 300);
													}
												}
											
											}
										}
									}
								}
							}
						}
						
						if (menu_AbilitiesList[0]) {
                            
                            if (Waveform && Waveform.IsExist() && Waveform.CanCast() && ModifierNormal) {
								let  castRange = Waveform.GetCastRange();
								let castRangeBonus = localHero.GetCastRangeBonus();
								let castRangeTotal =  castRange + castRangeBonus;
                                if (comboTarget.IsPositionInRange(localHero.GetAbsOrigin(), castRangeTotal, 0)) {
									
									//console.log(Waveform.GetLevelSpecialValueFor("speed"));
									
									let speedUlti = Waveform.GetLevelSpecialValueFor("speed");
									
									const travel_time = castRangeTotal / (speedUlti + 1);
									const castpointTimee = Waveform.GetCastPoint();
									const delay = travel_time + castpointTimee;
									const BestPost = GetPredictedPosition(comboTarget, delay);
									//const BestPost = Post.add(new Vector(50, 50, 0));
									
									
                                    myPlayer.PrepareUnitOrders( Enum.UnitOrder.DOTA_UNIT_ORDER_CAST_POSITION,null,BestPost,Waveform, Enum.PlayerOrderIssuer.DOTA_ORDER_ISSUER_CURRENT_UNIT_ONLY, localHero);

                                }
							}
                        }


						if (menu_AbilitiesList[1]) {
                            
                            if (AdaptiveStrike_AGI && AdaptiveStrike_AGI.IsExist() && AdaptiveStrike_AGI.CanCast() && ModifierNormal) {
								let  castRange = AdaptiveStrike_AGI.GetCastRange();
								let castRangeBonus = localHero.GetCastRangeBonus();
								let castRangeTotal =  castRange + castRangeBonus;
                                if (comboTarget.IsPositionInRange(localHero.GetAbsOrigin(), castRangeTotal, 0)) {
									AdaptiveStrike_AGI.CastTarget(comboTarget);
                                }
							}
                        }
						
						if (menu_AbilitiesList[4]) {
                            

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
						
						///console.log(localHero.IsEntityInRange(comboTarget,600));
						//console.log("sin casco");
						//console.log(comboTarget.IsPositionInRange(localHero.GetAbsOrigin(), 600, 0));

						let EnemiP = comboTarget.GetAbsOrigin();
						let MiheroP = localHero.GetAbsOrigin();	
						let distHR = Math.floor(Dist2D(MiheroP, EnemiP)-40);
						
						let AttackRangeBasicHR = localHero.GetAttackRange();
						let AttackRangeBuffHR = localHero.GetAttackRangeBonus();
						let RangeAttackMaxHR = AttackRangeBasicHR + AttackRangeBuffHR;	
						
						//console.log("Rango ",RangeAttackMaxHR);
						//console.log("Dist ",distHR);

						
						if ( RangeAttackMaxHR > distHR ) {
							myPlayer.PrepareUnitOrders(order, target, null, null, Enum.PlayerOrderIssuer.DOTA_ORDER_ISSUER_CURRENT_UNIT_ONLY, localHero, false, true);
						} else{	
							//let posHR = MiheroP.add(new Vector(distHR - RangeAttackMaxHR+20).Rotated(GetAngleToPos(MiheroP, EnemiP)));
							myPlayer.PrepareUnitOrders(Enum.UnitOrder.DOTA_UNIT_ORDER_MOVE_TO_POSITION, null, EnemiP, null, Enum.PlayerOrderIssuer.DOTA_ORDER_ISSUER_CURRENT_UNIT_ONLY, localHero, false, true);
						}
					}
				}
				
				
			} else{
				comboTarget = null;
			}

			
			
			// ===== Funcion Opcion Panel =========
			if (ShiftEnabled.GetValue()) {
				
				if (!localHero.IsAlive() || localHero.IsSilenced() || localHero.HasState(Enum.ModifierState.MODIFIER_STATE_HEXED) || localHero.HasState(Enum.ModifierState.MODIFIER_STATE_MUTED)) {
					return;
				}
				
				let HpThreshold = HealthUI/100;
				const myMana = localHero.GetMana();
				const morph2 = localHero.GetAbilityByIndex(4);

				if (localHero.IsStunned() || localHero.HasModifier("modifier_legion_commander_duel") || localHero.HasModifier("modifier_axe_berserkers_call") || localHero.HasModifier("modifier_faceless_void_chronosphere") || localHero.HasModifier("modifier_enigma_black_hole_pull") || localHero.GetHealth() <= localHero.GetMaxHealth() * HpThreshold) {
					if (morph2 && morph2.IsCastable(myMana) && !morph2.GetToggleState()) {
						morph2.Toggle(true);
					}
				}
			}



			// ===== Funcion Opcion Panel =========
			if (KeyBindPanel.IsKeyDownOnce()) {
				isMonitoring = !isMonitoring; // Cambia el valor de isMonitoring a su opuesto
				//console.log(isMonitoring);
			}

			if (isMonitoring) {
				monitorizarHabilidadesMorphling();
			}
			
			// ===== Particula Kill =========
			//particleKill 
			
				
        }
    };	

	function monitorizarHabilidadesMorphling() {
		let [sizescrx,sizescry] = Renderer.GetScreenSize();
		let xpos = sizescrx/2-100;
		let ypos = sizescry/2-100;

		let sizeBarx = 120 / 3 * 0.75;
		let sizeBary = sizeBarx*0.9; 
		
		let PANEL_WIDTH = sizeBarx*6;
		let PANEL_HEIGHT = sizeBary*5;
		
		let font2 = Renderer.LoadFont("Tahoma", 15, Enum.FontWeight.EXTRABOLD);
		let font = Renderer.LoadFont("Tahoma", 10, Enum.FontWeight.EXTRABOLD);
		let font1 = Renderer.LoadFont("Tahoma", 8, Enum.FontWeight.EXTRABOLD);		
		
		let imgMorph = Renderer.LoadImage("panorama/images/loadingscreens/skadi_rising_loading_screen/loadingscreen_tga.vtex_c");
		let imgclose = Renderer.LoadImage("panorama/images/control_icons/x_close_png.vtex_c");
		
		Renderer.SetDrawColor(255, 255, 255, 255);
		Renderer.DrawImage(imgMorph, Math.ceil(xpos)-130, Math.ceil(ypos)-60, PANEL_WIDTH+260, PANEL_HEIGHT+140);
		Renderer.DrawImage(imgclose, Math.ceil(xpos)+250, Math.ceil(ypos)-60, 10, 10);
		Renderer.SetDrawColor(0, 0, 0, 150);
		Renderer.DrawFilledRect( Math.ceil(xpos)-130, Math.ceil(ypos)-60, PANEL_WIDTH+260, PANEL_HEIGHT+140);
		Renderer.SetDrawColor(255, 255, 255, 255);
		Renderer.DrawText(font2, Math.ceil(xpos)+50, Math.ceil(ypos)-35, "Ability Cast Select");
			
		
		//Dibujar Heroes en x y
		for (const key in EnemeyDraw) {
			const enemyListDraw = EnemeyDraw[key];
			const HeroIcon = enemyListDraw[1];
			const peX = enemyListDraw[2];
			const peY = enemyListDraw[3];

			let imageHeroIcon = Renderer.LoadImage("panorama/images/heroes/icons/" + HeroIcon + "_png.vtex_c");
			Renderer.SetDrawColor(255, 255, 255, 255);
			Renderer.DrawImage(imageHeroIcon, Math.ceil(peX), Math.ceil(peY), Math.ceil(sizeBarx), Math.ceil(sizeBary));
			Renderer.SetDrawColor(120, 0, 255, 255);
			Renderer.DrawOutlineRect(Math.ceil(peX), Math.ceil(peY), Math.ceil(sizeBarx), Math.ceil(sizeBary));
	
		}
		
		//Bibujar Iconos de habilidades
		for (const key in cooldowns) {
			const cooldown = cooldowns[key];
			const AbilID = cooldown[2];			
			const pX = cooldown[3];
			const pY = cooldown[4];
			let abilityImageHandle = Renderer.LoadImage("panorama/images/spellicons/" + AbilID + "_png.vtex_c");
			
			if (cooldown[5]) {
				Renderer.SetDrawColor(255, 255, 255, 255);
				Renderer.DrawImage(abilityImageHandle, Math.ceil(pX), Math.ceil(pY), Math.ceil(sizeBarx), Math.ceil(sizeBary));
												
				if (cooldown[6]) {
					Renderer.SetDrawColor(0, 255, 0, 255);
					Renderer.DrawOutlineRect(Math.ceil(pX), Math.ceil(pY), Math.ceil(sizeBarx), Math.ceil(sizeBary));
					Renderer.DrawOutlineRect(Math.ceil(pX)+1, Math.ceil(pY)+1, Math.ceil(sizeBarx)-2, Math.ceil(sizeBary)-2);					
				} else {
					Renderer.SetDrawColor(92, 92, 92, 150);
					Renderer.DrawFilledRect( Math.ceil(pX), Math.ceil(pY), Math.ceil(sizeBarx), Math.ceil(sizeBary));
					Renderer.SetDrawColor(255, 0, 0, 255);
					Renderer.DrawOutlineRect(Math.ceil(pX), Math.ceil(pY), Math.ceil(sizeBarx), Math.ceil(sizeBary));
					Renderer.DrawOutlineRect(Math.ceil(pX)+1, Math.ceil(pY)+1, Math.ceil(sizeBarx)-2, Math.ceil(sizeBary)-2);					
				}
			} else{
				Renderer.SetDrawColor(255,255, 255, 255);
				Renderer.DrawImage(abilityImageHandle, Math.ceil(pX), Math.ceil(pY), Math.ceil(sizeBarx), Math.ceil(sizeBary));
				Renderer.SetDrawColor(0,0, 0, 150);
				Renderer.DrawFilledRect( Math.ceil(pX), Math.ceil(pY), Math.ceil(sizeBarx), Math.ceil(sizeBary));
				
			}
		}		
		
		
		
		//let lastClickTime = 0; // se declara la variable lastClickTime aquí
		for (const key in cooldowns) {
			const cooldown = cooldowns[key];
			const pX = cooldown[3];
			const pY = cooldown[4];
			const AbilID = cooldown[2];
			let cond = cooldown[6];
			if (cooldown[5]) {
				// Si la habilidad está siendo monitorizada, crea un botón
				if (Input.IsCursorInRect(pX, pY, sizeBarx, sizeBary)) {
					if (Input.IsKeyDownOnce(Enum.ButtonCode.MOUSE_LEFT)) {

						// Cambiar el valor de cond
						cond = !cond;
						cooldown[6] = cond;
						//console.log(cond);

					}
				}

			}
		}
		
	}	
	
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
		return Math.max(mod.GetDieTime() - GameRules.GetGameTime(), 0);
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
		return Math.max(mod.GetDieTime() - GameRules.GetGameTime(), 0);
	}
	// radius Rdio de Casteo
	function BestPosition(EnemiInRadius, radius) {
		if (!EnemiInRadius || EnemiInRadius.length <= 0) return null;
		let enemyNum = EnemiInRadius.length;

		if (enemyNum == 1) return EnemiInRadius[0].GetAbsOrigin();

		let maxNum = 1;
		let bestPos = EnemiInRadius[0].GetAbsOrigin();
		for (let i = 0; i < enemyNum - 1; i++) {
			for (let j = i + 1; j < enemyNum; j++) {
				let pos1 = EnemiInRadius[i].GetAbsOrigin();
				let pos2 = EnemiInRadius[j].GetAbsOrigin();
				let mid = pos1.add(pos2).Scaled(0.5);

				let heroesNum = 0;
				for (let k = 0; k < enemyNum; k++) {
					if (EnemiInRadius[k].IsPositionInRange( mid, radius, 0)) {
						heroesNum++;
					}
				}

				if (heroesNum > maxNum) {
					maxNum = heroesNum;
					bestPos = mid;
				}
			}
		}

		return bestPos;
	}	
	
	// 2 .- ====   Funcion para calcular distancia2D
	function Dist2D(vec1, vec2) {
		if (vec1 && vec2) {
			let pos1 = (vec1.x ? (vec1) : (vec1.GetAbsOrigin ? (vec1.GetAbsOrigin()) : (0)));
			let pos2 = (vec2.x ? (vec2) : (vec2.GetAbsOrigin ? (vec2.GetAbsOrigin()) : (0)));
			return pos1 && pos2 && pos1.sub(pos2).Length2D();
		}
		return -1;
	}

	// 3 .- ====   Funcion POSICION DEL ANGULO
	function IsntUndefined(value, withfalse) {
		return withfalse ? (value !== false) : value !== undefined && value !== null;
	}
	
	function GetAngleToPos(_e1, _e2, prefer = _e2, inrad) {
		let [a, b] = [IsntUndefined(_e1.x) ? _e1 : _e1.GetAbsOrigin(), IsntUndefined(_e2.x) ? _e2 : _e2.GetAbsOrigin()];
		if (prefer == _e1) {
			[a, b] = [b, a];
		}
		let atan2 = Math.atan2(b.y - a.y, b.x - a.x);
		return inrad ? atan2 : (atan2 * (180 / Math.PI));
	}
	
	// Definición de la función OnScriptLoad
	MorphlingUltiAbuse.OnScriptLoad = MorphlingUltiAbuse.OnGameStart = () => {
		localHero = EntitySystem.GetLocalHero();
	    myPlayer = EntitySystem.GetLocalPlayer();
		enemyList = [];
		cooldowns = [];
		EnemeyDraw = [];
	};

	// Definición de la función OnGameEnd
	MorphlingUltiAbuse.OnGameEnd = () => {
		localHero = null;
	    myPlayer = null;
	};

	// Registro del script
	RegisterScript(MorphlingUltiAbuse);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/MorphlingUltiAbuse.ts"]();
/******/ 	
/******/ })()
;
