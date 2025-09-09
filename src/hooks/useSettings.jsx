import { useState, useEffect } from "react";
import axios from "../lib/axios";
import { toast } from "react-toastify";

// Default fallback settings
const DEFAULT_SETTINGS = {
  platformName: "VICO",
  adminEmail: "noblegodwin02@gmail.com",
  supportEmail: "godwinhigh2@gmail.com",
  supportPhone: "08144098649",
  defaultCurrency: "NGN",
  maintenanceMode: false,
  socialLinks: {
    facebook: "https://web.facebook.com/godwin.inyene.5",
    twitter: null,
    instagram: "https://www.instagram.com/wintechsystems_2/",
    linkedin: "https://www.linkedin.com/in/godwin-inyene-598714233/",
    youtube: null,
    tiktok: "https://www.tiktok.com/@geehigh07?lang=ens",
  },
};

export const useSettings = () => {
  const [generalData, setGeneralData] = useState(DEFAULT_SETTINGS);
  const [isFetching, setIsFetching] = useState(false);

  const fetchSettings = async () => {
    try {
      setIsFetching(true);
      const response = await axios.get("api/v1/settings");
      const settings = response.data.data.settings || {};

      // Merge backend data with defaults
      setGeneralData({
        ...DEFAULT_SETTINGS,
        ...settings,
        socialLinks: {
          ...DEFAULT_SETTINGS.socialLinks,
          facebook: settings.facebookUrl ?? DEFAULT_SETTINGS.socialLinks.facebook,
          twitter: settings.twitterUrl ?? DEFAULT_SETTINGS.socialLinks.twitter,
          instagram: settings.instagramUrl ?? DEFAULT_SETTINGS.socialLinks.instagram,
          linkedin: settings.linkedinUrl ?? DEFAULT_SETTINGS.socialLinks.linkedin,
          youtube: settings.youtubeUrl ?? DEFAULT_SETTINGS.socialLinks.youtube,
          tiktok: settings.tiktokUrl ?? DEFAULT_SETTINGS.socialLinks.tiktok,
        },
      });
    } catch (error) {
      console.error("Failed to fetch settings:", error);
      toast.error("Failed to load settings");
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return {
    generalData,
    isFetching,
    setGeneralData,
    refetch: fetchSettings,
  };
};
