import React from 'react';
import { MapPin, Calendar, BookOpen, ArrowRight } from 'lucide-react';

interface HomePageProps {
  onNavigate: (view: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const features = [
    {
      icon: MapPin,
      title: 'Plan Destinations',
      description: 'Organize your dream destinations with detailed trip information and notes.'
    },
    {
      icon: Calendar,
      title: 'Schedule Events',
      description: 'Create detailed itineraries with daily plans and time management.'
    },
    {
      icon: BookOpen,
      title: 'Save & Organize',
      description: 'Keep all your trips organized and easily accessible whenever you need them.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.8), rgba(59, 130, 246, 0.6)), url('https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')`
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Plan Your Perfect
              <span className="block text-yellow-300">Adventure</span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
              Create detailed travel itineraries, organize your trips, and make every journey unforgettable with our intuitive planning tools.
            </p>
            <button
              onClick={() => onNavigate('planner')}
              className="inline-flex items-center gap-3 bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Start Planning
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Everything You Need to Plan
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our comprehensive travel planning tools help you create, organize, and manage all your adventures in one place.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group text-center p-8 rounded-2xl bg-gray-50 dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-lg"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl mb-6 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/40 transition-colors">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-teal-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of travelers who trust TravelPlan to organize their perfect adventures.
          </p>
          <button
            onClick={() => onNavigate('planner')}
            className="inline-flex items-center gap-3 bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Create Your First Trip
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
}