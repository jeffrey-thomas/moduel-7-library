const sharedStyles={

    cursive:{
        fontFamily:"'Righteous', cursive"
    },
    center:{
        justifyContent:'center',
        alignItems:'center'
    },
    column:{
        display:'flex',
        flexDirection:'column'
    },
    row:{
        display:'flex',
        flexDirection:'row'
    },
    p5:{
        padding:'5px'
    },
    spaceBetween:{
        justifyContent:'space-between',
    },
    alignCenter:{
        alignItems:'center',
    },
    ul:{
        listStyleType:'none'
    },
    width60:{
        width:'60%'
    },
    width100:{
        width:'100%'
    },
    psides:{
        paddingRight:'10px',
        paddingLeft:'10px'
    },
} as const;

export default sharedStyles;