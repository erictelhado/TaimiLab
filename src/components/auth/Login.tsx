import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Loader2, Globe } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/Card';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import { Alert, AlertDescription } from '../ui/Alert';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { AuthUtils } from '../../utils/auth';

export function Login() {
  const { login } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const [email, setEmail] = useState('demo@endereco.de');
  const [password, setPassword] = useState('Endereco123');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Debounced validation to avoid spam
  const debouncedEmailValidation = useCallback(
    debounce((value: string) => {
      if (value && !AuthUtils.validateEmail(value)) {
        setEmailError('Please enter a valid email address');
      } else {
        setEmailError('');
      }
    }, 300),
    []
  );

  const debouncedPasswordValidation = useCallback(
    debounce((value: string) => {
      if (value) {
        const validation = AuthUtils.validatePassword(value);
        if (!validation.isValid) {
          setPasswordError(validation.errors[0]);
        } else {
          setPasswordError('');
        }
      } else {
        setPasswordError('');
      }
    }, 300),
    []
  );

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setError('');
    debouncedEmailValidation(value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setError('');
    debouncedPasswordValidation(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear previous errors
    setError('');
    setEmailError('');
    setPasswordError('');

    // Validate fields
    let hasErrors = false;
    
    if (!email) {
      setEmailError('Email is required');
      hasErrors = true;
    } else if (!AuthUtils.validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      hasErrors = true;
    }

    if (!password) {
      setPasswordError('Password is required');
      hasErrors = true;
    } else {
      const passwordValidation = AuthUtils.validatePassword(password);
      if (!passwordValidation.isValid) {
        setPasswordError(passwordValidation.errors[0]);
        hasErrors = true;
      }
    }

    if (hasErrors) {
      return;
    }

    setIsLoading(true);
    
    try {
      await login({ email, password });
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : t('auth.loginError'));
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLanguageChange = (newLanguage: 'en' | 'de') => () => {
    setLanguage(newLanguage);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 flex items-center justify-center p-4">
      {/* Language switcher */}
      <div className="absolute top-4 right-4">
        <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-2">
          <Globe className="w-4 h-4 text-white" />
          <button
            onClick={handleLanguageChange('en')}
            className={`px-3 py-1 rounded text-sm transition-all duration-200 ${
              language === 'en' 
                ? 'bg-white text-blue-600 font-medium shadow-sm' 
                : 'text-white hover:bg-white/10'
            }`}
            type="button"
          >
            EN
          </button>
          <button
            onClick={handleLanguageChange('de')}
            className={`px-3 py-1 rounded text-sm transition-all duration-200 ${
              language === 'de' 
                ? 'bg-white text-blue-600 font-medium shadow-sm' 
                : 'text-white hover:bg-white/10'
            }`}
            type="button"
          >
            DE
          </button>
        </div>
      </div>

      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center space-y-4">
          <div className="flex items-center justify-center mb-4">
            <div className="text-2xl font-medium text-primary">endereco</div>
            <span className="text-muted-foreground ml-1">.de</span>
          </div>
          <CardTitle className="text-foreground">{t('auth.login')}</CardTitle>
          <CardDescription className="text-muted-foreground">
            {t('auth.demoCredentials')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">
                {t('auth.email')}
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="demo@endereco.de"
                className="bg-input-background"
                required
                autoComplete="email"
                disabled={isLoading}
              />
              {emailError && (
                <p className="text-sm text-red-600" role="alert">
                  {emailError}
                </p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">
                {t('auth.password')}
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Endereco123"
                  className="bg-input-background pr-10"
                  required
                  autoComplete="current-password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  disabled={isLoading}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
              {passwordError && (
                <p className="text-sm text-red-600" role="alert">
                  {passwordError}
                </p>
              )}
            </div>

            {error && (
              <Alert variant="destructive" className="border-destructive bg-destructive/10">
                <AlertDescription className="text-destructive-foreground">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            <Button 
              type="submit" 
              className="w-full bg-black text-primary-foreground hover:bg-primary/90 transition-colors" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {t('general.loading')}
                </>
              ) : (
                t('auth.loginButton')
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

// Debounce utility function
function debounce<T extends (value: string) => void>(
  func: T,
  wait: number
): T {
  let timeout: number;
  return ((value: string) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(value), wait);
  }) as T;
} 