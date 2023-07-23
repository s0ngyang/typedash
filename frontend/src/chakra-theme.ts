import { extendTheme } from '@chakra-ui/react';

export const customTheme = extendTheme({
  config: {
    initialColorMode: 'dark',
  },
  components: {
    Tooltip: {
      baseStyle: {
        bg: 'gray.800',
        color: 'white',
      },
    },
  },
});
