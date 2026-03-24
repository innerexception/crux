import * as React from 'react'
import { useSelector } from 'react-redux';
import { IconIndex, Log, Modal } from '../enum';
import Viewport from './components/Viewport';
import NewGame from './components/modals/NewGame';
import StatusBar from './components/StatusBar';
import Options from './components/modals/Options';
import DeckView from './components/DeckView';
import Sidebar from './components/Sidebar';
import CPUDeck from './components/CPUDeck';
import LandChoice from './components/modals/LandChoice';
import Lobby from './components/modals/Lobby';
import Deckbuilder from './components/Deckbuilder';
import CardDetailView from './components/CardDetailView';
import AbilityPreview from './components/AbilityPreview';
import LookAtCards from './components/modals/LookAtCards';
import PickNextCard from './components/modals/PickNextCard';
import DiscardAndDraw from './components/modals/DiscardAndDraw';
import Winner from './components/modals/Winner';
import Loser from './components/modals/Loser';
import { CssIcon } from './common/Shared';
import { renderEffect } from './components/CardView';
import { getCardData } from './common/CardUtils';
import ViewGY from './components/modals/ViewGY';
import TradeSpells from './components/modals/TradeSpells';
import CampaignDeckbuilder from './components/CampaignDeckbuilder';
import MapUI from './components/MapUI';

export default () => {

  const state = useSelector((state:RState)=>state)
  const netAck = useSelector((state:RState)=>state.netAck)
  const match = useSelector((state:RState)=>state.saveFile?.currentMatch)

  const getModal = () => {
    switch(state.activeModal){
      case Modal.NewGame: return <NewGame/>
      case Modal.Options: return <Options/>
      case Modal.ShowLandChoices: return <LandChoice/>
      case Modal.Lobby: return <Lobby/>
      case Modal.Deckbuilder: return <Deckbuilder/>
      case Modal.ViewCards: return <LookAtCards/>
      case Modal.ViewGY: return <ViewGY/>
      case Modal.PickNextCard: return <PickNextCard/>
      case Modal.DiscardAndDraw: return <DiscardAndDraw/>
      case Modal.Winner: return <Winner/>
      case Modal.GameOver: return <Loser/>
      case Modal.TradeSpells: return <TradeSpells/>
      case Modal.CampaignDeckbuilder: return <CampaignDeckbuilder/>
      default: return <span/>
    }
  }

  const showUI = state.saveFile?.currentMatch 
  const showMapUI = !state.activeModal && state.saveFile && !state.saveFile?.currentMatch 

  return (
    <div style={{position:'relative', height:'100vh', overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center'}}>
      {state.activeModal && <div style={{position:'absolute', height:'fit-content', width:'800px', left:0,right:0,bottom:0,top:0, margin:'auto', zIndex:1}}>{getModal()}</div>}
      {!netAck && <div style={{position:'absolute', top:0, left:0, width:'100vw', height:'100vh', background:'white', opacity:0.1, zIndex:2}}/>}
      <div style={{position:'relative'}}>
        {showUI && <div style={{width:'200px', opacity:0.8, position:'absolute', top:'33%', left:10, height:'300px', overflow:'auto', background:'black', padding:'5px', fontSize:'16px'}}>
            {match?.logs?.map(l=>getLogEl(l, match))}
        </div>}
        {showUI && <Sidebar />}
        {showUI && <StatusBar />}
        {showUI && <CPUDeck/>}
        <Viewport/>
        {showUI && <DeckView/>}
        {showMapUI && <MapUI/>}
        {showUI && <div style={{position:'absolute', top:'33%',opacity:0.8, right:10, background:'black', width:'200px', height:'300px'}}>{state.inspectCard && <CardDetailView card={state.inspectCard}/>}</div>}
        {state.previewAbility && <div style={{position:'absolute', top:'50%', left:10}}><AbilityPreview ability={state.previewAbility}/></div>}
      </div>
    </div>
  )
}


const getLogEl = (l:LogEntry, match:MatchState) => {

  const caster = match.players.find(p=>p.id === l.card.ownerId).playerSprite
  const dat = getCardData(l.card)

  if(l.kind === Log.AbilityPlayed) return <div>
      <CssIcon spriteIndex={caster}/> used ability of {l.card.kind} : {renderEffect(dat.ability.effect)}
  </div>
  if(l.kind === Log.CardPlayed) return <div>
      <CssIcon spriteIndex={caster}/> summoned {l.card.kind}
  </div>
  if(l.kind === Log.RangedDamage) return <div>
      <CssIcon spriteIndex={caster}/> used ranged attack of {l.card.kind} on {l.target.kind}
  </div>
  if(l.kind === Log.ExpiredEffect) return <div>
      <CssIcon spriteIndex={IconIndex.Debuff}/> Effect expired on {l.card.kind}: {renderEffect(l.effect.status)}
  </div>
  if(l.kind === Log.NimbleActivation) return <div>
    <CssIcon spriteIndex={dat.sprite}/> used Nimble ability to move
  </div>
  if(l.kind === Log.Destroyed) return <div>
    <CssIcon spriteIndex={dat.sprite}/> was destroyed
  </div>
}
