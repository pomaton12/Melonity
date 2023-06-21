/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/EarthSpirit.ts":
/*!****************************!*\
  !*** ./src/EarthSpirit.ts ***!
  \****************************/
/***/ (() => {

	const EarthSmash = {};
	let localHero;
	let localPlayer;
	let previousParticle;
	let kickAbility;
	let driveAbility;
	let pointPos;
	let myPos;
	let newPos;
	let abilityList;
	let working = true;
	const path_ = ['Heroes', 'Strength', 'Earth Spirit', 'Boulder Smash'];
	let kickBind = Menu.AddKeyBind(path_, 'Bind Kick', Enum.ButtonCode.BUTTON_CODE_NONE)
		.SetNameLocale('ru', 'Бинд пинка');
	let pointBind = Menu.AddKeyBind(path_, 'Bind point', Enum.ButtonCode.BUTTON_CODE_NONE)
		.SetNameLocale('ru', 'Бинд точки');
	let Accuracy = Menu.AddSlider(path_, "Accuracy", 1, 100, 100, 1)
		.SetNameLocale('ru', 'Точность')
		.OnChange(state => {
			Accuracy = state.newValue;
		})
		.GetValue();
	let showTrajectory = Menu.AddToggle(path_, 'Show trajectory', true)
		.SetNameLocale('ru', 'Показывать траекторию')
		.OnChange(state => {
			showTrajectory = state.newValue;
		})
		.GetValue();
	Menu.GetFolder(path_)
		.SetImage('panorama/images/spellicons/earth_spirit_boulder_smash_png.vtex_c')
		.SetTipLocale('en', 'Auto boulder smash to a specified point')
		.SetTipLocale('ru', 'Авто boulder smash в указанную точку');
	EarthSmash.OnScriptLoad = EarthSmash.OnGameStart = () => {
		localHero = EntitySystem.GetLocalHero();
		if (localHero.GetUnitName() !== 'npc_dota_hero_earth_spirit') {
			working = false;
			return;
		}
		;
		abilityList = localHero.GetAbilities();
		localPlayer = EntitySystem.GetLocalPlayer();
		kickAbility = abilityList[0];
		driveAbility = abilityList[1];
		pointPos = null;
	};
	EarthSmash.OnKeyEvent = (event) => {
		if (!working) {
			return;
		}
		if (pointBind.IsKeyDown()) {
			pointPos = Input.GetWorldCursorPos();
			if (previousParticle != null) {
				previousParticle.Destroy();
			}
			previousParticle = Particle.CreateCircle(null, pointPos, 10);
		}
	};
	function calculateDirection(targetPos, pointPos) {
		let dir = pointPos.sub(targetPos);
		dir = dir.Normalized();
		return dir;
	}
	function moveInDirection(direction, targetPos, myPos, target) {
		newPos = targetPos.sub(direction.Scaled(200));
		localHero.MoveTo(newPos);
		const distance = myPos.Distance2D(newPos);
		let intervalId = setInterval(() => {
			myPos = localHero.GetAbsOrigin();
			if (myPos.Distance2D(newPos) < Accuracy) {
				clearInterval(intervalId);
				if (kickAbility.CanCast() && distance < 180) {
					kickAbility.CastTarget(target);
				}
			}
		}, 100);
	}
	EarthSmash.OnUpdate = () => {
		if (!working) {
			return;
		}
		if (kickBind.IsKeyDown()) {
			if (Engine.OnceAt(0.2)) {
				let target = Input.GetNearestHeroToCursor(Enum.TeamType.TEAM_ENEMY);
				let targetPos = target.GetAbsOrigin();
				myPos = localHero.GetAbsOrigin();
				let distance = targetPos.Distance2D(myPos);
				let direction = calculateDirection(targetPos, pointPos);
				if (distance <= driveAbility.GetLevelSpecialValueFor("distance") && driveAbility.CanCast()) {
					if (kickAbility.CanCast()) {
						driveAbility.CastPosition(targetPos);
					}
					moveInDirection(direction, targetPos, myPos, target);
				}
				else {
					if (kickAbility.CanCast()) {
						moveInDirection(direction, targetPos, myPos, target);
					}
				}
			}
		}
	};
	EarthSmash.OnDraw = () => {
		if (!working || !showTrajectory || myPos != undefined || newPos != undefined) {
			return;
		}
		Renderer.SetDrawColor(255, 255, 255, 255);
		Renderer.DrawWorldLine(myPos, newPos);
	};
	EarthSmash.OnGameEnd = () => {
		localHero = null;
		localPlayer = null;
		kickAbility = null;
		driveAbility = null;
	};
	
	RegisterScript(EarthSmash);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/EarthSpirit.ts"]();
/******/ 	
/******/ })()
;
