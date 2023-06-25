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

	// Definición del array path_
	const path_ = ["Custom Scripts","Utility"];

	// Creación del toggle isUiEnabled
	let isUiEnabled = Menu.AddToggle(path_, 'Mouse Boost Repeat', true);

	// Declaración de la variable mouseBoostInterval
	let mouseBoostInterval = null;

	// Definición de la función startMouseBoost
	function startMouseBoost(myHero, myPlayer) {
	  mouseBoostInterval = setInterval(() => {
		if (!Input.IsKeyDown(Enum.ButtonCode.MOUSE_RIGHT)) {
		  clearInterval(mouseBoostInterval);
		  mouseBoostInterval = null;
		  return;
		}
		// Realizar el clic derecho aquí
		myPlayer.PrepareUnitOrdersStructed({
		  orderIssuer: Enum.PlayerOrderIssuer.DOTA_ORDER_ISSUER_HERO_ONLY,
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
	  if (myHero && isUiEnabled.GetValue()) {
		if (Input.IsKeyDown(Enum.ButtonCode.MOUSE_RIGHT) && !Input.IsCursorOnMinimap()) {
		  if (!mouseBoostInterval) {
			startMouseBoost(myHero, myPlayer);
		  }
		} else {
		  stopMouseBoost();
		}
	  }
	};

	// Definición de la función OnScriptLoad
	MouseBoostAbuse.OnScriptLoad = MouseBoostAbuse.OnGameStart = () => {
	  myHero = EntitySystem.GetLocalHero();
	  myPlayer = EntitySystem.GetLocalPlayer();
	};

	// Definición de la función OnGameEnd
	MouseBoostAbuse.OnGameEnd = () => {
	  	let myHero = null;
		let myPlayer = null;
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
