import Storage from "expo-sqlite/kv-store";

const SETTINGS = {
  soundsEnabled: {
    key: "sounds_enabled",
    default: "true",
  },
  darkMode: {
    key: "dark_mode",
    default: "false",
  },
  language: {
    key: "language",
    default: "English",
  },
  notificationsEnabled: {
    key: "notifications_enabled",
    default: "false",
  },
  vacationMode: {
    key: "vacation_mode",
    default: "false",
  },
  gamificationEnabled: {
    key: "gamification_enabled",
    default: "true",
  },
} as const;

export const settings = {
  getSoundsEnabled: () => {
    const value = Storage.getItemSync(SETTINGS.soundsEnabled.key);
    return value === "true";
  },
  setSoundsEnabled: (enabled: boolean) => {
    Storage.setItemSync(SETTINGS.soundsEnabled.key, enabled ? "true" : "false");
  },

  getDarkMode: () => {
    const value = Storage.getItemSync(SETTINGS.darkMode.key);
    return value === "true";
  },
  setDarkMode: (enabled: boolean) => {
    Storage.setItemSync(SETTINGS.darkMode.key, enabled ? "true" : "false");
  },

  getLanguage: () => {
    return (
      Storage.getItemSync(SETTINGS.language.key) ?? SETTINGS.language.default
    );
  },
  setLanguage: (language: string) => {
    Storage.setItemSync(SETTINGS.language.key, language);
  },

  getNotificationsEnabled: () => {
    const value = Storage.getItemSync(SETTINGS.notificationsEnabled.key);
    return value === "true";
  },
  setNotificationsEnabled: (enabled: boolean) => {
    Storage.setItemSync(
      SETTINGS.notificationsEnabled.key,
      enabled ? "true" : "false"
    );
  },

  getVacationMode: () => {
    const value = Storage.getItemSync(SETTINGS.vacationMode.key);
    return value === "true";
  },
  setVacationMode: (enabled: boolean) => {
    Storage.setItemSync(SETTINGS.vacationMode.key, enabled ? "true" : "false");
  },

  getGamificationEnabled: () => {
    const value = Storage.getItemSync(SETTINGS.gamificationEnabled.key);
    return value === "true";
  },
  setGamificationEnabled: (enabled: boolean) => {
    Storage.setItemSync(
      SETTINGS.gamificationEnabled.key,
      enabled ? "true" : "false"
    );
  },
};
