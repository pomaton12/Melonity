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
		  if (!localHero || localHero.GetUnitName() !== "npc_dota_hero_kunkka") {
		    return;
		  }

		  let torrentStorm = localHero.GetAbilityByIndex(3);

		  if (isUiEnabled1.GetValue() && torrentStorm && torrentStorm.IsExist() && torrentStorm.CanCast()) {
		    const hasUsedFirstAbility = localHero.HasModifier("modifier_kunkka_torrent");
		    const hasUsedUltimate = localHero.HasModifier("modifier_kunkka_ghostship");
		    const enemies = localHero.GetHeroesInRadius(1000, Enum.TeamType.TEAM_ENEMY);

		    const stunnedEnemies = enemies.filter(enemy => {
		      const hasTorrentModifier = enemy.HasModifier("modifier_kunkka_torrent");
		      const hasUltimateModifier = enemy.HasModifier("modifier_kunkka_ghostship");
		      const hasBkbModifier = enemy.HasModifier("modifier_black_king_bar_immune");
		      return (hasTorrentModifier || hasUltimateModifier) && !hasBkbModifier;
		    });

		    if ((hasUsedFirstAbility || hasUsedUltimate) && stunnedEnemies.length > 0) {
		      if (stunnedEnemies.length === 1) {
			torrentStorm.CastNoTarget();
		      } else {
			const center = GetCenterOfEntities(stunnedEnemies);
			localHero.CastPosition(torrentStorm, center);
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
