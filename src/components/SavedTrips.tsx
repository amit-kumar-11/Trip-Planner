import React, { useState } from 'react';
import { Calendar, MapPin, Edit3, Trash2, Eye, Plus } from 'lucide-react';
import { Trip } from '../types';
import { formatDate } from '../utils/validation';
import { TripDetails } from './TripDetails';

interface SavedTripsProps {
  trips: Trip[];
  onDeleteTrip: (id: string) => void;
  onEditTrip: (trip: Trip) => void;
  onNavigate: (view: string) => void;
}

export function SavedTrips({ trips, onDeleteTrip, onEditTrip, onNavigate }: SavedTripsProps) {
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);

  if (selectedTrip) {
    return (
      <TripDetails
        trip={selectedTrip}
        onBack={() => setSelectedTrip(null)}
        onEdit={() => {
          onEditTrip(selectedTrip);
          setSelectedTrip(null);
        }}
        onDelete={() => {
          onDeleteTrip(selectedTrip.id);
          setSelectedTrip(null);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Your Travel Plans
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {trips.length === 0 
                ? 'No trips planned yet. Start planning your first adventure!'
                : `You have ${trips.length} trip${trips.length === 1 ? '' : 's'} planned.`
              }
            </p>
          </div>
          <button
            onClick={() => onNavigate('planner')}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Plus className="w-5 h-5" />
            New Trip
          </button>
        </div>

        {trips.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
              <MapPin className="w-12 h-12 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No trips planned yet
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
              Start planning your dream vacation by creating your first trip. Add destinations, dates, and build your perfect itinerary.
            </p>
            <button
              onClick={() => onNavigate('planner')}
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5" />
              Plan Your First Trip
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trips.map(trip => (
              <TripCard
                key={trip.id}
                trip={trip}
                onView={() => setSelectedTrip(trip)}
                onEdit={() => onEditTrip(trip)}
                onDelete={() => onDeleteTrip(trip.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

interface TripCardProps {
  trip: Trip;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

function TripCard({ trip, onView, onEdit, onDelete }: TripCardProps) {
  const tripDuration = Math.ceil((new Date(trip.endDate).getTime() - new Date(trip.startDate).getTime()) / (1000 * 60 * 60 * 24)) + 1;
  const isUpcoming = new Date(trip.startDate) > new Date();
  const isActive = new Date() >= new Date(trip.startDate) && new Date() <= new Date(trip.endDate);

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700">
      {/* Trip Image Placeholder */}
      <div className="h-48 bg-gradient-to-br from-blue-500 to-teal-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20" />
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white mb-1 line-clamp-1">
                {trip.title}
              </h3>
              <div className="flex items-center gap-2 text-blue-100">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{trip.destination}</span>
              </div>
            </div>
            {isActive && (
              <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                Active
              </div>
            )}
            {isUpcoming && !isActive && (
              <div className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                Upcoming
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Trip Dates */}
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-4">
          <Calendar className="w-4 h-4" />
          <span className="text-sm">
            {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
          </span>
        </div>

        {/* Trip Stats */}
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-6">
          <span>{tripDuration} day{tripDuration === 1 ? '' : 's'}</span>
          <span>{trip.itinerary.length} activit{trip.itinerary.length === 1 ? 'y' : 'ies'}</span>
        </div>

        {/* Trip Notes Preview */}
        {trip.notes && (
          <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 mb-6">
            {trip.notes}
          </p>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={onView}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <Eye className="w-4 h-4" />
            View
          </button>
          <button
            onClick={onEdit}
            className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            onClick={onDelete}
            className="p-2 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}