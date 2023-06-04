/******/ (() => { // webpackBootstrap 
/******/ 	var __webpack_modules__ = ({

/***/ "./src/FurionTrendAbuse.ts":
/*!**********************************!*\
  !*** ./src/FurionTrendAbuse.ts ***!
  \**********************************/
/***/ (() => {

eval(`
	const FurionTrendAbuse = {};

	let localHero;
	let myPlayer;
	let Particle_ID = null;
	let createDrawRadius = 0;

	const path_ = ["Heroes", "Intelligence", "Nature's Prophet","Unit Attack Block"];

	let isUiEnabled = Menu.AddToggle(path_, 'Enable', true);

	let KeyBindOrder = Menu.AddKeyBind(path_, 'Key of Combo', Enum.ButtonCode.KEY_NONE);

	Menu.GetFolder(["Heroes", "Intelligence", "Nature's Prophet","Unit Attack Block"]).SetImage('panorama/images/spellicons/furion_force_of_nature_png.vtex_c');

	const MIN_DISTANCE_TO_BLOCK = 150;

function blockEnemyHeroes() {
    const enemyHeroes = EntitySystem.GetHeroesList().filter(
        (hero) => !hero.IsIllusion() && !hero.IsMeepoClone() && !hero.IsSameTeam(localHero) && hero.IsAlive() && !hero.IsIllusion()
    );

    if (!enemyHeroes || enemyHeroes.length <= 0) {
        return;
    }

    const blockingPositions = enemyHeroes.map((hero) => {
        const targetPos = hero.GetAbsOrigin();
        const dir = hero.GetRotation().GetForward().Normalized();
        return targetPos.add(dir.mul(new Vector(MIN_DISTANCE_TO_BLOCK, MIN_DISTANCE_TO_BLOCK, 0)));
    });

    const furionUnits = getFurionUnits();

    furionUnits.forEach((unit) => {
        if (unit && unit.IsAlive() && !unit.IsDormant()) {
            blockingPositions.forEach((pos) => {
                if (localHero.GetAbsOrigin().sub(pos).Length2D() <MIN_DISTANCE_TO_BLOCK) {
			setTimeout(() => {
			    myPlayer.PrepareUnitOrders(Enum.UnitOrder.DOTA_UNIT_ORDER_MOVE_TO_POSITION, null, pos, null, Enum.PlayerOrderIssuer.DOTA_ORDER_ISSUER_PASSED_UNIT, unit, false, true);
			    lastOrderTime = GameRules.GetGameTime();
			}, 200);
                }
            });
        }
    });
}




	function getFurionUnits() {
	    const allEntities = EntitySystem.GetEntitiesList();
	    //console.log("unidad",allEntities);
	    const furionUnits = allEntities.filter(
		(unit) => unit.GetOwner() === localHero
	    );
	    return furionUnits;
	}

	FurionTrendAbuse.OnUpdate = () => {
	    if (localHero && isUiEnabled.GetValue()) {

		if (localHero.GetUnitName() !== "npc_dota_hero_furion") {
		    return;
		}

		const furionUnits = getFurionUnits();

		if (KeyBindOrder.IsKeyDown()) {

			blockEnemyHeroes();
		}

	    }

	};

	FurionTrendAbuse.OnScriptLoad = FurionTrendAbuse.OnGameStart = () => {
	    localHero = EntitySystem.GetLocalHero();
	    myPlayer = EntitySystem.GetLocalPlayer();
	};

	FurionTrendAbuse.OnGameEnd = () => {
	    localHero = null;
	    myPlayer = null;
	};

	RegisterScript(FurionTrendAbuse);




`);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/FurionTrendAbuse.ts"]();
/******/ 	
/******/ })()
;
