import { extendTheme } from '@chakra-ui/react';
import theme_8008 from './components/themes/8008';

export const customTheme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  colors: theme_8008.colors,
  components: {
    Tooltip: {
      baseStyle: {
        bg: 'gray.800',
        color: 'white',
      },
    },
  },
});
