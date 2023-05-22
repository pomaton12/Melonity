/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/HitRunHeros.ts":
/*!**********************************!*\
  !*** ./src/HitRunHeros.ts ***!
  \**********************************/
/***/ (() => {

eval(`
	// Definición del objeto HitRunHeros
	const HitRunHeros = {};

	// Declaración de la variable localHero
	let localHero;

	// Definición del array path_
	const path_ = ['Heroes', 'Orbwalking'];

	// Creación del toggle isUiEnabled1  para activar Orbwalking
	let isUiEnabled1 = Menu.AddToggle(path_, 'Orbwalking Enable', true);
		
	// Creación del target hero o posicion del mouse
	let DisplayMode = Menu.AddComboBox(path_, 'Display', ['To Enemy', 'Mouse position'], 1)
	.OnChange(state => DisplayMode = state.newValue)
	.GetValue();
	
	Menu.GetFolder(['Heroes', 'Orbwalking']).SetImage('panorama/images/hud/reborn/icon_damage_psd.vtex_c');
	// Definición de la función OnUpdate
	let lastAttackTime = 0;
	
	//===============================
	HitRunHeros.OnUpdate = () => {
		  if (!localHero || !isUiEnabled1) {
		    return;
		  }

  const myPlayer = EntitySystem.GetLocalPlayer();
  const mousePos = Input.GetWorldCursorPos();
  const attackRange = localHero.GetAttackRange();
  const attackSpeed = localHero.GetAttacksPerSecond();
  const attackPoint = localHero.GetAttackAnimationPoint();
  const enemies = EntitySystem.GetEntitiesByClass('C_DOTA_BaseNPC_Hero').filter(hero => hero.IsEnemy(localHero));

  let targetEnemy = null;

  ifDisplayMode === 0) { // To Enemy
    targetEnemy = enemies.reduce((closest, enemy) => {
      const distanceToEnemy = localHero.GetAbsOrigin().sub(enemy.GetAbsOrigin()).Length2D();
      const distanceToClosest = closest ? localHero.GetAbsOrigin().sub(closest.GetAbsOrigin()).Length2D() : Infinity;

      return distanceToEnemy < distanceToClosest ? enemy : closest;
    }, null);
  } else if (DisplayMode === 1) { // Mouse position
    targetEnemy = enemies.reduce((closest, enemy) => {
      const distanceToMouse = enemy.GetAbsOrigin().sub(mousePos).Length2D();
      const distanceToClosest = closest ? closest.GetAbsOrigin().sub(mousePos).Length2D() : Infinity;

      return distanceToMouse < distanceToClosest ? enemy : closest;
    }, null);
  }

  if (targetEnemy) {
    const distanceToTarget = localHero.GetAbsOrigin().sub(targetEnemy.GetAbsOrigin()).Length2D();
    const gameTime = Game.GetGameTime();
    const attackCooldown = 1 / attackSpeed;

    if (distanceToTarget <= attackRange) {
      if (localHero.CanAttack(targetEnemy) && gameTime - lastAttackTime > attackCooldown + attackPoint) {
        myPlayer.AttackTarget(localHero, targetEnemy);
        lastAttackTime = gameTime;
      } else {
        myPlayer.Move(localHero, mousePos);
      }
    } else {
      myPlayer.Move(localHero, targetEnemy.GetAbsOrigin());
    }
  }
	};
	// Definición de la función OnScriptLoad
	HitRunHeros.OnScriptLoad = HitRunHeros.OnGameStart = () => {
	  localHero = EntitySystem.GetLocalHero();
	};

	// Definición de la función OnGameEnd
	HitRunHeros.OnGameEnd = () => {
	  localHero = null;
	};

	// Registro del script
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
