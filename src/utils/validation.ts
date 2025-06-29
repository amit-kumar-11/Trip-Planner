import { FormErrors } from '../types';

export function validateTripForm(data: {
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
}): FormErrors {
  const errors: FormErrors = {};

  if (!data.title.trim()) {
    errors.title = 'Trip title is required';
  }

  if (!data.destination.trim()) {
    errors.destination = 'Destination is required';
  }

  if (!data.startDate) {
    errors.startDate = 'Start date is required';
  }

  if (!data.endDate) {
    errors.endDate = 'End date is required';
  }

  if (data.startDate && data.endDate && new Date(data.startDate) > new Date(data.endDate)) {
    errors.endDate = 'End date must be after start date';
  }

  if (data.startDate && new Date(data.startDate) < new Date().toISOString().split('T')[0]) {
    errors.startDate = 'Start date cannot be in the past';
  }

  return errors;
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function getDaysBetween(startDate: string, endDate: string): number {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
}