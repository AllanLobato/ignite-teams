import React, { useEffect, useState, useRef } from "react";
import { Alert, FlatList, TextInput, Text } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

import { AppError } from "@utils/AppError";

import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";
import { playerAddByGroup } from "@storage/player/playerAddByGroup";
import { playerGetByGroupAndTeam } from "@storage/player/playerGetByGroupAndTeam";

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { ButtonIcon } from "@components/ButtonIcon";
import { Input } from "@components/Input";
import { Filter } from "@components/Filter";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";

import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";
import { playerRemoveByGroup } from "@storage/player/playerRemoveByGroup";
import { groupRemoveByName } from "@storage/group/groupRemoveByName";
import { Loading } from "@components/Loading";

type RouteParams = {
  group: string;
};

export function Players() {
  const [isLoading, setIsLoading] = useState(true); // Para mostrar o loading na tela
  const [newPlayerName, setNewPlayerName] = useState("");
  const [team, setTeam] = useState("Time A");
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);

  const navigation = useNavigation();
  const route = useRoute(); // Passa os parametros da rota
  const { group } = route.params as RouteParams;

  const newPlayerNameInputRef = useRef<TextInput>(null);

  async function handleAddPlayer() {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert(
        "Nova Pessoa",
        "Informe o nome da pessoa para adicionar."
      );
    }

    const newPlayer = {
      name: newPlayerName,
      team,
    };

    try {
      await playerAddByGroup(group, newPlayer); // Adiciona a nova pessoa no storage

      newPlayerNameInputRef.current?.blur(); // Remove o foco do input
      //Keyboard.dismiss(); // Fecha o teclado
      setNewPlayerName("");
      fetchPlayersByTeam();

    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Nova pessoa", error.message);
      } else {
        console.log(error);
        Alert.alert(
          "Nova pessoa",
          "Ocorreu um erro ao adicionar uma nova pessoa."
        );
      }
    }
  }

  async function fetchPlayersByTeam() {
    try{
      setIsLoading(true); // Mostra o loading na tela

      const playersByTeam = await playerGetByGroupAndTeam(group, team);
      setPlayers(playersByTeam);
      setIsLoading(false); // Esconde o loading na tela
    }catch(error){
      console.log(error);
      Alert.alert("Pessoas", "Ocorreu um erro ao buscar as pessoas.");
    }
  }

  async function handleRemovePlayer(playerName: string) {
    try {
      await playerRemoveByGroup(playerName, group);
      fetchPlayersByTeam();

    } catch (error) {
      console.log(error);
      Alert.alert("Remover Pessoa", "Ocorreu um erro ao remover a pessoa.");

    }
  }

  async function groupRemove() {
    try {
      await groupRemoveByName(group);
      navigation.navigate('groups')
      Alert.alert("Remover Turma", "Turma removida com sucesso.");
    } catch (error) {
      console.log(error);
      Alert.alert("Remover Turma", "Ocorreu um erro ao remover a turma.");
    }
  }


  async function handleRemoveGroup() {
    Alert.alert(
      "Remover Turma",
      "Tem certeza que deseja remover essa turma?",
      [
        { text: "Não", style: "cancel" },
        { text: "Sim", onPress: () => groupRemove() },
      ]
    );
  }

    useEffect(() => {
      fetchPlayersByTeam();

    }, [team]);



  return (
    <Container>
      <Header showBackButton />

      <Highlight title={group} subtitle="adiciona a galera e separe os times" />

      <Form>
        <Input
          inputRef={newPlayerNameInputRef}
          onChangeText={setNewPlayerName}
          value={newPlayerName}
          placeholder="Nome da pessoa"
          autoCorrect={false}
          onSubmitEditing={handleAddPlayer} // Quando o usuário apertar o botão de enviar do teclado
          returnKeyType="done" // Muda o botão de enviar do teclado para "done"
        />

        <ButtonIcon icon="add" onPress={handleAddPlayer} />
      </Form>

      <HeaderList>
        <FlatList
          data={["Time A", "Time B"]}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />

        <NumberOfPlayers>
          {players.length}
        </NumberOfPlayers>
      </HeaderList>

      {
        isLoading ? <Loading /> :

      <FlatList
        data={players}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <PlayerCard 
          name={item.name} 
          onRemove={() => handleRemovePlayer(item.name)} 
          />
        
        )}

        ListEmptyComponent={() => (
          <ListEmpty message="Não há pessoas nesse time" />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          { paddingBottom: 100 },
          players.length === 0 && { flex: 1 },
        ]}
      />
}

      <Button 
      title="Remover Turma" 
      type='SECONDARY'
      onPress={handleRemoveGroup}
      />
    </Container>
  );
}



