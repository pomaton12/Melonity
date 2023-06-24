/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/AutoSaverAlchemist.ts":
/*!**********************************!*\
  !*** ./src/AutoSaverAlchemist.ts ***!
  \**********************************/
/***/ (() => {

	// Definición del objeto AutoSaverAlchemist
	const AutoSaverAlchemist = {};
	
let isDragging = false;
let dragOffsetX = 0;
let dragOffsetY = 0;

const panelWidth = 65;
const panelHeight = 28;
let panelX = Math.floor(Renderer.GetScreenSize()[0] / 2) - Math.floor(panelWidth / 2);
let panelY = Math.floor(Renderer.GetScreenSize()[1] / 2) - Math.floor(panelHeight / 2);

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

    // Obtener la posición del mouse
    const mousePos = Input.GetWorldCursorPos();
    const heroPos = localHero.GetAbsOrigin();
    const distance = heroPos.Distance(mousePos);

    // Calcular el costo de maná por distancia recorrida
    const manaCost = Math.floor(25 + (0.075 * localHero.GetMaxMana()) + (0.01 * localHero.GetMaxMana() * Math.floor(distance / 100)));

    // Calcular el daño por distancia recorrida
    //const damage = Math.floor((8 + (4 * localHero.GetAbilityByIndex(5).GetLevel())) * Math.floor(distance / 100));
    const damage = 100;
    const font = Renderer.LoadFont("Tahoma", 10, Enum.FontWeight.EXTRABOLD);
	const [x, y, visible] = Renderer.WorldToScreen(mousePos);
    // Dibujar el panel
    Renderer.SetDrawColor(0, 0, 0, 150);  
    Renderer.DrawFilledRect(panelX, panelY, panelWidth, panelHeight, 4);

    Renderer.SetDrawColor(0, 0, 0, 255);  
    Renderer.DrawFilledRect(panelX + 5, panelY + 3, panelWidth - 11, 9, 4);                    

    Renderer.SetDrawColor(53, 153, 220, 255);  
    Renderer.DrawFilledRect(panelX + 6, panelY + 4, panelWidth - 12, 8, 4);

    Renderer.SetDrawColor(255, 255, 255, 255);
    Renderer.DrawText(font, panelX + 25, panelY + 4, "" + manaCost, 1);
    Renderer.DrawText(font, panelX + 30, panelY + 16, "" + damage, 1);

    Renderer.SetDrawColor(255, 255, 255, 255);
    let imageHandle = Renderer.LoadImage("panorama/images/hud/icon_kill_png.vtex_c");
    Renderer.DrawImage(imageHandle, panelX + 7, panelY + 14, 12, 12);

    // Agregar evento de clic y arrastre al panel
    if (Input.IsKeyDown(Enum.ButtonCode.KEY_LCONTROL) && Input.IsKeyDown(Enum.ButtonCode.MOUSE_LEFT) && Input.IsCursorInRect(panelX, panelY, panelWidth, panelHeight)) {
      if (!isDragging) {
        isDragging = true;
        dragOffsetX = x- panelX;
        dragOffsetY = y - panelY;
      } else {
        panelX = x - dragOffsetX;
        panelY = y - dragOffsetY;
      }
    } else {
      isDragging = false;
    }
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
