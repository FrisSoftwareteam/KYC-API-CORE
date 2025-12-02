import { useState } from 'react';
import { useToast } from './useToast';

export const useClipBoard = () => {
  const toast = useToast();
  const [copiedValue, setcopiedcalue] = useState<string>('');
  const copy = async (text: string) => {
    if (window.navigator) {
      try {
        await window.navigator.clipboard.writeText(text);
        setcopiedcalue(text);
        toast({ description: 'Copied to Clipboard!', status: 'success' });
      } catch (err) {
        toast({ description: 'An Error occurred', status: 'error' });
      }
    }
  };
  return { copy, copiedValue };
};
