import AsyncStorage from "@react-native-async-storage/async-storage";

export async function saveUserData(data:any){
    try{
        await AsyncStorage.setItem('userData', JSON.stringify(data));
    } catch(e){
        console.log('save error:',e)
    }
}


export async function getUserData(){
    try{
        const json = await AsyncStorage.getItem('userData');
        return json? JSON.parse(json):null;
    
    } catch(e){
        console.log('load error:',e);
        return null;
    }
}


export async function clearUserData(){
    try{
        await AsyncStorage.removeItem('userData');
    } catch(e){
        console.log('clear error:',e)
    }
}