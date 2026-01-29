import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNotification } from '@/hooks/useNotification';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { success, info } = useNotification();

  const navItems = [
    { label: 'Inicio', href: '#' },
    { label: 'Servicios', href: '#servicios' },
    { label: 'Características', href: '#caracteristicas' },
    { label: 'Contacto', href: '#contacto' },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <nav className="container flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-green-400 rounded-lg flex items-center justify-center">
            <span className="text-xs font-bold text-background">IA</span>
          </div>
          <span className="font-poppins font-bold text-lg text-foreground">Domótica IA</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm text-muted-foreground hover:text-accent transition-colors duration-300"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex gap-3">
          <Button 
            variant="outline" 
            className="border-accent text-accent hover:bg-accent/10"
            onClick={() => info('Sesión', 'Redirigiendo a login...')}
          >
            Iniciar Sesión
          </Button>
          <Button 
            className="bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-background"
            onClick={() => success('Demo Solicitada', 'Nos pondremos en contacto pronto')}
          >
            Solicitar Demo
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 hover:bg-card rounded-lg transition-colors"
        >
          {isOpen ? (
            <X className="w-5 h-5 text-accent" />
          ) : (
            <Menu className="w-5 h-5 text-accent" />
          )}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-card border-b border-border">
          <div className="container py-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm text-muted-foreground hover:text-accent transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="flex gap-3 pt-2">
              <Button 
                variant="outline" 
                className="flex-1 border-accent text-accent"
                onClick={() => info('Sesión', 'Redirigiendo a login...')}
              >
                Iniciar Sesión
              </Button>
              <Button 
                className="flex-1 bg-gradient-to-r from-cyan-500 to-green-500 text-background"
                onClick={() => success('Demo Solicitada', 'Nos pondremos en contacto pronto')}
              >
                Demo
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
