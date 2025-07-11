
import { useState } from 'react';

type DismissedErrors<T> = Partial<Record<keyof T, boolean>>;

export function useDismissableBlur<T>(formikHandleBlur: (e: React.FocusEvent<any>) => void) {
  const [dismissedErrors, setDismissedErrors] = useState<DismissedErrors<T>>({});

  const handleBlur = (e: React.FocusEvent<any>) => {
    const field = e.target.name as keyof T;

    formikHandleBlur(e); 

    setDismissedErrors((prev) => ({
      ...prev,
      [field]: false,
    }));
  };

  return { handleBlur, dismissedErrors, setDismissedErrors };
}
