import React, { useState } from 'react';
import { Plus, Calendar, MapPin, FileText, Save } from 'lucide-react';
import { Trip, ItineraryItem, FormErrors } from '../types';
import { validateTripForm, getDaysBetween } from '../utils/validation';
import { ItineraryManager } from './ItineraryManager';

interface TripPlannerProps {
  onSaveTrip: (trip: Trip) => void;
  editingTrip?: Trip | null;
}

export function TripPlanner({ onSaveTrip, editingTrip }: TripPlannerProps) {
  const [formData, setFormData] = useState({
    title: editingTrip?.title || '',
    destination: editingTrip?.destination || '',
    startDate: editingTrip?.startDate || '',
    endDate: editingTrip?.endDate || '',
    notes: editingTrip?.notes || ''
  });

  const [itinerary, setItinerary] = useState<ItineraryItem[]>(editingTrip?.itinerary || []);
  const [errors, setErrors] = useState<FormErrors>({});
  const [showItinerary, setShowItinerary] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear errors when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSaveTrip = () => {
    const validationErrors = validateTripForm(formData);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const trip: Trip = {
      id: editingTrip?.id || Date.now().toString(),
      ...formData,
      itinerary,
      createdAt: editingTrip?.createdAt || new Date().toISOString()
    };

    onSaveTrip(trip);
    
    // Reset form if not editing
    if (!editingTrip) {
      setFormData({
        title: '',
        destination: '',
        startDate: '',
        endDate: '',
        notes: ''
      });
      setItinerary([]);
      setShowItinerary(false);
    }
  };

  const canShowItinerary = formData.startDate && formData.endDate && 
    new Date(formData.startDate) <= new Date(formData.endDate);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {editingTrip ? 'Edit Your Trip' : 'Plan Your Next Adventure'}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Fill in the details below to create your perfect travel itinerary.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 lg:p-8 mb-8">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Trip Title */}
            <div className="lg:col-span-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                <FileText className="w-4 h-4" />
                Trip Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g., Summer Vacation in Europe"
                className={`
                  w-full px-4 py-3 rounded-xl border transition-all duration-200
                  focus:ring-2 focus:ring-blue-500 focus:border-transparent
                  dark:bg-gray-700 dark:text-white dark:placeholder-gray-400
                  ${errors.title 
                    ? 'border-red-300 bg-red-50 dark:border-red-600 dark:bg-red-900/20' 
                    : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                  }
                `}
              />
              {errors.title && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.title}</p>}
            </div>

            {/* Destination */}
            <div className="lg:col-span-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                <MapPin className="w-4 h-4" />
                Destination
              </label>
              <input
                type="text"
                name="destination"
                value={formData.destination}
                onChange={handleInputChange}
                placeholder="e.g., Paris, France"
                className={`
                  w-full px-4 py-3 rounded-xl border transition-all duration-200
                  focus:ring-2 focus:ring-blue-500 focus:border-transparent
                  dark:bg-gray-700 dark:text-white dark:placeholder-gray-400
                  ${errors.destination 
                    ? 'border-red-300 bg-red-50 dark:border-red-600 dark:bg-red-900/20' 
                    : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                  }
                `}
              />
              {errors.destination && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.destination}</p>}
            </div>

            {/* Start Date */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                <Calendar className="w-4 h-4" />
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                className={`
                  w-full px-4 py-3 rounded-xl border transition-all duration-200
                  focus:ring-2 focus:ring-blue-500 focus:border-transparent
                  dark:bg-gray-700 dark:text-white dark:placeholder-gray-400
                  ${errors.startDate 
                    ? 'border-red-300 bg-red-50 dark:border-red-600 dark:bg-red-900/20' 
                    : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                  }
                `}
              />
              {errors.startDate && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.startDate}</p>}
            </div>

            {/* End Date */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                <Calendar className="w-4 h-4" />
                End Date
              </label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                className={`
                  w-full px-4 py-3 rounded-xl border transition-all duration-200
                  focus:ring-2 focus:ring-blue-500 focus:border-transparent
                  dark:bg-gray-700 dark:text-white dark:placeholder-gray-400
                  ${errors.endDate 
                    ? 'border-red-300 bg-red-50 dark:border-red-600 dark:bg-red-900/20' 
                    : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                  }
                `}
              />
              {errors.endDate && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.endDate}</p>}
            </div>

            {/* Notes */}
            <div className="lg:col-span-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                <FileText className="w-4 h-4" />
                Notes & Special Instructions
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows={4}
                placeholder="Add any special notes, requirements, or reminders for your trip..."
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
              />
            </div>
          </div>

          {/* Itinerary Section */}
          {canShowItinerary && (
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Daily Itinerary ({getDaysBetween(formData.startDate, formData.endDate)} days)
                </h3>
                {!showItinerary && (
                  <button
                    onClick={() => setShowItinerary(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    <Plus className="w-4 h-4" />
                    Add Itinerary
                  </button>
                )}
              </div>
              
              {showItinerary && (
                <ItineraryManager
                  itinerary={itinerary}
                  onUpdateItinerary={setItinerary}
                  startDate={formData.startDate}
                  endDate={formData.endDate}
                />
              )}
            </div>
          )}

          {/* Save Button */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={handleSaveTrip}
              className="w-full flex items-center justify-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Save className="w-5 h-5" />
              {editingTrip ? 'Update Trip' : 'Save Trip'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}