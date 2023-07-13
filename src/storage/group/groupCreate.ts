import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from "@storage/storageConfig";
import { groupsGetAll } from "./groupsGetAll";
import { AppError } from "@utils/AppError";

export async function groupCreate(newGroup: string) {// Essa função recebe um novo grupo e o adiciona ao storage
  
  try {
    const storedGroups = await groupsGetAll();

    const groupAlreadyExists = storedGroups.includes(newGroup) // Verifica se o grupo já existe

    if(groupAlreadyExists) { // Se o grupo já existe, retorna um erro
      throw new AppError("Group already exists");
    }

    const storage = JSON.stringify([...storedGroups, newGroup]); // JSON.stringify converte o array em string, POIS O STORAGE SÓ ACEITA STRING
    await AsyncStorage.setItem(GROUP_COLLECTION, storage); // Armazena o array no storage
  } catch (error) {
    throw error;
  }
}
