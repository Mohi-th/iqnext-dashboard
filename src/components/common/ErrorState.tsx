import React from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';

interface Props { message?: string; onRetry?: () => void; }

const ErrorState: React.FC<Props> = ({ message = 'Failed to load data', onRetry }) => (
  <div className="flex flex-col items-center justify-center p-8 text-center bg-red-900/20 rounded-xl border border-red-800/40">
    <AlertCircle className="w-10 h-10 text-red-400 mb-3" />
    <p className="text-gray-200 font-medium mb-4">{message}</p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="flex items-center gap-2 px-4 py-2 bg-red-800/40 text-red-300 rounded-lg hover:bg-red-800/60 transition-colors text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-red-500"
        aria-label="Retry loading data"
      >
        <RotateCcw className="w-4 h-4" />
        Retry
      </button>
    )}
  </div>
);

export default ErrorState;
