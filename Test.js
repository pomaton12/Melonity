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
const LastHitCreep.Menu = {};
const LastHitCreep.User = {};
const LastHitCreep.Particles = {};

const LastHitCreep.SkillModifiers = {modifier_item_quelling_blade: [24, 7], modifier_item_bfury: [0.5, 0.25], "modifier_bloodseeker_bloodrage": [0.25, 0.3, 0.35, 0.4]};

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
LastHitCreep.Particles = {};
LastHitCreep.Particles = {};
LastHitCreep.Creeps = null;
LastHitCreep.CreepsDPS = {};
LastHitCreep.CreepsPredictedDieTime = {};
LastHitCreep.UpdateTime = 0.10;
LastHitCreep.User.UpdateTime = 0.10;
LastHitCreep.DPSMult = (1 / LastHitCreep.UpdateTime);
LastHitCreep.OrderTime = performance.now();;
let Time = 0;
let GameTime = GameRulesGameTime();

//menu options
//end menu options

//particles
function LastHitCreep.CreateOverheadParticle(index, ent, name) {
    if (ent == null) {
        return false;
    }
    if (LastHitCreep.Particles[parseInt(index)] == null) {
        LastHitCreep.Particles[parseInt(index)] = {};
        LastHitCreep.Particles[parseInt(index)].ID = Particle.Create(name, Enum.ParticleAttachment.PATTACH_OVERHEAD_FOLLOW, ent);
        return true;
    }
    return false;
}

function LastHitCreep.CreateTargetingParticle(caster, target) {
    if (caster == null || target == null) {
        return false;
    }
    let newParicle = 0;
    if (LastHitCreep.Particles[caster] == null) {
        LastHitCreep.Particles[caster] = {};
        newParicle = Particle.Create("particles/ui_mouseactions/range_finder_tower_aoe.vpcf", Enum.ParticleAttachment.PATTACH_ABSORIGIN_FOLLOW, target);
    } else {
        if (LastHitCreep.Particles[caster].ID != null) {
            Particle.Destroy(LastHitCreep.Particles[caster].ID);
        }
        newParicle = Particle.Create("particles/ui_mouseactions/range_finder_tower_aoe.vpcf", Enum.ParticleAttachment.PATTACH_ABSORIGIN_FOLLOW, target);
    }
    if (newParicle !== 0) {
        Particle.SetControlPoint(newParicle, 2, Entity.GetOrigin(caster));
        Particle.SetControlPoint(newParicle, 6, Vector(1, 0, 0));
        Particle.SetControlPoint(newParicle, 7, Entity.GetOrigin(target));
        LastHitCreep.Particles[caster].ID = newParicle;
        LastHitCreep.Particles[caster].Target = target;
        return true;
    }
    return false;
}

function LastHitCreep.ClearParticle(index) {
    if (LastHitCreep.Particles[parseInt(index)] != null) {
        Particle.Destroy(LastHitCreep.Particles[parseInt(index)].ID);
        LastHitCreep.Particles[parseInt(index)] = null;
    }
}
//end particles

function LastHitCreep.IsInvisible(user) {
    if (!user) {
        return false;
    }
    if (NPC.HasState(user, Enum.ModifierState.MODIFIER_STATE_INVISIBLE)) {
        return true;
    }
    if (NPC.HasModifier(user, "modifier_invisible")) {
        return true;
    }
    if (NPC.HasModifier(user, "modifier_invoker_ghost_walk_self")) {
        return true;
    }
    if (NPC.HasModifier(user, "modifier_item_invisibility_edge_windwalk")) {
        return true;
    }
    if (NPC.HasModifier(user, "modifier_item_silver_edge_windwalk")) {
        return true;
    }
    if (NPC.HasModifier(user, "modifier_item_glimmer_cape_fade")) {
        return true;
    }
    return false;
}

function LastHitCreep.IsCastNow(user) {
    if (!user) {
        return false;
    }
    if (.IsChannellingAbility(user)) {
        return true;
    }
    if (NPC.HasModifier(user, "modifier_teleporting")) {
        return true;
    }
    for (let i = 0; i < 25; i++) {
        let abil = NPC.GetAbilityByIndex(user, i);
        if (abil && (Ability.GetLevel(abil) >= 1) && !Ability.IsHiddenabil) && !Ability.IsPassive(abil) && (Ability.IsInAbilityPhase(abil) || Ability.IsChannelling(abil))) {
            //Log.Write(Ability.GetName(abil));
            return true;
        }
    }
    return false;
}

