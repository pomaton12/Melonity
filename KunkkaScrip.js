/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/UseShardKunkka.ts":
/*!**********************************!*\
  !*** ./src/UseShardKunkka.ts ***!
  \**********************************/
/***/ (() => {

eval(`
	// Definición del objeto UseShardKunkka
	const UseShardKunkka = {};

	// Declaración de la variable localHero
	let localHero;

	// Definición del array path_
	const path_ = ['Heroes', 'Strength', 'Kunkka'];

	// Creación del toggle isUiEnabled1  para habilidad 4
	let isUiEnabled1 = Menu.AddToggle(path_, 'Torrent Storm Use', true);
	isUiEnabled1.SetImage('panorama/images/spellicons/kunkka_torrent_storm_png.vtex_c');
	
	// Creación del toggle isUiEnabled2  para habilidad 5
	let isUiEnabled2 = Menu.AddToggle(path_, 'Tidal Wave Use', true);
	isUiEnabled2.SetImage('panorama/images/spellicons/kunkka_tidal_wave_png.vtex_c');
	

	// Definición de la función OnUpdate
	let previousEnemyPositions = {};
	let bkbEnemies = {};
	//===============================
	UseShardKunkka.OnUpdate = () => {
	  	if (localHero && isUiEnabled1) {
		    if (localHero.GetUnitName() !== "npc_dota_hero_kunkka") {
		      return;
		    }

		    // Obtener la habilidad "Torrent Storm"
		    let torrentStorm = localHero.GetAbilityByIndex(3);

		    // Verificar si la habilidad está lista para ser lanzada
		    if (torrentStorm.IsFullyCastable() && (torrentStorm.GetCooldownTimeRemaining() === 0)) {
		      // Buscar enemigos cercanos
		      let enemies = EntitySystem.GetHeroesList().filter(hero => {
			return hero.IsAlive() && hero.IsEnemy(localHero) && hero.IsVisible() && !hero.IsIllusion();
		      });

		      // Seleccionar el punto de lanzamiento de "Torrent Storm"
		      let targetPoint;
		      if (enemies.length > 0) {
			if (enemies.length === 1) {
			  targetPoint = enemies[0].GetPosition();
			} else {
			  let center = { x: 0, y: 0, z: 0 };
			  for (let i = 0; i < enemies.length; i++) {
			    center.x += enemies[i].().x;
			    center.y += enemies[i].GetPosition().y;
			    center.z += enemies[i].GetPosition().z;
			  }
			  center.x /= enemies.length;
			  center.y /= enemies.length;
			  center.z /= enemies.length;
			  targetPoint = center;
			}
		      } else {
			return;
		      }

		      // Lanzar "Torrent Storm" en el punto seleccionado
		      torrentStorm.CastPosition(targetPoint);
		    }
		  }
		}	
		
	  	if (localHero && isUiEnabled2) {

		}
	  
	};
	// Definición de la función OnScriptLoad
	UseShardKunkka.OnScriptLoad = UseShardKunkka.OnGameStart = () => {
	  localHero = EntitySystem.GetLocalHero();
	};

	// Definición de la función OnGameEnd
	UseShardKunkka.OnGameEnd = () => {
	  localHero = null;
	};

	// Registro del script
	RegisterScript(UseShardKunkka);

`);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/UseShardKunkka.ts"]();
/******/ 	
/******/ })()
;
