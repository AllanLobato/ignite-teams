import { TouchableOpacityProps } from "react-native/Libraries/Components/Touchable/TouchableOpacity";

import { Container, Title, ButtonTypeStyleProps } from "./styles";
import React from "react";

type Props = TouchableOpacityProps & {
    title: string;
    type?: ButtonTypeStyleProps;
}

export function Button({ title, type = 'PRIMARY', ...rest }: Props) {
    return (
        <Container type={type} {...rest}>
            <Title type={type}>{title}</Title>
        </Container>
    );
}