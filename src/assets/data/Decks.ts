import { CardType } from "../../../enum"
import { getCard } from "../../common/CardUtils"

export const PrebuiltDecks = {
    vermin: (playerId:string):Card[] => {
        return [
            getCard(playerId, CardType.Addict),
            getCard(playerId, CardType.ScavengingRats),
            getCard(playerId, CardType.ScavengingRats),
            getCard(playerId, CardType.ScavengingRats),
            getCard(playerId, CardType.ScavengingRats),
            getCard(playerId, CardType.ScavengingRats),
            getCard(playerId, CardType.ScavengingRats),
            getCard(playerId, CardType.ScavengingRats),
            getCard(playerId, CardType.ScavengingRats),
            getCard(playerId, CardType.ScavengingRats),
            getCard(playerId, CardType.ScavengingRats),
            getCard(playerId, CardType.ScavengingRats),
            getCard(playerId, CardType.Roaches),
            getCard(playerId, CardType.Roaches),
            getCard(playerId, CardType.Roaches),
            getCard(playerId, CardType.CursedToad),
            getCard(playerId, CardType.CursedToad),
            getCard(playerId, CardType.CursedToad),
            getCard(playerId, CardType.TheFear),
            getCard(playerId, CardType.TheFear),
            getCard(playerId, CardType.TheFear)
        ]
    },
    nomads: (playerId:string):Card[] => {
        return [
            getCard(playerId, CardType.Bighorn),
            getCard(playerId, CardType.Bighorn),
            getCard(playerId, CardType.Bighorn),
            getCard(playerId, CardType.Bighorn),
            getCard(playerId, CardType.Bighorn),
            getCard(playerId, CardType.Bighorn),
            getCard(playerId, CardType.Bighorn),
            getCard(playerId, CardType.Bighorn),
            getCard(playerId, CardType.Bighorn),
            getCard(playerId, CardType.Bighorn),
            getCard(playerId, CardType.MountedHorde),
            getCard(playerId, CardType.DrometaurSpearhand),
            getCard(playerId, CardType.DrometaurSpearhand),
            getCard(playerId, CardType.DrometaurSpearhand),
            getCard(playerId, CardType.LizardWarrior),
            getCard(playerId, CardType.LizardWarrior),
            getCard(playerId, CardType.LizardWarrior),
            getCard(playerId, CardType.LizardMage),
            getCard(playerId, CardType.LizardMage),
            getCard(playerId, CardType.LizardMage)
        ]
    },
    faithful: (playerId:string):Card[] => {
        return [
            getCard(playerId, CardType.HeroicSoldier),
            getCard(playerId, CardType.HeroicSoldier),
            getCard(playerId, CardType.HeroicSoldier),
            getCard(playerId, CardType.HeroicSoldier),
            getCard(playerId, CardType.HeroicSoldier),
            getCard(playerId, CardType.HeroicSoldier),
            getCard(playerId, CardType.HeroicSoldier),
            getCard(playerId, CardType.HeroicSoldier),
            getCard(playerId, CardType.HeroicSoldier),
            getCard(playerId, CardType.HeroicSoldier),
            getCard(playerId, CardType.FaithfulKnight),
            getCard(playerId, CardType.FaithfulKnight),
            getCard(playerId, CardType.FaithfulKnight),
            getCard(playerId, CardType.ShroudedApostle),
            getCard(playerId, CardType.VenerableMonk),
            getCard(playerId, CardType.VenerableMonk),
            getCard(playerId, CardType.VenerableMonk),
            getCard(playerId, CardType.DivineReach),
            getCard(playerId, CardType.DivineReach),
            getCard(playerId, CardType.DivineReach)
        ]
    },
    birds: (playerId:string):Card[] => {
        return [
            getCard(playerId, CardType.SteamElemental),
            getCard(playerId, CardType.Corvian),
            getCard(playerId, CardType.Corvian),
            getCard(playerId, CardType.Corvian),
            getCard(playerId, CardType.Corvian),
            getCard(playerId, CardType.Corvian),
            getCard(playerId, CardType.Corvian),
            getCard(playerId, CardType.Corvian),
            getCard(playerId, CardType.Corvian),
            getCard(playerId, CardType.Corvian),
            getCard(playerId, CardType.Corvian),
            getCard(playerId, CardType.Corvian),
            getCard(playerId, CardType.Falconer),
            getCard(playerId, CardType.Falconer),
            getCard(playerId, CardType.Falconer),
            getCard(playerId, CardType.MessengerOwl),
            getCard(playerId, CardType.MessengerOwl),
            getCard(playerId, CardType.MessengerOwl)
        ]
    },
    goblinHordes: (playerId:string):Card[] => {
        return [
            getCard(playerId, CardType.Tremors),
            getCard(playerId, CardType.GoblinSargeant),
            getCard(playerId, CardType.GoblinSargeant),
            getCard(playerId, CardType.GoblinSargeant),
            getCard(playerId, CardType.Hobgoblin),
            getCard(playerId, CardType.Hobgoblin),
            getCard(playerId, CardType.Hobgoblin),
            getCard(playerId, CardType.Sinkhole),
            getCard(playerId, CardType.Sinkhole),
            getCard(playerId, CardType.Sinkhole),
            getCard(playerId, CardType.GoblinScrounger),
            getCard(playerId, CardType.GoblinScrounger),
            getCard(playerId, CardType.GoblinScrounger),
            getCard(playerId, CardType.GoblinScrounger),
            getCard(playerId, CardType.GoblinScrounger),
            getCard(playerId, CardType.GoblinScrounger),
            getCard(playerId, CardType.GoblinScrounger),
            getCard(playerId, CardType.GoblinScrounger),
            getCard(playerId, CardType.GoblinScrounger),
            getCard(playerId, CardType.GoblinScrounger)
        ]
    },
    goblinSmall:(playerId:string):Card[] => {
        return [
            getCard(playerId, CardType.GoblinSargeant),
            getCard(playerId, CardType.Hobgoblin),
            getCard(playerId, CardType.Hobgoblin),
            getCard(playerId, CardType.Sinkhole),
            getCard(playerId, CardType.GoblinScrounger),
            getCard(playerId, CardType.GoblinScrounger),
            getCard(playerId, CardType.GoblinScrounger)
        ]
    },
    blackSmall:(playerId:string):Card[] => {
        return [
            getCard(playerId, CardType.Boggart),
            getCard(playerId, CardType.Boggart),
            getCard(playerId, CardType.Homonculus),
            getCard(playerId, CardType.MercenaryKnight),
            getCard(playerId, CardType.MercenaryKnight),
            getCard(playerId, CardType.Roaches),
            getCard(playerId, CardType.Roaches),
            getCard(playerId, CardType.Roaches),
            getCard(playerId, CardType.ShadowForm),
            getCard(playerId, CardType.ShadowForm),
            getCard(playerId, CardType.Addict),
            getCard(playerId, CardType.CursedToad,),
            getCard(playerId, CardType.CursedToad),
            getCard(playerId, CardType.ScavengingRats),
            getCard(playerId, CardType.ScavengingRats),
            getCard(playerId, CardType.ScavengingRats),
            getCard(playerId, CardType.Riot),
            getCard(playerId, CardType.Riot),
            getCard(playerId, CardType.Pollution),
            getCard(playerId, CardType.Pollution),
            getCard(playerId, CardType.Pollution)
        ]
    },
    beasts:(playerId:string):Card[] => {
        return [
            getCard(playerId, CardType.FeralSpirit),
            getCard(playerId, CardType.ForestJackal),
            getCard(playerId, CardType.ForestJackal),
            getCard(playerId, CardType.ForestJackal),
            getCard(playerId, CardType.ForestJackal),
            getCard(playerId, CardType.ForestJackal),
            getCard(playerId, CardType.ForestJackal),
            getCard(playerId, CardType.ForestJackal),
            getCard(playerId, CardType.ForestJackal),
            getCard(playerId, CardType.ForestJackal),
            getCard(playerId, CardType.ForestJackal),
            getCard(playerId, CardType.BlackBear),
            getCard(playerId, CardType.BlackBear),
            getCard(playerId, CardType.BlackBear),
            getCard(playerId, CardType.WerewolfRaider),
            getCard(playerId, CardType.WerewolfRaider),
            getCard(playerId, CardType.WerewolfRaider)
        ]
    }
}
    