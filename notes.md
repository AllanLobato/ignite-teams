<div align='center'>
<h1>Ignite Teams</h1>

<p>Aplicação para organizar pessoas que se reúnem para jogar em times</p>
</div>


<br>

<div align="center">
    <img src="./assets/Capa.png" alt="demonstracao">
</div>

<br><br>

> Este aplicativo foi desenvolvido com o objetivo de colocar em prática conhecimentos fundamentais sobre Stack Navigation, Async Storage e outros. Neste Readme há anotações sobre conceitos e formas implementação de recursos.

<br><br>

## IMAGENS PARA DIFERENTES DENSIDADES DE TELA

- Nomeamos as imagens com o mesmo nome, seguido de `@2x`, `@3x`, etc. E depois importar apenas a imagem pelo nome
    - Ex: caso possua 3 imagens chamdas `logo.png`, `logo@2x.png` e `logo@3x.png`, basta realizar o import chamando por `logo.png`, que será utilizado o arquivo que melhor se enquadrar

    - Utilizamos este estratégia para que o dispositivo carregue a imagem mais adequanda para aquela densidade de pixels
    
    - Podemos utilizar esta opção a partir do figma, exportando com diversos tamanhos

## PATH MAPPING

- Melhor forma de importar os arquivos

- Criamos um Alias apontando para os caminhos desejados

**babel-plugin-module-resolver**

    npm install --save-dev babel-plugin-module-resolver

- Alteramos o arquivo `babel.config.js`

                module.exports = function(api) {
                    api.cache(true);
                    return {
                        presets: ['babel-preset-expo'],
                        plugins: [
                            [
                                'module-resolver',
                                {
                                    'root': ['./src'],
                                    'alias': {
                                        '@assets': './src/assets',
                                        '@components': './src/components',
                                        '@routes': './src/routes',
                                        '@screens': './src/screens',
                                        '@storage': './src/storage',
                                        '@theme': './src/theme',
                                        '@utils': './src/utils'
                                    }
                                }
                            ]
                        ]
                    };
                };

- Alteramos o arquivo `tsconfig.json`

                {
                "extends": "expo/tsconfig.base",
                "compilerOptions": {
                    "strict": true,
                    "baseUrl": "./",
                    "paths": {
                        "@assets/*": ["./src/assets/*"],
                                    "@components/*": ["./src/components/*"],
                                    "@routes/*": ["./src/routes/*"],
                                    "@screens/*": ["./src/screens/*"],
                                    "@storage/*":[ "./src/storage/*"],
                                    "@theme/*": ["./src/theme/*"],
                                    "@utils/*": ["./src/utils/*"]
                    }
                }
                }

## UTILIZANDO STYLED COMPONENT

**Instalação**

                    npm install styled-components

                    npm install --save-dev @types/styled-components @types/styled-components-react-native

**Uso**

- Com o `styled components`, podemos utilizar a mesma sintaxe utilizada na web

                import styled from 'styled-components/native';

                export const Container = styled.View`
                    flex: 1;
                    background-color: #000;
                    align-items: center;
                    justify-content: center;
                `;

                export const Title = styled.Text`
                        color: #fff;
                        font-size: 32px;
                `;

- Com isso, deixamos o código dos nossos componentes mais limpo

                import React from 'react';
                import { Container,Title } from './styles';

                export function Groups() {
                    return (
                        <Container >
                            <Title>Groups</Title>
                        </Container>
                    );
                }

*Configurando style guide da aplicação*

- `./src/theme`

                export default {
                    COLORS: {
                        WHITE: '#FFFFFF',
                
                        GREEN_700: '#00875F',
                        GREEN_500: '#00B37E',
                
                        RED: '#F75A68',
                        RED_DARK: '#AA2834',
                
                        GRAY_700: '#121214',
                        GRAY_600: '#202024',
                        GRAY_500: '#29292E',
                        GRAY_400: '#323238',
                        GRAY_300: '#7C7C8A',
                        GRAY_200: '#C4C4CC',
                        GRAY_100: '#E1E1E6'
                    },
                    FONT_FAMILY: {
                        REGULAR: 'Roboto_400Regular',
                        BOLD: 'Roboto_700Bold'
                    },
                    FONT_SIZE: {
                        SM: 14,
                        MD: 16,
                        LG: 18,
                        XL: 24
                    }
                };

- `App.tsx`

                import React from 'react';
                import { Groups } from '@screens/Groups';
                import { StatusBar } from 'react-native';
                import { ThemeProvider } from 'styled-components';
                import theme from './src/theme';

                export default function App() {
                    return (
                        <ThemeProvider theme={theme}>
                            <Groups />
                            <StatusBar
                                barStyle="light-content"
                                translucent
                            />
                        </ThemeProvider>
                    );
                }

- `./src/@types/style.d.ts`

                import styled from 'styled-components';
                import theme from '../theme';

                declare module 'styled-components' {
                    type ThemeType = typeof theme

                    // eslint-disable-next-line @typescript-eslint/no-empty-interface
                    export interface DefaultTheme extends ThemeType { }
                }

*Instalando e configurando fontes*

