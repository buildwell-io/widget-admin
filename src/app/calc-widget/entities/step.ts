export type StepType = 'select' | 'input';

const getId = (): string => Math.random().toString(16).slice(-8);

export class Answer {
  constructor(
    public readonly id: number,
    public readonly text: string,
    public readonly step: number,
    public readonly nextStep: number,
  ) {
  }
}

export class Step {
  constructor(
    public readonly id: number,
    public readonly title: string,
    public readonly type: StepType,
    public readonly initial: boolean,
  ) {
  }
}
