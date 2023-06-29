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
	let enemyList = [];
	
	
	let cooldowns = [];
	let EnemeyDraw = [];
	let isMonitoring = false;
	//let monitorKey = Enum.ButtonCode.KEY_X;
	
	// Definición del array path_
	const path_ = ["Custom Scripts","Heroes","Agility","Morphling"];
	const path_1 = ["Custom Scripts","Heroes","Agility","Morphling","Best Ulti Cast"];

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
	
	Menu.SetImage(['Custom Scripts', 'Heroes'], '~/menu/40x40/heroes.png');
    Menu.SetImage(['Custom Scripts', 'Heroes', 'Agility'], '~/menu/40x40/Agility.png');
    Menu.SetImage(path_, 'panorama/images/heroes/icons/npc_dota_hero_morphling_png.vtex_c');
	Menu.GetFolder([...path_, 'Linkens Breaker Settings']).SetImage('panorama/images/hud/reborn/minimap_gemdrop_psd.vtex_c');
	Menu.SetImage(path_1, 'panorama/images/spellicons/morphling_replicate_png.vtex_c');

	
	
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
								if (ability.IsExist() && AbilNAME !== "generic_hidden") {
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
									console.log(AbilHybridName);								
									

									if (AbilHybrid && AbilHybrid.IsExist() && AbilHybrid.CanCast()){
										//AbilHybrid.CastTarget(localHero);
																				
										const behavior = AbilHybrid.GetBehavior();
										if ((behavior & Enum.AbilityBehavior.DOTA_ABILITY_BEHAVIOR_NO_TARGET) && !(behavior & Enum.AbilityBehavior.DOTA_ABILITY_BEHAVIOR_TOGGLE)) {
											// La habilidad es activable.
											console.log("La habilidad es activable.");
											AbilHybrid.CastNoTarget();
										
										} else if (behavior & Enum.AbilityBehavior.DOTA_ABILITY_BEHAVIOR_UNIT_TARGET) {
											const targetTeam = AbilHybrid.GetTargetTeam();
											if (targetTeam & Enum.TargetTeam.DOTA_UNIT_TARGET_TEAM_FRIENDLY) {
												// La habilidad es de tipo con objetivo y se puede usar en unidades aliadas, incluyéndose a uno mismo.
												console.log("Cast Aliados y yo");
												AbilHybrid.CastTarget(localHero);
												
											} else if (targetTeam & Enum.TargetTeam.DOTA_UNIT_TARGET_TEAM_ENEMY) {
												// La habilidad es de tipo con objetivo y solo se puede usar en unidades enemigas.
												console.log("Cast Enemigos");
												AbilHybrid.CastTarget(comboTarget);
											}
										} else if (behavior & Enum.AbilityBehavior.DOTA_ABILITY_BEHAVIOR_POINT) {
											// La habilidad es de tipo con objetivo y requiere una ubicación en el mapa.
											console.log("Casteo en una posicion");
											AbilHybrid.CastPosition(comboTarget.GetAbsOrigin());
											
										}
										
									}
								}
							}
						}
						
						if (menu_AbilitiesList[0]) {
                            
                            if (Waveform && Waveform.IsExist() && Waveform.CanCast() && ModifierNormal) {
								let  castRange = Waveform.GetCastRange();
                                if (TargetInRadius(comboTarget, castRange, localHero)) {
									
									let speedUlti = 1250;
									
									const travel_time = castRange / (speedUlti + 1);
									const castpointTimee = 0.25;
									const delay = travel_time + castpointTimee;
									const Post = GetPredictedPosition(comboTarget, delay);
									const BestPost = Post.add(new Vector(50, 50, 0));
									
									
                                    myPlayer.PrepareUnitOrders( Enum.UnitOrder.DOTA_UNIT_ORDER_CAST_POSITION,null,BestPost,Waveform, Enum.PlayerOrderIssuer.DOTA_ORDER_ISSUER_CURRENT_UNIT_ONLY, localHero);

                                }
							}
                        }


						if (menu_AbilitiesList[1]) {
                            
                            if (AdaptiveStrike_AGI && AdaptiveStrike_AGI.IsExist() && AdaptiveStrike_AGI.CanCast() && ModifierNormal) {
								let  castRange = AdaptiveStrike_AGI.GetCastRange();
                                if (TargetInRadius(comboTarget, castRange, localHero)) {
									AdaptiveStrike_AGI.CastTarget(comboTarget);
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
						
						myPlayer.PrepareUnitOrders(order, target, null, null, Enum.PlayerOrderIssuer.DOTA_ORDER_ISSUER_CURRENT_UNIT_ONLY, localHero, false, true);
				
					}
				}
				
				
			} else{
				comboTarget = null;
			}







			if (KeyBindPanel.IsKeyDownOnce()) {
				isMonitoring = !isMonitoring; // Cambia el valor de isMonitoring a su opuesto
				//console.log(isMonitoring);
			}

			if (isMonitoring) {
				monitorizarHabilidadesMorphling();
			}
			
			
			
				
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
