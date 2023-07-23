import { Link } from '@chakra-ui/react';
import { FC } from 'react';

interface FooterProps {}

const Footer: FC<FooterProps> = ({}) => {
  return (
    <Link href='https://github.com/raynertjx/typedash' isExternal>
      Made by Click Clackers.
    </Link>
  );
};

export default Footer;
