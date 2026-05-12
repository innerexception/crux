import * as React from 'react'
import { useSelector } from 'react-redux'
import { AIPlayers, getCardData } from '../common/CardUtils'
import { colors } from '../styles/AppStyles'

export default () => {

    const selectedNPC = useSelector((state:RState)=>state.selectedNPC)
    const creatures = useSelector((state:RState)=>state.saveFile.campaignCreatures)
    const me = useSelector((state:RState)=>state.saveFile.campaignDeck)
    
    const getNPCName = () => {
        let cre = creatures.find(c=>c.tileX === selectedNPC.x && c.tileY === selectedNPC.y)
        if(AIPlayers[cre.kind]){
            return AIPlayers[cre.kind].name
        }
        else return '???'
    }

    const getDeckThreatColor = () => {
        const value = me.map(c=>getCardData(c.kind).gold).reduce((sum,next)=>sum+next, 0)
        const cre = creatures.find(c=>c.tileX === selectedNPC.x && c.tileY === selectedNPC.y)
        if(!AIPlayers[cre.kind]) return 'white'
        const cvalue = AIPlayers[cre.kind].deck('-1').map(c=>getCardData(c.kind).gold).reduce((sum,next)=>sum+next, 0)
        const diff = Math.abs(value-cvalue)

        if(diff < 10) return colors.green
        if(diff < 20) return colors.yellow
        return colors.red

    }

    return (
        <div style={{padding:'5px', background:'black', border:'2px inset white', width:'200px', height:'50px'}}>
            {selectedNPC && <div style={{color: getDeckThreatColor()}}>{getNPCName()}</div>}
        </div>
    )
}

