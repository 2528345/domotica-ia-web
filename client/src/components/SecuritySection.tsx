import { Card } from '@/components/ui/card';
import { Shield, Lock, Eye, Zap } from 'lucide-react';

export default function SecuritySection() {
  const securityPoints = [
    {
      icon: Shield,
      title: 'Protección Total',
      description: 'Encriptación de extremo a extremo en todas las comunicaciones locales.',
    },
    {
      icon: Lock,
      title: 'Sin Datos en la Nube',
      description: 'Todos tus datos permanecen en tu dispositivo. Nunca se envían a servidores externos.',
    },
    {
      icon: Eye,
      title: 'Control Total',
      description: 'Tú tienes el control absoluto sobre qué datos se recopilan y cómo se utilizan.',
    },
    {
      icon: Zap,
      title: 'Actualizaciones Seguras',
      description: 'Parches de seguridad automáticos y verificados para proteger tu sistema.',
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-green-500/5 rounded-full blur-3xl -translate-x-1/2" />
      </div>

      {/* Imagen de fondo */}
      <div className="absolute inset-0 -z-5 opacity-30">
        <img
          src="/images/secure-local-network.png"
          alt="Secure Network"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container space-y-16">
        {/* Encabezado */}
        <div className="space-y-4 text-center max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-poppins font-bold text-foreground">
            Seguridad y Privacidad
          </h2>
          <p className="text-lg text-muted-foreground">
            Tu privacidad es nuestra prioridad. Domótica IA funciona completamente offline sin comprometer tu seguridad.
          </p>
        </div>

        {/* Grid de puntos de seguridad */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {securityPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <Card
                key={index}
                className="bg-card border border-border hover:border-green-500/50 transition-all duration-300 p-8"
              >
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-poppins font-bold text-foreground">
                      {point.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {point.description}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
