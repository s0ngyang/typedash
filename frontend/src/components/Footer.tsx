import { FC } from 'react';

interface FooterProps {}

const Footer: FC<FooterProps> = ({}) => {
  return (
    <div>
      <a
        className="underline"
        href="https://github.com/raynertjx/typedash"
        target="_blank"
      >
        Github
      </a>
    </div>
  );
};

export default Footer;
