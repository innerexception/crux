export const colors = {
    white: '#fff',
    black: '#000',
    grey1:'#b9b9b9',
    grey2:'#868686',
    grey3:'#454545',
    background: 'black',
    yellow:'#ffff00',
    orange:'#ff6500',
    red:'#dc0000',
    pink:'#ff0097',
    purple:'#360097',
    blue:'#0000ca',
    lblue:'#0000ca',
    lgreen:'#00a800',
    green:'#006500',
    brown:'#653600',
    lbrown:'#976536'
}

export default {
    window: {
        background:colors.background,
        border: '1px solid'
    },
    windowBorder: {
        padding:'16px', background:colors.white, margin:'16px'
    },
    contentAreaAlternate: {
        padding:'0.5em', background: colors.white, border:'5px outset', borderColor:colors.white, borderBottomLeftRadius:'20px', borderTopRightRadius:'20px', marginBottom:'0.5em', marginTop:'0.5em'
    },
    buttonOuter: {
        cursor:'pointer',
    },
    boxShadow: '5px 4px 8px 0px black',
    buttonInner: {
        padding:'3px',
        color: colors.black, 
        background:colors.grey1,
        cursor:'pointer',
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
        background:'#000',
        border:'1px solid white',
        width: '275px',
        zIndex:2,
        padding:'1em'
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
    },
    bounce: {
        width:'2em',
        height:'1em',
        animation: 'shake 5s',
        animationIterationCount: 'infinite'
    }
}