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

let isUiEnabled2 = Menu.AddToggle(path_, 'Kill Safe Pos', true);

let DisplayMode = Menu.AddComboBox(path_, 'Display', ['To Enemy', 'Mouse position'],0)
  .OnChange(state =>{   	
	DisplayMode = state.newValue;
  })
  .GetValue();
  

let SafeDistanceUI = Menu.AddSlider(path_, 'Safe Distance (% Attack Range)', 1, 100, 100)
.OnChange(state => SafeDistanceUI = state.newValue)
.GetValue();
  
Menu.GetFolder(['Heroes', 'Orbwalking']).SetImage('panorama/images/hud/reborn/icon_damage_psd.vtex_c');

//=========================================
//       Evaluar Funciones
//=========================================
// 1 .- ====   Funcion para evaluar attack target a un enemigo o amigo
function isHeroAttacking(hero, target) {
    // Comprueba si el héroe está atacando actualmente
    if (hero.IsAttacking()) {
      return true;
    }
  return false;
}

// 2 .- ====   Funcion para calcular distancia2D
function Dist2D(vec1, vec2) {
if (vec1 && vec2) {
    let pos1 = (vec1.x ? (vec1) : (vec1.GetAbsOrigin ? (vec1.GetAbsOrigin()) : (0)));
    let pos2 = (vec2.x ? (vec2) : (vec2.GetAbsOrigin ? (vec2.GetAbsOrigin()) : (0)));
    return pos1 && pos2 && pos1.sub(pos2).Length2D();
}
    return -1;
}

// 3 .- ====   Funcion POSICION DEL ANGULO
function IsntUndefined(value, withfalse) {
	return withfalse ? (value !== false) : value !== undefined && value !== null;
}
function GetAngleToPos(_e1, _e2, prefer = _e2, inrad) {
	let [a, b] = [IsntUndefined(_e1.x) ? _e1 : _e1.GetAbsOrigin(), IsntUndefined(_e2.x) ? _e2 : _e2.GetAbsOrigin()];
	if (prefer == _e1) {
	    [a, b] = [b, a];
	}
	let atan2 = Math.atan2(b.y - a.y, b.x - a.x);
	return inrad ? atan2 : (atan2 * (180 / Math.PI));
}

//=====================
HitRunHeros.OnUpdate = () => {
  if (localHero && isUiEnabled1.GetValue()) {

    const localHeroPosition = localHero.GetAbsOrigin();
    const enemy  = EntitySystem.GetHeroesList().filter(hero => hero.GetTeamNum() !== localHero.GetTeamNum() && hero.IsAlive() && localHeroPosition.Distance(hero.GetAbsOrigin()) <= 1000);
    const EnemyHero = enemy.reduce((closest, hero) => closest ? (localHeroPosition.Distance(hero.GetAbsOrigin()) < localHeroPosition.Distance(closest.GetAbsOrigin()) ? hero : closest) : hero, null);
    const attackTarget = isHeroAttacking(localHero, EnemyHero);


	if (attackTarget) {
	  	
	  const enemyHeroPosition = EnemyHero.GetAbsOrigin();
	  const dist = Dist2D(localHero.GetAbsOrigin(), EnemyHero.GetAbsOrigin());
	  const attackRange = localHero.GetAttackRange();
	  const newRange = attackRange * (SafeDistanceUI / 100);


	  const attackSpeed = localHero.GetAttacksPerSecond();
          const attackTime = 1 / attackSpeed;
	  
	  // Obtener el tipo de ataque del héroe
	  const attackRangebuff = localHero.GetAttackRangeBuffer();
	  console.log("El héroe local es.",attackRangebuff);
	  
	  if (dist > attackRange) {
	  
	      if ( isUiEnabled2.GetValue()) {
	         const pos = localHeroPosition.add(new Vector(100).Rotated(GetAngleToPos(localHeroPosition, enemyHeroPosition)));
		 setTimeout(function() {localHero.MoveTo(pos);}, 200); 
	        		 
	      }
	  } else {
	  
              if ( isUiEnabled2.GetValue() ) {
	         const pos = localHeroPosition.add(new Vector(-100).Rotated(GetAngleToPos(localHeroPosition, enemyHeroPosition)));
		 setTimeout(function() {localHero.MoveTo(pos); }, 200); 
	         
	      }
	  }
	  
	  if (DisplayMode === 0) {

	  } else if (DisplayMode === 1) {
	      const mousePos = Input.GetWorldCursorPos();
	      setTimeout(function() {localHero.MoveTo(mousePos);}, 100);
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
	localHero.AttackTarget(target);
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
