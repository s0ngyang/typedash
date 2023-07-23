import { CheckIcon } from '@chakra-ui/icons';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { FC } from 'react';
import theme_8008 from './8008';
import theme_terminal from './terminal';
import { ThemeProps } from './theme.inteface';

interface ThemeModalProps {
  isThemeOpen: boolean;
  onThemeClose: () => void;
  currentTheme: ThemeProps;
  setCurrentTheme: React.Dispatch<React.SetStateAction<ThemeProps>>;
}

const ThemeModal: FC<ThemeModalProps> = ({
  isThemeOpen,
  onThemeClose,
  currentTheme,
  setCurrentTheme,
}) => {
  const themeItems: ThemeProps[] = [theme_8008, theme_terminal];
  const themeSwitchHandler = (nextTheme: ThemeProps) => {
    setCurrentTheme(nextTheme);
    onThemeClose();
  };
  return (
    <Modal
      onClose={onThemeClose}
      isOpen={isThemeOpen}
      isCentered
      id='theme-modal'
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Theme</ModalHeader>
        <ModalBody className='flex flex-col gap-2'>
          {themeItems.map((theme, i) => (
            <Button
              key={i}
              leftIcon={
                currentTheme.name === theme.name ? <CheckIcon /> : <div />
              }
              onClick={() => themeSwitchHandler(theme)}
              value={theme.name}
            >
              <div className='w-full flex justify-between'>
                <div>{theme.name}</div>
              </div>
            </Button>
          ))}
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
};

export default ThemeModal;
