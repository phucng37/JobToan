import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import translationVI from './translations/vi.json'
import translationEN from './translations/en.json'

const resources = {
  en: { translation: translationEN },
  vi: { translation: translationVI }
};

i18next.use(initReactI18next).init({
  lng: 'vi',
  debug: true,
  resources
})
