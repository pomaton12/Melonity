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

  // Obtener habilidad "Torrent Storm"
  let torrentStorm = localHero.GetAbilityByIndex(3);

  // Verificar si la habilidad está lista para ser lanzada
  if (torrentStorm && torrentStorm.IsExist() && torrentStorm.CanCast()) {
    // Verificar si algún héroe enemigo ha sido afectado por el ultimate
    let enemies = FindUnitsInRadius(localHero.GetTeamNumber(), targetPoint, null, torrentStorm.GetCastRange(), DOTA_UNIT_TARGET_TEAM_ENEMY, DOTA_UNIT_TARGET_HERO, DOTA_UNIT_TARGET_FLAG_NONE, FIND_ANY_ORDER, false);
    let enemyAffected = false;
    for (let i = 0; i < enemies.length; i++) {
      if (enemies[i].IsAlive() && enemies[i].IsHero() && enemies[i].IsEnemy(localHero)) {
        enemyAffected = true;
        break;
      }
    }

    // Si se encuentra al menos un héroe enemigo afectado por el ultimate, lanzar "Torrent Storm" en el punto seleccionado
    if (enemyAffected) {
      torrentStorm.CastPosition(localHero.GetAbsOrigin(););
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
