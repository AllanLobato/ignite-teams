import React, {useState} from "react";
import { useNavigation } from "@react-navigation/native";
import { Container, Content, Icon } from "./style";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Button } from "@components/Button";
import { Input } from "@components/Input";

export function NewGroup() {
  const [group, setGroup] = useState("");

  const navigation = useNavigation();

  const handleNew = () => {
    navigation.navigate('players', { group });
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
