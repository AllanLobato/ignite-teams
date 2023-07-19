import React, {useState, useCallback} from "react";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { GroupCard } from "@components/GroupCard";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Alert } from "react-native";

import { Container } from "./styles";

import { FlatList } from "react-native";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";
import { groupsGetAll } from "@storage/group/groupsGetAll";
import { Loading } from "@components/Loading";

export function Groups() {
  const [isLoading, setIsLoading] = useState(true); // Para mostrar o loading na tela
  const [groups, setGroups] = useState<string[]>([]);

  const navigation = useNavigation();

  function handleNewGroup() {
    navigation.navigate("new");
  }

  async function fetchGroups() {

    try{
      setIsLoading(true);

      const data = await groupsGetAll();

      setGroups(data);
    }catch(error){
      console.log(error);
      Alert.alert("Não foi possível carregar os grupos");
    }finally{
      setIsLoading(false);
    }
  }

  function handleOpenGroup(group: string) {
    navigation.navigate("players", { group });
  }


  useFocusEffect(useCallback(() => {
    console.log('useFocusEffect executou');
    fetchGroups();
  }, []));
  

  return (
    <Container>
      <Header />

      <Highlight title="Grupos" subtitle="Jogue com a sua turma" />

      { 
        isLoading ? <Loading /> :

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => 
          <GroupCard 
            title={item} 
            onPress={() => handleOpenGroup(item)}
          
          />}
          contentContainerStyle={groups.length === 0 && { flex: 1 }}
          ListEmptyComponent={() => (
            <ListEmpty 
              message="Que tal cadastrar a primeira turma?" 
              />
          )}
          showsVerticalScrollIndicator={false}
        />
          }
        

      <Button title="Criar nova turma"
        onPress={handleNewGroup}
      />
    </Container>
  );
}
