<p align="center">
  <img width="200" height="179" alt="logo" src="https://github.com/user-attachments/assets/ae3cb171-f03c-4029-80a2-eb0545df9410" />
</p>
<br/>
VinimeApp é um aplicativo mobile desenvolvido com React Native e Expo, focado em descoberta e gerenciamento de animes. O app permite explorar animes populares, pesquisar títulos específicos, adicionar favoritos e receber notificações sobre suas séries favoritas, tudo em uma interface moderna com tema escuro.

## :page_facing_up: Sobre o Projeto

O aplicativo oferece uma experiência completa para os amantes de anime. Os usuários podem navegar por uma vasta biblioteca de animes usando a API GraphQL do AniList, salvar seus favoritos no Firebase, alternar entre tema claro e escuro, e receber notificações push sobre suas escolhas. Toda autenticação e dados dos usuários são gerenciados com Firebase Authentication e Firestore.

## 📸 Capturas de Tela
<table>
  <tr>
    <td><img width="300" src="https://github.com/user-attachments/assets/866cba97-6985-497e-a14d-229dac566cef" /></td>
    <td><img width="300" src="https://github.com/user-attachments/assets/fe0a9cb3-0449-4573-b0b9-e3553f09d3d4" /></td>
    <td><img width="300" src="https://github.com/user-attachments/assets/ef09ca6d-854e-43c6-b633-7160f9184950" /></td>
  <tr>
    <td><img width="300" src="https://github.com/user-attachments/assets/c51c0079-60c2-47e6-9d86-61772069fea3" /></td>
    <td><img src="https://github.com/user-attachments/assets/a80838f8-2d31-423c-8da5-6a24e2bea5df" width="300"/></td>
    <td><img src="https://github.com/user-attachments/assets/6047e7c7-af94-4491-8ad9-2b96216b4cc5" width="300"/></td>
  </tr>
</table>

## 📁 Telas

O APP é composto por 5 telas principais:

- **Login:** Tela de autenticação com campos de email e senha, validação de dados e integração com Firebase Authentication. Design moderno com foco na experiência do usuário.
- **Signup:** Tela de cadastro com validação de nome, email, senha e confirmação de senha. Garante que a senha tenha no mínimo 6 caracteres e que as senhas correspondam.
- **Home:** Tela principal com banner destacado, categorias de animes populares e em alta, barra de pesquisa funcional com debounce, e botão "Surpresa" para descobrir animes aleatórios. Alterna entre tema claro e escuro.
- **Details:** Visualização detalhada de cada anime com informações completas, imagem de banner, descrição, gêneros, episódios e pontuação. Permite adicionar/remover dos favoritos com notificações push instantâneas.
- **MyList:** Lista personalizada de animes favoritos salvos no Firebase Firestore. Exibe cards em grade com pull-to-refresh, navegação rápida para detalhes e sincronização em tempo real.
- **Profile:** Gerenciamento de perfil do usuário com informações da conta, alternância de tema persistente e opção de logout.
Consumo de API GraphQL do AniList com Apollo Client\
:heavy_check_mark: Autenticação completa com Firebase (Login, Signup, Logout)\
:heavy_check_mark: Gerenciamento de estado global com Redux Toolkit (3 slices: anime, auth, user)\
:heavy_check_mark: Interface construída com Gluestack UI\
:heavy_check_mark: Tema escuro/claro com persistência no AsyncStorage\
:heavy_check_mark: Pesquisa de animes com debounce e filtros dinâmicos\
:heavy_check_mark: Sistema de favoritos sincronizado com Firebase Firestore\
:heavy_check_mark: Notificações push com Expo Notifications\
:heavy_check_mark: OTA Updates com Expo Updates (equivalente ao CodePush)\
:heavy_check_mark: Validação de formulários (email, senha, confirmação)\
:heavy_check_mark: Cards e listas com imagens otimizadas\
:heavy_check_mark: Navegação com React Navigation (Stack + Bottom Tabs)\
:heavy_check_mark: Hooks customizados (useAuthListener, useNotifications)\
:heavy_check_mark: Tipagem completasheets para modais de adicionar/editar marcadores\
:heavy_check_mark: Componentes reutilizáveis e estilização com Styled Components\
:heavy_check_mark: Navegação com React Navigation (Stack Navigator)\
:heavy_check_mark: Tipagem com TypeScript

## :rocket: Tecnologias

