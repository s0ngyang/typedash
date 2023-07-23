import { ColorHues } from '@chakra-ui/react';

interface AppTheme {
  name: string;
  id: string;
  colors: {
    bg: ColorHues;
    accent: ColorHues;
    primary: ColorHues;
    secondary: ColorHues;
  };
}

const theme: AppTheme = {
  id: 'terminal',
  name: 'terminal',
  colors: {
    bg: {
      50: '#f2f2f8',
      100: '#d7d8db',
      200: '#bdbec0',
      300: '#a3a4a7',
      400: '#888a8e',
      500: '#6f7174',
      600: '#56585b',
      700: '#191a1c',
      800: '#242628', //
      900: '#040f0f',
    },
    accent: {
      50: '#f4fde1',
      100: '#e2f7b8',
      200: '#94ca1f',
      300: '#729d16',
      400: '#ade337',
      500: '#94ca1f',
      600: '#729d16', //
      700: '#52700e',
      800: '#304304',
      900: '#0e1700',
    },
    primary: {
      50: '#f1f1fb',
      100: '#d8d8dd',
      200: '#bebfc1',
      300: '#a4a5a7',
      400: '#8b8b8d',
      500: '#717273',
      600: '#58595a',
      700: '#3e3f41',
      800: '#232629',
      900: '#001010',
    },
    secondary: {
      50: '#f2f6eb',
      100: '#dce0d1',
      200: '#c5ccb5',
      300: '#aeb798',
      400: '#96a17b',
      500: '#7d8861',
      600: '#616a4b',
      700: '#454c35',
      800: '#292e1f',
      900: '#0d1004',
    },
  },
};

export default theme;
