/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/CreatePanel.ts":
/*!**********************************!*\
  !*** ./src/CreatePanel.ts ***!
  \**********************************/
/***/ (() => {

	// Definición del objeto CreatePanel
	const CreatePanel = {};

	// Declaración de la variable localHero
	let localHero;

	// Definición del array path_
	// Definición del array path_
	const path_ = ["Custom Scripts","Player"];

	// Creación del toggle isUiEnabled
	let isUiEnabled = Menu.AddToggle(path_, 'Skill Alert', true);


	var modifiers = [
		["modifier_invoker_sun_strike", 1.7],
		["modifier_kunkka_torrent_thinker", 1.6],
		["modifier_lina_light_strike_array", 0.5],
		["modifier_leshrac_split_earth_thinker", 0.35],
		["modifier_spirit_breaker_charge_of_darkness_vision", 1.5],
		["modifier_tusk_snowball_visible", 1.5]
	]

	var z = []

	// Definición de la función OnUpdate
	CreatePanel.OnUpdate = () => {
        if (localHero && isUiEnabled.GetValue()) {
			
			//Game.ScriptLogMsg('Script enabled: SkillAlert', '#00ff00');
			
			var Temp = CreatePanel( "Panel", Game.GetMainHUD(), "SkillAlert" );
			Temp.SetPanelEvent( 'onactivate', SkillAlertChkBox );
			Temp.BLoadLayoutFromString( '<root><styles><include src="s2r://panorama/styles/dotastyles.vcss_c" /><include src="s2r://panorama/styles/magadan.vcss_c" /></styles><Panel><ToggleButton class="CheckBox" id="SkillAlert" text="SkillAlert"/></Panel></root>', false, false);  
			var SkillAlert = $.GetContextPanel().FindChildTraverse( 'SkillAlert' ).Children()[0];
					
        }
    };		
	
	
  // Definición de la función OnScriptLoad
  CreatePanel.OnScriptLoad = CreatePanel.OnGameStart = () => {
      localHero = EntitySystem.GetLocalHero();
  };

  // Definición de la función OnGameEnd
  CreatePanel.OnGameEnd = () => {
      localHero = null;
  };

  // Registro del script
  RegisterScript(CreatePanel);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/CreatePanel.ts"]();
/******/ 	
/******/ })()
;
