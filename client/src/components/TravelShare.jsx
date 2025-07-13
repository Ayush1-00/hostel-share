import React, { useState, useEffect } from 'react';
import { MapPin, Calendar, Users, Plus, Search, Car, Clock, Mail } from 'lucide-react';
import { apiService } from '../services/api';

const TravelShare = ({ user }) => {
  const [activeView, setActiveView] = useState('browse');
  const [travelPlans, setTravelPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchFilters, setSearchFilters] = useState({
    destination: '',
    travelDate: ''
  });
  const [newPlan, setNewPlan] = useState({
    source: '',
    destination: '',
    travelDate: '',
    additionalInfo: ''
  });
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    if (activeView === 'browse') {
      fetchTravelPlans();
    }
  }, [activeView]);

  const fetchTravelPlans = async () => {
    setLoading(true);
    try {
      const result = await apiService.getTravelPlans();
      if (result.success) {
        setTravelPlans(result.data);
      }
    } catch (error) {
      console.error('Error fetching travel plans:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchFilters.destination && !searchFilters.travelDate) {
      fetchTravelPlans();
      return;
    }

    setLoading(true);
    try {
      const result = await apiService.searchTravelPlans(
        searchFilters.destination,
        searchFilters.travelDate
      );
      if (result.success) {
        setTravelPlans(result.data);
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePlan = async (e) => {
    e.preventDefault();
    setCreating(true);
    try {
      const result = await apiService.createTravelPlan(newPlan);
      if (result.success) {
        setNewPlan({ source: '', destination: '', travelDate: '', additionalInfo: '' });
        setActiveView('browse');
        fetchTravelPlans();
      }
    } catch (error) {
      console.error('Create plan error:', error);
    } finally {
      setCreating(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Travel Sharing</h1>
        <p className="text-gray-600">Find travel companions and share your journey</p>
      </div>

      {/* Navigation */}
      <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg w-fit">
        <button
          onClick={() => setActiveView('browse')}
          className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
            activeView === 'browse'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Browse Plans
        </button>
        <button
          onClick={() => setActiveView('create')}
          className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
            activeView === 'create'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Create Plan
        </button>
      </div>

      {/* Browse Plans View */}
      {activeView === 'browse' && (
        <div>
          {/* Search Filters */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Search className="h-5 w-5 mr-2 text-blue-600" />
              Search Travel Plans
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Destination
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchFilters.destination}
                    onChange={(e) => setSearchFilters({ ...searchFilters, destination: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Where to?"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Travel Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="date"
                    value={searchFilters.travelDate}
                    onChange={(e) => setSearchFilters({ ...searchFilters, travelDate: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex items-end">
                <button
                  onClick={handleSearch}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
                >
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </button>
              </div>
            </div>
          </div>

          {/* Travel Plans List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <Users className="h-5 w-5 mr-2 text-green-600" />
                Available Travel Plans
              </h2>
              <button
                onClick={fetchTravelPlans}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Refresh
              </button>
            </div>

            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : travelPlans.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <Car className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No travel plans found</h3>
                <p className="text-gray-600">Be the first to create a travel plan!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {travelPlans.map((plan) => (
                  <div key={plan._id} className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="bg-blue-100 p-2 rounded-lg">
                          <Car className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{plan.userId?.name}</h3>
                          <p className="text-sm text-gray-600 flex items-center">
                            <Mail className="h-3 w-3 mr-1" />
                            {plan.userId?.email}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{formatTime(plan.createdAt)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">From:</span>
                        <span className="font-medium text-gray-900">{plan.source}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-gray-600">To:</span>
                        <span className="font-medium text-gray-900">{plan.destination}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-blue-500" />
                        <span className="text-sm text-gray-600">Date:</span>
                        <span className="font-medium text-gray-900">{formatDate(plan.travelDate)}</span>
                      </div>
                    </div>

                    {plan.additionalInfo && (
                      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-700">{plan.additionalInfo}</p>
                      </div>
                    )}

                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <button className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:from-green-700 hover:to-blue-700 transition-all duration-200">
                        Contact Traveler
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Create Plan View */}
      {activeView === 'create' && (
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <Plus className="h-5 w-5 mr-2 text-blue-600" />
              Create Travel Plan
            </h2>

            <form onSubmit={handleCreatePlan} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  From (Source)
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    value={newPlan.source}
                    onChange={(e) => setNewPlan({ ...newPlan, source: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Starting location"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  To (Destination)
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500" />
                  <input
                    type="text"
                    value={newPlan.destination}
                    onChange={(e) => setNewPlan({ ...newPlan, destination: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Destination"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Travel Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-500" />
                  <input
                    type="date"
                    value={newPlan.travelDate}
                    onChange={(e) => setNewPlan({ ...newPlan, travelDate: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Information (Optional)
                </label>
                <textarea
                  value={newPlan.additionalInfo}
                  onChange={(e) => setNewPlan({ ...newPlan, additionalInfo: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="4"
                  placeholder="Any additional details about your travel plan..."
                />
              </div>

              <button
                type="submit"
                disabled={creating}
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:from-green-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {creating ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Creating...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Plus className="h-5 w-5 mr-2" />
                    Create Travel Plan
                  </div>
                )}
              </button>
            </form>

            {/* Info */}
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">Tips for travel sharing:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Be specific about your departure time and meeting point</li>
                <li>• Share contact information for coordination</li>
                <li>• Discuss cost sharing arrangements beforehand</li>
                <li>• Be reliable and communicate any changes</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TravelShare;