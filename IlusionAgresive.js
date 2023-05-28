/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({ 

/***/ "./src/IllusionsAgresive.ts":
/*!**********************************!*\
  !*** ./src/IllusionsAgresive.ts ***!
  \**********************************/
/***/ (() => {

eval(`
  const IllusionsAgresive = {};
  let localHero;
  let myPlayer;

  const path_ = ['Player', 'Agresive Illusions'];

  let enableToggle = Menu.AddToggle(path_, 'Enable', true);
  let attackHeroToggle = Menu.AddToggle(path_, 'Attack Hero', true);
  let pushLineCreepsToggle = Menu.AddToggle(path_, 'Push Line Creeps', true);

  function atacarEnemigosCercanos() {
    const equipoLocal = localHero.GetTeamNum();
    const ilusiones = EntitySystem.GetEntitiesByClassname("npc_dota_illusion").filter(illusion => illusion.GetTeamNum() === equipoLocal);
    let enemigosCercanos = [];
    ilusiones.forEach(ilusion => {
      const ilusionPos = Entities.GetAbsOrigin(ilusion);
      const enemigos = EntitySystem.GetEntitiesByClassname("npc_dota_hero").filter(hero => !Entities.IsSameTeam(hero, localHero) && hero.IsAlive() && !hero.IsIllusion());

      enemigos.forEach(enemigo => {
        const enemigoPos = Entities.GetAbsOrigin(enemigo);
        const distancia = (ilusionPos.minus(enemigoPos)).length();

        if (distancia <= 1000) {
          enemigosCercanos.push(enemigo);
        }
      });
    });

    if (enemigosCercanos.length > 0) {
      ilusiones.forEach(ilusion => {
        const closestEnemyHero = enemigosCercanos[0];
        const order = {
          OrderType: dotaunitorder_t.DOTA_UNIT_ORDER_ATTACK_TARGET,
          TargetIndex: closestEnemyHero,
          Queue: true
        };

        ilusion.SetContextThink("atacarEnemigosCercanos", function() {
          Game.PrepareUnitOrders(order);
          return 0.5;
        }, 0.5);
      });
    }
  }

  IllusionsAgresive.OnUpdate = () => {
    if (!localHero || !enableToggle.GetValue()) {
      return;
    }

    if (GameRules.GetGameState() === 5) {
      if (attackHeroToggle.GetValue()) {
        atacarEnemigosCercanos();
      }

      if (pushLineCreepsToggle.GetValue()) {
        // Lógica para que las ilusiones ataquen a los creeps y empujen las líneas
      }
    }
  };

  IllusionsAgresive.OnScriptLoad = IllusionsAgresive.OnGameStart = () => {
    localHero = EntitySystem.GetLocalHero();
    myPlayer = EntitySystem.GetLocalPlayer();
  };

  IllusionsAgresive.OnGameEnd = () => {
    localHero = null;
  };

  RegisterScript(IllusionsAgresive);

`);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/IllusionsAgresive.ts"]();
/******/ 	
/******/ })()
;
