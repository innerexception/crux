import * as React from 'react'
import { useSelector } from 'react-redux';
import { Modal } from '../enum';
import Viewport from './components/Viewport';
import NewGame from './components/modals/NewGame';
import StatusBar from './components/StatusBar';
import Options from './components/modals/Options';
import DeckView from './components/DeckView';
import CardView from './components/CardView';
import Sidebar from './components/Sidebar';
import Graveyard from './components/modals/Graveyard';
import CPUDeck from './components/CPUDeck';
import LandChoice from './components/modals/LandChoice';
import Lobby from './components/modals/Lobby';
import Deckbuilder from './components/Deckbuilder';
import CardDetailView from './components/CardDetailView';
import AbilityPreview from './components/AbilityPreview';
import LookAtCards from './components/modals/LookAtCards';
import SelectCreatureForTop from './components/modals/SelectCreatureForTop';

export default () => {

  const state = useSelector((state:RState)=>state)
  const myTurn = useSelector((state:RState)=>{
    if(!state.saveFile) return true
    if(!state.saveFile.currentMatch) return true
    return state.saveFile.currentMatch.activePlayerId === state.saveFile?.myId
  })
  const netAck = useSelector((state:RState)=>state.netAck)

  const getModal = () => {
    switch(state.activeModal){
      case Modal.NewGame: return <NewGame/>
      case Modal.Options: return <Options/>
      case Modal.Graveyard: return <Graveyard/>
      case Modal.ShowLandChoices: return <LandChoice/>
      case Modal.Lobby: return <Lobby/>
      case Modal.Deckbuilder: return <Deckbuilder/>
      case Modal.ViewCards: return <LookAtCards/>
      case Modal.SelectCreatureForTop: return <SelectCreatureForTop/>
      default: return <span/>
    }
  }

  return (
    <div style={{position:'relative', height:'100vh', overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center'}}>
      {state.activeModal && <div style={{position:'absolute', height:'fit-content', width:'800px', left:0,right:0,bottom:0,top:0, margin:'auto', zIndex:1}}>{getModal()}</div>}
      {(!myTurn || !netAck) && <div style={{position:'absolute', top:0, left:0, width:'100vw', height:'100vh', background:'white', opacity:0.1, zIndex:2}}/>}
      <div style={{position:'relative'}}>
        {state.activeModal !== Modal.NewGame && state.isLoaded && <Sidebar />}
        {state.activeModal !== Modal.NewGame && state.isLoaded && <StatusBar />}
        {state.activeModal !== Modal.NewGame && state.isLoaded && <CPUDeck/>}
        <Viewport/>
        {state.activeModal !== Modal.NewGame && state.isLoaded && <DeckView/>}
        <div style={{position:'absolute', top:'25vh', right:10, background:'black', width:'175px', height:'250px'}}>{state.inspectCard && <CardDetailView card={state.inspectCard}/>}</div>
        {state.previewAbility && <div style={{position:'absolute', top:'50%', left:10, background:'black'}}><AbilityPreview ability={state.previewAbility}/></div>}
      </div>
    </div>
  )
}
