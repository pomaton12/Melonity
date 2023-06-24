/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/AutoSaveAlchemist.ts":
/*!**********************************!*\
  !*** ./src/AutoSaveAlchemist.ts ***!
  \**********************************/
/***/ (() => {

const AutoSaverAlchemist = {};

const PANEL_WIDTH = 65;
const PANEL_HEIGHT = 28;
let panelX = Math.floor(Renderer.GetScreenSize()[0] / 2) - Math.floor(PANEL_WIDTH / 2);
let panelY = Math.floor(Renderer.GetScreenSize()[1] / 2) - Math.floor(PANEL_HEIGHT / 2);
let isDragging = false;
let dragOffsetX = 0;
let dragOffsetY = 0;

const path_ = ['Heroes', 'Strength', 'Alchemist'];
let isUiEnabled = Menu.AddToggle(path_, 'Prueba Panel', true);


function DrawTextWithOutline(font: Renderer.Font, x: number, y: number, text: string, color: Renderer.RGBA, outlineColor: Renderer.RGBA, outlineSize: number) {
  // Dibujar el borde
  for (let offsetX = -outlineSize; offsetX <= outlineSize; offsetX++) {
    for (let offsetY = -outlineSize; offsetY <= outlineSize; offsetY++) {
      if (offsetX !== 0 || offsetY !== 0) {
        Renderer.SetDrawColor(outlineColor[0], outlineColor[1], outlineColor[2], outlineColor[3]);
        Renderer.DrawText(font, x + offsetX, y + offsetY, text, 1);
      }
    }
  }

  // Dibujar el texto
  Renderer.SetDrawColor(color[0], color[1], color[2], color[3]);
  Renderer.DrawText(font, x, y, text, 1);
}

AutoSaverAlchemist.OnUpdate = () => {
  if (!isUiEnabled.GetValue()) {
    return;
  }

  const localHero = EntitySystem.GetLocalHero();
  if (!localHero || localHero.GetUnitName() !== "npc_dota_hero_alchemist") {
    return;
  }
	const mouseP = Input.GetWorldCursorPos();
  const mousePos = Input.GetCursorPos();
  const heroPos = localHero.GetAbsOrigin();
  const distance = heroPos.Distance(mouseP);

  const manaCost = Math.floor(25 + (0.075 * localHero.GetMaxMana()) + (0.01 * localHero.GetMaxMana() * Math.floor(distance / 100)));
  const damage = 100;

  const font = Renderer.LoadFont("Tahoma", 10, Enum.FontWeight.EXTRABOLD);
  const [x, y] = [panelX + 25, panelY + 4];

  Renderer.SetDrawColor(0, 0, 0, 150);
  Renderer.DrawFilledRect(panelX, panelY, PANEL_WIDTH, PANEL_HEIGHT, 4);

  Renderer.SetDrawColor(0, 0, 0, 255);
  Renderer.DrawFilledRect(panelX + 5, panelY + 3, PANEL_WIDTH - 11, 9, 4);

  Renderer.SetDrawColor(53, 153, 220, 255);
  Renderer.DrawFilledRect(panelX + 6, panelY + 4, PANEL_WIDTH - 12, 8, 4);

  Renderer.SetDrawColor(255, 255, 255, 255);
	DrawTextWithOutline(font, x, y, "" + manaCost, [53, 153, 220, 255], [0, 0, 0, 255], 1);
  DrawTextWithOutline(font, x + 5, y + 12, "" + damage, [255, 255, 255, 255], [0, 0, 0, 255], 1);

  let imageHandle = Renderer.LoadImage("panorama/images/hud/icon_kill_png.vtex_c");
  Renderer.DrawImage(imageHandle, panelX + 7, panelY + 14, 12, 12);

  // Detectar si se mantiene presionada la tecla Control
  if (Input.IsKeyDown(Enum.ButtonCode.KEY_LCONTROL) ) {
    if (Input.IsKeyDown(Enum.ButtonCode.MOUSE_LEFT) && Input.IsCursorInRect(panelX, panelY, PANEL_WIDTH, PANEL_HEIGHT)) {
      isDragging = true;
      const mousePos = Input.GetCursorPos();
      dragOffsetX = mousePos[0] - panelX;
      dragOffsetY = mousePos[1] - panelY;
    }
  } else {
    isDragging = false;
  }

  if (isDragging) {
    const mousePos = Input.GetCursorPos();
    panelX = mousePos[0] - dragOffsetX;
    panelY = mousePos[1] - dragOffsetY;
    panelX = Math.max(panelX, 0);
    panelY = Math.max(panelY, 0);
    panelX = Math.min(panelX, Renderer.GetScreenSize()[0] - PANEL_WIDTH);
    panelY = Math.min(panelY, Renderer.GetScreenSize()[1] - PANEL_HEIGHT);
  }
};

AutoSaverAlchemist.OnScriptLoad = () => {
  const localHero = EntitySystem.GetLocalHero();
  if (localHero && localHero.GetUnitName() === "npc_dota_hero_alchemist") {
    isUiEnabled.SetValue(true);
  }
};

AutoSaverAlchemist.OnGameStart = () => {
  isUiEnabled.SetValue(true);
};

AutoSaverAlchemist.OnGameEnd = () => {
  isUiEnabled.SetValue(false);
  panelX = Math.floor(Renderer.GetScreenSize()[0] / 2) - Math.floor(PANEL_WIDTH / 2);
  panelY = Math.floor(Renderer.GetScreenSize()[1] / 2) - Math.floor(PANEL_HEIGHT / 2);
  isDragging = false;
};

RegisterScript(AutoSaverAlchemist);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/AutoSaveAlchemist.ts"]();
/******/ 	
/******/ })()
;
