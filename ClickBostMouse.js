/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/MouseBoostAbuse.ts":
/*!**********************************!*\
  !*** ./src/MouseBoostAbuse.ts ***!
  \**********************************/
/***/ (() => {

	// Definición del objeto MouseBoostAbuse
	const MouseBoostAbuse = {};

	// Declaración de la variable localHero
	let myHero = null;
    let myPlayer = null;

    let root = Panorama.GetDotaHudRoot();
    let panorama = {
        items: null,
        neutrals: null
    };

	// Definición del array path_
	const path_ = ["Custom Scripts","Utility"];

	// Creación del toggle isUiEnabled
	let isUiEnabled = Menu.AddToggle(path_, 'Mouse Boost Repeat', true);

	// Declaración de la variable mouseBoostInterval
	let mouseBoostInterval = null;
	let exOrders = [Enum.UnitOrder.DOTA_UNIT_ORDER_ATTACK_TARGET, Enum.UnitOrder.DOTA_UNIT_ORDER_ATTACK_MOVE];
    let accessOrders = [Enum.UnitOrder.DOTA_UNIT_ORDER_MOVE_TO_POSITION, Enum.UnitOrder.DOTA_UNIT_ORDER_MOVE_TO_DIRECTION, Enum.UnitOrder.DOTA_UNIT_ORDER_PICKUP_ITEM, Enum.UnitOrder.DOTA_UNIT_ORDER_PICKUP_RUNE];
  
	// Definición de la función startMouseBoost
	MouseBoostAbuse.OnPrepareUnitOrders = (event) => {
		if (myHero && isUiEnabled.GetValue()) {
			if (exOrders.includes(event.order)) {
				if (mouseBoostInterval) {
					clearInterval(mouseBoostInterval);
					mouseBoostInterval = null;
					return;
				}
			} else {
				mouseBoostInterval = setInterval((OnOrders) => {
				  
					//if (!Input.IsKeyDown(Enum.ButtonCode.MOUSE_RIGHT) || exOrders.includes(OnOrders.order)) {
					if (!Input.IsKeyDown(Enum.ButtonCode.MOUSE_RIGHT)) {
						  clearInterval(mouseBoostInterval);
						  mouseBoostInterval = null;
						  return;
					}
						
					if (Input.IsKeyDown(Enum.ButtonCode.MOUSE_RIGHT) &&  !CheckOnPanorama(panorama.items) && !CheckOnPanorama(panorama.neutrals)  && !Input.IsCursorOnMinimap() && !Engine.IsShopOpen() && !Engine.IsMenuOpen()) {	
						// Realizar el clic derecho aquí
						myPlayer.PrepareUnitOrdersStructed({
						  orderIssuer: Enum.PlayerOrderIssuer.DOTA_ORDER_ISSUER_HERO_ONLY,
						  orderType: Enum.UnitOrder.DOTA_UNIT_ORDER_MOVE_TO_POSITION,
						  position: Input.GetWorldCursorPos(),
						  entity: myHero
						});
					}
				}, 50);
			}
		}
	}

	function CheckOnPanorama(panoramaPanel) {
        if (!panoramaPanel) {
            return;
        }
        let [x, y] = panoramaPanel.GetPosition();
        let [width, height] = panoramaPanel.GetSize();
        return Input.IsCursorInRect(x, y, width, height);
    }

	// Definición de la función OnUpdate
	MouseBoostAbuse.OnUpdate = () => {
		if (myHero && isUiEnabled.GetValue()) {
			//console.log(myHero.GetCurrentOrder() );
			panorama = {
				items: root.FindChildFromPath(['Hud', 'HUDElements', 'lower_hud', 'center_with_stats', 'center_block',
				'inventory', 'inventory_items', 'inventoryContainer', 'inventory_list_container']),
				neutrals: root.FindChildFromPath(['Hud', 'HUDElements', 'lower_hud',
				'center_with_stats', 'center_block',
				'inventory_composition_layer_container'])
			};
		}
	};

	// Definición de la función OnScriptLoad
	MouseBoostAbuse.OnScriptLoad = MouseBoostAbuse.OnGameStart = () => {
	  myHero = EntitySystem.GetLocalHero();
	  myPlayer = EntitySystem.GetLocalPlayer();
	};

	// Definición de la función OnGameEnd
	MouseBoostAbuse.OnGameEnd = () => {
	  	myHero = null;
		myPlayer = null;
		panorama = {
			items: null,
			neutrals: null
		};
	};

	// Registro del script
	RegisterScript(MouseBoostAbuse);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/MouseBoostAbuse.ts"]();
/******/ 	
/******/ })()
;
