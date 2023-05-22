/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/HitRunHeros.ts":
/*!**********************************!*\
  !*** ./src/HitRunHeros.ts ***!
  \**********************************/
/***/ (() => {

eval(`
const HitRunHeros = {};

let localPlayer = null;
let isUiEnabled1 = Menu.AddToggle(['Heroes', 'Orbwalking'], 'Orbwalking Enable', true);
let KeyBindOrbwalk = Menu.AddKey(['Heroes', 'Orbwalking'], 'Key of OrbWalk', Enum.ButtonCode.KEY_NONE);
let DisplayMode = Menu.AddComboBox(['Heroes', 'Orbwalking'], 'Display', ['To Enemy', 'Mouse position'], 1)
  .OnChange(state => DisplayMode = state.newValue)
  .GetValue();

Menu.GetFolder(['Heroes', 'Orbwalking']).SetImage('panorama/images/hud/reborn/icon_damage_psd.vtex_c');

HitRunHeros.OnUpdate = () => {
  localPlayer = Game.GetLocalPlayer();
  if (localPlayer && isUiEnabled1.GetValue()) {
    const localHero = localPlayer.GetAssignedHero();
    if (localHero) {
      const attackTarget = localHero.GetAttackTarget();
      console.log('Objetivo de ataque actual:', attackTarget);
      const localHeroPosition = localHero.GetAbsOrigin();
      const enemy  = EntitySystem.GetHeroesList().filter(hero => hero.GetTeamNum() !== localHero.GetTeamNum() && hero.IsAlive() && localHeroPosition.Distance(hero.GetAbsOrigin()) <= 1000);
      const EnemyHero = enemy.reduce((closest, hero) => closest ? (localHeroPosition.Distance(hero.GetAbsOrigin()) < localHeroPosition.Distance(closest.GetAbsOrigin()) ? hero : closest) : hero, null);

      if (attackTarget) {
        const enemyHeroPosition = EnemyHero.GetAbsOrigin();
        const dist = EnemyHero.GetAbsOrigin().Distance(localHero.GetAbsOrigin());
        const attackRange = localHero.GetAttackRange();

        if (dist > attackRange) {
          const dir = (enemyHeroPosition.sub(localHeroPosition)).Normalized();
          const pos = EnemyHero.GetAbsOrigin()+dir*(100);
          localHero.MoveTo(enemyHeroPosition);
        } else {
          localHero.Attack(EnemyHero);

          if (DisplayMode === 0) {
            const dir = (enemyHeroPosition.sub(localHeroPosition)).Normalized();
            const pos = EnemyHero.GetAbsOrigin()+dir*(-100);
            localHero.MoveTo(enemyHeroPosition);
          } else if (DisplayMode === 1) {
            const mousePos = Input.GetWorldCursorPos();
            localHero.MoveTo(mousePos);
          }
        }
      } 
	
      if (KeyBindOrbwalk.IsKeyDown()) {
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
  }
};

HitRunHeros.OnScriptLoad = HitRunHeros.OnGameStart = () => {
  localPlayer = Game.GetLocalPlayer();
};

HitRunHeros.OnGameEnd = () => {
  localPlayer = null;
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
