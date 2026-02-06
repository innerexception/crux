import * as React from 'react'
// import { btnDown, btnUp, downCursor, iconSheet, modalLeftCap, modalRepeat, modalRightCap } from '../assets/Assets'
import { creatureSheet, iconSheet } from '../assets/Assets'
import AppStyles from '../styles/AppStyles'
import Tooltip from 'rc-tooltip'
import { CardType, IconIndex } from '../../enum'
import { getCardData } from './CardUtils'

export const TopBar = (text:string|JSX.Element) => 
    <div style={AppStyles.topBar}>
        <div style={{width:'33%'}}><hr style={AppStyles.hr}/><hr style={AppStyles.hr}/><hr style={AppStyles.hr}/><hr style={AppStyles.hr}/></div>
            {text}
        <div style={{width:'33%'}}><hr style={AppStyles.hr}/><hr style={AppStyles.hr}/><hr style={AppStyles.hr}/><hr style={AppStyles.hr}/></div>
    </div>

interface ButtonProps {
    enabled:boolean, handler:Function, text:JSX.Element | string, style?:object, icon?: IconIndex
}

export const Button = (props:ButtonProps) => 
    <div style={{...props.style, ...AppStyles.buttonOuter, pointerEvents: props.enabled ? 'all' : 'none'}} 
        onClick={()=>props.handler()}>
        <div style={{...AppStyles.buttonInner, opacity: props.enabled ? 1 : 0.5, display:'flex', alignItems:'end'}}>
            {props.icon && <CssIcon spriteIndex={props.icon} noTooltip={true}/>}
            <div style={props.icon ? {marginLeft:'0.5em', lineHeight:'16px'}:{}}>{props.text}</div>
        </div>
    </div>

// export const SmallButton = (enabled:boolean, handler:Function, index:number, selected?:boolean) => 
//     <div className="smlbtn" style={{position:'relative', height:'40px', width:'40px', backgroundImage: 'url('+(selected ? btnDown : btnUp)+')', backgroundSize:'contain', display:'flex', justifyContent:"center", alignItems:'center'}} 
//          onClick={enabled ? ()=>{handler()} : null}>
//         <div style={{marginRight:'4px', marginTop:'3px'}}>{CssIcon('', index)}</div>
//         {!enabled && <div style={{position:'absolute', top:4, left:4}}>{CssIcon('', IconIndexes.disabled)}</div>}
//     </div>
    
// export const Modal = (content:JSX.Element) => 
//     <div style={{...AppStyles.modal}}>
//         <div style={{height:'288px', width:'32px', backgroundImage: 'url('+modalLeftCap+')', backgroundSize:'32px',}}/>
//         <div style={{position:'relative', backgroundImage:'url('+modalRepeat+')', backgroundSize:'304px', padding:'40px 10px', maxWidth:'835px'}}>
//             {content}
//             <div style={{position:'absolute', bottom:0, right:-64, width:'64px', height:'64px', cursor:'url('+downCursor+'), auto',}} onClick={()=>{onHideModal(); onCancelPlayerAction();}}/>
//         </div>
//         <div style={{width:'64px', backgroundImage: 'url('+modalRightCap+')', backgroundSize:'64px'}}/>
//     </div>

export const ToggleButton = (state:boolean, handler:any, text:JSX.Element | string) => 
    <div style={{...AppStyles.buttonOuter, color:state ? 'white' : 'black', background:state?'black':'white'}} 
        onClick={handler}>
        <div style={{...AppStyles.buttonInner}}>{text}</div>
    </div>

// export const LightButton = (enabled:boolean, handler:any, text:string, tab?:boolean) => 
//     <div style={{position:'relative'}}>
//         <div onClick={handler} style={{...AppStyles.buttonInner, pointerEvents: enabled ? 'all' : 'none', 
//              textAlign:'center', borderBottom: tab && !enabled ? '1px dashed':'1px solid', borderBottomLeftRadius: tab?0:'3px', borderBottomRightRadius:tab?0:'3px', marginBottom: tab ? '-1px' : 0}}>{text}</div>
//         {!enabled && <div style={{position:'absolute', top:4, left:4}}>{CssIcon('', IconIndexes.disabled)}</div>}
//     </div>
    
// export const NumericInput = (value:number, onValueChange:Function, max?:number, min?:number) => 
//     <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
//         {LightButton(min || min===0 ? value > min:true, ()=>onValueChange(value-1),'<')}
//         <div style={{width:'2em', textAlign:"center"}}>{value}</div>
//         {LightButton(max ? value < max:true, ()=>onValueChange(value+1),'>')}
//     </div>

