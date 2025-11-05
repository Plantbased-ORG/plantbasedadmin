'use client';

interface FormAlertProps {
  type: 'success' | 'error';
  message: string;
}

export default function FormAlert({ type, message }: FormAlertProps) {
  const styles = {
    success: 'bg-green-50 border-green-200 text-green-700',
    error: 'bg-red-50 border-red-200 text-red-700'
  };

  return (
    <div className={`border px-4 py-3 rounded-lg text-sm ${styles[type]}`}>
      {message}
    </div>
  );
}