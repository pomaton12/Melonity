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
	let localHero;

	// Definición del array path_
	const path_ = ["Custom Scripts","Utility"];

	// Creación del toggle isUiEnabled
	let isUiEnabled = Menu.AddToggle(path_, 'Mouse Boost Repeat', true);


	// Definición de la función startMouseBoost
	function startMouseBoost() {
		mouseBoostInterval = setInterval(() => {
			if (!Input.IsKeyDown(Enum.ButtonCode.MOUSE_RIGHT)) {
				clearInterval(mouseBoostInterval);
				mouseBoostInterval = null;
				return;
			}
			// Realizar el clic derecho aquí
			myPlayer.PrepareUnitOrdersStructed({
				orderIssuer: event.orderIssuer,
				orderType: Enum.UnitOrder.DOTA_UNIT_ORDER_MOVE_TO_POSITION,
				position: Input.GetWorldCursorPos(),
				entity: myHero
			});
		}, 50);
	}

	// Definición de la función stopMouseBoost
	function stopMouseBoost() {
		if (mouseBoostInterval) {
			clearInterval(mouseBoostInterval);
		mouseBoostInterval = null;
		}
	}



	// Definición de la función OnUpdate
	MouseBoostAbuse.OnUpdate = () => {
		if (localHero && isUiEnabled.GetValue()) {
			if (Input.IsKeyDown(Enum.ButtonCode.MOUSE_RIGHT)) {
				if (!mouseBoostInterval) {
					startMouseBoost();
				}
			} else {
				stopMouseBoost();
			}
		}
	};


	// Definición de la función OnScriptLoad
	MouseBoostAbuse.OnScriptLoad = MouseBoostAbuse.OnGameStart = () => {
		localHero = EntitySystem.GetLocalHero();
	};

	// Definición de la función OnGameEnd
	MouseBoostAbuse.OnGameEnd = () => {
		localHero = null;
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
