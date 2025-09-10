import { StyleSheet } from "react-native";
import { fonts } from '../../utils/constants'

export default StyleSheet.create({
    safeContainer:{
        backgroundColor:'#fff',
    },
    container:{
        flex:1,
    },
    header:{

        paddingHorizontal:16,
        paddingVertical:10,
    },
    backbtn:{
        backgroundColor: "#333",
        alignSelf:"flex-start",
        padding:10,
        borderRadius:10,
    },
    goBackText:{
        color: '#fff'
    },
    coverImg:{
        height:300,
        resizeMode:'cover',
        marginBottom:20,
    },
    dataCont:{
        paddingHorizontal:16,
    },
    title:{
        fontWeight:'bold',
        fontSize:20,
        marginBottom:10,
        fontFamily:fonts.CairoBold,
    },
    description:{
        fontFamily:fonts.CairoLight 
    },
    addToFavBtn:{
        backgroundColor:'gold',
        padding:10,
        borderRadius:10,
        marginBottom:20,
        width:'100%',
        alignItems:'center',
        justifyContent:'center'

    },
    addToFavText:{
        color:'#000',
        fontFamily:fonts.CairoBold
    }
})