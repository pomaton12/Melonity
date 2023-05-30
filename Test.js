/******/ (() => { // webpackBootstrap 
/******/ 	var __webpack_modules__ = ({

/***/ "./src/BestAutoLastHits.ts":
/*!**********************************!*\
  !*** ./src/BestAutoLastHits.ts ***!
  \**********************************/
/***/ (() => {

eval(`
const BestAutoLastHits = {};

// additional functions
const HeroInfo = require("scripts.settings.HeroInfo");

const LastHitCreep = {};
const LastHitCreep_Menu = {};
const LastHitCreep_User = {};
const CreepParticles = {};
//const SkillModifiers = {"modifier_item_quelling_blade": [24, 7], "modifier_item_bfury": [0.5, 0.25], "modifier_bloodseeker_bloodrage": [0.25, 0.3, 0.35, 0.4]};

// options
const Menu_Path = ["Custom HPV", "Last Hit Creep"];
let CreepTypes = ["Utility", "Last Hit Creep", "Creep Types"];

let Menu_Enabled = Menu.AddToggle(Menu_Path,"Enabled",false);
	    .OnChange(state => {
        Menu_Enabled = state.newValue;
    })
	
let Menu_Education = Menu.AddToggle(Menu_Path,"Education Mode",false);
	    .OnChange(state => {
        Menu_Education = state.newValue;
    })

let Menu_AttackMove = Menu.AddToggle(Menu_Path,"Attack Move",false);
	    .OnChange(state => {
        Menu_AttackMove = state.newValue;
    })

let Menu_Prediction = Menu.AddComboBox(Menu_Path,"Predict",[" Disabled", " Creeps Die", " Player Last Hit"],0);
		.OnChange(state =>{   	
		Menu_Prediction = state.newValue;
		})
		.GetValue();

let Menu_ShowPrediction = Menu.AddComboBox(Menu_Path,"Show Prediction",[" Disabled", " Enemy", " Allies", " Both"],0);
		.OnChange(state =>{   	
		Menu_ShowPrediction = state.newValue;
		})
		.GetValue();

let Menu_LastHitKey = Menu.AddKeyBind(Menu_Path,"Last Hit Key",Enum.ButtonCode.KEY_NONE);


let Menu_Enemys = Menu.AddToggle(CreepTypes,"Kill Enemys",false);
	    .OnChange(state => {
        Menu_Enemys = state.newValue;
    })

let Menu_Friendlys = Menu.AddToggle(CreepTypes,"Deny Allies",false);
	    .OnChange(state => {
        Menu_Friendlys = state.newValue;
    })

let Menu_Neutrals = Menu.AddToggle(CreepTypes,"Kill Neutrals",false);
	    .OnChange(state => {
        Menu_Neutrals = state.newValue;
    })

let LastHitCreep = {};
let CreepParticles = {};
let UnitCreeps = null;
let CreepsDPS = {};
let CreepsPredictedDieTime = {};
let UpdateTime = 0.10;
let User_UpdateTime = 0.10;
let DPSMult = (1 / UpdateTime);
let OrderTime = performance.now();
let Time = 0;
let GameTime = GameRulesGameTime();

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

	Time = performance.now();


};


BestAutoLastHits.OnScriptLoad = BestAutoLastHits.OnGameStart = () => {
	localHero = EntitySystem.GetLocalHero();
	myPlayer = EntitySystem.GetLocalPlayer();
	
	Time = performance.now();
	Math.randomseed(Time);
	readUser();
	LastHitCreep.User.LastTarget = null;
	LastHitCreep.User.LastAttackTime = Time;
	LastHitCreep.User.LastUpdateTime = Time;
	LastHitCreep.LastUpdateTime = Time;
	LastHitCreep.User.LastMoveTime = Time;
	for (let k in CreepParticles) {
		CreepParticles[k] = null;
	}
};

BestAutoLastHits.OnGameEnd = () => {
	localHero = null;
	myPlayer = null;

	for (let k in CreepParticles) {
		LastHitCreep.ClearParticle(k);
	}
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
