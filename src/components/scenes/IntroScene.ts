import { Scene, Tilemaps } from "phaser";

export default class IntroScene extends Scene {

    sounds: any
    map:Tilemaps.Tilemap

    create = () =>
    {
        this.sounds = {}
        this.add.tileSprite(0,0,this.cameras.main.displayWidth,this.cameras.main.displayHeight*2, 'bg').setOrigin(0,0).setScale(1)
        this.cameras.main.setZoom(2)
        this.input.mouse.disableContextMenu()
        // this.sounds[SoundEffects.Intro] = this.sound.add(SoundEffects.Intro)
        // this.sounds[SoundEffects.Clunk] = this.sound.add(SoundEffects.Clunk)
        // this.sounds[SoundEffects.Intro].play({loop: true, volume: 0.2})
    }
    onTransitionIn = () => {}
}