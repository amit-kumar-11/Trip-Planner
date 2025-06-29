import React, { useState } from 'react';
import { Plus, Edit3, Trash2, Clock, MapPin } from 'lucide-react';
import { ItineraryItem } from '../types';
import { getDaysBetween } from '../utils/validation';

interface ItineraryManagerProps {
  itinerary: ItineraryItem[];
  onUpdateItinerary: (itinerary: ItineraryItem[]) => void;
  startDate: string;
  endDate: string;
}

export function ItineraryManager({ itinerary, onUpdateItinerary, startDate, endDate }: ItineraryManagerProps) {
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [newItem, setNewItem] = useState({ day: 1, title: '', description: '', time: '' });

  const totalDays = getDaysBetween(startDate, endDate);

  const addItem = () => {
    if (!newItem.title.trim()) return;

    const item: ItineraryItem = {
      id: Date.now().toString(),
      ...newItem
    };

    onUpdateItinerary([...itinerary, item]);
    setNewItem({ day: 1, title: '', description: '', time: '' });
  };

  const updateItem = (id: string, updates: Partial<ItineraryItem>) => {
    onUpdateItinerary(itinerary.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ));
    setEditingItem(null);
  };

  const deleteItem = (id: string) => {
    onUpdateItinerary(itinerary.filter(item => item.id !== id));
  };

  const getItemsForDay = (day: number) => {
    return itinerary.filter(item => item.day === day);
  };

  const getDayLabel = (day: number) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + day - 1);
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
  };

  return (
    <div className="space-y-8">
      {/* Add New Item Form */}
      <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Add Activity</h4>
        <div className="grid md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Day</label>
            <select
              value={newItem.day}
              onChange={(e) => setNewItem(prev => ({ ...prev, day: parseInt(e.target.value) }))}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {Array.from({ length: totalDays }, (_, i) => i + 1).map(day => (
                <option key={day} value={day}>Day {day}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Time (Optional)</label>
            <input
              type="time"
              value={newItem.time}
              onChange={(e) => setNewItem(prev => ({ ...prev, time: e.target.value }))}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Activity</label>
            <input
              type="text"
              value={newItem.title}
              onChange={(e) => setNewItem(prev => ({ ...prev, title: e.target.value }))}
              placeholder="e.g., Visit Eiffel Tower"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
          <textarea
            value={newItem.description}
            onChange={(e) => setNewItem(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Add details about this activity..."
            rows={2}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button
          onClick={addItem}
          disabled={!newItem.title.trim()}
          className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          <Plus className="w-4 h-4" />
          Add Activity
        </button>
      </div>

      {/* Daily Itinerary */}
      <div className="space-y-6">
        {Array.from({ length: totalDays }, (_, i) => i + 1).map(day => {
          const dayItems = getItemsForDay(day);
          
          return (
            <div key={day} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-teal-600 px-6 py-4">
                <h3 className="text-lg font-semibold text-white">
                  Day {day} - {getDayLabel(day)}
                </h3>
              </div>
              
              <div className="p-6">
                {dayItems.length === 0 ? (
                  <p className="text-gray-500 dark:text-gray-400 italic text-center py-8">
                    No activities planned for this day yet.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {dayItems.map(item => (
                      <div key={item.id} className="group border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200">
                        {editingItem === item.id ? (
                          <EditItemForm
                            item={item}
                            onSave={(updates) => updateItem(item.id, updates)}
                            onCancel={() => setEditingItem(null)}
                          />
                        ) : (
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                {item.time && (
                                  <div className="flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded-lg">
                                    <Clock className="w-3 h-3" />
                                    {item.time}
                                  </div>
                                )}
                                <h4 className="font-semibold text-gray-900 dark:text-white">{item.title}</h4>
                              </div>
                              {item.description && (
                                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                                  {item.description}
                                </p>
                              )}
                            </div>
                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                              <button
                                onClick={() => setEditingItem(item.id)}
                                className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => deleteItem(item.id)}
                                className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface EditItemFormProps {
  item: ItineraryItem;
  onSave: (updates: Partial<ItineraryItem>) => void;
  onCancel: () => void;
}

function EditItemForm({ item, onSave, onCancel }: EditItemFormProps) {
  const [formData, setFormData] = useState({
    title: item.title,
    description: item.description,
    time: item.time || ''
  });

  const handleSave = () => {
    if (formData.title.trim()) {
      onSave(formData);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Activity title"
          />
        </div>
        <div>
          <input
            type="time"
            value={formData.time}
            onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
      <textarea
        value={formData.description}
        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
        rows={2}
        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="Description"
      />
      <div className="flex gap-2">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Save
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}