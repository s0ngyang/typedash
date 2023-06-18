export interface ChallengeProps {
  id: number;
  title: string;
  content: string;
}

export const BookChallenges = [
  {
    id: 0,
    title: 'To Kill a Mockingbird by Harper Lee',
    content: `Calpurnia said he was just too old and bitter to bother with.`,
  },
  {
    id: 1,
    title: '1984 by George Orwell',
    content: `But if there was hope, it lay in the proles. You had to cling on to that. When you put it in words it sounded reasonable: it was when you looked at the human beings passing you on the pavement that it became an act of faith.`,
  },
  {
    id: 2,
    title: 'Fahrenheit 451 by Ray Bradbury',
    content: `Books were only one type of receptacle where we stored a lot of things we were afraid we might forget.`,
  },
  {
    id: 3,
    title: 'The Hunger Games by Suzanne Collins',
    content: `The arena's a clock, each hour a trap, set by the Gamemakers to remind us we're at their mercy.`,
  },
  {
    id: 4,
    title: `Harry Potter and the Philosopher's Stone by J.K. Rowling`,
    content: `The Sorting Hat knows your thoughts, Harry, so put me on!`,
  },
];

export default BookChallenges;