function LastHitCreep.OnPrepareUnitOrders(orders) {
    if (orders && orders.order > 1) {
        LastHitCreep.OrderTime = Time;
    }
}

function LastHitCreep.PreventPlayer(user) {
    if (!user) {
        return false;
    }
    if ((Time - LastHitCreep.OrderTime) < 0.25) {
        return true;
    }
    if (LastHitCreep.IsCastNow(user)) {
        return true;
    }
    if (LastHitCreep.IsInvisible(user)) {
        return true;
    }
    return false;
}

function CanCastSpells(caster, enemy) {
  if (!caster) return false;
  if (!Entity.IsAlive(caster)) return false;

  if (NPC.IsSilenced(caster)) return false;
  if (NPC.IsStunned(caster)) return false;
  if (NPC.HasState(caster, Enum.ModifierState.MODIFIER_STATE_INVULNERABLE)) return false;
  if (NPC.HasState(caster, Enum.ModifierState.MODIFIER_STATE_HEXED)) return false;

  if (NPC.HasModifier(caster, "modifier_bashed")) return false;
  if (NPC.HasModifier(caster, "modifier_eul_cyclone")) return false;
  if (NPC.HasModifier(caster, "modifier_obsidian_destroyer_astral_imprisonment_prison")) return false;
  if (NPC.HasModifier(caster, "modifier_shadow_demon_disruption")) return false;
  if (NPC.HasModifier(caster, "modifier_invoker_tornado")) return false;
  if (NPC.HasModifier(caster, "modifier_legion_commander_duel")) return false;
  if (NPC.HasModifier(caster, "modifier_axe_berserkers_call")) return false;
  if (NPC.HasModifier(caster, "modifier_winter_wyvern_winters_curse")) return false;
  if (NPC.HasModifier(caster, "modifier_bane_fiends_grip")) return false;
  if (NPC.HasModifier(caster, "modifier_bane_nightmare")) return false;
  if (NPC.HasModifier(caster, "modifier_faceless_void_chronosphere_freeze")) return false;
  if (NPC.HasModifier(caster, "modifier_enigma_black_hole_pull")) return false;
  if (NPC.HasModifier(caster, "modifier_magnataur_reverse_polarity")) return false;
  if (NPC.HasModifier(caster, "modifier_pudge_dismember")) return false;
  if (NPC.HasModifier(caster, "modifier_shadow_shaman_shackles")) return false;
  if (NPC.HasModifier(caster, "modifier_techies_stasis_trap_stunned")) return false;
  if (NPC.HasModifier(caster, "modifier_storm_spirit_electric_vortex_pull")) return false;
  if (NPC.HasModifier(caster, "modifier_tidehunter_ravage")) return false;
  if (NPC.HasModifier(caster, "modifier_windrunner_shackle_shot")) return false;
  if (NPC.HasModifier(caster, "modifier_item_nullifier_mute")) return false;
  if (enemy) {
    if (NPC.HasModifier(enemy, "modifier_item_aeon_disk_buff")) return false;
  }
  return true;
}

function RightNameFromModifier(mod) {
  return mod.replace("modifier_", "");
}

function DamageMulOrAdd(Damage, Bonus, mod) {
  if (Math.abs(mod) < 2) {
    return Bonus + (Damage + Bonus) * mod;
  } else {
    return Bonus + mod;
  }
}

function DamageToCreep(ent) {
  if (!ent) {
    return 0;
  }

  let Damage = NPC.GetTrueDamage(ent) + Math.floor((NPC.GetTrueMaximumDamage(ent) - NPC.GetTrueDamage(ent)) / 4);
  let BonusDamage = 0;

  for (let mod in SkillModifiers) {
    let modifier = NPC.GetModifier(ent, mod);
    if (modifier) {
      if (SkillModifiers[mod].length == 2) {
        let indexvalue = 1;
        if (NPC.IsRanged(ent)) {
          indexvalue = 2;
        }
        BonusDamage = DamageMulOrAdd(Damage, BonusDamage, SkillModifiers[mod][indexvalue]);
      } else {
        let abil = Modifier.GetAbility(modifier);
        if (abil) {
          BonusDamage = DamageMulOrAdd(Damage, BonusDamage, SkillModifiers[mod][Ability.GetLevel(abil)]);
        }
      }
    }
  }

  return Damage + BonusDamage;
}

