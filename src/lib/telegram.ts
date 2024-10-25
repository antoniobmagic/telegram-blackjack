import { WebApp } from '@telegram-mini-apps/sdk';

declare global {
  interface Window {
    Telegram?: {
      WebApp: typeof WebApp;
    };
  }
}

export const isTelegramWebApp = () => {
  return !!window.Telegram?.WebApp;
};

export const initTelegram = () => {
  if (isTelegramWebApp()) {
    WebApp.ready();
    WebApp.expand();
    
    // Set theme colors
    document.documentElement.style.setProperty(
      '--tg-theme-bg-color',
      WebApp.themeParams.bg_color || '#1a1b1e'
    );
    document.documentElement.style.setProperty(
      '--tg-theme-text-color',
      WebApp.themeParams.text_color || '#ffffff'
    );
    document.documentElement.style.setProperty(
      '--tg-theme-button-color',
      WebApp.themeParams.button_color || '#2ea043'
    );
    document.documentElement.style.setProperty(
      '--tg-theme-button-text-color',
      WebApp.themeParams.button_text_color || '#ffffff'
    );
  }
};

export const getTelegramUser = () => {
  if (!isTelegramWebApp()) {
    return null;
  }

  if (!WebApp.initDataUnsafe.user) {
    return null;
  }

  return {
    id: WebApp.initDataUnsafe.user.id,
    username: WebApp.initDataUnsafe.user.username,
    firstName: WebApp.initDataUnsafe.user.first_name,
    lastName: WebApp.initDataUnsafe.user.last_name,
  };
};