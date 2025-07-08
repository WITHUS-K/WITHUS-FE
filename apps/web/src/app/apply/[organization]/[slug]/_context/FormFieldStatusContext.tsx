'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type FieldStatus = 'default' | 'editing' | 'completed';

interface FormFieldStatus {
  status: FieldStatus;
  setEditing: () => void;
  setCompleted: () => void;
  setDefault: () => void;
}

export const FormFieldStatusContext = createContext<{
  fieldStatuses: Record<string, FormFieldStatus>;
  getStatus: (id: string) => FormFieldStatus;
}>({
  fieldStatuses: {},
  getStatus: () => ({
    status: 'default',
    setEditing: () => {},
    setCompleted: () => {},
    setDefault: () => {},
  }),
});

export function FormFieldStatusProvider({ children }: { children: ReactNode }) {
  const [statusMap, setStatusMap] = useState<Record<string, FieldStatus>>({});

  const getStatus = (id: string): FormFieldStatus => {
    const status = statusMap[id] || 'default';

    return {
      status,
      setEditing: () => setStatusMap((prev) => ({ ...prev, [id]: 'editing' })),
      setCompleted: () =>
        setStatusMap((prev) => ({ ...prev, [id]: 'completed' })),
      setDefault: () =>
        setStatusMap((prev) => {
          const { [id]: _, ...rest } = prev;
          return rest;
        }),
    };
  };

  const fieldStatuses = Object.keys(statusMap).reduce(
    (acc, id) => {
      acc[id] = getStatus(id);
      return acc;
    },
    {} as Record<string, FormFieldStatus>
  );

  return (
    <FormFieldStatusContext.Provider value={{ fieldStatuses, getStatus }}>
      {children}
    </FormFieldStatusContext.Provider>
  );
}

export function useFormFieldStatus(id: string): FormFieldStatus {
  const context = useContext(FormFieldStatusContext);
  if (!context) {
    throw new Error('useFormFieldStatus must be used within a Provider');
  }
  return context.getStatus(id);
}
