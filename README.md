<p align="center">
  <img width="250" height="250" src="https://github.com/user-attachments/assets/95066453-00a8-401b-a79f-97ba9674a191" />
</p>

<br/>
VinimeApp é um aplicativo mobile desenvolvido com React Native e Expo, focado em descoberta e gerenciamento de animes. O app permite explorar animes populares, pesquisar títulos específicos, adicionar favoritos e receber notificações sobre suas séries favoritas, tudo em uma interface moderna com tema escuro.

## :page_facing_up: Sobre o Projeto

O aplicativo oferece uma experiência completa para os amantes de anime. Os usuários podem navegar por uma vasta biblioteca de animes usando a API GraphQL do AniList, salvar seus favoritos no Firebase, alternar entre tema claro e escuro, e receber notificações push sobre suas escolhas. Toda autenticação e dados dos usuários são gerenciados com Firebase Authentication e Firestore.

## 📸 Capturas de Tela
<table>
  <tr>
    <td><img width="300" src="https://github.com/user-attachments/assets/14d8115e-de2c-426e-a0d1-a5320da2171f" /></td>
    <td><img width="300" src="https://github.com/user-attachments/assets/b3b04cb5-44d5-43a5-8c2f-5af3352f8f7f" /></td>
    <td><img width="300" src="https://github.com/user-attachments/assets/e324f318-d958-427f-a60b-0daddb7f72f9" />
</td>
  <tr>
    <td><img width="300" src="https://github.com/user-attachments/assets/05234674-b13a-4145-8056-8bb8c7d112e1" />
</td>
    <td><img width="300" src="https://github.com/user-attachments/assets/b47de820-f4b7-414e-9f95-b577c106d98c" />
</td>
    <td><img width="300" src="https://github.com/user-attachments/assets/ba3a5851-9a85-4885-879d-e2055bca54dc" />
</td>
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

## :dart: Funcionalidades Implementadas

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
:heavy_check_mark: Consumo de API GraphQL do AniList com Apollo Client\

## :rocket: Tecnologias

As seguintes ferramentas foram utilizadas neste projeto: (Stack + Bottom Tabs)
- [Redux Toolkit](https://redux-toolkit.js.org/) - Gerenciamento de estado global
- [Apollo Client](https://www.apollographql.com/docs/react/) - Cliente GraphQL
- [GraphQL](https://graphql.org/) - Query language para APIs
- [Firebase](https://firebase.google.com/) - Backend (Authentication + Firestore)
- [Gluestack UI](https://gluestack.io/) - Biblioteca de componentes UI
- [NativeWind](https://www.nativewind.dev/) - Tailwind CSS para React Native
- [Expo Notifications](https://docs.expo.dev/versions/latest/sdk/notifications/) - Push notifications
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/) - Armazenamento local
- [Lucide React Native](https://lucide.dev/) - Ícones modernos
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/) - Armazenamento local
- 
## :closed_book: Requisitos

Antes de começar, você precisa ter instalado:

- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

Para rodar em dispositivos:
- [Expo Go](https://expo.dev/client) (iOS/Android)
- Ou um emulador Android/iOS configurado

## :checkered_flag: Como Executar

```bash
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
