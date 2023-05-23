/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/HitRunHeros.ts":
/*!**********************************!*\
  !*** ./src/HitRunHeros.ts ***!
  \**********************************/
/***/ (() => {

eval(`
const HitRunHeros = {};

let localHero;
let attackTarget;
let EnemyHerotest;

const path_ = ['Heroes', 'Orbwalking'];

let isUiEnabled1 = Menu.AddToggle(path_, 'Orbwalking Enable', true);

let KeyBindOrbwalk = Menu.AddKeyBind(path_, 'Key of OrbWalk', Enum.ButtonCode.KEY_NONE);

let DisplayMode = Menu.AddComboBox(path_, 'Display', ['To Enemy', 'Mouse position'], 1)
  .OnChange(state => DisplayMode = state.newValue)
  .GetValue();

Menu.GetFolder(['Heroes', 'Orbwalking']).SetImage('panorama/images/hud/reborn/icon_damage_psd.vtex_c');

//Funcion para evaluar attack target a un enemigo o amigo
function isHeroAttacking(hero, target) {
  // Comprueba si el héroe está dentro del rango de ataque del objetivo
  let distance = target.GetAbsOrigin().Distance(hero.GetAbsOrigin());
  console.log('Evaluando duncion distancia', distance);
  if (distance <= hero.GetAttackRange()) {
    // Comprueba si el héroe está atacando actualmente
    if (hero.isAttacking && hero.attackTarget === target) {
      return true;
    }
  }
  return false;
}

//=====================
HitRunHeros.OnUpdate = () => {
  if (localHero && isUiEnabled1) {
  
	const Testenemies = localHero.GetHeroesInRadius(1000, Enum.TeamType.TEAM_ENEMY);
        for (let enemy1 of Testenemies) {
	   //console.log('Objetivo de ataque actual:', enemy1);	
	}
	
    const localHeroPosition = localHero.GetAbsOrigin();
    const enemy  = EntitySystem.GetHeroesList().filter(hero => hero.GetTeamNum() !== localHero.GetTeamNum() && hero.IsAlive() && localHeroPosition.Distance(hero.GetAbsOrigin()) <= 1000);
    const EnemyHero = enemy.reduce((closest, hero) => closest ? (localHeroPosition.Distance(hero.GetAbsOrigin()) < localHeroPosition.Distance(closest.GetAbsOrigin()) ? hero : closest) : hero, null);
    const attackTarget = isHeroAttacking(localHero, EnemyHero);
    
    console.log('Objetivo de ataque actual:', attackTarget);	
    
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
