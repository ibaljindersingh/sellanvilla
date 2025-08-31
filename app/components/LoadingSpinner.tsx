"use client";

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
}

export default function LoadingSpinner({ 
  size = 'md', 
  text = 'Loading...', 
  className = '' 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  // Ensure size is valid, fallback to 'md' if not
  const validSize = sizeClasses[size] ? size : 'md';
  
  // Ensure text is valid, fallback to 'Loading...' if not
  const validText = text === '' ? null : (text || 'Loading...');

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div 
        role="status"
        className={`${sizeClasses[validSize]} border-2 border-gray-200 border-t-primary-600 rounded-full animate-spin`} 
      />
      {validText && (
        <p className="mt-2 text-sm text-gray-600">{validText}</p>
      )}
    </div>
  );
}
