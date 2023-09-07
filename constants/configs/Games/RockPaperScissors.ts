export const DIFFICULTY_OPTIONS = [
  { key: 'easy', value: 'Easy' },
  { key: 'medium', value: 'Medium' },
  { key: 'hard', value: 'Hard' }
];

export const FIST_OPTIONS = [
  { key: 1, value: 'One fist' },
  { key: 2, value: 'Two fists' }
];

export const WIN_CONDITION_OPTIONS = [
  { key: 'bestOf', value: 'Best of' },
  { key: 'firstTo', value: 'First to' }
];

export const getWinCondition = (winCondition: string) => {
  switch (winCondition) {
    case 'bestOf':
      return 'Best of';
    case 'firstTo':
      return 'First to';
    default:
      return 'Best of';
  }
};
