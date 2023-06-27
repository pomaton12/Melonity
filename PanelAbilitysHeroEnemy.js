/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/CreatePanel.ts":
/*!**********************************!*\
  !*** ./src/CreatePanel.ts ***!
  \**********************************/
/***/ (() => {

	// Definición del objeto CreatePanel
	const CreatePanel = {};

	// Declaración de la variable localHero
	let localHero;
	let [sizescrx,sizescry] = Renderer.GetScreenSize();
	let isDragging = false;
	let dragOffsetX = 0;
	let dragOffsetY = 0;
	let xpos = sizescrx/2;
	let ypos = sizescry/2;
	let enemyList = [];
	let cooldowns = [];

	// Definición del array path_
	const path_ = ["Custom Scripts","Player"];

	// Creación del toggle isUiEnabled
	let isUiEnabled = Menu.AddToggle(path_, 'Skill Alert', true);

	// Definición de la función OnUpdate
	CreatePanel.OnUpdate = () => {
        if (localHero && isUiEnabled.GetValue()) {

			
			
				let tempX = xpos;
				let tempY = ypos;

				let sizeamountx = 120;
				let visibility = 255;
				let sizeBarx = sizeamountx / 3 * 0.75;
				let sizeBary = sizeBarx * 0.7; 
				
				let PANEL_WIDTH = sizeBarx*6;
				let PANEL_HEIGHT = sizeBary*5;

							
				//let sizeBary = sizeBarx; 
				let font = Renderer.LoadFont("Tahoma", 10, Enum.FontWeight.EXTRABOLD);
				let font1 = Renderer.LoadFont("Tahoma", 8, Enum.FontWeight.EXTRABOLD);
				
				let enemyList = [];					
				let heroes = EntitySystem.GetHeroesList();
				if (heroes) {
					for (let hero of heroes) {
						if (hero && !hero.IsIllusion() && !hero.IsMeepoClone() && hero.IsHero()  && !hero.IsSameTeam(localHero)) {
							enemyList.push(hero);
						}
					}
				}
				
				
				for (let hero of enemyList) {
					Renderer.SetDrawColor(255, 255, 255, visibility);
					if (hero) {
						let imageHandle;
						let heroNAME = hero.GetUnitName();
						let IdHERO = hero.GetPlayerID();
					
						imageHandle = Renderer.LoadImage("panorama/images/heroes/" + heroNAME + "_png.vtex_c");

						if (imageHandle) {
							let herolvl = hero.GetCurrentLevel();
							Renderer.DrawImage(imageHandle, Math.ceil(xpos), Math.ceil(ypos), Math.ceil(sizeBarx), Math.ceil(sizeBary));
							Renderer.SetDrawColor(120, 0, 255, 255);
							Renderer.DrawOutlineRect(Math.ceil(xpos), Math.ceil(ypos), Math.ceil(sizeBarx), Math.ceil(sizeBary));
							Renderer.SetDrawColor(255, 255, 0, 255);
							Renderer.DrawText(font, Math.ceil(xpos)+2, Math.ceil(ypos)+12, ""+herolvl);
						}
						xpos = xpos + sizeBarx+5;
						for (let i = 0; i < 6; i++) {
							let ability = hero.GetAbilityByIndex(i);
							//console.log(ability);
							if (ability) {
								let abilityImageHandle;
								let AbilNAME = ability.GetName();
								abilityImageHandle = Renderer.LoadImage("panorama/images/spellicons/" + AbilNAME + "_png.vtex_c");
								
								let key = IdHERO+ heroNAME + AbilNAME;

								// Si la habilidad no está en la lista, agregarla
								if (!cooldowns[key]) {
									cooldowns[key] = [IdHERO, heroNAME, AbilNAME, 0, 0];
								}

								// Actualizar la posición de la habilidad en la lista
								cooldowns[key][3] = xpos;
								cooldowns[key][4] = ypos;

								//console.log(cooldowns[key]);
								
								if (ability.GetLevel() >= 1) {
									
									if (ability.IsReady() && ability.IsActivated()) {
										Renderer.SetDrawColor(255, 255, 255, visibility);
										Renderer.DrawImage(abilityImageHandle, Math.ceil(xpos), Math.ceil(ypos), Math.ceil(sizeBarx), Math.ceil(sizeBary));
										Renderer.SetDrawColor(0, 255, 0, visibility);
										Renderer.DrawOutlineRect(Math.ceil(xpos), Math.ceil(ypos), Math.ceil(sizeBarx), Math.ceil(sizeBary));
										
										let heroMana = hero.GetMana();
										let CastManaAbility = ability.GetManaCost();
										if (CastManaAbility > heroMana){
											Renderer.SetDrawColor(255,255, 255, 255);
											Renderer.DrawImage(abilityImageHandle, Math.ceil(xpos), Math.ceil(ypos), Math.ceil(sizeBarx), Math.ceil(sizeBary));
											Renderer.SetDrawColor(0,0, 255, 150);
											Renderer.DrawFilledRect( Math.ceil(xpos), Math.ceil(ypos), Math.ceil(sizeBarx), Math.ceil(sizeBary));
											Renderer.SetDrawColor(0, 0, 255, 255);
											Renderer.DrawOutlineRect(Math.ceil(xpos), Math.ceil(ypos), Math.ceil(sizeBarx), Math.ceil(sizeBary));
											
										}
										let abilLvl = ability.GetLevel(); 
										Renderer.SetDrawColor(255, 255, 0, 255);
										Renderer.DrawText(font1, Math.ceil(xpos)+2, Math.ceil(ypos)+12, ""+abilLvl);
										
										//console.log(ability.GetAbilityCharges());
										//const cooldownRemaining = ability.GetCooldownTimeRemaining();
																		
										
									} else {
										Renderer.SetDrawColor(255,255, 255, 255);
										Renderer.DrawImage(abilityImageHandle, Math.ceil(xpos), Math.ceil(ypos), Math.ceil(sizeBarx), Math.ceil(sizeBary));
										Renderer.SetDrawColor(0,0, 255, 150);
										Renderer.DrawFilledRect( Math.ceil(xpos), Math.ceil(ypos), Math.ceil(sizeBarx), Math.ceil(sizeBary));
										Renderer.SetDrawColor(0, 0, 255, 255);
										Renderer.DrawOutlineRect(Math.ceil(xpos), Math.ceil(ypos), Math.ceil(sizeBarx), Math.ceil(sizeBary));
										
										let isVisible = hero.IsDormant() == false;

										console.log("Visible ",hero.IsVisible());
										console.log("Dormido ",hero.IsDormant());
										if (hero.IsVisible())									
											if(ability.GetCooldown()){
												let coldowmABIL = Math.floor(ability.GetCooldown());
												Renderer.SetDrawColor(255, 255, 255, visibility);
												Renderer.DrawImage(abilityImageHandle, Math.ceil(xpos), Math.ceil(ypos), Math.ceil(sizeBarx), Math.ceil(sizeBary));
												Renderer.SetDrawColor(102, 0, 0, 180);
												Renderer.DrawFilledRect( Math.ceil(xpos), Math.ceil(ypos), Math.ceil(sizeBarx), Math.ceil(sizeBary));
												Renderer.SetDrawColor(255, 0, 0, 255);
												Renderer.DrawOutlineRect(Math.ceil(xpos), Math.ceil(ypos), Math.ceil(sizeBarx), Math.ceil(sizeBary));
												Renderer.SetDrawColor(255, 255, 255, visibility);
												
												let text = "" + coldowmABIL;
												let textWidth = Renderer.GetTextSize(font, text)[0];
												let textHeight = Renderer.GetTextSize(font, text)[1];
												let textX = Math.ceil(xpos) + Math.ceil(sizeBarx / 2) - Math.ceil(textWidth / 2);
												let textY = Math.ceil(ypos) + Math.ceil(sizeBary / 2) - Math.ceil(textHeight / 2);
												Renderer.DrawText(font, textX, textY, text);
												
												cooldowns[key][5] = coldowmABIL;
												cooldowns[key][6] = GameRules.GetGameTime();
												
											}
										else{
											
											let getcooldownTim = cooldowns[key][5];
											//console.log( cooldowns[key][2]," ",getcooldownTim);
											if(getcooldownTim > 0){
												
												let lastTime = cooldowns[key][6];
												let currentTime = GameRules.GetGameTime(); 
												if(currentTime - lastTime > 1){
													getcooldownTim = getcooldownTim - 1;
													
													Renderer.SetDrawColor(255, 255, 255, visibility);
													Renderer.DrawImage(abilityImageHandle, Math.ceil(xpos), Math.ceil(ypos), Math.ceil(sizeBarx), Math.ceil(sizeBary));
													Renderer.SetDrawColor(102, 0, 0, 180);
													Renderer.DrawFilledRect( Math.ceil(xpos), Math.ceil(ypos), Math.ceil(sizeBarx), Math.ceil(sizeBary));
													Renderer.SetDrawColor(255, 0, 0, 255);
													Renderer.DrawOutlineRect(Math.ceil(xpos), Math.ceil(ypos), Math.ceil(sizeBarx), Math.ceil(sizeBary));
													Renderer.SetDrawColor(255, 255, 255, visibility);
													
													let text = "" + Math.floor(getcooldownTim);
													let textWidth = Renderer.GetTextSize(font, text)[0];
													let textHeight = Renderer.GetTextSize(font, text)[1];
													let textX = Math.ceil(xpos) + Math.ceil(sizeBarx / 2) - Math.ceil(textWidth / 2);
													let textY = Math.ceil(ypos) + Math.ceil(sizeBary / 2) - Math.ceil(textHeight / 2);
													Renderer.DrawText(font, textX, textY, text);
													
													cooldowns[key][5] = getcooldownTim;
													cooldowns[key][6] = GameRules.GetGameTime();
													
												
												}
												
											}
											
										}
																			
									}
								} else{
									Renderer.SetDrawColor(255,255, 255, 255);
									Renderer.DrawImage(abilityImageHandle, Math.ceil(xpos), Math.ceil(ypos), Math.ceil(sizeBarx), Math.ceil(sizeBary));
									Renderer.SetDrawColor(0,0, 0, 150);
									Renderer.DrawFilledRect( Math.ceil(xpos), Math.ceil(ypos), Math.ceil(sizeBarx), Math.ceil(sizeBary));
								}
								
								xpos = xpos + sizeBarx;
							}
						}
						ypos = ypos + sizeBary;
						xpos = tempX;
					}
				}
;
				//console.log(cooldowns);

				xpos = tempX;
				ypos = tempY;
				
				// Detectar si se mantiene presionada la tecla Control
				if (Input.IsKeyDown(Enum.ButtonCode.KEY_LCONTROL) ) {
					if (Input.IsKeyDown(Enum.ButtonCode.MOUSE_LEFT) && Input.IsCursorInRect(xpos, ypos, PANEL_WIDTH, PANEL_HEIGHT)) {
						isDragging = true;
						const mousePos = Input.GetCursorPos();
						dragOffsetX = mousePos[0] - xpos;
						dragOffsetY = mousePos[1] - ypos;
					}
				} else {
					isDragging = false;
				}
				
				let originalX = xpos;
				let originalY = ypos;

				if (isDragging) {
					const mousePos = Input.GetCursorPos();
					const deltaX = mousePos[0] - dragOffsetX - originalX;
					const deltaY = mousePos[1] - dragOffsetY - originalY;
					xpos += deltaX;
					ypos += deltaY;
					xpos = Math.max(xpos, 0);
					ypos = Math.max(ypos, 0);
					xpos = Math.min(xpos, Renderer.GetScreenSize()[0] - PANEL_WIDTH);
					ypos = Math.min(ypos, Renderer.GetScreenSize()[1] - PANEL_HEIGHT);
				}
			
			
					
        }
    };		
	
	
  // Definición de la función OnScriptLoad
  CreatePanel.OnScriptLoad = CreatePanel.OnGameStart = () => {
      localHero = EntitySystem.GetLocalHero();
  };

  // Definición de la función OnGameEnd
  CreatePanel.OnGameEnd = () => {
      localHero = null;
  };

  // Registro del script
  RegisterScript(CreatePanel);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/CreatePanel.ts"]();
/******/ 	
/******/ })()
;
