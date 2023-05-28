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
	let enemyList = [];
	
	// Definición del array path_
	const path_ = ['Player', 'Agresive Illusions'];

	// Creación del toggle isUiEnabled
	let enableToggle = Menu.AddToggle(path_, 'Enable', true);
	let attackHeroToggle = Menu.AddToggle(path_, 'Attack Hero', true);
	let pushLineCreepsToggle = Menu.AddToggle(path_, 'Push Line Creeps', true);
	
	    function GetNearHeroInRadius(vector, radius = menu_SearchRadius) {
		let en = enemyList;
		if (en.length == 0)
		    return undefined;
		let accessHero = Array(enemyList.length);
		en.forEach((object) => {
		    if (object.GetAbsOrigin().Distance(vector) <= radius) {
			accessHero.push([object, object.GetAbsOrigin().Distance(vector)]);
		    }
		});
		accessHero.sort((a, b) => {
		    return (a[1] - b[1]);
		});
		return accessHero[0] ? accessHero[0][0] : undefined;
	    }

	// Función para obtener las ilusiones controladas por el jugador
	function getIllusions() {
		if (enemyList.length < 5) {
            enemyList = [];
			let heroes = EntitySystem.GetHeroesList();
			if (heroes) {
				for (let hero of heroes) {
					if (hero && hero.IsIllusion() && !hero.IsMeepoClone() && !hero.IsHero() && hero.IsAlive() &&
						!hero.IsDormant() && hero.IsSameTeam(localHero)) {
						enemyList.push(hero);
					}
				}
			}
		}
	}

	// Función para obtener el héroe enemigo más cercano en un radio
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

	// Definición de la función OnUpdate
	//===============================
	IllusionsAgresive.OnUpdate = () => {
	  if (!localHero || !enableToggle.GetValue()) {
		return;
	  }

	  let target = GetNearHeroInRadius(Input.GetWorldCursorPos());
	  

	  const attackRadius = 1000; // Radio en el que las ilusiones buscarán enemigos

	  if (attackHeroToggle.GetValue()) {
		const closestEnemyHero = getClosestEnemyHero(attackRadius);

		if (closestEnemyHero) {
		
			  if (target && target.IsExist())
			  	let illusion = target;
				illusion.AttackTarget(closestEnemyHero, Enum.OrderQueueBehavior.Clear);
			  else {
				comboTarget = null;
				if (Engine.OnceAt(0.2)){
				    SendOrderMovePos(Input.GetWorldCursorPos());
				}
			   }
		
			
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
	  myPlayer = null;
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
