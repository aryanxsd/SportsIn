import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../contexts/AuthContext';
import { UserPlus, Trophy, Users, Mail, RefreshCw } from 'lucide-react';
import type { Sport, UserType } from '../../types';

interface SignUpForm {
  email: string;
  password: string;
  username: string;
}

function SignUp() {
  const { signUp, resendVerification } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignUpForm>();
  const [sport, setSport] = useState<Sport | null>(null);
  const [userType, setUserType] = useState<UserType | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const [verificationSent, setVerificationSent] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [resendCount, setResendCount] = useState(0);
  const [isResending, setIsResending] = useState(false);

  const sports: Sport[] = ['Cricket', 'Football', 'Basketball'];
  const userTypes: UserType[] = ['Player', 'Academy'];

  const onSubmit = async (data: SignUpForm) => {
    if (!sport || !userType) {
      setAuthError('Please select a sport and user type');
      return;
    }

    try {
      setAuthError(null);
      const result = await signUp({
        ...data,
        sport,
        userType,
      });

      if (result.needsVerification || result.userExists) {
        setVerificationSent(true);
        setUserEmail(data.email);
      } else {
        navigate('/home');
      }
    } catch (error: any) {
      setAuthError(error?.message || 'Failed to create account. Please try again.');
    }
  };

  const handleResendVerification = async () => {
    if (resendCount >= 3) {
      setAuthError('Maximum resend attempts reached. Please try again later.');
      return;
    }

    try {
      setIsResending(true);
      setAuthError(null);
      await resendVerification(userEmail);
      setResendCount(prev => prev + 1);
    } catch (error: any) {
      setAuthError(error?.message || 'Failed to resend verification email');
    } finally {
      setIsResending(false);
    }
  };

  if (verificationSent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="mx-auto h-16 w-16 bg-neon rounded-full flex items-center justify-center mb-4">
              <Mail className="h-8 w-8 text-black" />
            </div>
            <h2 className="text-3xl font-extrabold text-white">
              Check your email
            </h2>
            <p className="mt-2 text-gray-400">
              We've sent a verification link to
            </p>
            <p className="text-neon font-medium">{userEmail}</p>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-medium text-white mb-3">Next steps:</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-300">
              <li>Check your email inbox (and spam folder)</li>
              <li>Click the verification link in the email</li>
              <li>You'll be automatically redirected to your dashboard</li>
            </ol>
          </div>

          {authError && (
            <div className="rounded-md bg-red-500 bg-opacity-10 p-4">
              <p className="text-sm text-red-400">{authError}</p>
            </div>
          )}

          <div className="space-y-4">
            <button
              onClick={handleResendVerification}
              disabled={resendCount >= 3 || isResending}
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-700 rounded-md text-gray-300 hover:text-neon hover:border-neon transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isResending ? (
                <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
              ) : (
                <Mail className="h-5 w-5 mr-2" />
              )}
              {isResending ? 'Sending...' : `Resend email ${resendCount >= 3 ? '(Max reached)' : `(${3 - resendCount} left)`}`}
            </button>

            <div className="text-center">
              <Link
                to="/signin"
                className="text-neon hover:text-neon/90 text-sm"
              >
                Already have an account? Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Or{' '}
            <Link to="/signin" className="font-medium text-neon hover:text-neon/90">
              sign in to your account
            </Link>
          </p>
        </div>

        {authError && (
          <div className="rounded-md bg-red-500 bg-opacity-10 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-400">{authError}</p>
              </div>
            </div>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email address
              </label>
              <input
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                type="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm placeholder-gray-500 text-white bg-gray-800 focus:outline-none focus:ring-neon focus:border-neon sm:text-sm"
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300">
                Username
              </label>
              <input
                {...register('username', {
                  required: 'Username is required',
                  minLength: {
                    value: 3,
                    message: 'Username must be at least 3 characters',
                  },
                })}
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm placeholder-gray-500 text-white bg-gray-800 focus:outline-none focus:ring-neon focus:border-neon sm:text-sm"
                placeholder="johndoe"
              />
              {errors.username && (
                <p className="mt-1 text-sm text-red-400">{errors.username.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <input
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
                type="password"
                className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm placeholder-gray-500 text-white bg-gray-800 focus:outline-none focus:ring-neon focus:border-neon sm:text-sm"
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Select Sport</label>
              <div className="grid grid-cols-3 gap-3">
                {sports.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSport(s)}
                    className={`relative flex items-center justify-center px-3 py-2 border ${
                      sport === s
                        ? 'border-neon bg-neon bg-opacity-10 text-neon'
                        : 'border-gray-700 text-gray-300 hover:border-neon'
                    } rounded-md shadow-sm text-sm font-medium focus:outline-none transition-all duration-200`}
                  >
                    <Trophy className="h-4 w-4 mr-2" />
                    {s}
                    {sport === s && (
                      <span className="absolute -top-1 -right-1 h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-neon"></span>
                      </span>
                    )}
                  </button>
                ))}
              </div>
              {!sport && (
                <p className="mt-2 text-sm text-gray-400">Please select your primary sport</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">I am a</label>
              <div className="grid grid-cols-2 gap-3">
                {userTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setUserType(type)}
                    className={`relative flex items-center justify-center px-3 py-2 border ${
                      userType === type
                        ? 'border-neon bg-neon bg-opacity-10 text-neon'
                        : 'border-gray-700 text-gray-300 hover:border-neon'
                    } rounded-md shadow-sm text-sm font-medium focus:outline-none transition-all duration-200`}
                  >
                    <Users className="h-4 w-4 mr-2" />
                    {type}
                    {userType === type && (
                      <span className="absolute -top-1 -right-1 h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-neon"></span>
                      </span>
                    )}
                  </button>
                ))}
              </div>
              {!userType && (
                <p className="mt-2 text-sm text-gray-400">Please select your role</p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting || !sport || !userType}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-neon hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neon disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <UserPlus className="h-5 w-5 text-black" />
              </span>
              {isSubmitting ? 'Creating account...' : 'Create account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;