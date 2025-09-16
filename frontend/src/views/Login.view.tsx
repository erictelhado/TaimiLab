import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Label } from '../components/ui/Label';
import { Alert, AlertDescription } from '../components/ui/Alert';
import { AuthService } from '../services/auth.service';
import { AuthUtils } from '../utils/auth';

export function LoginView() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('demo@endereco.de');
  const [password, setPassword] = useState('Endereco123');
  const [rememberMe, setRememberMe] = useState(AuthUtils.isRememberMeEnabled());
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Load saved email if remember me is enabled
  useEffect(() => {
    if (rememberMe) {
      const savedUser = AuthUtils.getUser();
      if (savedUser?.email) {
        setEmail(savedUser.email);
      }
    }
  }, [rememberMe]);

  // Debounced validation to avoid spam
  const debouncedEmailValidation = useCallback(
    debounce((value: string) => {
      if (value && !AuthUtils.validateEmail(value)) {
        setEmailError('Por favor, insira um endereço de email válido');
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
      setEmailError('Email é obrigatório');
      hasErrors = true;
    } else if (!AuthUtils.validateEmail(email)) {
      setEmailError('Por favor, insira um endereço de email válido');
      hasErrors = true;
    }

    if (!password) {
      setPasswordError('Senha é obrigatória');
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
      await AuthService.login({ email, password, rememberMe });
      
      // Show success notification
      if ((window as any).addNotification) {
        (window as any).addNotification({
          type: 'success',
          title: 'Login realizado com sucesso!',
          message: `Bem-vindo!`,
          duration: 3000
        });
      }
      
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao fazer login. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl border-2 border-gray-200 bg-white">
        <CardHeader className="text-center space-y-4 bg-gray-50 rounded-t-lg">
          <div className="flex items-center justify-center mb-4">
            <div className="text-3xl font-bold text-gray-800">TaimiLab</div>
          </div>
          <CardTitle className="text-2xl text-gray-800">Entrar</CardTitle>
          <CardDescription className="text-gray-600">
            Acesse sua conta para continuar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="demo@endereco.de"
                className="bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
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
              <Label htmlFor="password" className="text-gray-700 font-medium">
                Senha
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Endereco123"
                  className="bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500 pr-10"
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

            <div className="flex items-center space-x-2">
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                disabled={isLoading}
              />
              <Label htmlFor="remember-me" className="text-sm text-foreground cursor-pointer">
                Lembrar de mim
              </Label>
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
              className="w-full bg-blue-600 text-white hover:bg-blue-700 transition-colors py-3 text-lg font-medium" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Entrando...
                </>
              ) : (
                'Entrar'
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
