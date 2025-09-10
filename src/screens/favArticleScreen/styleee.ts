import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    cardCount:{
        flexDirection:'row',
        alignItems:'center',
        gap:10,
        borderWidth:1,
        borderColor:'red',
        padding:10,
        borderRadius:15,
        overflow:'hidden',
    },
    cardArticleName:{
        textAlign:'left',
        flex:1,
        marginTop:10, 
    },
    cardArticleImage:{
        width:100,
        height:200,
        borderTopLeftRadius:20,
        borderBottomLeftRadius:20
    },
});