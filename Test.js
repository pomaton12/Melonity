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
	let illusionList = [];

	const path_ = ['Player', 'Agresive Illusions'];

	let enableToggle = Menu.AddToggle(path_, 'Enable', true);
	let attackHeroToggle = Menu.AddToggle(path_, 'Attack Hero', true);
	let pushLineCreepsToggle = Menu.AddToggle(path_, 'Push Line Creeps', true);

	function getIllusions() {
	  if (illusionList.length < 5) {
	    illusionList = [];
	    let heroes = EntitySystem.GetHeroesList();
	    if (heroes) {
	      for (let hero of heroes) {
		if (hero && hero.IsIllusion() && !hero.IsMeepoClone() && !hero.IsHero() && hero.IsAlive() &&
		  !hero.IsDormant() && hero.IsSameTeam(localHero)) {
		  illusionList.push(hero);
		}
	      }
	    }
	  }
	}

	function getClosestIllusion(vector, radius = 1500) {
	  let closestIllusion = null;
	  let closestDistance = Number.MAX_VALUE;

	  for (const illusion of illusionList) {
	    const distance = vector.Distance(illusion.GetAbsOrigin());
	    if (distance <= radius && distance < closestDistance) {
	      closestIllusion = illusion;
	      closestDistance = distance;
	    }
	  }

	  return closestIllusion;
	}

	function getClosestEnemyHero(radius) {
	  const enemyHeroes = EntitySystem.GetHeroesList().filter(
	    (hero) => !hero.IsIllusion() && !hero.IsMeepoClone() && !hero.IsSameTeam(localHero) && hero.IsAlive() && !hero.IsIllusion()
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

	function SendOrderMovePos(vector) {
	  myPlayer.PrepareUnitOrders(Enum.UnitOrder.DOTA_UNIT_ORDER_MOVE_TO_POSITION, null, vector, null, Enum.PlayerOrderIssuer.DOTA_ORDER_ISSUER_CURRENT_UNIT_ONLY, localHero, false, true);
	}

	IllusionsAgresive.OnUpdate = () => {
	  if (!localHero || !enableToggle.GetValue()) {
	    return;
	  }

	  getIllusions();

	  const illusion = getClosestIllusion(Input.GetWorldCursorPos());

	  const attackRadius = 1000;

	  if (attackHeroToggle.GetValue()) {
	    const closestEnemyHero = getClosestEnemyHero(attackRadius);

	    if (closestEnemyHero) {
	      if (illusion) {
		illusion.AttackTarget(closestEnemyHero, Enum.OrderQueueBehavior.Clear);
	      } else {
		SendOrderMovePos(Input.GetWorldCursorPos());
	      }
	    }
	  }

	  if (pushLineCreepsToggle.GetValue()) {
	    // Lógica para que las ilusiones ataquen a los creeps y empujen las líneas
	  }
	};

	IllusionsAgresive.OnScriptLoad = IllusionsAgresive.OnGameStart = () => {
	  localHero = EntitySystem.GetLocalHero();
	  myPlayer = EntitySystem.GetLocalPlayer();
	};

	IllusionsAgresive.OnGameEnd = () => {
	  localHero = null;
	  myPlayer = null;
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
