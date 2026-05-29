// project.model.ts

export interface ProjectResult {
  value: string;
  label: string;
}

export interface ProjectTestimonial {
  text: string;
  author: string;
  role: string;
}

export interface Project {
  id: string;
  title: string;
  client: string;
  location?: string;
  category: 'software' | 'site' | 'automacao' | 'integracao' | 'dashboard';
  metric: string;
  metricLabel: string;
  description: string;
  stack: string[];
  featured: boolean;
  liveUrl?: string;
  challenge?: string;
  solution?: string;
  results?: ProjectResult[];
  testimonial?: ProjectTestimonial;
}
