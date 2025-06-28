// src/hooks/useAds.js
import { useState, useEffect } from 'react';
import ellantekAPI from '../services/api';

export const useAds = (initialStatus = null) => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAds = async (status = initialStatus) => {
    setLoading(true);
    setError(null);
    try {
      const response = await ellantekAPI.getAds(status);
      setAds(response.ads || response);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const uploadAd = async (adData) => {
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      
      // Add files
      if (adData.creative) {
        formData.append('creative', adData.creative);
      }
      if (adData.thumbnail) {
        formData.append('thumbnail', adData.thumbnail);
      }
      
      // Add other data
      Object.keys(adData).forEach(key => {
        if (key !== 'creative' && key !== 'thumbnail') {
          formData.append(key, adData[key]);
        }
      });

      const response = await ellantekAPI.uploadAd(formData);
      
      // Refresh ads list
      await fetchAds();
      
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const approveAd = async (adId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await ellantekAPI.approveAd(adId);
      
      // Update the ad in the local state
      setAds(prevAds => 
        prevAds.map(ad => 
          ad.id === adId ? { ...ad, status: 'approved' } : ad
        )
      );
      
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const rejectAd = async (adId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await ellantekAPI.rejectAd(adId);
      
      // Update the ad in the local state
      setAds(prevAds => 
        prevAds.map(ad => 
          ad.id === adId ? { ...ad, status: 'rejected' } : ad
        )
      );
      
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const toggleAdActive = async (adId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await ellantekAPI.toggleAdActive(adId);
      
      // Update the ad in the local state
      setAds(prevAds => 
        prevAds.map(ad => 
          ad.id === adId ? { ...ad, active: !ad.active } : ad
        )
      );
      
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const bookAd = async (bookingData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await ellantekAPI.bookAd(bookingData);
      
      // Refresh ads to get updated booking status
      await fetchAds();
      
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Auto-fetch ads on mount
  useEffect(() => {
    fetchAds();
  }, []);

  return {
    ads,
    loading,
    error,
    fetchAds,
    uploadAd,
    approveAd,
    rejectAd,
    toggleAdActive,
    bookAd,
    refetch: fetchAds,
  };
};

// Hook for payments
export const usePayments = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createPaymentIntent = async (paymentData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await ellantekAPI.createPaymentIntent(paymentData);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    createPaymentIntent,
  };
};

// Hook for contacts
export const useContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchContacts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await ellantekAPI.getContacts();
      setContacts(response.contacts || response);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const submitContact = async (contactData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await ellantekAPI.submitContact(contactData);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const sendEmail = async (emailData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await ellantekAPI.sendEmail(emailData);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return {
    contacts,
    loading,
    error,
    fetchContacts,
    submitContact,
    sendEmail,
    refetch: fetchContacts,
  };
};