/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/IllusionsAgresive.ts":
/*!**********************************!*\
  !*** ./src/IllusionsAgresive.ts ***!
  \**********************************/
/***/ (() => {

eval(`
	// Definición del objeto IllusionsAgresive
	const IllusionsAgresive = {};

	// Declaración de la variable localHero
	let localHero;
	let myPlayer;

	// Definición del array path_
	const path_ = ['Player', 'Agresive Illusions'];

	// Creación del toggle isUiEnabled
	let enableToggle = Menu.AddToggle(path_, 'Enable', true);
	let attackHeroToggle = Menu.AddToggle(path_, 'Attack Hero', true);
	let pushLineCreepsToggle = Menu.AddToggle(path_, 'Push Line Creeps', true);

	function atacarEnemigosCercanos() {
	  var ilusiones = Entities.GetAllEntitiesByClassname("npc_dota_illusion");
	  var enemigosCercanos = [];

	  for (var i = 0; i < ilusiones.length; i++) {
	    var ilusion = ilusiones[i];
	    var ilusionPos = Entities.GetAbsOrigin(ilusion);

	    var enemigos = Entities.FindAllByClassname("npc_dota_hero_enemy");
	    for (var j = 0; j < enemigos.length; j++) {
	      var enemigo = enemigos[j];
	      var enemigoPos = Entities.GetAbsOrigin(enemigo);

	      var distancia = (ilusionPos - enemigoPos).length();
	      if (distancia <= 1000) {
		enemigosCercanos.push(enemigo);
	      }
	    }
	  }

	  if (enemigosCercanos.length > 0) {
	    for (var i = 0; i < ilusion.length; i++) {
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

	// Definición de la función OnUpdate
	//===============================
	IllusionsAgresive.OnUpdate = () => {
	  if (!localHero || !enableToggle.GetValue()) {
		return;
	  }


	  if (attackHeroToggle.GetValue()) {
		GameEvents.Subscribe("game_rules_state_change", function(data) {
		  if (GameRules.State_Get() === DOTA_GameState.DOTA_GAMERULES_STATE_GAME_IN_PROGRESS) {
		    atacarEnemigosCercanos();
		  }
		});
	  }

	  if (pushLineCreepsToggle.GetValue()) {
		// Lógica para que las ilusiones ataquen a los creeps y empujen las líneas
	  }
	};

	// Definición de la función OnScriptLoad
	IllusionsAgresive.OnScriptLoad = IllusionsAgresive.OnGameStart = () => {
	  localHero = EntitySystem.GetLocalHero();
	  myPlayer = EntitySystem.GetLocalPlayer();
	};

	// Definición de la función OnGameEnd
	IllusionsAgresive.OnGameEnd = () => {
	  localHero = null;
	};

	// Registro del script
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
