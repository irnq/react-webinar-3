import { useLayoutEffect, useState, useMemo } from 'react';
import useServices from './use-services';

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function useTranslate() {
  const i18n = useServices().i18n;

  const [lang, setLang] = useState(() => i18n.lang);

  const unsubscribe = useMemo(() => {
    return i18n.subscribe((local) => {
      const newLang = local;
      setLang((prevLang) => (prevLang === newLang ? prevLang : newLang));
    });
  }, []);

  useLayoutEffect(() => unsubscribe, [unsubscribe]);

  return useMemo(
    () => ({
      lang,
      setLang: (local) => i18n.setLang(local),
      t: (text, number) => i18n.t(text, number),
    }),
    [lang],
  );
}
