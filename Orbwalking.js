/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/HitRunHeros.ts":
/*!**********************************!*\
  !*** ./src/HitRunHeros.ts ***!
  \**********************************/
/***/ (() => {

eval(`
const HitRunHeros = {};

let localHero = null;
let attackTarget = null;
const path_ = ['Heroes', 'Orbwalking'];

let isUiEnabled1 = Menu.AddToggle(path_, 'Orbwalking Enable', true);

let KeyBindOrbwalk = Menu.AddKeyBind(path_, 'Key of OrbWalk', Enum.ButtonCode.KEY_NONE);

let DisplayMode = Menu.AddComboBox(path_, 'Display', ['To Enemy', 'Mouse position'], 1)
  .OnChange(state => DisplayMode = state.newValue)
  .GetValue();

Menu.GetFolder(['Heroes', 'Orbwalking']).SetImage('panorama/images/hud/reborn/icon_damage_psd.vtex_c');

let lastAttackTime = 0;

HitRunHeros.OnUpdate = () => {
  if (localHero && isUiEnabled1) {
  localHero = EntitySystem.GetLocalHero();
  
  if (localHero && localHero.IsHero()) {
  // localHero es un héroe, puedes llamar a métodos específicos de héroe aquí
  let attackTarget = localHero.GetAttackTarget();
  // ...
  }
  
  //attackTarget = localHero.GetAttackTarget();
  
		      let bkb = localHero.GetItem('item_black_king_bar', true);
		      if (bkb && bkb.CanCast()) {
			      bkb.CastNoTarget();
		      }


  
  if (attackTarget && attackTarget.IsAlive() && attackTarget.IsHero() && !attackTarget.IsTower()) {
      const enemy = localHero.GetHeroesInRadius(1000, Enum.TeamType.TEAM_ENEMY);
      const dist = enemy.GetAbsOrigin().Distance(localHero.GetAbsOrigin());
      const attackRange = localHero.GetAttackRange();

      if (dist > attackRange) {
        const dir = enemy.GetAbsOrigin().Subtract(localHero.GetAbsOrigin()).Normalized();
        const pos = enemy.GetAbsOrigin().Add(dir.Multiply(100));
        localHero.MoveTo(pos);
      } else {
        localHero.Attack(enemy);

        if (DisplayMode === 0) {
          const dir = enemy.GetAbsOrigin().Subtract(localHero.GetAbsOrigin()).Normalized();
          const pos = enemy.GetAbsOrigin().Add(dir.Multiply(-100));
          localHero.MoveTo(pos);
        } else if (DisplayMode === 1) {
          const mousePos = Input.GetWorldCursorPos();
          localHero.MoveTo(mousePos);
        }
      }
    } else if (KeyBindOrbwalk.IsKeyDown()) {
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
        if (dist <= 100 || target == null) {
          target = enemy;
        }
      }

      if (target != null) {
        localHero.Attack(target);
      }
    }
  }
};

HitRunHeros.OnScriptLoad = HitRunHeros.OnGameStart = () => {
  localHero = EntitySystem.GetLocalHero();
};

HitRunHeros.OnGameEnd = () => {
  localHero = null;
};

RegisterScript(HitRunHeros);
`);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/HitRunHeros.ts"]();
/******/ 	
/******/ })()
;
