import { isAuthenticated } from '@/lib/actions/auth.action';
import { redirect } from 'next/navigation';
import React from 'react';

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated();
  if (isUserAuthenticated) {
    // Redirect to the home page if the user is already authenticated
    redirect('/');
  }
  return <div className="auth-layout">{children}</div>;
};

export default AuthLayout;
