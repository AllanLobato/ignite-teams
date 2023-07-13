import { TextInput, TextInputProps } from "react-native";
import { useTheme } from "styled-components/native";

import { Container } from "./styles";
import React from "react";


// Na linha 8, o inputRef é um objeto do tipo React.RefObject<TextInput> que é passado como parâmetro para o componente Input.
type Props = TextInputProps & {	
    inputRef?: React.RefObject<TextInput>;

  

export function Input({inputRef, ...rest }: Props) {   // O inputRef é passado como parâmetro para o componente Input.
    const { COLORS } = useTheme();


    return (
        <Container
        ref={inputRef} // O inputRef é passado como parâmetro para o componente Input.
        placeholderTextColor={COLORS.GRAY_300}
        {...rest}
        >
            
            
        </Container>
    );
    }