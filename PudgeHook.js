/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/PudgeExtended.ts":
/*!******************************!*\
  !*** ./src/PudgeExtended.ts ***!
  \******************************/
/***/ (() => {

const PudgeExtended = {};

const path_ = ["Hero Specific", "Pudge"];
const path_rot = ["Hero Specific", "Pudge", "Rot farm"];

let EnableUI = Menu.AddToggle(path_, "Enable", true);
let RotEnabled = Menu.AddToggle(path_rot, "Enabled", true);
let RotHP = Menu.AddSlider(path_rot, "HP Threshold", 0, 1000, 50);
	.OnChange(state => RotHP = state.newValue)
	.GetValue();
		
let DisableRot = false;
let Helper = Menu.AddToggle(path_, "Helper", true);
let HookKey = Menu.AddKeyBind(path_, "Auto Hook", Enum.ButtonCode.KEY_NONE);
let Scary = Menu.AddKeyBind(path_, "Fake Hook", Enum.ButtonCode.KEY_NONE);
let Suicide = Menu.AddToggle(path_, "Suicide", true);


let CastPosi= null;
let OldPosition = null;
let StartCast = false;

let Font = Renderer.LoadFont("Tahoma", 40, Enum.FontWeight.EXTRABOLD)

let CurrentTime = 0;
let NextTime = {};
NextTime["scary"] = 0;
NextTime["auto"] = 0;
NextTime["rot"] = 0;

CanselAnimation = false;
NeedInitialize = false;

let Pudge = {};
let localHero = null;
let Pudge_Rot = null;
let Pudge_Hook = null;
let Pudge_HP = 0;

// Definición de la función OnScriptLoad
PudgeExtended.OnScriptLoad = PudgeExtended.OnGameStart = () => {
    localHero = EntitySystem.GetLocalHero();
    Pudge_Hook = localHero.GetAbilityByIndex(0);
    Pudge.Rot = localHero.GetAbilityByIndex(1);
    NeedInitialize = false;
};

PudgeExtended.OnDraw = () => {
	if (localHero && EnableUI.GetValue()) {
		if (localHero.GetUnitName() !== "npc_dota_hero_pudge") {
			return;
		}

		if (Helper.GetValue()){

			const enemies = localHero.GetHeroesInRadius(1000, Enum.TeamType.TEAM_ENEMY);
			enemies.sort((a, b) => {
				const distA = a.GetAbsOrigin().Distance(localHero.GetAbsOrigin());
				const distB = b.GetAbsOrigin().Distance(localHero.GetAbsOrigin());
				return distA - distB;
			});
			if (enemies){
				for (const enemy of enemies) {
					if (!enemy.IsSameTeam(localHero) && enemy.IsAlive()) {
						let speed = enemy.GetMoveSpeed(enemy);
						let angle = enemy.GetRotation(enemy);
						let angleOffset = QAngle(0, 45, 0);
						angle.SetYaw(angle.GetYaw() + angleOffset.GetYaw());
						let direction = angle.GetVectors().forward;
						direction.SetZ(0);
						direction.Normalize();
						direction.Scale(speed);
						let pos = enemy.GetAbsOrigin();
						let screenPos = Render.WorldToScreen(pos.add(direction));
						let screenPosZ = Render.WorldToScreen(pos);
						if (screenPos.visible) {
							Render.SetDrawColor(154, 33, 47);
							Render.DrawFilledRect(screenPos.x - 5, screenPos.y - 5, 10, 10);
							Render.DrawLine(screenPosZ.x, screenPosZ.y, screenPos.x, screenPos.y);
						}
					}
				}
			}
		}
	}
};

PudgeExtended.OnUpdate = () => {
	if (localHero && EnableUI.GetValue()) {
		if (localHero.GetUnitName() !== "npc_dota_hero_pudge") {
			return;
		}

		// Auto Hook
		if (HookKey.IsKeyDown()) {
			const mousePos = Input.GetWorldCursorPos();
			const enemies = localHero.GetHeroesInRadius(1000, Enum.TeamType.TEAM_ENEMY);
			enemies.sort((a, b) => {
				const distA = a.GetAbsOrigin().Distance(localHero.GetAbsOrigin());
				const distB = b.GetAbsOrigin().Distance(localHero.GetAbsOrigin());
				return distA - distB;
			});
			let target = null;
			for (const enemy of enemies) {
				const dist = enemy.GetAbsOrigin().Distance(mousePos);
				if (target == null) {
					target = enemy;
				}
			}
			
			if (Engine.OnceAt(0.2)) {
				if (target != null) {
			
					if (StartCast && OldPosition !== null) {
						if (CurrentTime <= NextTime["auto"]) return;
						StartCast = false;
						if (target.IsPositionInRange(OldPosition, 1, 0)) {
							CastPosi = OldPosition;
						} else {
							let speed = target.GetMoveSpeed();
							let angle = target.GetRotation();
							let angleOffset = QAngle(0, 45, 0);
							angle.SetYaw(angle.GetYaw() + angleOffset.GetYaw());
							let direction = angle.GetVectors().forward;
							direction.SetZ(0);
							direction.Normalize();
							direction.Scale(speed + 10);
							CastPosi = target.GetAbsOrigin().add(direction);
						}
						Pudge_Hook.CastPosition(CastPosi);
					} else {
						StartCast = true;
						OldPosition = Entities.GetAbsOrigin(target);
						NextTime["auto"] = CurrentTime + 0.07;
					}
				}
			}
		}
	}

};

// Definición de la función OnGameEnd
PudgeExtended.OnGameEnd = () => {
  localHero = null;
};

// Registro del script
RegisterScript(PudgeExtended);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/PudgeExtended.ts"]();
/******/ 	
/******/ })()
;
