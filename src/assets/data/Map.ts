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
    }
}