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

	// Definición del array path_
	const path_ = ["Custom Scripts","Player"];

	// Creación del toggle isUiEnabled
	let isUiEnabled = Menu.AddToggle(path_, 'Skill Alert', true);


	// Definición de la función OnUpdate
	CreatePanel.OnUpdate = () => {
        if (localHero && isUiEnabled.GetValue()) {
			
			let xpos = sizescrx/2;
			let ypos = sizescry/2;
			let sizeamountx = 50;
			let visibility = 255;
			let sizeBarx = sizeamountx / 3 * 0.75;
			let sizeBary = sizeBarx * 1.2; 
			let font = Renderer.LoadFont("Tahoma", 10, Enum.FontWeight.EXTRABOLD);
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
					//console.log(hero.GetUnitName());
				
					imageHandle = Renderer.LoadImage("panorama/images/heroes/" + heroNAME + "_png.vtex_c");

					if (imageHandle) {
						Renderer.DrawImage(imageHandle, Math.ceil(xpos), Math.ceil(ypos), Math.ceil(sizeBarx), Math.ceil(sizeBary));
					}
					xpos = xpos + sizeBarx;
					for (let i = 0; i < 6; i++) {
						let ability = hero.GetAbilityByIndex(i);
						if (ability) {
							let abilityImageHandle;
							abilityImageHandle = Renderer.LoadImage("panorama/images/spellicons/" + ability.GetName() + "_png.vtex_c");

							if (abilityImageHandle) {
								Renderer.DrawImage(abilityImageHandle, Math.ceil(xpos), Math.ceil(ypos), Math.ceil(sizeBarx), Math.ceil(sizeBary));
							}
							xpos = xpos + sizeBarx;
						}
					}
					ypos = ypos + sizeBary;
					xpos = sizescrx/2;
				}
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
