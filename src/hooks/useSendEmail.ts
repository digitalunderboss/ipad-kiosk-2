import { useState, useCallback } from 'react';

interface EmailData {
  name: string;
  email: string;
  type: string;
  interests?: string;
}

interface UseSendEmailReturn {
  isLoading: boolean;
  error: string | null;
  success: boolean;
  sendEmail: (data: EmailData) => Promise<void>;
  resetState: () => void;
}

export const useSendEmail = (): UseSendEmailReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const sendEmail = async (data: EmailData): Promise<void> => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('https://ancav.app.n8n.cloud/webhook/92cb18e9-6af0-4958-9193-6a0df4fe7a5d', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Form submitted successfully:', result);
        setSuccess(true);
      } else {
        const errorMessage = `Form submission failed: ${response.statusText}`;
        console.error(errorMessage);
        setError(errorMessage);
      }
    } catch (error) {
      const errorMessage = `Error submitting form: ${error instanceof Error ? error.message : 'Unknown error'}`;
      console.error(errorMessage);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const resetState = useCallback(() => {
    setIsLoading(false);
    setError(null);
    setSuccess(false);
  }, []);

  return {
    isLoading,
    error,
    success,
    sendEmail,
    resetState,
  };
};