function ReCalcAttackPoint() {
  let attackSpeed = User.AttackPoint / (1 + (NPC.GetIncreasedAttackSpeed(User.Hero) / 100));
  User.TrueAttackPoint = attackSpeed + (User.AttackPoint * 0.17);
  return User.TrueAttackPoint;
}

function CalcAttackTimeTo(target) {
  if (!target) {
    return 0;
  }

  let FaceTime = Math.max(NPC.GetTimeToFace(User.Hero, target) - ((0.033 * Math.PI / NPC.GetTurnRate(User.Hero) / 180) * 11.5), 0);

  let DistanceToTarget = Math.ceil(NPC.Distance(target, User.Hero));
  let ProjectileDistance = DistanceToTarget - Math.max(DistanceToTarget - (User.AttackRange + User.HullRadius + NPC.GetHullRadius(target)), 0);
  let MoveDistance = 0;
  let MoveTime = 0;
  if (DistanceToTarget > ProjectileDistance) {
    MoveDistance = DistanceToTarget - ProjectileDistance;
    MoveTime = Math.ceil(MoveDistance / User.MoveSpeed) * 3;
  }
  let ProjectileTime = 0;
  if (User.Hero && NPC.IsRanged(User.Hero) && User.ProjectileSpeed && (User.ProjectileSpeed > 0)) {
    ProjectileTime = ((ProjectileDistance - 24) / User.ProjectileSpeed);
  }

  let AttackTime = RoundNumber(User.TrueAttackPoint + ProjectileTime + NetChannel.GetAvgLatency(Enum.Flow.FLOW_OUTGOING) + FaceTime + MoveTime, 3);
  return AttackTime;
}

function readUser() {
  LastHitCreep.User.Hero = Heroes.GetLocal();
  if (!LastHitCreep.User.Hero) {
    false;
  }

  LastHitCreep.User.Name = NPC.GetUnitName(LastHitCreep.User.Hero);
  LastHitCreep.User.IncreasedAS = NPC.GetIncreasedAttackSpeed(LastHitCreep.User.Hero);
  LastCreep.User.AttackPoint = HeroInfo[LastHitCreep.User.Name].AttackPoint;
  LastHitCreep.ReCalcAttackPoint();
  // LastHitCreep.User.TrueAttackPoint = LastHitCreep.User.AttackPoint / (1 + (LastHitCreep.User.IncreasedAS / 100)) + (LastHitCreep.User.AttackPoint * 0.17);
  LastHitCreep.User.AttackBackSwing = HeroInfo[LastHitCreep.User.Name].AttackBackSwing;
  LastHitCreep.User.AttackTime = NPC.GetAttackTime(LastHitCreep.User.Hero);
  // + LastHitep.User.AttackPoint; // + LastHitCreep.User.AttackBackSwing;
  LastHitCreep.User.Damage = NPC.GetTrueDamage(LastHitCreep.User.Hero);
  LastHitCreep.User.MaximumDamage = NPC.GetTrueMaximumDamage(LastHitCreep.User.Hero);

  LastHitCreep.User.ProjectileSpeed = 0;
  LastHitCreep.User.TrueDamage = LastHitCreep.User.Damage + Math.ceil((LastHitCreep.User.MaximumDamage - LastHitCreep.User.Damage) / 2);
  LastHitCreep.User.IsRanged = NPC.IsRanged(LastHitCreep.User.Hero);
  if (LastHitCreep.User.IsRanged) {
    LastHitCreep.User.ProjectileSpeed = HeroInfo[LastHitCreep.User.Name].ProjectileSpeed;
  }
  LastHitCreep.User.AttackRange = NPC.GetAttackRange(LastHitCreep.User.Hero);
  LastHitCreep.User.HullRadius = NPC.GetHullRadius(LastHitCreep.User.Hero);
  LastHitCreep.User.MoveSpeed = NPC.GetMoveSpeed(LastHitCreep.User.Hero);

  LastHitCreep.User.DamageToCreep = LastHitCreep.DamageToCreep(LastHitCreep.Userero);

  return true;
}



