import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check } from 'lucide-react';
import type { Product } from '../../../drizzle/schema';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
  isLoading?: boolean;
}

export default function ProductCard({ product, onSelectProduct, isLoading }: ProductCardProps) {
  const features = product.features ? JSON.parse(product.features) : [];
  const isSubscription = product.type === 'subscription';

  return (
    <Card className="bg-card border border-border p-6 space-y-6 flex flex-col h-full hover:border-accent/50 transition-colors">
      {/* Imagen del producto */}
      {product.image && (
        <div className="w-full h-40 rounded-lg overflow-hidden bg-background/50">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Nombre y descripción */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-poppins font-bold text-foreground">
            {product.name}
          </h3>
          {isSubscription && (
            <span className="text-xs bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded-full border border-cyan-500/50">
              Suscripción
            </span>
          )}
        </div>
        {product.description && (
          <p className="text-sm text-muted-foreground">
            {product.description}
          </p>
        )}
      </div>

      {/* Precio */}
      <div className="space-y-1">
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-poppins font-bold text-accent">
            ${parseFloat(product.price.toString()).toFixed(2)}
          </span>
          <span className="text-sm text-muted-foreground">
            {product.currency}
          </span>
        </div>
        {isSubscription && (
          <p className="text-xs text-muted-foreground">
            por mes
          </p>
        )}
      </div>

      {/* Características */}
      {features.length > 0 && (
        <div className="space-y-2 flex-1">
          <p className="text-sm font-semibold text-foreground">
            Incluye:
          </p>
          <ul className="space-y-2">
            {features.map((feature: string, index: number) => (
              <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Botón de acción */}
      <Button
        className="w-full bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-background font-semibold"
        onClick={() => onSelectProduct(product)}
        disabled={isLoading}
      >
        {isLoading ? 'Procesando...' : isSubscription ? 'Suscribirse' : 'Comprar'}
      </Button>
    </Card>
  );
}
