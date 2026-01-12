export interface QuizState {
  gender: string;
  age: string;
  goal: string;
  obstacle: string;
  experience: string;
  motivation: string;
  time: string;
  environment: string;
  frequency: string;
  weightGoal: string;
  currentWeight: string;
  height: string;
  injury: string;
  visualization: string;
  format: string;
  focusAreas: string[];
  commitment: string;
}

export type Step = 
  | 'intro'
  | 'quiz'
  | 'loading'
  | 'sales';

export interface Testimonial {
  name: string;
  text: string;
  stars: number;
}