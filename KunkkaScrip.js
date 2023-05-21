/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/AutoStealKunkka.ts":
/*!******************************!*\
  !*** ./src/AutoStealKunkka.ts ***!
  \******************************/
/***/ (() => {

eval(`
  const AutoStealKunkka = {};
  let local;
  let localPlayer;
  let TorrentStorm;
  let TidalWave;
  let enemyHeroes;

  let damageFromPhylactery = 1000;
  const path_ = ['Heroes', 'Strength', 'Kunkka'];
  let isUiEnabled1 = Menu.AddToggle(path_, 'Torrent Storm Use', true);
  isUiEnabled1.SetImage('panorama/images/spellicons/kunkka_torrent_storm_png.vtex_c');
  
  let isUiEnabled2 = Menu.AddToggle(path_, 'Tidal Wave Use', true);
  isUiEnabled2.SetImage('panorama/images/spellicons/kunkka_tidal_wave_png.vtex_c');

  AutoStealKunkka.OnUpdate = () => {
	if (localHero && isUiEnabled1.GetValue()) {
	    if (localHero.GetUnitName() !== "npc_dota_hero_kunkka")
		return;
	    if (!TorrentStorm) {
		TorrentStorm = localHero.GetAbilityByIndex(3);
	    }

	    // Obtén la habilidad ultimate de Kunkka (Ghostship)
	    const Ghostship = localHero.GetAbilityBy(5);

	    // Verifica si la habilidad ultimate de Kunkka se ha lanzado recientemente
	    if (Ghostship && Game.Time() - Ghostship.GetLastCastTime() < 3) {
		// Si la habilidad ultimate se ha lanzado recientemente, activa Torrent Storm
		if (TorrentStorm && TorrentStorm.CanCast()) {
		    TorrentStorm.CastPosition(localHero.GetAbsOrigin());
		}
	    }
	}
if (localHero && isUiEnabled2.GetValue()) {
    if (localHero.GetUnitName() !== "npc_dota_hero_kunkka")
        return;

    let TidalWave = localHero.GetAbilityByIndex(4);
    if (!TidalWave || localHero.HasModifier("modifier_item_invisibility_edge_windwalk") || localHero.HasModifier("modifier_item_silver_edge_windwalk")) {
        return;
    }

    const localHeroHealthPercentage = (localHero.GetHealth() / localHero.GetMaxHealth()) * 100;
    const localHeroPosition = localHero.GetAbsOrigin();
    const enemyHeroes = EntitySystem.GetHeroesList().filter(hero => hero.GetTeamNum() !== localHero.GetTeamNum() && hero.IsAlive() && !hero.HasModifier("modifier_black_king_bar_immune") && localHeroPosition.Distance(hero.GetAbsOrigin()) <= 749);
    const closestEnemyHero = enemyHeroes.reduce((closest, hero) => closest ? (localHeroPosition.Distance(hero.GetAbsOrigin()) < localHeroPosition.Distance(closest.GetAbsOrigin()) ? hero : closest) : hero, null);

    if (closestEnemyHero && TidalWave.CanCast()) {
        const enemyHeroPosition = closestEnemyHero.GetAbsOrigin();
        const direction = (enemyHeroPosition.sub(localHeroPosition)).Normalized();
        if (localHeroHealthPercentage < 30) {
            castPosition = localHeroPosition - (direction * 300);
            TidalWave.CastPosition(closestEnemyHero.GetAbsOrigin());
        } else {
            castPosition = localHeroPosition + (direction * 300);
            TidalWave.CastPosition(localHero.GetAbsOrigin());
        }
    }
}

  };

  AutoStealKunkka.OnScriptLoad = AutoStealKunkka.OnGameStart = () => {
      localPlayer = EntitySystem.GetLocalPlayer();
      localHero = EntitySystem.GetLocalHero();
  };

  AutoStealKunkka.OnGameEnd = () => {
      localPlayer = null;
      localHero = null;
      TorrentStorm = null;
      TidalWave = null;

  };

  RegisterScript(AutoStealKunkka);
`);
/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/AutoStealKunkka.ts"]();
/******/ 	
/******/ })()
;
