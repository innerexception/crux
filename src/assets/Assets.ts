import { Maps } from "../../enum"

export const FONT_DEFAULT = {
    fontFamily: 'Body', 
    fontSize: '8px',
    color:'#fff',
}

export const iconSheet = require('./img/iconsc.png')
export const creatureSheet = require('./img/monochrome_16x16c.png')
export const creatureSheetL = require('./img/monochrome_32x32.png')
export const defaultCursor = require('./img/default.png')

export const resources:Array<PhaserResource> = [
    { key: 'tiles', resource: require('./img/terrain_ext.png'), type: 'image' },
    { key: 'selected', resource: require('./img/selected.png'), type: 'image' },
    { key: 'logo', resource: require('./img/logo.png'), type: 'image' },
    { key: 'bg', resource: require('./img/bg.png'), type: 'image' },
    { key: 'black', resource: require('./img/black.png'), type: 'image'},
    { key: 'items', resource: iconSheet, type: 'spritesheet', data: { frameWidth: 16, frameHeight: 16 } },
    { key: 'creatures', resource: creatureSheet, type: 'spritesheet', data: { frameWidth: 16, frameHeight: 16 } },
    { key: 'creaturesL', resource: creatureSheetL, type: 'spritesheet', data: { frameWidth: 32, frameHeight: 32 } },
    //{ key: SoundEffect.Birds, resource: require('./audio/birds.mp3'), type:'audio'},
    { key: Maps.Tutorial, resource: require('./maps/tutorial.json'), type: 'tilemapTiledJSON'},
]