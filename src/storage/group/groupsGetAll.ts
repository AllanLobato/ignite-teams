import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from "@storage/storageConfig";

export async function groupsGetAll() {
  try {
    const storage = await AsyncStorage.getItem(GROUP_COLLECTION);

    const groups: string[] = storage ? JSON.parse(storage) : []; // if storage is null, return empty array

    return groups;
  } catch (error) {
    throw error;
  }
}
