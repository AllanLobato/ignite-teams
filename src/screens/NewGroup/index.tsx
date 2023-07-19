import React, {useState} from "react";
import { useNavigation } from "@react-navigation/native";
import { Container, Content, Icon } from "./style";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { groupCreate } from "@storage/group/groupCreate";

import { AppError } from "@utils/AppError";
import { Alert } from "react-native";

export function NewGroup() {
 
  const [group, setGroup] = useState("");

  const navigation = useNavigation();

  async function handleNew(){
    // return console.log(group.trim().length);

    try {
      if (group.trim().length === 0){ //trim remove os espaços em branco
        return Alert.alert('Novo Grupo', 'Informe o nome do grupo');
      }

      await groupCreate(group);
      navigation.navigate('players', { group });

    } catch (error) {
      if(error instanceof AppError){
        Alert.alert('Novo Grupo', error.message);
    } else {
      Alert.alert('Novo Grupo', 'Ocorreu um erro ao criar o grupo');
      console.log(error);
    }
    }
  };
 

  return (
    <Container>
      <Header showBackButton />

      <Content>
        <Icon />

        <Highlight
          title="Nova turma"
          subtitle="Crie a turma para add as pessoas"
        />

        <Input 
          placeholder="Nome da turma"
          onChangeText={setGroup}
        />

        <Button 
            title="Criar" 
            style={{ marginTop: 22 }}
            onPress={handleNew}
        />
      </Content>
    </Container>
  );
}
