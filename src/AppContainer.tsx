import * as React from 'react'
import { useSelector } from 'react-redux';
import { Modal } from '../enum';
import Viewport from './components/Viewport';
import NewGame from './components/modals/NewGame';
import StatusBar from './components/StatusBar';
import Options from './components/modals/Options';
import DeckView from './components/DeckView';
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
import ViewGY from './components/modals/ViewGY';
import TradeSpells from './components/modals/TradeSpells';
import CampaignDeckbuilder from './components/CampaignDeckbuilder';
import MapUI from './components/MapUI';
import Logs from './components/Logs';

export default () => {

  const state = useSelector((state:RState)=>state)
  const netAck = useSelector((state:RState)=>state.netAck)
  
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
        {showUI && <Logs/>}
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