function writeCreepHPAround(list, ent, range, team) {
  // calculate DPS
  // TODO: rewrite - dont calculate it, write it every...
  // LastHitCreep.Creeps = Entity.GetUnitsInRadius(ent, range, team);
  if (!LastHitCreep.Creeps || (LastHitCreep.Creeps.length <= 1)) {
    return;
  }
  for (let i = 0; i < LastHitCreep.Creeps.length; i++) {
    let npc = LastHitep.Creeps[i];
    if (npc && NPC.IsCreep(npc) && !NPC.IsWaitingToSpawn(npc) && Entity.IsAlive(npc)) {
      // todo incapsulate it
      if (list[npc] == null) {
        let temp = {};
        temp.HP = Math.floor(Entity.GetHealth(npc) + NPC.GetHealthRegen(npc));
        temp.OldHP = temp.HP;
        temp.DPS = -1;
        temp.Damage = [];
        list[npc] = temp;
      } else {
        let temp = list[npc];
        temp.OldHP = temp.HP;
        temp.HP = Math.floor(Entity.GetHealth(npc) + NPC.GetHealthRegen(npc));
        let curDPS = (temp.OldHP - temp.HP);
        temp.Damage.push(curDPS);
        if (temp.Damage.length > (LastHitCreep.DPSMult * 2)) {
          temp.Damage.shift();
        }
      }
    }
  }
}


function predictCreepHpAround(list, ent, range, team) {
  const creeps = Entity.GetUnitsInRadius(ent, range, team).filter(npc =>.IsNPC(npc) && NPC.IsCreep(npc) && !NPC.IsWaitingToSpawn(npc) && Entity.IsAlive(npc));
  if (!creeps || creeps.length <= 1) {
    return;
  }

  LastHitCreep.ReAttackPoint();
  for (let i = 0; i < creeps.length; i++) {
    const npc = creeps[i];
    const hp = Math.floor(Entity.GetHealth(npc) + NPC.GetHealthRegen(npc));
    if (!list[npc]) {
      const temp = {
        HP: hp,
        OldHP: hp,
        DieTime: 0,
        DPS: null
      };
     [npc] = temp;
    } else {
      const temp = list[npc];
      const oldHp = temp.OldHP;
      const damageTaken = oldHp - hp;
      if (damageTaken > 0) {
        temp.OldHP = oldHp;
        temp.HP = hp;
        const creepDPS = LastHitCreep.CreepsDPS[npc];
        if (creepDPS && creepDPS.Damage && creepDPS.Damage.length >= LastHitCreep.DPSMult) {
          const heroDamage = Math.floor(NPC.GetDamageMultiplierVersus(LastHitCreep.User.Hero, npc) * LastHitCreep.User.DamageToCreep * NPC.GetArmorDamageMultiplier(npc));
          const dps = Math.floor((creepDPS.Damage.reduce((a, b) => a + b, 0) - damageTaken) * LastHitCreep.DPSMult / creepDPS.Damage.length);
          const attackTime = LastHitCreep.CalcAttackTimeTo(npc);
          temp.DPS = dps;
          temp.HeroDamage = heroDamage;
          temp.AttackTime = attackTime;
          if (temp.DieTime === 0) {
            if (Menu_Prediction === 1) { // Creep Die
              if (hp > dps && hp < (dps + damageTaken)) {
                temp.DieTime = GameTime + 1 + attackTime;
              } else if (hp < (dps * 1.5)) {
                temp.DieTime = GameTime + (Math.abs(hp - dps) / dps) + attackTime;
              }
            } else if (Menu_Prediction === 2) { // Player Can HittKill
              if (hp <= heroDamage) {
                temp.DieTime = GameTime + attackTime + 0.1;
              } else if (hp > (dps - heroDamage * 0.25) && hp < (dps + heroDamage)) {
                temp.DieTime = GameTime + 1 + attackTime;
              } else if (dps < heroDamage) {
                //temp.DieTime = GameTime + LastHitCreep.User.AttackTime * Math.ceil(hp / heroDamage);
              }
            }
          }
        }
      }
    }
  }
}

