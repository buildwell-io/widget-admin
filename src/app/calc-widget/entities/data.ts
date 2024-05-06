import { Answer, Step } from './step';

export const STEPS: Step[] = [
  new Step(0, 'Type of work', 'select', true),
  new Step(1, 'S.Painting', 'select', false),
  new Step(2, 'S.Plumbing', 'select', false),
  new Step(3, 'S.Building', 'select', false),
  new Step(4, 'S of walls', 'input', false),
  new Step(5, 'L of pipes', 'input', false),
  new Step(6, 'm2 surface', 'input', false),
  new Step(7, 'Plumbing - Inside', 'select', false),
  new Step(8, 'Plumbing - Outside', 'select', false)
];

export const ANSWERS: Answer[] = [
  // Step #0 (Type of work)
  new Answer(0, 'Painting', 0, 1),
  new Answer(1, 'Plumbing', 0, 2),
  new Answer(2, 'Building', 0, 3),

  // Step #1 (Painting)
  new Answer(3, 'Walls', 1, 4),
  new Answer(4, 'Ceiling', 1, 4),

  // Step #2 (Plumbing)
  new Answer(5, 'Inside', 2, 7),
  new Answer(6, 'Outside', 2, 8),
  new Answer(7, 'Underground', 2, 5),

  // Step #3 (Building)
  new Answer(8, 'Dakapel', 3, 6),
  new Answer(9, 'Extension', 3, 6),
  new Answer(10, 'Brick storage', 3, 6),

  // Step #7
  new Answer(11, 'Sewer', 7, 5),
  new Answer(12, 'Toilet', 7, 5),
  new Answer(13, 'Bathroom', 7, 5),

  // Step #8
  new Answer(14, 'Garden irrigation', 8, 5),
  new Answer(15, 'Garden sewer', 8, 5),
  new Answer(16, 'Garden crane', 8, 5),
];
