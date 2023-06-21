export interface ChallengeProps {
  id: number;
  title: string;
  content: string;
}

export const BookChallenges = [
  {
    id: 0,
    title: 'To Kill a Mockingbird by Harper Lee',
    content: `Atticus said to Jem one day, 'I'd rather you shot at tin cans in the backyard, but I know you'll go after birds. Shoot all the blue jays you want if you can hit 'em, but remember it's a sin to kill a mockingbird.'`,
  },
  {
    id: 1,
    title: '1984 by George Orwell',
    content: `But if there was hope, it lay in the proles. You had to cling on to that. When you put it in words it sounded reasonable: it was when you looked at the human beings passing you on the pavement that it became an act of faith.`,
  },
  {
    id: 2,
    title: 'Fahrenheit 451 by Ray Bradbury',
    content: `He felt his smile slide away, melt, fold over, and down on itself like a tallow skin, like the stuff of a fantastic candle burning too long and now collapsing and now blown out. Darkness. He was not happy. He was not happy. He said the words to himself.`,
  },
  {
    id: 3,
    title: 'The Hunger Games by Suzanne Collins',
    content: `The agony of kissing Gale so hard returns to me, and I think, why did I do that? Because I couldn't help myself. Gale's mine. I'm his. Anything else is unthinkable. Why did it take a kiss to understand that?`,
  },
  {
    id: 4,
    title: `Harry Potter and the Philosopher's Stone by J.K. Rowling`,
    content: `Harry lay there, lost for words. Then a brilliant idea struck him. He sat up and clutched the package to his chest. 'I'm going to have a lot of fun with Dudley this summer,' he grinned maliciously. With that, he fell asleep, and all his dreams were sweet.`,
  },
];

export default BookChallenges;
