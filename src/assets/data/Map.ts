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
}