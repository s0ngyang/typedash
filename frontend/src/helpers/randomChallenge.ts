import BookChallenges from '../components/typing/challenges/Books.constants';

export const randomChallenge = (excludedChallengeId?: number) => {
  const temp = BookChallenges.filter((item) => item.id !== excludedChallengeId);
  return temp[Math.floor(Math.random() * temp.length)];
};
