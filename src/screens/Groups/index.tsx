import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { GroupCard } from "@components/GroupCard";

import { Container } from "./styles";
import React from "react";
import { FlatList } from "react-native";

export function Groups() {
  const [groups, setGroups] = React.useState<string[]>(['Galera da Rocketseat', 'Galera do Ignite'])

  return (
    <Container>
      <Header />

      <Highlight title="Grupos" subtitle="Jogue com a sua turma" />

      <FlatList
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <GroupCard title={item} />
        )}
      />

    </Container>
  );
}
