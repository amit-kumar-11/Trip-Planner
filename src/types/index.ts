export interface Trip {
  id: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  notes: string;
  itinerary: ItineraryItem[];
  createdAt: string;
}

export interface ItineraryItem {
  id: string;
  day: number;
  title: string;
  description: string;
  time?: string;
}

export interface FormErrors {
  title?: string;
  destination?: string;
  startDate?: string;
  endDate?: string;
}