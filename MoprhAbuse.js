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
	let EnemeyDraw = [];

	let isMonitoring = false;
	let monitorKey = Enum.ButtonCode.KEY_X;
	
	// Definición del array path_
	const path_ = ["Custom Scripts","Morphling"];

	// Creación del toggle isUiEnabled
	let isUiEnabled = Menu.AddToggle(path_, 'Panel Hability', true);

	function monitorizarHabilidadesMorphling() {
		let [sizescrx,sizescry] = Renderer.GetScreenSize();
		let xpos = sizescrx/2-100;
		let ypos = sizescry/2-100;
		let Xtemp = sizescrx/2-100;
		let sizeamountx = 120;

		let sizeBarx = sizeamountx / 3 * 0.75;
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
		Renderer.DrawText(font2, Math.ceil(xpos)+40, Math.ceil(ypos)-35, "Ability Cast Select");
					

		
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

			if (hero) {

				let heroNAME = hero.GetUnitName();
				let IdHERO = hero.GetPlayerID();
				
				let keyHero = IdHERO + heroNAME;
				// Si la habilidad no está en la lista, agregarla
				if (!EnemeyDraw[keyHero]) {
					EnemeyDraw[keyHero] = [IdHERO, heroNAME, 0, 0, true];
				}

				// Actualizar la posición de la habilidad en la lista
				EnemeyDraw[keyHero][2] = xpos;
				EnemeyDraw[keyHero][3] = ypos;
			
				xpos = xpos + sizeBarx+5;
				for (let i = 0; i < 5; i++) {
					let ability = hero.GetAbilityByIndex(i);
					//console.log(ability);
					if (ability) {
						let AbilNAME = ability.GetName();
						
						let key = IdHERO+ heroNAME + AbilNAME;

						// Si la habilidad no está en la lista, agregarla
						if (!cooldowns[key]) {
							cooldowns[key] = [IdHERO, heroNAME, AbilNAME, 0, 0, false, true];
						}

						// Actualizar la posición de la habilidad en la lista
						cooldowns[key][3] = xpos;
						cooldowns[key][4] = ypos;


						if (!ability.IsPassive()) {
							if (ability.IsExist() && AbilNAME !== "generic_hidden") {
								cooldowns[key][5] = true;
							}
						} else{

							cooldowns[key][5] = false;
						}
							
						xpos = xpos + sizeBarx;
					}
				}
				ypos = ypos + sizeBary;
				xpos = Xtemp;
			}
		}
		
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
					Renderer.SetDrawColor(0,0, 0, 150);
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
			const cond = cooldown[6];
			if (cooldown[5]) {
				// Si la habilidad está siendo monitorizada, crea un botón
				if (Input.IsCursorInRect(pX, pY, sizeBarx, sizeBary)) {
					if (Input.IsKeyDownOnce(Enum.ButtonCode.MOUSE_LEFT)) {

						// Cambiar el valor de cond
						cond = !cond;
						cooldown[6] = cond;
						console.log(cond);

					}
				}

			}
		}
		
	}

	// Definición de la función OnUpdate
	MorphlingUltiAbuse.OnUpdate = () => {
			
        if (localHero && isUiEnabled.GetValue()) {			
			if (localHero.GetUnitName() !== "npc_dota_hero_morphling") {
				return;
			}

			if (Input.IsKeyDownOnce(monitorKey)) {
				isMonitoring = !isMonitoring; // Cambia el valor de isMonitoring a su opuesto
				console.log(isMonitoring);
			}

			if (isMonitoring) {
				monitorizarHabilidadesMorphling();
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
