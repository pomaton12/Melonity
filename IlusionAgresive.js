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
    var ilusiones = Entities.GetAllEntitiesByClassname("npc_dota_illusion");
    var enemigosCercanos = [];

    for (var i = 0; i < ilusiones.length; i++) {
      var ilusion = ilusiones[i];
      var ilusionPos = Entities.GetAbsOrigin(ilusion);

      var enemigos = Entities.GetAllEntitiesByClassname("npc_dota_hero").filter(hero => !Entities.IsSameTeam(hero, localHero));
      for (var j = 0; j < enemigos.length; j++) {
        var enemigo = enemigos[j];
        var enemigoPos = Entities.GetAbsOrigin(enemigo);

        var distancia = (ilusionPos.minus(enemigoPos)).length();
        if (distancia <= 1000) {
          enemigosCercanos.push(enemigo);
        }
      }
    }

    if (enemigosCercanos.length > 0) {
      for (var i = 0; i < ilusiones.length; i++) {
        var ilusion = ilusiones[i];
        var closestEnemyHero = enemigosCercanos[0];
        var order = {
          OrderType: dotaunitorder_t.DOTA_UNIT_ORDER_ATTACK_TARGET,
          TargetIndex: closestEnemyHero,
          Queue: true
        };
        ilusion.SetContextThink("atacarEnemigosCercanos", function() {
          Game.PrepareUnitOrders(order);
          return 0.5;
        }, 0.5);
      }
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
