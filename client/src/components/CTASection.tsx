import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-green-500/10" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Imagen de fondo */}
      <div className="absolute inset-0 -z-5 opacity-20">
        <img
          src="/images/technology-innovation.png"
          alt="Innovation"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container">
        <div className="bg-gradient-to-br from-card to-card/50 border border-accent/30 rounded-2xl p-12 md:p-16 text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-foreground">
              Transforma tu Hogar Hoy
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Únete a miles de usuarios que ya disfrutan de un hogar inteligente, seguro y eficiente con Domótica IA.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button className="bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-background font-semibold px-8 py-6 text-base">
              Solicitar Demo Gratuita
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button variant="outline" className="border-accent text-accent hover:bg-accent/10 px-8 py-6 text-base">
              Contactar Ventas
            </Button>
          </div>

          {/* Beneficios rápidos */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-border">
            <div className="space-y-1">
              <p className="text-2xl font-bold text-accent">30 min</p>
              <p className="text-sm text-muted-foreground">Instalación rápida</p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-green-400">100%</p>
              <p className="text-sm text-muted-foreground">Privacidad garantizada</p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-cyan-400">∞</p>
              <p className="text-sm text-muted-foreground">Sin suscripción</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
