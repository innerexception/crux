import { CardType, CreatureSpriteIndex, MapFeature } from "../../../enum";
import { getCard } from "../../common/CardUtils";

export const MapFeatures:Partial<Record<CreatureSpriteIndex, FeatureData>> = {
    [CreatureSpriteIndex.GreenMerchant]: {
        kind: MapFeature.Shop,
        shopInventory: [
            getCard('', CardType.Anaconda),
            getCard('', CardType.DeepSprings),
            getCard('', CardType.Falconer),
            getCard('', CardType.Grizzly),
        ]
    },
    [CreatureSpriteIndex.RedMerchant]: {
        kind: MapFeature.Shop,
        shopInventory: [
            getCard('', CardType.BallLightning),
            getCard('', CardType.Cougar),
            getCard('', CardType.FireImp),
            getCard('', CardType.FlashFlood),
        ]
    },
    [CreatureSpriteIndex.Goblin]: {
        kind: MapFeature.Duel,
        opponent: CreatureSpriteIndex.Goblin
    },
    [CreatureSpriteIndex.Goblin3]: {
        kind: MapFeature.Duel,
        opponent: CreatureSpriteIndex.Goblin3
    },
    [CreatureSpriteIndex.CityMage]: {
        kind: MapFeature.Duel,
        opponent: CreatureSpriteIndex.CityMage
    },
    [CreatureSpriteIndex.Bruiser]: {
        kind: MapFeature.Duel,
        opponent: CreatureSpriteIndex.Bruiser
    },
    [CreatureSpriteIndex.Mummy]: {
        kind: MapFeature.Duel,
        opponent: CreatureSpriteIndex.Mummy
    },
    [CreatureSpriteIndex.MasterMummy]: {
        kind: MapFeature.Duel,
        opponent: CreatureSpriteIndex.MasterMummy
    },
    [CreatureSpriteIndex.GoblinMage]: {
        kind: MapFeature.Duel,
        opponent: CreatureSpriteIndex.GoblinMage
    },
    [CreatureSpriteIndex.SnakeMan]: {
        kind: MapFeature.Speech,
        speech: 'Hello'
    },
    [CreatureSpriteIndex.Goblinchief]: {
        kind: MapFeature.Shop,
        shopInventory: [
            getCard('', CardType.Hobgoblin),
            getCard('', CardType.LizardMage),
            getCard('', CardType.RockTroll),
            getCard('', CardType.FlashFlood),
        ]
    },
}