function FindBestTarget() {
  let target = [null, 0];
  LastHitCreep.ReCalcAttackPoint();

  if (LastHitCreep.User.IsRanged) {
    if (Menu_Prediction) {
      const DieTimeMax = (t, a, b) => t[b].DieTime > t[a].DieTime;
      for (const [npc, predicted] of Object.entries(LastHitCreep.CreepsPredictedDieTime).sort(DieTimeMax)) {
        if (npc && predicted.DPS && Entity.IsNPC(npc) && Entity.IsAlive(npc) && NPC.IsEntityInRange(LastHitCreep.User.Hero, npc, 900) && ((Entity.IsSameTeam(npc, LastHitCreep.User.Hero) && Menu_Friendlys) || (!Entity.IsSameTeam(npc, LastHitCreep.User.Hero) && Menu_Enemys)) && (predicted.DieTime - GameTime) > 0) {
          const AttackTime = LastHitCreep.CalcAttackTimeTo(npc);
          if ((predicted.DieTime - GameTime) >= AttackTime * 0.25 && (predicted.DieTime - GameTime) <= AttackTime * 1.2) {
            return [npc, AttackTime];
          }
        }
      }
    }
    const HPMax = (t, a, b) => t[b].HP > t[a].HP;
    for (const [npc, predicted] of Object.entries(LastHitCreep.CreepsPredictedDieTime).sort(HPMax)) {
      if ( && predicted.DPS && Entity.IsNPC(npc) && Entity.IsAlive(npc) && NPC.IsEntityInRange(LastHitCreep.User.Hero, npc, 900) && ((Entity.IsSameTeam(npc, LastHitCreep.User.Hero) && Menu_Friendlys) || (!Entity.IsSameTeam(npc, LastHitCreep.User.Hero) && Menu_Enemys))) {
        const AttackTime = LastHitCreep.CalcAttackTimeTo(npc);
        const HP = Entity.GetHealth(npc);
        if (HP <= predicted.HeroDamage + predicted.DPS * AttackTime) {
          return [npc, AttackTime];
        }
      }
    }
  } else {
    if (Menu_Prediction) {
      const DieTimeMax = (t, a, b) => t[b].DieTime > t[a].DieTime;
      for (const [npc, predicted] of Object.entries(LastHitCreep.CreepsPredictedDieTime).sort(DieTime)) {
        if (npc && predicted.DPS && Entity.IsNPC(npc) && Entity.IsAlive(npc) && NPC.IsEntityInRange(LastHitCreep.User.Hero, npc, 900) && ((Entity.IsSameTeam(npc, LastHitCreep.User.Hero) && Menu_Friendlys) || (!Entity.IsSameTeam(npc, LastHitCreep.User.Hero) && Menu_Enemys)) && (predicted.DieTime - GameTime) > 0) {
          const AttackTime = LastHitCreep.CalcAttackTimeTo(npc);
          if ((predicted.DieTime - GameTime) >= AttackTime * 0.5 && (predicted.DieTime - GameTime) <= AttackTime * 1.2) {
            return [npc, AttackTime];
          }
        }
      }
    }
    const HPMax = (t, a, b) => t[b].HP > t[a].HP;
    for (const [npc, predicted] of Object.entries(LastHitCreep.CreepsPredictedDieTime).sort(HPMax)) {
      if (npc && predicted.DPS && Entity.IsNPC(npc) && Entity.IsAlive(npc) && NPC.IsEntityInRange(LastHitCreep.User.Hero, npc, 900) && ((Entity.IsSameTeam(npc, LastHitCreep.User.Hero) && Menu_Friendlys) || (!Entity.IsSameTeam(npc, LastHitCreep.User.Hero) && Menu_Enemys))) {
        const AttackTime = LastHitCreep.CalcAttackTimeTo(npc);
        const HP = Entity.GetHealth(npc);
        if (HP <= predicted.HeroDamage + predicted.DPS * AttackTime) {
          return [npc, AttackTime];
        }
      }
    }
  }

  return target;
}

function ClearDiedInList() {
  if (!LastHitCreep.CreepsPredictedDieTime) {
    return;
  }
  for (const [npc, val] of Object(LastHitCreep.CreepsPredictedDieTime)) {
    if (npc && Entity.IsNPC(npc)) {
      if (!Entity.IsAlive(npc)) {
        LastHitCreep.CreepsPredictedDieTime[npc] = null;
      }
    } else {
      LastHitCreep.CreepsPredictedDieTime[npc] = null;
    }
  }
}

