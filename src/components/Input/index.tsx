import { TextInputProps } from "react-native";
import { useTheme } from "styled-components/native";

import { Container } from "./styles";
import React from "react";

export function Input({ ...rest }: TextInputProps) {
    const { COLORS } = useTheme();
    return (
        <Container placeholderTextColor={COLORS.GRAY_300}
        {...rest}
        >
            
            
        </Container>
    );
    }