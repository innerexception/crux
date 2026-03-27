import { CardType, CreatureSpriteIndex, MapFeature } from "../../../enum";
import { getCard } from "../../common/CardUtils";
import { Portal } from "./Portal";

export const MapFeatures:Partial<Record<CreatureSpriteIndex, FeatureData>> = {
    [CreatureSpriteIndex.GreenMerchant]: {
        kind: MapFeature.Shop,
        shopInventory: [
            getCard('', CardType.Anaconda, Portal[CardType.Anaconda]),
            getCard('', CardType.DeepSprings, Portal[CardType.DeepSprings]),
            getCard('', CardType.Falconer, Portal[CardType.Falconer]),
            getCard('', CardType.Grizzly, Portal[CardType.Grizzly]),
        ]
    },
    [CreatureSpriteIndex.RedMerchant]: {
        kind: MapFeature.Shop,
        shopInventory: [
            getCard('', CardType.BallLightning, Portal[CardType.BallLightning]),
            getCard('', CardType.Cougar, Portal[CardType.Cougar]),
            getCard('', CardType.FireImp, Portal[CardType.FireImp]),
            getCard('', CardType.FlashFlood, Portal[CardType.FlashFlood]),
        ]
    },
}