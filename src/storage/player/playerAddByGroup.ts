import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppError } from "@utils/AppError";

import { PLAYER_COLLECTION } from "@storage/storageConfig";
import { playersGetByGroup } from "./playersGetByGroup";
import  { PlayerStorageDTO } from "./PlayerStorageDTO";

export async function playerAddByGroup(group: string, newPlayer: PlayerStorageDTO){
    try{
        const storagePlayers = await playersGetByGroup(group);

        const playerAlreayExists = storagePlayers.filter(player => player.name === newPlayer.name);

        if(playerAlreayExists.length > 0){
            throw new AppError('Essa pessoa já está cadastrada em um time');
        }

        const storage = JSON.stringify([...storagePlayers, newPlayer]);

        await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, "");
        
    }catch(error){
        throw(error);
    }
}