// export const Select = (value:any, onValueChange:Function, values: Array<any>) => 
//     <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
//         {LightButton(values.findIndex(v=>v===value) > 0, ()=>onValueChange(values[values.findIndex(v=>v===value)-1]),'<')}
//         <div style={{textAlign:"center", backgroundColor:value}}>{value}</div>
//         {LightButton(values.findIndex(v=>v===value) < values.length-1, ()=>onValueChange(values[values.findIndex(v=>v===value)+1]),'>')}
//     </div>

// export const ColorSelect = (value:string, onValueChange:Function, values: Array<string>) => 
//     <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
//         {LightButton(values.findIndex(v=>v===value) > 0, ()=>onValueChange(values[values.findIndex(v=>v===value)-1]),'<')}
//         <div style={{backgroundColor:value, width:'2em', height:'2em'}}/>
//         {LightButton(values.findIndex(v=>v===value) < values.length-1, ()=>onValueChange(values[values.findIndex(v=>v===value)+1]),'>')}
//     </div>

// export const IconSelect = (value:IconNames, onValueChange:Function, values: Array<IconNames>) => 
//     <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
//         {LightButton(values.findIndex(v=>v===value) > 0, ()=>onValueChange(values[values.findIndex(v=>v===value)-1]),'<')}
//         {Icon(value ? value : values[0], false)}
//         {LightButton(values.findIndex(v=>v===value) < values.length-1, ()=>onValueChange(values[values.findIndex(v=>v===value)+1]),'>')}
//     </div>

export const ProgressBar = (props:{value:number, max:number, bg:string}) => 
    <div style={{width:'98px', height:'24px',  position:'relative', padding:'2px', border:'2px solid white'}}>
        <div style={{background:props.bg, backgroundSize:'32px', width:Math.round((props.value/props.max)*100)+'%', height:'100%'}}/>
    </div>

export const VerticalProgressBar = (props:{value:number, max:number, bg:string}) => 
    <div style={{width:'36px', height:'100px', border:'3px ridge black', position:'relative'}}>
        <div style={{background:props.bg, backgroundSize:'32px', height:Math.round((props.value/props.max)*100)+'%', width:'100%',position:"absolute", bottom:0}}/>
    </div>

export const CssIcon = (props:{spriteIndex:IconIndex, noTooltip?:boolean}) => {
    let backgroundImage = 'url('+iconSheet+')'
    let sheetWidth = 24

    return props.noTooltip ? <div style={{
        width:'32px', 
        height: '32px',
        backgroundImage, 
        backgroundPosition: -(props.spriteIndex % sheetWidth)*32+'px '+-(Math.floor(props.spriteIndex/sheetWidth))*32+'px', 
        backgroundRepeat:'no-repeat',
        display:'inline-block'}}/> : 
        <Tooltip placement='bottom' overlay={<div><h4>{getDescription(props.spriteIndex)}</h4></div>}>
            <div style={{
                width:'32px', 
                height: '32px',
                backgroundImage, 
                backgroundPosition: -(props.spriteIndex % sheetWidth)*32+'px '+-(Math.floor(props.spriteIndex/sheetWidth))*32+'px', 
                backgroundRepeat:'no-repeat',
                display:'inline-block'}}/>
        </Tooltip>
} 
        
export const CreatureIcon = (props:{kind:CardType, noTooltip?:boolean}) => {
    let backgroundImage = 'url('+creatureSheet+')'
    let sheetWidth = 16
    const spriteIndex = getCardData(props.kind).sprite

    return props.noTooltip ? 
        <div style={{
            width:'32px', 
            height: '32px',
            backgroundImage, 
            backgroundPosition: -(spriteIndex % sheetWidth)*32+'px '+-(Math.floor(spriteIndex/sheetWidth))*32+'px', 
            backgroundRepeat:'no-repeat',
            display:'inline-block'}}/>:
        <Tooltip placement='bottom' overlay={<div>{getCreatureDescription(props.kind)}</div>}>
        <div style={{
            width:'32px', 
            height: '32px',
            backgroundImage, 
            backgroundPosition: -(spriteIndex % sheetWidth)*32+'px '+-(Math.floor(spriteIndex/sheetWidth))*32+'px', 
            backgroundRepeat:'no-repeat',
            display:'inline-block'}}/>
        </Tooltip>
} 

const getDescription = (index:IconIndex) => {
    switch(index){
        case IconIndex.Mana: return <div><CssIcon noTooltip={true} spriteIndex={IconIndex.Mana}/> Mana, the power of creation </div>
    }
}

export const getCreatureDescription = (kind:CardType) => {
    return <div style={{padding:'5px'}}>
        <div style={{display:'flex', marginBottom:'5px'}}>
            <div style={{marginLeft:'5px'}}>{kind}</div>
        </div>
    </div>
}
