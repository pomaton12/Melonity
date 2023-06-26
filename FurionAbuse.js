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
	let [sizescrx,sizescry] = Renderer.GetScreenSize()

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
			let font = Renderer.loadFont("Tahoma", 12, "EXTRABOLD");
			
			for (let hero of player) {
				Renderer.setDrawColor(255, 255, 255, visibility);
				if (hero[1] && heroesContains(hero[1])) {
					let imageHandle;
					if (!heroicon[hero[1]]) {
						heroicon[hero[1]] = Renderer.loadImage("resource/flash3/images/heroes/selection/" + getUnitName(hero[1]) + ".png");
					}
					imageHandle = heroicon[hero[1]];
					if (imageHandle) {
						Renderer.drawImage(imageHandle, Math.ceil(xpos), Math.ceil(ypos), Math.ceil(sizeBarx), Math.ceil(sizeBary));
					}
					xpos = xpos + sizeBarx;
					for (let i = 0; i < hero.getAbilityCount(); i++) {
						let ability = hero.getAbilityByIndex(i);
						if (ability) {
							let abilityImageHandle;
							if (!abilityicon[ability]) {
								abilityicon[ability] = Renderer.loadImage("resource/flash3/images/abilities/" + ability.getName() + ".png");
							}
							abilityImageHandle = abilityicon[ability];
							if (abilityImageHandle) {
								Renderer.drawImage(abilityImageHandle, Math.ceil(xpos), Math.ceil(ypos), Math.ceil(sizeBarx), Math.ceil(sizeBary));
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