//=============================================================
// Funcion Principal para Iniciar el CODIGO
//=============================================================
BestAutoLastHits.OnUpdate = () => {
	if (!Menu_Enabled) {
			return;
		}
		User.Hero = Heroes.GetLocal();
		if (User.Hero == null || !Entity.IsAlive(User.Hero)) {
		return;
	}

	Time = performance.now();

	if ((Time - User.LastUpdateTime) > User.UpdateTime) {
		if (!User.Read()) {
			return;
		}
		User.LastUpdateTime = Time;
	}

	ClearDiedInList();
	PredictCreepHPAround(CreepsPredictedDieTime, User.Hero, Math.min(1000, User.AttackRange + 500), Enum.TeamType.TEAM);

	if ((Time - LastUpdateTime) > UpdateTime) {
		WriteCreepHPAround(CreepsDPS, User.Hero, Math.min(1000, User.AttackRange + 500), Enum.TeamType.TE_BOTH);
		LastUpdateTime = Time;
	}

	if ((Time - User.LastAttackTime) > 0 && CanCastSpells(User.Hero) && !PreventPlayer(User.Hero)) {
		let BestTarget = FindBestTarget();
			if (BestTarget && BestTarget[1] && Menu_LastHitKey) {
			Player.AttackTarget(Players.GetLocal(), User.Hero, BestTarget[1]);
			User.LastAttackTime = Time + BestTarget[2];
			User.LastMoveTime = User.LastAttackTime + 0.5;
		} else {
			//Player.HoldPosition(Players.GetLocal(), User.Hero, false);
		}
		User.LastTarget = BestTarget[1];
	} else {
		User.LastTarget = null;
	}

	if (Menu_AttackMove) {
		if (NPC.IsTurning(User.Hero) || NPC.IsRunning(User.Hero)) {
			User.LastMoveTime = Time + 2;
		} else {
			if ((Time - User.LastAttackTime) > (User.AttackPoint + 0.05) && (Time - User.LastMoveTime) > 0.45) {
				let position = Entity.GetAbsOrigin(User.Hero);
				movevec = position.add(Vector(Math.random(-70,70),Math.random(-70,70),0));
				NPC.MoveTo(User.Hero, movevec, false);
				User.LastMoveTime = Time + 3 + (VectorDistance(position,movevec)/User.MoveSpeed);
			}
		}
	}
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
	for (let k in LastHitCreep.Particles) {
		LastHitCreep.Particles[k] = null;
	}
};

BestAutoLastHits.OnGameEnd = () => {
	localHero = null;
	myPlayer = null;
	
	LastHitCreep.User.Hero = null;
	for (let k in LastHitCreep.Particles) {
		LastHitCreep.ClearParticle(k);
	}
};


function PredictDrawing() {
	GameTime = GameRules.GetGameTime();
	if (!CreepsPredictedDieTime) {
		return;
	}

	if (Menu_ShowPrediction !== 0) {
		let imageHandle = KillableImage;
		if (!imageHandle) {
			imageHandle = Renderer.LoadImage("resource/flash3/images/heroes/selection/fav_heart.png");
			KillableImage = imageHandle;
		}
		for (let target in CreepsPredictedDieTime) {
			let predicted = CreepsPredictedDieTime[target];
			if (target && Entity.IsNPC(target) && ((Menu_ShowPrediction === 3) || ((Menu_ShowPrediction === 2) && Entity.IsSameTeam(target, User.Hero)) || ((Menu_ShowPrediction === 1) && !Entity.IsSameTeam(target, User.Hero)))) {

				let TimeDiff = null;
				if (predicted.DieTime !== 0) {
					TimeDiff = (predicted.DieTime - GameTime);
				}
				if (!TimeDiff || (TimeDiff < -2.5) || !Entity.IsAlive(target)) {
					predicted.DieTime = 0;
				} else {
					let pos =.GetAbsOrigin(target);
					let posY = NPC.GetHealthBarOffset(target);
					pos.SetZ(pos.GetZ() + posY);
					let [x, y, visible] = Renderer.WorldToScreen(pos);

					if (visible && (TimeDiff > -2)) {
						if (TimeDiff > (predicted.AttackTime + 0.1)) {
							Renderer.SetDrawColor(50, 235, 50, 200);
						} else if (TimeDiff > -0.1) {
							Renderer.SetDrawColor(215, 215, 0, 200);
						} else {
							Renderer.SetDrawColor(235, 25, 25, 200);
							predicted.DieTime = 0;
						}
						Renderer.DrawImage(imageHandle, x - 20, y - 49, 40, 40);
					}
				}
			}
		}
	}
}

function OnDraw() {
	if (Menu_Enabled && User.Hero && Entity.IsAlive(User.Hero)) {
		PredictDrawing(User.Hero);
	}
}

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
