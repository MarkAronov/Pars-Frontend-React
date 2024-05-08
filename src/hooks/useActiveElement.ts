import { useState, useEffect } from 'react';

const useActiveElement = () => {
  const [listenersReady, setListenersReady] = useState(false);
  const [activeElement, setActiveElement] = useState(document.activeElement);

  useEffect(() => {
    const onFocus = (event) => {
      setActiveElement(event.target);
    };

    const onBlur = () => {
      setActiveElement(null);
    };

    window.addEventListener('focus', onFocus, true);
    window.addEventListener('blur', onBlur, true);

    setListenersReady(true);

    return () => {
      window.removeEventListener('focus', onFocus);
      window.removeEventListener('blur', onBlur);
    };
  }, []);

  return {
    activeElement,
    listenersReady,
  };
};

export default useActiveElement;
