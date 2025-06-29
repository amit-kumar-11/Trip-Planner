import React, { useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Trip } from './types';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { TripPlanner } from './components/TripPlanner';
import { SavedTrips } from './components/SavedTrips';
import { Toast } from './components/Toast';

type View = 'home' | 'planner' | 'trips';

interface ToastState {
  message: string;
  type: 'success' | 'error';
  show: boolean;
}

function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [trips, setTrips] = useLocalStorage<Trip[]>('travel-planner-trips', []);
  const [editingTrip, setEditingTrip] = useState<Trip | null>(null);
  const [toast, setToast] = useState<ToastState>({ message: '', type: 'success', show: false });

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type, show: true });
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, show: false }));
  };

  const handleNavigate = (view: View) => {
    setCurrentView(view);
    setEditingTrip(null);
  };

  const handleSaveTrip = (trip: Trip) => {
    const existingIndex = trips.findIndex(t => t.id === trip.id);
    
    if (existingIndex >= 0) {
      // Update existing trip
      const updatedTrips = [...trips];
      updatedTrips[existingIndex] = trip;
      setTrips(updatedTrips);
      showToast('Trip updated successfully!');
      setEditingTrip(null);
      setCurrentView('trips');
    } else {
      // Add new trip
      setTrips([...trips, trip]);
      showToast('Trip saved successfully!');
      setCurrentView('trips');
    }
  };

  const handleEditTrip = (trip: Trip) => {
    setEditingTrip(trip);
    setCurrentView('planner');
  };

  const handleDeleteTrip = (id: string) => {
    const tripToDelete = trips.find(t => t.id === id);
    setTrips(trips.filter(t => t.id !== id));
    showToast(`"${tripToDelete?.title}" has been deleted.`, 'success');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Header currentView={currentView} onNavigate={handleNavigate} />
      
      <main>
        {currentView === 'home' && (
          <HomePage onNavigate={handleNavigate} />
        )}
        
        {currentView === 'planner' && (
          <TripPlanner
            onSaveTrip={handleSaveTrip}
            editingTrip={editingTrip}
          />
        )}
        
        {currentView === 'trips' && (
          <SavedTrips
            trips={trips}
            onDeleteTrip={handleDeleteTrip}
            onEditTrip={handleEditTrip}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
        />
      )}
    </div>
  );
}

export default App;