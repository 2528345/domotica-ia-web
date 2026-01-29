import { Card } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';

export default function FeaturesSection() {
  const features = [
    'Procesamiento de IA 100% offline',
    'Privacidad total garantizada',
    'Sin suscripciones mensuales',
    'Instalación en 30 minutos',
    'Compatible con 500+ dispositivos',
    'Actualizaciones automáticas',
    'Soporte técnico 24/7',
    'Garantía de 5 años',
  ];

  return (
    <section id="caracteristicas" className="py-24 relative">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Imagen */}
          <div className="flex justify-center order-2 lg:order-1">
            <img
              src="/images/smart-home-automation.png"
              alt="Smart Home Automation"
              className="w-full max-w-md h-auto"
            />
          </div>

          {/* Contenido */}
          <div className="space-y-8 order-1 lg:order-2">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-poppins font-bold text-foreground">
                Características Principales
              </h2>
              <p className="text-lg text-muted-foreground">
                Todo lo que necesitas para un hogar inteligente, seguro y eficiente.
              </p>
            </div>

            {/* Grid de características */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                  <span className="text-foreground font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
