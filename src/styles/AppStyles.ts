import { dialogBg, pointerOver } from "../assets/Assets"

export const colors = {
    white: '#F8F6F0',
    black: '#1A1A1A',
    grey1:'#2B2B2B',
    background: '#F2E6C9',
    background2: '#E8D8B5',
    yellow:'#D4A017',
    yellow2:'#E0B84C',
    gold:'#C9A646',
    gold2:'#D4AF37',
    red:'#B3202A',
    red2:'#D13A2F',
    blue:'#1F3C88',
    dblue:'#2E5FA7',
    lblue:'#4ABBE7',
    lgreen:'#6FAF45',
    green:'#3F7A3A'
}

export default {
    window: {
        background:colors.background,
        border: '1px solid'
    },
    windowBorder: {
        padding:'16px', background:colors.background, margin:'16px'
    },
    contentAreaAlternate: {
        padding:'0.5em', background: colors.background, border:'5px outset', borderColor:colors.white, borderBottomLeftRadius:'20px', borderTopRightRadius:'20px', marginBottom:'0.5em', marginTop:'0.5em'
    },
    buttonOuter: {
        
    },
    boxShadow: '5px 4px 8px 0px black',
    buttonInner: {
        padding:'3px',
        color: colors.black, 
        background:colors.white,
        cursor:'url('+pointerOver+'), auto',
        border:'3px inset'
    },
    topBar: {
        background: 'white',
        display:'flex',
        justifyContent:'space-around',
        alignItems: 'center',
        borderTopLeftRadius: '5px',
        borderTopRightRadius: '5px',
        borderBottom: '1px solid'
    },
    hr: {
        margin:0,
        marginBottom:'1px'
    },
    vr: {border:'2px inset', width:'1px', height:'90%', marginLeft:'5px'},
    modal: {
        background:'url('+dialogBg+')',
        border:'1px solid white',
        width: '275px',
        zIndex:2,
        padding:'16px'
    },
    bottomBarContent: {
        background:' rgb(90, 90, 90)',
        display: 'flex',
        flexDirection: 'column' as 'column',
        justifyContent: 'flex-start',
        height: '100%',
        width:'75%'
    },
    bottomBarContentInner: {overflow:'hidden', padding:'0.5em', margin:'0.5em', background:'rgba(33, 3, 3, 0.3)', height:'100%', display:'flex', alignItems:'center', justifyContent:'space-around'},
    notifications: {
        position:'absolute' as 'absolute',
        left:0, bottom:0,
        maxWidth: '80vw',
        height: '5em',
        display:'flex',
        zIndex:2
    },
    close: {
        position:'absolute' as 'absolute', right:20, top:10, cursor:'pointer', fontSize:'18px'
    }
}