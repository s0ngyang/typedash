import { FC } from 'react';

interface CaretProps {
  offset: number;
}

const Caret: FC<CaretProps> = ({ offset }) => {
  return <div className="caret" style={{ left: offset }} />;
};

export default Caret;
