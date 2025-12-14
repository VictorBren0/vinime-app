/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

// Paleta vibrante inspirada em animes - roxo e rosa néon
// Tons vibrantes mas elegantes para criar uma experiência visual moderna

const purplePrimaryLight = '#9333EA'; // primary-500 no light (roxo vibrante)
const purplePrimaryDark = '#A855F7';  // primary-500 no dark (roxo néon)
const pinkSecondary = '#EC4899';      // rosa vibrante
const cyanAccent = '#06B6D4';         // ciano para info

export const Colors = {
  light: {
    text: '#0F172A',          // texto principal
    background: '#FFFFFF',    // fundo da página - branco puro
    surface: '#FAFAFC',       // cartões / superfícies elevadas
    border: '#F1F1F6',        // bordas suaves
    tint: purplePrimaryLight, // cor de destaque principal
    icon: '#64748B',
    tabIconDefault: '#94A3B8',
    tabIconSelected: purplePrimaryLight,
  },
  dark: {
    text: '#F8FAFC',           // quase branco
    background: '#0A0A0F',     // fundo principal - preto azulado
    surface: '#14141E',        // cartões / superfícies
    border: '#1E1E2D',         // bordas discretas
    tint: purplePrimaryDark,   // cor de destaque principal no dark
    icon: '#94A3B8',
    tabIconDefault: '#64748B',
    tabIconSelected: purplePrimaryDark,
  },
};
