import { Button } from '@/components/ui/button';
import { ArrowRight, Zap } from 'lucide-react';
import { useNotification } from '@/hooks/useNotification';

export default function HeroSection() {
  const { success, info } = useNotification();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Fondo con gradiente y patrón */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-card/30 -z-10" />
      
      {/* Líneas decorativas angulares */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
      </div>

      {/* Imagen de fondo hero */}
      <div className="absolute inset-0 -z-5 opacity-40">
        <img
          src="/images/hero-ai-smart-home.png"
          alt="Smart Home AI"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Contenido izquierdo */}
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-accent/30 rounded-lg">
            <Zap className="w-4 h-4 text-green-400" />
            <span className="text-xs font-medium text-accent">Tecnología Avanzada</span>
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl lg:text-6xl font-poppins font-bold text-foreground leading-tight">
              Domótica Inteligente con <span className="bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">IA Offline</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
              Automatiza tu hogar con inteligencia artificial que funciona completamente offline. Control total, privacidad garantizada y sin dependencia de internet.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              className="bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-background font-semibold px-8 py-6 text-base"
              onClick={() => success('Bienvenido', 'Iniciando proceso de configuracion...')}
            >
              Comenzar Ahora
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button 
              variant="outline" 
              className="border-accent text-accent hover:bg-accent/10 px-8 py-6 text-base"
              onClick={() => info('Demo', 'Cargando demostracion en vivo...')}
            >
              Ver Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 pt-8">
            <div className="space-y-2">
              <p className="text-2xl font-bold text-accent">99.9%</p>
              <p className="text-xs text-muted-foreground">Disponibilidad</p>
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-green-400">0ms</p>
              <p className="text-xs text-muted-foreground">Latencia Local</p>
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-cyan-400">100%</p>
              <p className="text-xs text-muted-foreground">Privacidad</p>
            </div>
          </div>
        </div>

        {/* Imagen derecha - visible solo en desktop */}
        <div className="hidden lg:flex justify-center">
          <div className="relative w-full aspect-square max-w-md">
            <img
              src="/images/ai-offline-processing.png"
              alt="AI Processing"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
