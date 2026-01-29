import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNotification } from '@/hooks/useNotification';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';

/**
 * Página de demostración de notificaciones
 * 
 * Muestra todos los tipos de notificaciones disponibles
 * con ejemplos interactivos
 */
export default function NotificationDemo() {
  const { success, error, warning, info } = useNotification();

  const handleSuccessNotification = () => {
    success(
      'Operación Exitosa',
      'Tu configuración ha sido guardada correctamente'
    );
  };

  const handleErrorNotification = () => {
    error(
      'Error de Conexión',
      'No pudimos conectar con el servidor. Intenta más tarde.'
    );
  };

  const handleWarningNotification = () => {
    warning(
      'Advertencia',
      'Tu sesión expirará en 5 minutos. Por favor, guarda tu trabajo.'
    );
  };

  const handleInfoNotification = () => {
    info(
      'Información',
      'Se ha actualizado la versión del sistema a v2.1.0'
    );
  };

  const handleLongNotification = () => {
    success(
      'Descarga Completada',
      'El archivo "configuracion_hogar.json" se ha descargado exitosamente. Puedes encontrarlo en tu carpeta de descargas.'
    );
  };

  const handleMultipleNotifications = () => {
    setTimeout(() => success('Paso 1', 'Inicializando sistema...'), 0);
    setTimeout(() => info('Paso 2', 'Conectando dispositivos...'), 1500);
    setTimeout(() => warning('Paso 3', 'Actualizando firmware...'), 3000);
    setTimeout(() => success('Completado', 'Tu hogar inteligente está listo!'), 4500);
  };

  return (
    <div className="min-h-screen bg-background text-foreground pt-24 pb-12">
      <div className="container">
        {/* Header */}
        <div className="mb-12">
          <Link href="/">
            <a className="inline-flex items-center gap-2 text-accent hover:text-green-400 transition-colors mb-6">
              <ArrowLeft className="w-4 h-4" />
              Volver al inicio
            </a>
          </Link>
          <h1 className="text-5xl font-poppins font-bold text-foreground mb-4">
            Centro de Demostración de Notificaciones
          </h1>
          <p className="text-lg text-muted-foreground">
            Prueba los diferentes tipos de notificaciones disponibles en el sistema
          </p>
        </div>

        {/* Grid de ejemplos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Notificación de Éxito */}
          <Card className="bg-card border border-border p-8 space-y-4">
            <div className="space-y-2">
              <h2 className="text-2xl font-poppins font-bold text-green-400">
                Notificación de Éxito
              </h2>
              <p className="text-muted-foreground">
                Muestra cuando una operación se completa correctamente
              </p>
            </div>
            <div className="space-y-3">
              <Button
                className="w-full bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/50"
                onClick={handleSuccessNotification}
              >
                Mostrar Notificación
              </Button>
              <div className="bg-background/50 p-3 rounded-lg text-sm font-mono text-muted-foreground">
                success('Operación Exitosa', '...')
              </div>
            </div>
          </Card>

          {/* Notificación de Error */}
          <Card className="bg-card border border-border p-8 space-y-4">
            <div className="space-y-2">
              <h2 className="text-2xl font-poppins font-bold text-red-400">
                Notificación de Error
              </h2>
              <p className="text-muted-foreground">
                Muestra cuando ocurre un problema o error
              </p>
            </div>
            <div className="space-y-3">
              <Button
                className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/50"
                onClick={handleErrorNotification}
              >
                Mostrar Notificación
              </Button>
              <div className="bg-background/50 p-3 rounded-lg text-sm font-mono text-muted-foreground">
                error('Error de Conexión', '...')
              </div>
            </div>
          </Card>

          {/* Notificación de Advertencia */}
          <Card className="bg-card border border-border p-8 space-y-4">
            <div className="space-y-2">
              <h2 className="text-2xl font-poppins font-bold text-yellow-400">
                Notificación de Advertencia
              </h2>
              <p className="text-muted-foreground">
                Muestra cuando hay algo que requiere atención
              </p>
            </div>
            <div className="space-y-3">
              <Button
                className="w-full bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 border border-yellow-500/50"
                onClick={handleWarningNotification}
              >
                Mostrar Notificación
              </Button>
              <div className="bg-background/50 p-3 rounded-lg text-sm font-mono text-muted-foreground">
                warning('Advertencia', '...')
              </div>
            </div>
          </Card>

          {/* Notificación de Información */}
          <Card className="bg-card border border-border p-8 space-y-4">
            <div className="space-y-2">
              <h2 className="text-2xl font-poppins font-bold text-cyan-400">
                Notificación de Información
              </h2>
              <p className="text-muted-foreground">
                Muestra información general o actualizaciones
              </p>
            </div>
            <div className="space-y-3">
              <Button
                className="w-full bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 border border-cyan-500/50"
                onClick={handleInfoNotification}
              >
                Mostrar Notificación
              </Button>
              <div className="bg-background/50 p-3 rounded-lg text-sm font-mono text-muted-foreground">
                info('Información', '...')
              </div>
            </div>
          </Card>
        </div>

        {/* Ejemplos avanzados */}
        <div className="space-y-6">
          <h2 className="text-3xl font-poppins font-bold text-foreground">
            Ejemplos Avanzados
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Notificación larga */}
            <Card className="bg-card border border-border p-8 space-y-4">
              <div className="space-y-2">
                <h3 className="text-xl font-poppins font-bold text-foreground">
                  Notificación Larga
                </h3>
                <p className="text-muted-foreground text-sm">
                  Notificación con mensaje extendido
                </p>
              </div>
              <Button
                className="w-full bg-gradient-to-r from-cyan-500/20 to-green-500/20 hover:from-cyan-500/30 hover:to-green-500/30 text-accent border border-accent/50"
                onClick={handleLongNotification}
              >
                Mostrar Notificación Larga
              </Button>
            </Card>

            {/* Notificaciones múltiples */}
            <Card className="bg-card border border-border p-8 space-y-4">
              <div className="space-y-2">
                <h3 className="text-xl font-poppins font-bold text-foreground">
                  Notificaciones Secuenciales
                </h3>
                <p className="text-muted-foreground text-sm">
                  Múltiples notificaciones en secuencia
                </p>
              </div>
              <Button
                className="w-full bg-gradient-to-r from-green-500/20 to-cyan-500/20 hover:from-green-500/30 hover:to-cyan-500/30 text-green-400 border border-green-500/50"
                onClick={handleMultipleNotifications}
              >
                Mostrar Secuencia
              </Button>
            </Card>
          </div>
        </div>

        {/* Documentación */}
        <Card className="bg-card border border-border p-8 mt-12 space-y-6">
          <h2 className="text-2xl font-poppins font-bold text-foreground">
            Cómo Usar en tu Código
          </h2>

          <div className="space-y-4">
            <div>
              <h3 className="font-poppins font-semibold text-accent mb-2">
                1. Importar el hook
              </h3>
              <pre className="bg-background/50 p-4 rounded-lg overflow-x-auto text-sm font-mono text-muted-foreground">
{`import { useNotification } from '@/hooks/useNotification';`}
              </pre>
            </div>

            <div>
              <h3 className="font-poppins font-semibold text-accent mb-2">
                2. Usar en tu componente
              </h3>
              <pre className="bg-background/50 p-4 rounded-lg overflow-x-auto text-sm font-mono text-muted-foreground">
{`export default function MiComponente() {
  const { success, error, warning, info } = useNotification();

  const handleClick = () => {
    success('Éxito', 'Operación completada');
  };

  return <button onClick={handleClick}>Enviar</button>;
}`}
              </pre>
            </div>

            <div>
              <h3 className="font-poppins font-semibold text-accent mb-2">
                3. Tipos de notificaciones
              </h3>
              <pre className="bg-background/50 p-4 rounded-lg overflow-x-auto text-sm font-mono text-muted-foreground">
{`success(titulo, mensaje, duracion?)
error(titulo, mensaje, duracion?)
warning(titulo, mensaje, duracion?)
info(titulo, mensaje, duracion?)

// Duración en milisegundos (default: 5000)`}
              </pre>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
