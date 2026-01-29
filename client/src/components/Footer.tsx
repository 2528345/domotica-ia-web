import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Empresa */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-green-400 rounded-lg flex items-center justify-center">
                <span className="text-xs font-bold text-background">IA</span>
              </div>
              <span className="font-poppins font-bold text-foreground">Domótica IA</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Soluciones inteligentes para tu hogar con IA offline.
            </p>
          </div>

          {/* Producto */}
          <div className="space-y-4">
            <h4 className="font-poppins font-bold text-foreground">Producto</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">Características</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">Precios</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">Seguridad</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">Roadmap</a></li>
            </ul>
          </div>

          {/* Empresa */}
          <div className="space-y-4">
            <h4 className="font-poppins font-bold text-foreground">Empresa</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">Acerca de</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">Blog</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">Contacto</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">Carreras</a></li>
            </ul>
          </div>

          {/* Contacto */}
          <div className="space-y-4">
            <h4 className="font-poppins font-bold text-foreground">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 text-accent" />
                <a href="mailto:info@domoticaia.com" className="hover:text-accent transition-colors">
                  info@domoticaia.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 text-accent" />
                <a href="tel:+1234567890" className="hover:text-accent transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                <span>123 Tech Street, Silicon Valley, CA</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="border-t border-border py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; {currentYear} Domótica Inteligente. Todos los derechos reservados.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                Privacidad
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                Términos
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
