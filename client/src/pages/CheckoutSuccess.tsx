import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/_core/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { trpc } from '@/lib/trpc';

export default function CheckoutSuccess() {
  const [, navigate] = useLocation();
  const { user } = useAuth();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  // Obtener parámetro de session_id de la URL
  const params = new URLSearchParams(window.location.search);
  const sessionId = params.get('session_id');

  // Verificar estado del pago
  const { data: session, isLoading } = trpc.stripe.getCheckoutSession.useQuery(
    { sessionId: sessionId || '' },
    { enabled: !!sessionId }
  );

  useEffect(() => {
    if (session && typeof session === 'object' && 'payment_status' in session) {
      if ((session as any).payment_status === 'paid') {
        setStatus('success');
        setMessage('Tu pago ha sido procesado exitosamente');
      } else {
        setStatus('error');
        setMessage('El pago no fue completado');
      }
    } else if (!isLoading && sessionId) {
      setStatus('error');
      setMessage('No se pudo verificar el estado del pago');
    }
  }, [session, isLoading, sessionId]);

  return (
    <div className="min-h-screen bg-background text-foreground pt-24 pb-12">
      <div className="container max-w-2xl">
        <Card className="bg-card border border-border p-8 md:p-12 space-y-6">
          {status === 'loading' && (
            <div className="flex flex-col items-center gap-4 py-12">
              <Loader2 className="w-12 h-12 animate-spin text-accent" />
              <p className="text-muted-foreground">Verificando tu pago...</p>
            </div>
          )}

          {status === 'success' && (
            <div className="flex flex-col items-center gap-6 py-12 text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-green-400" />
              </div>
              <div className="space-y-2">
                <h1 className="text-3xl font-poppins font-bold text-foreground">
                  ¡Pago Exitoso!
                </h1>
                <p className="text-lg text-muted-foreground">
                  {message}
                </p>
              </div>

              <div className="bg-background/50 p-6 rounded-lg w-full text-left space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Correo de confirmación</p>
                  <p className="font-semibold text-foreground">{user?.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">ID de sesión</p>
                  <p className="font-mono text-sm text-accent break-all">{sessionId}</p>
                </div>
              </div>

              <div className="text-sm text-muted-foreground space-y-2">
                <p>
                  Recibirás un correo de confirmación con los detalles de tu compra.
                </p>
                <p>
                  Puedes acceder a tu cuenta para ver tu suscripción o producto.
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  className="bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-background font-semibold"
                  onClick={() => navigate('/')}
                >
                  Volver al Inicio
                </Button>
                <Button
                  variant="outline"
                  className="border-accent text-accent hover:bg-accent/10"
                  onClick={() => navigate('/dashboard')}
                >
                  Ir a Mi Cuenta
                </Button>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="flex flex-col items-center gap-6 py-12 text-center">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center">
                <AlertCircle className="w-10 h-10 text-red-400" />
              </div>
              <div className="space-y-2">
                <h1 className="text-3xl font-poppins font-bold text-foreground">
                  Error en el Pago
                </h1>
                <p className="text-lg text-muted-foreground">
                  {message}
                </p>
              </div>

              <div className="text-sm text-muted-foreground space-y-2">
                <p>
                  Si el problema persiste, contacta con nuestro equipo de soporte.
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  className="bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-background font-semibold"
                  onClick={() => navigate('/pricing')}
                >
                  Volver a Precios
                </Button>
                <Button
                  variant="outline"
                  className="border-accent text-accent hover:bg-accent/10"
                  onClick={() => navigate('/')}
                >
                  Ir al Inicio
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
