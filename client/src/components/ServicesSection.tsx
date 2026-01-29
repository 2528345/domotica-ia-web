import { Card } from '@/components/ui/card';
import { Lightbulb, Lock, Zap, BarChart3, Home, Cpu } from 'lucide-react';

export default function ServicesSection() {
  const services = [
    {
      icon: Lightbulb,
      title: 'Automatización Inteligente',
      description: 'Control automático de iluminación, temperatura y dispositivos basado en patrones de uso y preferencias.',
      color: 'from-cyan-500 to-blue-500',
    },
    {
      icon: Lock,
      title: 'Seguridad Avanzada',
      description: 'Sistema de seguridad con IA que detecta anomalías y amenazas en tiempo real sin enviar datos a la nube.',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Zap,
      title: 'Eficiencia Energética',
      description: 'Optimización inteligente del consumo energético con análisis predictivo y recomendaciones personalizadas.',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      icon: BarChart3,
      title: 'Análisis en Tiempo Real',
      description: 'Monitoreo completo de tu hogar con dashboards intuitivos y reportes detallados de consumo y actividad.',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Home,
      title: 'Integración Total',
      description: 'Compatible con los principales dispositivos inteligentes del mercado. Centraliza todo en una plataforma.',
      color: 'from-indigo-500 to-cyan-500',
    },
    {
      icon: Cpu,
      title: 'IA Local Potente',
      description: 'Procesamiento de IA directamente en tu dispositivo. Sin dependencia de servidores externos.',
      color: 'from-lime-500 to-green-500',
    },
  ];

  return (
    <section id="servicios" className="py-24 relative overflow-hidden">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-green-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container space-y-16">
        {/* Encabezado */}
        <div className="space-y-4 text-center max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-poppins font-bold text-foreground">
            Servicios Inteligentes
          </h2>
          <p className="text-lg text-muted-foreground">
            Soluciones completas de domótica con IA que se adaptan a tu estilo de vida y necesidades específicas.
          </p>
        </div>

        {/* Grid de servicios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={index}
                className="group relative bg-card border border-border hover:border-accent/50 transition-all duration-300 p-8 overflow-hidden"
              >
                {/* Fondo gradiente en hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 -z-10`} />

                {/* Línea superior decorativa */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="space-y-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${service.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  <h3 className="text-xl font-poppins font-bold text-foreground">
                    {service.title}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Punto decorativo inferior */}
                <div className="absolute bottom-4 right-4 w-2 h-2 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
