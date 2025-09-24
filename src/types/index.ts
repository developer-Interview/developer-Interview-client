export interface Question {
  id: number;
  title: string;
  category: 'Backend' | 'Frontend' | 'System Design' | 'Data Structures' | 'Database';
  modelAnswer: string;
  deepDive: string;
  learningResources: LearningResource[];
  createdAt?: string;
  updatedAt?: string;
}

export interface LearningResource {
  title: string;
  url: string;
  description?: string;
}

export interface EmailSubscription {
  email: string;
  isActive: boolean;
  subscribedAt: string;
}