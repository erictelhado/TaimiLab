import { useState } from 'react';
import { CheckCircle, Mail, Phone, MapPin, Badge } from 'lucide-react';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';


export function DemoSection() {
  const [formData, setFormData] = useState({
    address: '123 Oak Avenue, Suite 100',
    email: 'customer@example.com',
    phone: '(555) 987-6543'
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckout = () => {
    alert('Demo: Purchase completed successfully! All data was validated in real-time.');
  };

  return (
    <section className="py-20 bg-endereco-gray">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-endereco-dark mb-4">
            See how it works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience our real-time validation. Type in the fields below and watch the magic happen.
          </p>
        </div>

        {/* Demo Form */}
        <div className="max-w-2xl mx-auto">
          <Card className="p-8 shadow-soft hover-lift">
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-semibold text-endereco-dark mb-2">
                  Checkout Demo
                </h3>
                <p className="text-gray-600">
                  Sample form with real-time validation
                </p>
              </div>

              {/* Address Field */}
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                  <MapPin size={16} />
                  <span>Shipping Address</span>
                </label>
                <div className="relative">
                  <Input
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="pr-20 bg-white border-gray-300 focus:border-endereco-blue focus:ring-endereco-blue"
                    placeholder="Enter your complete address"
                  />
                  <Badge className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-endereco-green text-white">
                    <CheckCircle size={14} className="mr-1" />
                    Validated
                  </Badge>
                </div>
                <p className="text-xs text-endereco-green flex items-center">
                  <CheckCircle size={12} className="mr-1" />
                  Address found and validated automatically
                </p>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                  <Mail size={16} />
                  <span>Email</span>
                </label>
                <div className="relative">
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="pr-12 bg-white border-gray-300 focus:border-endereco-blue focus:ring-endereco-blue"
                    placeholder="your@email.com"
                  />
                  <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-endereco-green" size={20} />
                </div>
                <p className="text-xs text-endereco-green flex items-center">
                  <CheckCircle size={12} className="mr-1" />
                  Valid and verified email
                </p>
              </div>

              {/* Phone Field */}
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                  <Phone size={16} />
                  <span>Phone</span>
                </label>
                <div className="relative">
                  <Input
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="pr-12 bg-white border-gray-300 focus:border-endereco-blue focus:ring-endereco-blue"
                    placeholder="(555) 123-4567"
                  />
                  <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-endereco-green" size={20} />
                </div>
                <p className="text-xs text-endereco-green flex items-center">
                  <CheckCircle size={12} className="mr-1" />
                  Valid and active number
                </p>
              </div>

              {/* Checkout Button */}
              <div className="pt-6">
                <Button
                  onClick={handleCheckout}
                  className="w-full bg-endereco-blue hover:bg-endereco-dark text-white font-semibold py-3 rounded-lg btn-scale"
                  size="lg"
                >
                  Complete Purchase
                </Button>
                <p className="text-center text-xs text-gray-500 mt-3">
                  ✨ All data validated in real-time
                </p>
              </div>
            </div>
          </Card>

          {/* Demo Stats */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-endereco-blue">98%</div>
              <div className="text-sm text-gray-600">Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-endereco-green">40%</div>
              <div className="text-sm text-gray-600">Fewer returns</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{"< 200ms"}</div>
              <div className="text-sm text-gray-600">Response time</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}