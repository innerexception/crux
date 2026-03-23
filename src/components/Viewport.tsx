import * as Phaser from 'phaser'
import * as React from 'react'
import { useRef } from 'react'
import { SceneNames } from '../../enum';
import LoadingScene from './scenes/LoadingScene';
import IntroScene from './scenes/IntroScene';
import BattleScene from './scenes/BattleScene';
import MapScene from './scenes/MapScene';

export default () => {
    const containerRef = useRef(null)
    const componentDidMount = () => {
        new Phaser.Game({
            type: Phaser.WEBGL,
            width: containerRef.current.clientWidth,
            height: containerRef.current.clientHeight,
            parent: 'canvasEl',
            physics: {
                default: 'arcade',
                arcade: {
                    debug: false,
                }
            },
            render: {
                pixelArt: true
            },
            scene: [
                new LoadingScene({key: SceneNames.Loading}),
                new IntroScene({key: SceneNames.Intro}),
                new BattleScene({key: SceneNames.Main}),
                new MapScene({key:SceneNames.Map})
            ]
        })
    }
    React.useEffect(componentDidMount, [])

    return <div ref={containerRef} id='canvasEl' style={{width:'800px', height:'600px', borderRadius:'2px'}}/>
}



