import React, { useState, useEffect } from 'react';
import { Upload, QrCode, Clock, User, Gift, Camera, CheckCircle } from 'lucide-react';
import { apiService } from '../services/api';

const MealQR = ({ user }) => {
  const [activeView, setActiveView] = useState('available');
  const [qrCodes, setQrCodes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadPreview, setUploadPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (activeView === 'available') {
      fetchAvailableQRs();
    }
  }, [activeView]);

  const fetchAvailableQRs = async () => {
    setLoading(true);
    try {
      const result = await apiService.getAvailableMealQRs();
      if (result.success) {
        setQrCodes(result.data);
      }
    } catch (error) {
      console.error('Error fetching QRs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setUploadPreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!uploadFile) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('qrImage', uploadFile);

      const result = await apiService.createMealQR(formData);
      if (result.success) {
        setUploadFile(null);
        setUploadPreview(null);
        setActiveView('available');
        fetchAvailableQRs();
      }
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleClaim = async (qrId) => {
    try {
      const result = await apiService.claimMealQR(qrId);
      if (result.success) {
        fetchAvailableQRs();
      }
    } catch (error) {
      console.error('Claim error:', error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Meal QR Sharing</h1>
        <p className="text-gray-600">Share your unused meal QR codes with fellow students</p>
      </div>

      {/* Navigation */}
      <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg w-fit">
        <button
          onClick={() => setActiveView('available')}
          className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
            activeView === 'available'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Available QRs
        </button>
        <button
          onClick={() => setActiveView('donate')}
          className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
            activeView === 'donate'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Donate QR
        </button>
      </div>

      {/* Available QRs View */}
      {activeView === 'available' && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <Gift className="h-5 w-5 mr-2 text-green-600" />
              Available QR Codes
            </h2>
            <button
              onClick={fetchAvailableQRs}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Refresh
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : qrCodes.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <QrCode className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No QR codes available</h3>
              <p className="text-gray-600">Be the first to share a meal QR code!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {qrCodes.map((qr) => (
                <div key={qr._id} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="aspect-square bg-gray-100 flex items-center justify-center">
                    <img
                      src={`http://localhost:3000/uploads/${qr.imageUrl}`}
                      alt="QR Code"
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <User className="h-4 w-4 mr-1" />
                        <span>{qr.userId?.name || 'Anonymous'}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{formatDate(qr.date)}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleClaim(qr._id)}
                      className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:from-green-700 hover:to-blue-700 transition-all duration-200 flex items-center justify-center"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Claim QR Code
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Donate QR View */}
      {activeView === 'donate' && (
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <Upload className="h-5 w-5 mr-2 text-blue-600" />
              Donate Your Meal QR Code
            </h2>

            <div className="space-y-6">
              {/* Upload Area */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors duration-200">
                {uploadPreview ? (
                  <div className="space-y-4">
                    <img
                      src={uploadPreview}
                      alt="QR Preview"
                      className="max-w-xs mx-auto rounded-lg shadow-md"
                    />
                    <p className="text-sm text-gray-600">QR code ready to upload</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Camera className="h-12 w-12 text-gray-400 mx-auto" />
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Upload QR Code Image</h3>
                      <p className="text-gray-600 mb-4">Take a photo or upload an image of your meal QR code</p>
                    </div>
                  </div>
                )}

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="qr-upload"
                />
                <label
                  htmlFor="qr-upload"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors duration-200"
                >
                  <Camera className="h-4 w-4 mr-2" />
                  {uploadPreview ? 'Change Image' : 'Select Image'}
                </label>
              </div>

              {/* Upload Button */}
              {uploadFile && (
                <button
                  onClick={handleUpload}
                  disabled={uploading}
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:from-green-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {uploading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Uploading...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <Gift className="h-5 w-5 mr-2" />
                      Share QR Code
                    </div>
                  )}
                </button>
              )}

              {/* Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">How it works:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Upload a clear photo of your unused meal QR code</li>
                  <li>• Other students can claim and use your QR code</li>
                  <li>• Help reduce food waste in the hostel</li>
                  <li>• Build a sharing community</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MealQR;