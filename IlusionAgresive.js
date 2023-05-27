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

	// Función para obtener las ilusiones controladas por el jugador
	function getIllusions() {
	  const playerID = localHero.GetPlayerID();
	  return EntitySystem.GetEntitiesList().filter(
	    (ent) =>
	      ent.IsHero() &&
	      ent.IsIllusion()
	  );
	}



	// Función para obtener el héroe enemigo más cercano en un radio
	function getClosestEnemyHero(radius) {
	  const enemyHeroes = EntitySystem.GetHeroesList().filter(
		(hero) => hero && !hero.IsIllusion() && !hero.IsMeepoClone() && hero.IsHero() && hero.IsAlive() && !hero.IsDormant() && !hero.IsSameTeam(localHero)
	  );

	  let closestHero = null;
	  let closestDistance = Number.MAX_VALUE;

	  for (const hero of enemyHeroes) {
		const distance = localHero.GetAbsOrigin().sub(hero.GetAbsOrigin()).Length2D();
		if (distance < radius && distance < closestDistance) {
		  closestHero = hero;
		  closestDistance = distance;
		}
	  }

	  return closestHero;
	}

	// Definición de la función OnUpdate
	//===============================
	IllusionsAgresive.OnUpdate = () => {
	  if (!localHero || !enableToggle.GetValue()) {
		return;
	  }

	  const illusions = getIllusions();
	  const attackRadius = 1000; // Radio en el que las ilusiones buscarán enemigos

	  if (attackHeroToggle.GetValue()) {
		const closestEnemyHero = getClosestEnemyHero(attackRadius);

		if (closestEnemyHero) {
		  for (const illusion of illusions) {
			 myPlayer.PrepareUnitOrders(Enum.UnitOrder.DOTA_UNIT_ORDER_ATTACK_TARGET, closestEnemyHero, closestEnemyHero.GetAbsOrigin(), null, Enum.PlayerOrderIssuer.DOTA_ORDER_ISSUER_CURRENT_UNIT_ONLY, illusion, false, true);
		  }
		  return;
		}
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
