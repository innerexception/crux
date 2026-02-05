import * as React from 'react'
import { useSelector } from 'react-redux';
import { Modal } from '../enum';
import Viewport from './components/Viewport';
import NewGame from './components/NewGame';
import StatusBar from './components/StatusBar';
import Options from './components/Options';
import DeckView from './components/DeckView';
import CardView from './components/CardView';
import Sidebar from './components/Sidebar';
import Graveyard from './components/Graveyard';

export default () => {

  const state = useSelector((state:RState)=>state)
 
  const getModal = () => {
    switch(state.activeModal){
      case Modal.NewGame: return <NewGame/>
      case Modal.Options: return <Options/>
      case Modal.Graveyard: return <Graveyard/>
      default: return <span/>
    }
  }

  return (
    <div style={{position:'relative', height:'100vh', overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center'}}>
      {state.activeModal && <div style={{position:'absolute', height:'fit-content', width:'800px', left:0,right:0,bottom:0,top:0, margin:'auto', zIndex:1}}>{getModal()}</div>}
      <div style={{position:'relative'}}>
        {state.activeModal !== Modal.NewGame && state.isLoaded && <Sidebar />}
        {state.activeModal !== Modal.NewGame && state.isLoaded && <StatusBar />}
        <Viewport/>
        {state.activeModal !== Modal.NewGame && state.isLoaded && <DeckView/>}
        {state.inspectCardId && <div style={{position:'absolute', bottom:0, right:0}}><CardView card={state.currentMatch.board.find(c=>c.id === state.inspectCardId)}/></div>}
      </div>
    </div>
  )
}
