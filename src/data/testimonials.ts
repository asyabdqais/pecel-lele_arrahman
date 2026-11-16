import testimonialsJson from './testimonials.json';

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
}

export const testimonialsData: Testimonial[] = testimonialsJson.items as Testimonial[];