As seguintes ferramentas foram utilizadas neste projeto: (Stack + Bottom Tabs)
- [Redux Toolkit](https://redux-toolkit.js.org/) - Gerenciamento de estado global
- [Apollo Client](https://www.apollographql.com/docs/react/) - Cliente GraphQL
- [GraphQL](https://graphql.org/) - Query language para APIs
- [Firebase](https://firebase.google.com/) - Backend (Authentication + Firestore)
- [Gluestack UI](https://gluestack.io/) - Biblioteca de componentes UI
- [NativeWind](https://www.nativewind.dev/) - Tailwind CSS para React Native
- [Expo Notifications](https://docs.expo.dev/versions/latest/sdk/notifications/) - Push notifications
- [Expo Updates](https://docs.expo.dev/versions/latest/sdk/updates/) - OTA Updates
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/) - Armazenamento local
- [Lucide React Native](https://lucide.dev/) - Ícones modernos
- [Zustand](https://zustand-demo.pmnd.rs/) - Gerenciamento de estado
- [Styled Components](https://styled-components.com/) - Estilização CSS-in-JS
- [Expo Location](https://docs.expo.dev/versions/latest/sdk/location/) - API de geolocalização
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/) - Armazenamento local
- [Bottom Sheet](https://gorhom.github.io/react-native-bottom-sheet/) - Componente de modal inferior
Conta Firebase** - [Crie aqui](https://console.firebase.google.com/
## :closed_book: Requisitos

Antes de começar, você precisa ter instalado:

- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- **Google Maps API Key** - [Obtenha aqui](https://console.cloud.google.com/google/maps-apis)

Para rodar em dispositivos:
- [Expo Go](https://expo.dev/client) (iOS/Android)
- Ou um emulador Android/iOS configurado

## :checkered_flag: Como Executar
vinime-app

# Instale as dependências
$ npm install
# ou
$ yarn install

# Configure o Firebase
# Crie um arquivo src/config/firebase.ts com suas credenciais Firebase
# (veja a seção de Configuração do Firebase abaixo)

# Inicie o projeto
$ npx expo start

# Para rodar em plataformas específicas:
# Android
$ npx expo run:android

# iOS (requer macOS)
$ npx expo run:ios
```

## :gear: Configuração do Firebase

Para utilizar o aplicativo, você precisa configurar o Firebase:

1. Acesse o [Firebase Console](https://console.firebase.google.com/)
2. Crie um novo projeto
3. Ative **Authentication** (Email/Password)
4. Ative **Cloud Firestore**
5. Nas configurações do projeto, copie as credenciais
6. Crie/edite o arquivo `src/config/firebase.ts`:

```typescript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "sua-api-key",
  authDomain: "seu-projeto.firebaseapp.com",
  projectId: "seu-projeto-id",
  storageBucket: "seu-projeto.appspot.com",
  messagingSenderId: "seu-sender-id",
  appId: "seu-app-id"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```

## 📱 Como Usar, fontes e ícones
├── components/      # Componentes reutilizáveis
│   ├── ui/         # Componentes UI do Gluestack
│   ├── AnimeCard.tsx
│   ├── AnimeRow.tsx
│   └── HomeBanner.tsx
├── config/         # Configurações (Firebase)
├── constants/      # Constantes e cores
├── hooks/          # Hooks customizados
│   ├── useAuthListener.ts
│   └── useNotifications.ts
├── queries/        # GraphQL queries (Apollo)
├── routes/         # Configuração de navegação
├── screens/        # Telas do aplicativo
│   ├── login.tsx
│   ├── signup.tsx
│   ├── home.tsx
│   ├── details.tsx
│   ├── myList.tsx
│   └── profile.tsx
├── services/       # Serviços externos (Apollo, Auth)
├── store/          # Redux Toolkit
│   ├── index.ts
│   └── slices/
│       ├── animeSlice.ts
│       ├── authSlice.ts
│       └── userSlice.ts
└── types/          # Definições TypeScript
```

## 🎯 Requisitos Técnicos Atendidos

✅ Componentes com **Gluestack UI**  
✅ Tema escuro configurado e funcional  
✅ Campos de entrada com **validação** (email, senha, confirmação)  
✅ Lista de cards com imagens usando Gluestack  
✅ **Redux Toolkit** para estado global  
✅ **3 slices** de estado (anime, auth, user)  
✅ Estado global acessado em **múltiplas telas**  
✅ Mutações do estado em **múltiplas telas**  
✅ Consumo de **API GraphQL** (AniList)  
✅ **Apollo Client** configurado  
✅ Uso de **hooks do Apollo** (useQuery)  
✅ Mutação do Redux a partir de dados GraphQL  
✅ **Notificações push** com Expo Notifications  
✅ **Expo Updates** (OTA Updates)  
✅ **Firebase** (Authentication + Firestore)**Notificações:** Receba notificações ao adicionar/remover favori

1. **Adicionar Marcador:** Pressione e segure em qualquer ponto do mapa para abrir o modal de adição
2. **Personalizar Marcador:** Defina um título e escolha uma cor para identificar facilmente seus locais
3. **Visualizar Lista:** Toque no botão de lista no header para ver todos os marcadores salvos
4. **Editar/Excluir:** Na lista ou no modal, use os botões para editar ou remover marcadores
5. **Calcular Distância:** Com 2 ou mais marcadores, acesse o calculador para medir distâncias entre pontos

## 📝 Estrutura do Projeto

```
src/
├── assets/          # Imagens e recursos estáticos
├── components/      # Componentes reutilizáveis
├── constants/       # Constantes e temas
├── hooks/          # Hooks customizados
├── routes/         # Configuração de navegação
├── screens/        # Telas do aplicativo
├── store/          # Gerenciamento de estado (Zustand)
├── styles/         # Estilos globais
├── types/          # Definições TypeScript
└── utils/          # Funções utilitárias
```
