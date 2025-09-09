
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Documentation', href: '#', onClick: () => alert('Redirecting to documentation...') },
    { name: 'API Reference', href: '#', onClick: () => alert('Redirecting to API...') },
    { name: 'Technical Support', href: '#', onClick: () => alert('Connecting with support...') },
    { name: 'System Status', href: '#', onClick: () => alert('Checking status...') },
    { name: 'Changelog', href: '#', onClick: () => alert('Viewing updates...') }
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '#', onClick: () => alert('Opening privacy policy...') },
    { name: 'Terms of Use', href: '#', onClick: () => alert('Opening terms of use...') },
    { name: 'GDPR', href: '#', onClick: () => alert('GDPR information...') },
    { name: 'Cookies', href: '#', onClick: () => alert('Cookie policy...') }
  ];

  const socialLinks = [
    { name: 'GitHub', icon: Github, href: '#', onClick: () => alert('Redirecting to GitHub...') },
    { name: 'Twitter', icon: Twitter, href: '#', onClick: () => alert('Redirecting to Twitter...') },
    { name: 'LinkedIn', icon: Linkedin, href: '#', onClick: () => alert('Redirecting to LinkedIn...') },
    { name: 'Email', icon: Mail, href: '#', onClick: () => alert('Opening email client...') }
  ];

  return (
    <footer className="bg-[#1f2937] text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div>
              <h3 className="text-2xl font-bold text-blue-400 mb-3">
                endereco.de
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Leading platform for e-commerce data validation. 
                We reduce returns and increase conversions through 
                advanced real-time verification technology.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <button
                    key={social.name}
                    onClick={social.onClick}
                    className="w-10 h-10 bg-gray-700 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors duration-200"
                    title={social.name}
                  >
                    <IconComponent size={18} />
                  </button>
                );
              })}
            </div>

            {/* Contact Info */}
            <div className="space-y-2 text-sm text-gray-300">
              <p>📧 contact@endereco.de</p>
              <p>📞 +1 (555) 123-4567</p>
              <p>📍 San Francisco, CA - USA</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={link.onClick}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>

            {/* Newsletter Signup */}
            <div className="mt-6">
              <h5 className="font-medium text-white mb-2">Newsletter</h5>
              <p className="text-xs text-gray-300 mb-3">
                Get updates about new features
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-l-lg text-sm focus:outline-none focus:border-blue-500 text-white"
                />
                <button
                  onClick={() => alert('Successfully subscribed!')}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-r-lg text-sm font-medium transition-colors duration-200"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">
              Legal
            </h4>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={link.onClick}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>

            {/* Security & Compliance */}
            <div className="mt-6 space-y-3">
              <h5 className="font-medium text-white">Security & Compliance</h5>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-gray-700 text-xs rounded">GDPR</span>
                <span className="px-2 py-1 bg-gray-700 text-xs rounded">SSL</span>
                <span className="px-2 py-1 bg-gray-700 text-xs rounded">ISO 27001</span>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="mt-6">
              <h5 className="font-medium text-white mb-2">Trust</h5>
              <div className="space-y-1 text-xs text-gray-300">
                <p>✅ 99.9% guaranteed uptime</p>
                <p>✅ 24/7 technical support</p>
                <p>✅ Encrypted data</p>
                <p>✅ AWS infrastructure</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-300">
              © {currentYear} endereco.de. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-300">
              <span>🇺🇸 Made in USA</span>
              <span>•</span>
              <span>Version 2.1.4</span>
              <span>•</span>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>System operational</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}