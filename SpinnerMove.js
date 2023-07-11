/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/SpinnerMove.ts":
/*!**********************************!*\
  !*** ./src/SpinnerMove.ts ***!
  \**********************************/
/***/ (() => {

	// Definición del objeto SpinnerMove
	const SpinnerMove = {};

	// Declaración de la variable localHero
	let localHero = null;
	let myPlayer = null;
	
	let tick = 0;
	let trigerfor3 = 1;

	const path = ["Custom Scripts","Utility","Spinner"];

	let isUiEnabled = Menu.AddToggle(path, 'Enable', false);
	
	let KeyBindSpinner = Menu.AddKeyBind(path, 'Key', Enum.ButtonCode.KEY_NONE);
	
	let SpinnerType = Menu.AddComboBox(path, 'Movement Type', ["One place","Сircle","Triger"], 1)
        .OnChange((state) => {SpinnerType = state.newValue;})
        .GetValue();
		



	SpinnerMove.OnDraw = () => {
        if (localHero && isUiEnabled.GetValue()) {
			
			if (KeyBindSpinner.IsKeyDown()) {
				if (SpinnerType === 0) {
					if (tick <= GameRules.GetGameTime()) {
						localHero.MoveTo(PositionAngle(localHero, 160, 1), false, false);
						tick = GameRules.GetGameTime() + 0.05;
					}
				}
				if (SpinnerType === 1) {
					if (tick <= GameRules.GetGameTime()) {
						localHero.MoveTo(PositionAngle(localHero, 100, 40), false, false);
						tick = GameRules.GetGameTime() + 0.15;
					}
				}
				if (SpinnerType === 2) {
					const minitable = [75, -120];
					if (tick <= GameRules.GetGameTime()) {
						localHero.MoveTo(PositionAngle(localHero, minitable[trigerfor3], 1), false, false);
						tick = GameRules.GetGameTime() + 0.1;
						trigerfor3 = trigerfor3 + 1;
						if (trigerfor3 > 2) trigerfor3 = 1;
					}
				}
			}

		}
	};
	
	function PositionAngle(nps, rotation, range) {
		const angle = nps.GetRotation();
		console.log(angle);
		const angleOffset = new Angle(0, 45 + rotation, 0);
		angle.yaw = angle.yaw + angleOffset.yaw;
		
		console.log("yaw ",angle.yaw);
		
		const [x, y, z] = getVectorsFromAngle(angle);
		const direction = x.Add(y).Add(z);
		direction.SetZ(0);
		direction.Normalize();
		direction.Scale(range);
		const origin = nps.GetAbsOrigin();
		const needPos = origin.Add(direction);
		return needPos;
	}
	
	function getVectorsFromAngle(ang) {
		let rad = ang.yaw * Math.PI / 180;
		let forward = new Vector(Math.cos(rad), Math.sin(rad), 0);
		forward.normalize();

		let right = forward.cross(new Vector(0, 0, 1));
		right.normalize();

		let up = right.cross(forward);
		up.normalize();

		return [forward, right, up];
	}
	
	// Definición de la función OnScriptLoad
	SpinnerMove.OnScriptLoad = SpinnerMove.OnGameStart = () => {
		localHero = EntitySystem.GetLocalHero();
	    myPlayer = EntitySystem.GetLocalPlayer();

	};

	// Definición de la función OnGameEnd
	SpinnerMove.OnGameEnd = () => {
		localHero = null;
	    myPlayer = null;
	};

	// Registro del script
	RegisterScript(SpinnerMove);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/SpinnerMove.ts"]();
/******/ 	
/******/ })()
;