- Todas as fontes disponível no `Google Fonts` estão também disponíveis dentro do Expo. Basta instalar o pacote
    - Para instalar utilizamos o comando `npx expo install expo-font @expo-google-fonts/roboto`, de forma que o ultimo argumento é a fonte que desejamos instalar
    
                npx expo install expo-font @expo-google-fonts/roboto

- Após isso, basta configurar no App.tsx. A configuração é feita a partir da importação do `useFonts` e das fontes que desejamos utilizar na aplicação

- `App.tsx`

                import React from 'react';
                import { Groups } from '@screens/Groups';
                import { StatusBar } from 'react-native';
                import { ThemeProvider } from 'styled-components';
                import theme from './src/theme';
                import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
                import { Loading } from '@components/Loading';

                export default function App() {

                    //fontsLoaded recebe um valor boolean
                    const [ fontsLoaded ] = useFonts({ Roboto_400Regular, Roboto_700Bold});

                    return (
                        <ThemeProvider theme={theme}>
                            { fontsLoaded ? <Groups /> : <Loading />}
                            <StatusBar
                                barStyle="light-content"
                                translucent
                                backgroundColor='#000'
                            />
                        </ThemeProvider>
                    );
                }

        - O if ternário verifica se as fontes da aplicação já estão carregadas. Se estiverem, irá renderizar a tela normalmente. Caso não, irá renderizar o componente de load até que as fontes seja carregadas

## Icons

- Utilizaremos a biblioteca externa `Phosphor Icons`

                npm install --save phosphor-react-native

- Para utilizar a biblioteca, também é necessária a instalação da `react-native-svg`

                npx expo install react-native-svg

    - Podemos utilizá-la de duas maneiras

            
        - diretamente no componente

                <House
                    color='#fff'
                    weight='fill'
                />
            
        - Apartir do `styles.ts`

                export const BackIcon = styled(CaretLeft).attrs(({ theme }) => ({
                    color: theme.COLORS.WHITE,
                    size: 32
                }))``;

- Além disso, utilizaremos uma biblioteca nativa do expo

                import { MaterialIcons } from '@expo/vector-icons';

    - Podemos utilizá-la de duas maneiras
        
        - diretamente no componente

                <MaterialIcons
                    name='home'
                    color='#fff'
                    size={32}
                />
        
        - Apartir do `styles.ts`

                export const Icon = styled(MaterialIcons).attrs<Props>(({ theme, type }) => ({
                    size: 24,
                    color: type === 'PRIMARY' ? theme.COLORS.GREEN_700 : theme.COLORS.RED,
                }))``;

    - Para utilizarmos a partir do `styles.ts` da melhor forma e podendo consultar os ícones durante a chamada do componente, temos de realizar a seguinte tipagem

                interface Props extends TouchableOpacityProps {
                    name: keyof typeof MaterialIcons.glyphMap; // FAZ COM QUE SEJA POSSÍVEL VERIIFICAR QUAIS OS ICONES DISPONIVEIS QUANDO REALIZARMOS O USO DO COMPONENTE
                    type?: Styled.ButtonIconTypeStyleProps;
                }

## NAVEGAÇÃO

*Instalação*

- Instalação do core para uso da biblioteca `React Navigation`

                npm install @react-navigation/native

- Instalação de dependencias para uso em uma aplicação feita co Expo Maneged Project

                npx expo install react-native-screens react-native-safe-area-context

- Nesta aplicação, utilizaremos apenas a `Stack Navigation`

                npm install @react-navigation/native-stack

*Configuração e uso*

- Criamos uma pasta para guardarmos as rotas

    `src/routes/app.routes.tsx`

                import React from 'react';
                import { createNativeStackNavigator } from '@react-navigation/native-stack';
                import { Groups } from '@screens/Groups';
                import { NewGroup } from '@screens/NewGroup';
                import { Players } from '@screens/Players';

                const { Navigator, Screen } = createNativeStackNavigator();

                export function AppRoutes() {
                    return (
                        <Navigator>
                            <Screen name="Groups" component={Groups} />
                            <Screen name="NewGroup" component={NewGroup} />
                            <Screen name="Players" component={Players} />
                        </Navigator>
                    );
                }

- Utilizamos `createNativeStackNavigator()` para criar as nossas rotas

    - `Navigator` é o componente que armazena as rotas
    - `Screen` é o componente que determina qual o nome da rota e qual tela ele renderiza

- Em nosso `routes/index.tsx`, criamos o nosso `contexto de navegação`, que são as rotas que iremos disponibilizar para a nossa aplicação

    - `src/routes/index.tsx`

                import React from 'react';
                import { NavigationContainer } from '@react-navigation/native';
                import { AppRoutes } from './app.routes';

                export function Routes() {
                    return (
                        <NavigationContainer>
                            <AppRoutes />
                        </NavigationContainer>
                    );
                }

