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
	let localHero;
	let enemyList = [];
	let cooldowns = [];

	// Definición del array path_
	const path_ = ["Custom Scripts","Morphling"];

	// Creación del toggle isUiEnabled
	let isUiEnabled = Menu.AddToggle(path_, 'Panel Hability', true);

	// Definición de la función OnUpdate
	MorphlingUltiAbuse.OnUpdate = () => {
		
        if (localHero && isUiEnabled.GetValue()) {			
			if (localHero.GetUnitName() !== "npc_dota_hero_morphling") {
				return;
			}
			let [sizescrx,sizescry] = Renderer.GetScreenSize();
			let xpos = sizescrx/2;
			let ypos = sizescry/2;
			let sizeamountx = 120;
			let visibility = 255;
			let sizeBarx = sizeamountx / 3 * 0.75;
			let sizeBary = sizeBarx*0.9; 
			
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
						Renderer.DrawImage(imageHandle, Math.ceil(xpos), Math.ceil(ypos), Math.ceil(sizeBarx), Math.ceil(sizeBary));
						Renderer.SetDrawColor(120, 0, 255, 255);
						Renderer.DrawOutlineRect(Math.ceil(xpos), Math.ceil(ypos), Math.ceil(sizeBarx), Math.ceil(sizeBary));

					}
					xpos = xpos + sizeBarx+5;
					for (let i = 0; i < 5; i++) {
						let ability = hero.GetAbilityByIndex(i);
						//console.log(ability);
						if (ability) {
							let abilityImageHandle;
							let AbilNAME = ability.GetName();
							abilityImageHandle = Renderer.LoadImage("panorama/images/spellicons/" + AbilNAME + "_png.vtex_c");
							
							let key = IdHERO+ heroNAME + AbilNAME;

							// Si la habilidad no está en la lista, agregarla
							if (!cooldowns[key]) {
								cooldowns[key] = [IdHERO, heroNAME, AbilNAME, 0, 0, false];
							}

							// Actualizar la posición de la habilidad en la lista
							cooldowns[key][3] = xpos;
							cooldowns[key][4] = ypos;

							if (ability.GetLevel() >= 1) {
								
								if (!ability.IsPassive()) {
									Renderer.SetDrawColor(255, 255, 255, visibility);
									Renderer.DrawImage(abilityImageHandle, Math.ceil(xpos), Math.ceil(ypos), Math.ceil(sizeBarx), Math.ceil(sizeBary));
									Renderer.SetDrawColor(0, 255, 0, visibility);
									Renderer.DrawOutlineRect(Math.ceil(xpos), Math.ceil(ypos), Math.ceil(sizeBarx), Math.ceil(sizeBary));
									cooldowns[key][5] = true;
								} else{
									Renderer.SetDrawColor(255, 255, 255, visibility);
									Renderer.DrawImage(abilityImageHandle, Math.ceil(xpos), Math.ceil(ypos), Math.ceil(sizeBarx), Math.ceil(sizeBary));
									Renderer.SetDrawColor(0, 255, 0, visibility);
									Renderer.DrawOutlineRect(Math.ceil(xpos), Math.ceil(ypos), Math.ceil(sizeBarx), Math.ceil(sizeBary));
									cooldowns[key][5] = false;
								}
								
							} else{
								Renderer.SetDrawColor(255,255, 255, 255);
								Renderer.DrawImage(abilityImageHandle, Math.ceil(xpos), Math.ceil(ypos), Math.ceil(sizeBarx), Math.ceil(sizeBary));
								Renderer.SetDrawColor(0,0, 0, 150);
								Renderer.DrawFilledRect( Math.ceil(xpos), Math.ceil(ypos), Math.ceil(sizeBarx), Math.ceil(sizeBary));
								cooldowns[key][5] = false;
							}
							
							xpos = xpos + sizeBarx;
						}
					}
					ypos = ypos + sizeBary;
					xpos = sizescrx/2;
				}
			}
			
			let buttonPressed = false; 
			for (const key in cooldowns) {
				const cooldown = cooldowns[key];
				const pX = cooldown[3];
				const pY = cooldown[4];
				const AbilID = cooldown[2];
				
				if (cooldown[5]) {
					// Si la habilidad está siendo monitorizada, crea un botón
					if (Input.IsKeyDownOnce(Enum.ButtonCode.MOUSE_LEFT) && Input.IsCursorInRect(pX, pY, sizeBarx, sizeBary)) {
						// Si se hace clic en el botón, realiza alguna acción
						    if (!buttonPressed) {
								buttonPressed = true;
								console.log(AbilID);
								console.log("hola bb");
							}
					} else {
						// Si se suelta el botón, marca el botón como no presionado
						buttonPressed = false;
					}

				}
			}
        }
    };		
	
	
  // Definición de la función OnScriptLoad
  MorphlingUltiAbuse.OnScriptLoad = MorphlingUltiAbuse.OnGameStart = () => {
      localHero = EntitySystem.GetLocalHero();
  };

  // Definición de la función OnGameEnd
  MorphlingUltiAbuse.OnGameEnd = () => {
      localHero = null;
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
