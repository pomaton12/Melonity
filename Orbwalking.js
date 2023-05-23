/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/HitRunHeros.ts":
/*!**********************************!*\
  !*** ./src/HitRunHeros.ts ***!
  \**********************************/
/***/ (() => {

eval(`
local HitRunHeros = {}

local localHero
local attackTarget
local EnemyHerotest

local path_ = {'Heroes', 'Orbwalking'}

local isUiEnabled1 = Menu.AddToggle(path_, 'Orbwalking Enable', true)

local KeyBindOrbwalk = Menu.AddKeyBind(path_, 'Key of OrbWalk', Enum.ButtonCode.KEY_NONE)

local isUiEnabled2 = Menu.AddToggle(path_, 'Kill Safe Pos', true)

local DisplayMode = Menu.AddComboBox(path_, 'Display', {'To Enemy', 'Mouse position'}, 1)
  .OnChange(function(state) DisplayMode = state.newValue end)
  .GetValue()

local SafeDistanceUI = Menu.AddSlider(path_, 'Safe Distance (% Attack Range)', 1, 100, 100)
	.OnChange(function(state) SafeDistanceUI = state.newValue end)
	.GetValue()

Menu.GetFolder({'Heroes', 'Orbwalking'}).SetImage('panorama/images/hud/reborn/icon_damage_psd.vtex_c')

-- Función para evaluar attack target a un enemigo o amigo
local function isHeroAttacking(hero, target)
  -- Comprueba si el héroe está atacando actualmente
  if hero.IsAttacking() then
    return true
  end
  return false
end

-- Función para calcular distancia2D
local function Dist2D(vec1, vec2)
  if vec1 and vec2 then
    local pos1 = (vec1.x and vec1 or (vec1.GetAbsOrigin and vec1.GetAbsOrigin() or 0    local pos2 = (vec2.x and vec2 or (vec2.GetAbsOrigin and vec2.GetAbsOrigin() or 0))
    return pos1 and pos2 and pos1:sub(pos2):Length2D()
  end
  return -1
end

-- Función POSICION DEL ANGULO
local function IsntUndefined(value, withfalse)
  return withfalse and value ~= false or value ~= nil and value ~= nil
end

local function GetAngleToPos(_e1, _e2, prefer, inrad)
  local a, b = (IsntUndefined(_e1.x) and _e1 or (IsntUndefined(_e1.GetAbsOrigin) and _e1:GetAbsOrigin() or 0)), (IsntUndefined(_e2.x) and _e2 or (IsntUndefined(_e2.GetAbsOrigin) and _e2:GetAbsOrigin() or 0))
  if prefer == _e1 then
    a, b = b, a
  end
  local atan2 = math.atan2(b.y - a.y, b.x - a.x)
  return inrad and atan2 or (atan2 * (180 / math.pi))
end

-- Función OnUpdate
function HitRunHeros.OnUpdate()
  if localHero and isUiEnabled1.GetValue() then
    local localHeroPosition = localHero.GetAbsOrigin()
    local enemy = EntitySystem.GetHeroesList():filter(function(hero) return hero.GetTeamNum() ~= localHero.GetTeamNum() and hero.IsAlive() and localHeroPosition:Distance(hero.GetAbsOrigin()) <= 1000 end)
    local EnemyHero = enemy:reduce(function(closest, hero) return closest and (localHeroPosition:Distance(hero.GetAbsOrigin()) < localHeroPosition:Distance(closest.GetAbsOrigin()) and hero or closest) or hero end, nil)
    local attackTarget = isHeroAttacking(localHero, EnemyHero)

    if attackTarget then
      local enemyHeroPosition = EnemyHero.GetAbsOrigin()
      local dist = Dist2D(localHero.GetAbsOrigin(), EnemyHero.GetAbsOrigin())
      local attackRange = localHero.GetAttackRange()
      local newRange = attackRange * (SafeDistanceUI / 100)
      localHero.SetAttackRange(newRange)

      print('Rango de ataque actual:', localHero.SetAttackRange(newRange))

      if dist > attackRange then
        if isUiEnabled2.GetValue() then
          local pos = localHeroPosition + Vector(100):Rotated(GetAngleToPos(localHeroPosition, enemyHeroPosition))
          localHero.MoveTo(pos)
        end
      else
        if isUiEnabled2.GetValue() then
          local pos = localHeroPosition + Vector(-100):Rotated(GetAngleToPos(localHeroPosition, enemyHeroPosition))
          localHero.MoveTo(pos)
        end
      end

      if DisplayMode == 0 then
      elseif DisplayMode == 1 then
        local mousePos = Input.GetWorldCursorPos()
        localHero.MoveTo(mousePos)
        setTimeout(function() end, 1000)
      end
    end

    if KeyBindOrbwalk.IsKeyDown() then
      local mousePos = Input.GetWorldCursorPos()
      local enemies = localHero.GetHeroesInRadius(1000, Enum.TeamType.TEAM_ENEMY)
      table.sort(enemies, function(a, b) return a.GetAbsOrigin():Distance(localHero.GetAbsOrigin()) < b.GetAbsOrigin():Distance(localHero.GetAbsOrigin()) end)

      local target = nil
      for _, enemy in ipairs(enemies) do
        local dist = enemy.GetAbsOrigin():Distance(mousePos)
        if dist <= 100 or target == nil then
          target = enemy
        end
      end

      if target ~= nil then
        localHero.AttackTarget(target)
      end
    end
  end
end

-- Función OnScriptLoad y OnGameStart
function HitRunHeros.OnScriptLoad()
  localHero = EntitySystem.GetLocalHero()
end

HitRunHeros.OnGameStart = HitRunHeros.OnScriptLoad

-- Función OnGameEnd
function HitRunHeros.OnGameEnd()
  localHero = nil
end

RegisterScript(HitRunHeros)
`);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/HitRunHeros.ts"]();
/******/ 	
/******/ })()
;
