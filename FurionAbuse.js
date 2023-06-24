/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/AutoSaverAlchemist.ts":
/*!**********************************!*\
  !*** ./src/AutoSaverAlchemist.ts ***!
  \**********************************/
/***/ (() => {

	// Definición del objeto AutoSaverAlchemist
	const AutoSaverAlchemist = {};

	// Declaración de la variable localHero
	let localHero;
	let variable1 = 0;

	// Definición del array path_
	const path_ = ['Heroes', 'Strength', 'Alchemist'];

	// Creación del toggle isUiEnabled
	let isUiEnabled = Menu.AddToggle(path_, 'Prueba Panel', true);


	// Definición de la función OnUpdate
	AutoSaverAlchemist.OnUpdate = () => {
		if (localHero && isUiEnabled.GetValue()) {
			if (localHero.GetUnitName() !== "npc_dota_hero_alchemist")
				return;
			console.log("Hola mundo");
			// Obtener la posición del mouse
			const mousePos = Input.GetWorldCursorPos();
			const heroPos = localHero.GetAbsOrigin();
			const distance = heroPos.Distance(mousePos);

			// Calcular el costo de maná por distancia recorrida
			const manaCost =  Math.floor(25 + (0.075 * localHero.GetMaxMana()) + (0.01 * localHero.GetMaxMana() * Math.floor(distance / 100)));

			// Calcular el daño por distancia recorrida
			//const damage = Math.floor((8 + (4 * localHero.GetAbilityByIndex(5).GetLevel())) * Math.floor(distance / 100));
			const damage =100;
			const font = Renderer.LoadFont("Tahoma", 10, Enum.FontWeight.EXTRABOLD);
			// Mostrar los resultados en la pantalla


			//Panel a mover si se presionar CTRL + click  en el panel   y arrastrar a cualquier parte y soltar en su nueva posicion
			let Ledsize = Renderer.GetScreenSize();
			let x = Ledsize[0]/2;
			let y = Ledsize[1]/2;

			Renderer.SetDrawColor(0, 0, 0, 150);  
			Renderer.DrawFilledRect(x, y, 65, 28, 4);

			Renderer.SetDrawColor(0, 0, 0, 255);  
			Renderer.DrawFilledRect(x+5, y+3, 65-11, 9, 4);                    

			Renderer.SetDrawColor(53, 153, 220,255);  
			Renderer.DrawFilledRect(x+6, y+4, 65-12, 8, 4);

			Renderer.SetDrawColor(255, 255, 255, 255);
			Renderer.DrawText(font,x+25, y+4, ""+manaCost, 1);
			Renderer.DrawText(font, x+30, y + 16,""+damage, 1);

			Renderer.SetDrawColor(255, 255, 255, 255);
			let imageHandle = Renderer.LoadImage("panorama/images/hud/icon_kill_png.vtex_c");
			Renderer.DrawImage(imageHandle, x+7, y+14, 12, 12);
		}
	};

	// Definición de la OnScriptLoad
	AutoSaverAlchemist.OnScriptLoad = AutoSaverAlchemist.OnGameStart = () => {
		localHero = EntitySystem.GetLocalHero();
	};

	// Definición de la función OnGameEnd
	AutoSaverAlchemist.OnGameEnd = () => {
		localHero = null;
	};


	// Registro del script
	RegisterScript(AutoSaverAlchemist);



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/AutoSaverAlchemist.ts"]();
/******/ 	
/******/ })()
;