- Desta forma, basta passar o componente de contexto no nosso `App.tsx`, e agora todas as telas poderão ser acessadas

                import React from 'react';
                import { StatusBar } from 'react-native';
                import { ThemeProvider } from 'styled-components';
                import theme from './src/theme';
                import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
                import { Loading } from '@components/Loading';
                import { Routes } from '@routes/index';

                export default function App() {

                    //fontsLoaded recebe um valor boolean
                    const [ fontsLoaded ] = useFonts({ Roboto_400Regular, Roboto_700Bold});

                    return (
                        <ThemeProvider theme={theme}>
                            { fontsLoaded ? <Routes /> : <Loading />}
                            <StatusBar
                                barStyle="light-content"
                                translucent
                                backgroundColor='transparent'
                            />
                        </ThemeProvider>
                    );
                }

- Por padrão, a primeira tela a ser mostrada é a que for definida primeiro no nosso arquivo de rotas, porém, podemos passar a propriedade `initialRouteName` para definir qual a primeira tela que queremos que seja renderizada

- Para remover o cabeçalho das rotas, basta passar a propriedade `screenOptions={{ headerShown: false }}` para o componente `Navigator`

                import React from 'react';
                import { createNativeStackNavigator } from '@react-navigation/native-stack';
                import { Groups } from '@screens/Groups';
                import { NewGroup } from '@screens/NewGroup';
                import { Players } from '@screens/Players';

                const { Navigator, Screen } = createNativeStackNavigator();

                export function AppRoutes() {
                    return (
                        <Navigator screenOptions={{ headerShown: false }}>
                            <Screen name="Groups" component={Groups} />
                            <Screen name="NewGroup" component={NewGroup} />
                            <Screen name="Players" component={Players} />
                        </Navigator>
                    );
                }

## SAFE AREA VIEW

- "Área segura"

- Serve para que nosso design do aplicativo não seja prejudicado pelo design dos aparelhos

- É instalada juntamente com a navegação

- Para utilizarmos, basta trocar as views que englobam toda a tela por `SafeAreaView`

                import { SafeAreaView } from 'react-native-safe-area-context';
                import styled from 'styled-components/native';

                export const Container = styled(SafeAreaView)`
                    flex: 1;
                    background-color: ${({ theme }) => theme.COLORS.GRAY_600};
                    padding: 24px;
                `;

## Async Storage

- Sistema de armazenamento baseado em chave-valor, assíncrono e persistente

- Possui leitura e escrita muito rápidas

- Só consegue armazenar strings

    - Para isso, utilizamos `JSON.stringfy()`
    
                {"name":"Mauricio","idade":"20"}
    
- De maneira análoga, para ler os dados como formatos além de string, quando vindos do `Async Storage`, utilizamos `JSON.parse()`

*Instalação*

                npx expo install @react-native-async-storage/async-storage

**Uso**

*Funcionalidade de criar*

- Criamos uma pasta na raiz do nosso projeto para gerenciarmos o armazenamento

- Nos arquivos que contetão as funções de interação com o banco, criaremos sempre funções assíncronas e utilizaremos a estrutura `try...catch`

- Para salvarmos os dados, utilizamos `AsyncStorage.setItem()`
    
    - A função recebe dois parâmetros: o primeiro será a chave, sendo uma string. A segunda será o que queremos guardar
        
        - Ambos os parâmetros devem ser do tipo String
    
    - Esta função não salva novos items, ela substitui o valor antigo por um novo valor

    - Por conta disso, devemos antes buscar todos os dados daquela chave e substituir o valor por aquele valor + o novo valor através de um array

                import { findAllGroups } from './findAllGroups';
                import { GROUP_COLLECTION } from '@storage/storageConfig';
                import AsyncStorage from '@react-native-async-storage/async-storage';
                import { AppError } from '@utils/AppError';

                export async function createGroup(groupName: string) {
                    try {

                        const storedGroups = await findAllGroups();

                        const groupAlreadyExists = storedGroups.includes(groupName); //BUSCA O VALOR DO PARAMETRO DENTRO DO ARRAY

                        if (groupAlreadyExists) {
                            throw new AppError('Grupo já cadastrado.');
                        }

                        const data = JSON.stringify([...storedGroups, groupName]);

                        await AsyncStorage.setItem(GROUP_COLLECTION, data);
                    } catch (error) {
                        throw error;
                    }
                }

*Funcionalidade de listar*

- Para buscarmos dados, utilizamos `AsyncStorage.getItem()`

    - A função recebe apenas um parâmetro

- Antes de exibirmos os dados, devemos verificar se há dados e passar parra string

                import AsyncStorage from '@react-native-async-storage/async-storage';
                import { GROUP_COLLECTION } from '@storage/storageConfig';

                export async function findAllGroups() {
                    try {
                        const storage = await AsyncStorage.getItem(GROUP_COLLECTION);

                        const groups: string[] = storage ? JSON.parse(storage) : [];

                        return groups;

                    } catch (error) {
                        throw error;
                    }
                }

- Para listarmos os itens, utilizamos um hook que chama uma função de fatch

                    async function fetchGroups() {
                        try {
                            const data = await findAllGroups();
                            setGroups(data);
                        } catch(error) {
                            console.log(error);
                        }
                    }

                    useFocusEffect(useCallback(() => {
                        console.log('Carregado hook');
                        
                        fetchGroups();
                    }, []));