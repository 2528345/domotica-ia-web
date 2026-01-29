import { useState } from 'react';
import { useAuth } from '@/_core/hooks/useAuth';
import { getLoginUrl } from '@/const';
import { trpc } from '@/lib/trpc';
import ProductCard from '@/components/ProductCard';
import { useNotification } from '@/hooks/useNotification';
import type { Product } from '../../../drizzle/schema';
import { Loader2 } from 'lucide-react';

export default function Pricing() {
  const { user, isAuthenticated } = useAuth();
  const { info, success, error: showError } = useNotification();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Obtener productos
  const { data: products, isLoading } = trpc.products.list.useQuery();
  
  // Mutación para crear sesión de checkout
  const createCheckoutSession = trpc.stripe.createCheckoutSession.useMutation({
    onSuccess: (data) => {
      if (data.url) {
        window.location.href = data.url;
      }
    },
    onError: (err) => {
      setIsCheckingOut(false);
      showError('Error', err.message || 'No se pudo procesar tu solicitud');
    },
  });

  const handleSelectProduct = async (product: Product) => {
    if (!isAuthenticated) {
      info('Autenticación', 'Necesitas iniciar sesión para continuar');
      window.location.href = getLoginUrl();
      return;
    }

    setIsCheckingOut(true);
    info('Procesando', 'Redirigiendo a Stripe...');

    createCheckoutSession.mutate({
      productId: product.id,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center pt-24">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-accent" />
          <p className="text-muted-foreground">Cargando productos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground pt-24 pb-12">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-5xl md:text-6xl font-poppins font-bold text-foreground">
            Planes y Precios
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Elige el plan perfecto para tu hogar inteligente
          </p>
        </div>

        {/* Productos */}
        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelectProduct={handleSelectProduct}
                isLoading={isCheckingOut}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground">
              No hay productos disponibles en este momento.
            </p>
          </div>
        )}

        {/* Información adicional */}
        <div className="mt-16 bg-card border border-border rounded-2xl p-8 md:p-12">
          <h2 className="text-2xl font-poppins font-bold text-foreground mb-6">
            ¿Preguntas sobre nuestros planes?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="font-semibold text-accent">Cambiar de plan</h3>
              <p className="text-sm text-muted-foreground">
                Puedes cambiar o cancelar tu suscripción en cualquier momento desde tu cuenta.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-accent">Soporte</h3>
              <p className="text-sm text-muted-foreground">
                Contacta con nuestro equipo de soporte para cualquier pregunta o problema.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
