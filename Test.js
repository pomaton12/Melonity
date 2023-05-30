/******/ (() => { // webpackBootstrap 
/******/ 	var __webpack_modules__ = ({

/***/ "./src/BestAutoLastHits.ts":
/*!**********************************!*\
  !*** ./src/BestAutoLastHits.ts ***!
  \**********************************/
/***/ (() => {


eval(`
const BestAutoLastHits = {};
let localHero;
let myPlayer;

// additional functions
//const HeroInfo = require("scripts.settings.HeroInfo");

const LastHitCreep = {};
const LastHitCreep_Menu = {};
const LastHitCreep_User = {};
const CreepParticles = {};
//const SkillModifiers = {"modifier_item_quelling_blade": [24, 7], "modifier_item_bfury": [0.5, 0.25], "modifier_bloodseeker_bloodrage": [0.25, 0.3, 0.35, 0.4]};

// options
const Menu_Path = ['Custom Scripts', 'Last Hit Creep'];
//const CreepTypes = ['Utility', 'Last Hit Creep', 'Creep Types'];
let Menu_Enabled = Menu.AddToggle(Menu_Path,"Enabled",false);
	    .OnChange(state => {
        Menu_Enabled = state.newValue;
    })

//menu options
//end menu options
console.log("Hasta aqui no hay error");

//=============================================================
// Funcion Principal para Iniciar el CODIGO
//=============================================================
BestAutoLastHits.OnUpdate = () => {
	if (!Menu_Enabled) {
		return;
	}

	if (localHero == null || !Entity.IsAlive(localHero)) {
		return;
	}

	//Time = performance.now();


};


BestAutoLastHits.OnScriptLoad = BestAutoLastHits.OnGameStart = () => {
	localHero = EntitySystem.GetLocalHero();
	myPlayer = EntitySystem.GetLocalPlayer();
	
};

BestAutoLastHits.OnGameEnd = () => {
	localHero = null;
	myPlayer = null;


};


RegisterScript(BestAutoLastHits);

`);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/BestAutoLastHits.ts"]();
/******/ 	
/******/ })()
;
