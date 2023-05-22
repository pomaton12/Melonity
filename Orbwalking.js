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
	
	// Asignacion de una tecla key bin
	let KeyBindOrbwalk = Menu.AddKeyBind(path_, 'KeyBind of OrbWalk', Enum.ButtonCode.KEY_NONE);
	
	// Creación del target hero o posicion del mouse
	let DisplayMode = Menu.AddComboBox(path_, 'Display', ['To Enemy', 'Mouse position'], 1)
	.OnChange(state => DisplayMode = state.newValue)
	.GetValue();
	
	Menu.GetFolder(['Heroes', 'Orbwalking']).SetImage('panorama/images/hud/reborn/icon_damage_psd.vtex_c');
	// Definición de la función OnUpdate
	let lastAttackTime = 0;
	
	//===============================
HitRunHeros.OnUpdate = () => {
  if (isUiEnabled1) {
    //probar si el héroe local está atacando a un héroe enemigo
    if (localHero.IsAttacking() && localHero.GetAttackTarget() != null) {
      const enemy = localHero.GetAttackTarget();
      const dist = enemy.GetAbsOrigin().Distance(localHero.GetAbsOrigin());
      const attackRange = localHero.GetAttackRange();
      // Si el héroe enemigo está fuera del rango de ataque, moverse hacia él
      if (dist > attackRange) {
        const dir = enemy.GetAbsOrigin().Subtract(localHero.GetAbsOrigin()).Normalized();
        const pos = enemy.GetAbsOrigin().Add(dir.Multiply(100));
        localHero.MoveTo(pos);
      }
      // Si el héroe enemigo está dentro del rango de ataque, atacarlo
      else {
        localHero.Attack(enemy);
        // Si la opción "To Enemy" está seleccionada, moverse hacia el héroe enemigo
        if (ToEnemy) {
          const dir = enemy.GetAbsOrigin().Subtract(localHero.GetAbsOrigin()).Normalized();
          const pos = enemy.GetAbsOrigin().Add(dir.Multiply(-100));
          localHero.MoveTo(pos);
        }
        // Si la opción "Mouse position" está seleccionada, moverse hacia la posición del mouse
        else if (MousePosition) {
          const mousePos = Input.GetWorldCursorPos();
          localHero.MoveTo(mousePos);
        }
      }
    }
    // Si la tecla KeyBindOrbwalk está presionada, buscar al héroe enemigo más cercano o el que está debajo del mouse
    else if (KeyBindOrbwalk.IsKeyDown()) {
      const mousePos = Input.GetWorldCursorPos();
      const enemies = EntitySystem.GetHeroes(EntitySystem.GetEnemyTeam(localHero), true, true);
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
      // Atacar al héroe enemigo seleccionado
      if (target != null) {
        localHero.Attack(target);
      }
    }
  } else {
    // Orbwalking desactivado, no hacer nada
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
