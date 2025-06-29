import React from 'react';
import { ArrowLeft, Calendar, MapPin, FileText, Edit3, Trash2, Clock } from 'lucide-react';
import { Trip } from '../types';
import { formatDate, getDaysBetween } from '../utils/validation';

interface TripDetailsProps {
  trip: Trip;
  onBack: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function TripDetails({ trip, onBack, onEdit, onDelete }: TripDetailsProps) {
  const totalDays = getDaysBetween(trip.startDate, trip.endDate);
  const isUpcoming = new Date(trip.startDate) > new Date();
  const isActive = new Date() >= new Date(trip.startDate) && new Date() <= new Date(trip.endDate);

  const getDayLabel = (day: number) => {
    const date = new Date(trip.startDate);
    date.setDate(date.getDate() + day - 1);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getItemsForDay = (day: number) => {
    return trip.itinerary.filter(item => item.day === day);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative">
        <div 
          className="h-64 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.8), rgba(59, 130, 246, 0.6)), url('https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg?auto=compress&cs=tinysrgb&w=1920&h=400&fit=crop')`
          }}
        />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 text-white hover:text-blue-200 mb-4 transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Trips
            </button>
            
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl lg:text-4xl font-bold text-white">
                    {trip.title}
                  </h1>
                  {isActive && (
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Active
                    </span>
                  )}
                  {isUpcoming && !isActive && (
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Upcoming
                    </span>
                  )}
                </div>
                
                <div className="flex items-center gap-6 text-blue-100 mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    <span className="text-lg">{trip.destination}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    <span>{formatDate(trip.startDate)} - {formatDate(trip.endDate)}</span>
                  </div>
                </div>
                
                <p className="text-blue-100">
                  {totalDays} day{totalDays === 1 ? '' : 's'} • {trip.itinerary.length} activit{trip.itinerary.length === 1 ? 'y' : 'ies'} planned
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={onEdit}
                  className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-all duration-200"
                >
                  <Edit3 className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={onDelete}
                  className="inline-flex items-center gap-2 bg-red-500/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-red-500/30 transition-all duration-200"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Trip Details Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Trip Details
              </h2>
              
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-2">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm font-medium">Destination</span>
                  </div>
                  <p className="text-gray-900 dark:text-white font-semibold">
                    {trip.destination}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-2">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm font-medium">Duration</span>
                  </div>
                  <p className="text-gray-900 dark:text-white font-semibold">
                    {totalDays} day{totalDays === 1 ? '' : 's'}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
                  </p>
                </div>

                {trip.notes && (
                  <div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-2">
                      <FileText className="w-4 h-4" />
                      <span className="text-sm font-medium">Notes</span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                      {trip.notes}
                    </p>
                  </div>
                )}

                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-gray-500 dark:text-gray-400 text-xs">
                    Created {new Date(trip.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Itinerary */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              Daily Itinerary
            </h2>

            {trip.itinerary.length === 0 ? (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-12 text-center">
                <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  No itinerary yet
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  This trip doesn't have any planned activities yet.
                </p>
                <button
                  onClick={onEdit}
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  <Edit3 className="w-4 h-4" />
                  Add Activities
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {Array.from({ length: totalDays }, (_, i) => i + 1).map(day => {
                  const dayItems = getItemsForDay(day);
                  
                  return (
                    <div key={day} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                      <div className="bg-gradient-to-r from-blue-600 to-teal-600 px-6 py-4">
                        <h3 className="text-lg font-semibold text-white">
                          Day {day} - {getDayLabel(day)}
                        </h3>
                      </div>
                      
                      <div className="p-6">
                        {dayItems.length === 0 ? (
                          <p className="text-gray-500 dark:text-gray-400 italic text-center py-8">
                            No activities planned for this day.
                          </p>
                        ) : (
                          <div className="space-y-4">
                            {dayItems.map(item => (
                              <div key={item.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                                <div className="flex items-start gap-3">
                                  {item.time && (
                                    <div className="flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded-lg flex-shrink-0">
                                      <Clock className="w-3 h-3" />
                                      {item.time}
                                    </div>
                                  )}
                                  <div className="flex-1">
                                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                                      {item.title}
                                    </h4>
                                    {item.description && (
                                      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                                        {item.description}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}