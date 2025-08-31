"use client";

import { ReactNode, useState, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';

interface SafeAreaProps {
  children: ReactNode;
  fallback?: ReactNode;
  loadingFallback?: ReactNode;
}

export default function SafeArea({ 
  children, 
  fallback = null,
  loadingFallback = <LoadingSpinner text="Loading..." />
}: SafeAreaProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Simulate a brief loading state to ensure hydration is complete
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (hasError) {
    return <>{fallback}</>;
  }

  if (isLoading) {
    return <>{loadingFallback}</>;
  }

  return (
    <div className="safe-area">
      {children}
    </div>
  );
}
