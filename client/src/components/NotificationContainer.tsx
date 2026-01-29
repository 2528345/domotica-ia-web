import { useNotification } from '@/hooks/useNotification';
import NotificationItem from './NotificationItem';

/**
 * Contenedor de notificaciones
 * 
 * Diseño: Futurismo Minimalista
 * - Posicionado en la esquina superior derecha
 * - Animaciones suaves de entrada/salida
 * - Colores consistentes con la paleta del sitio
 * - Soporta múltiples notificaciones simultáneas
 */
export default function NotificationContainer() {
  const { notifications, removeNotification } = useNotification();

  return (
    <div className="fixed top-20 right-4 z-50 space-y-3 pointer-events-none">
      {notifications.map((notification) => (
        <div key={notification.id} className="pointer-events-auto">
          <NotificationItem
            notification={notification}
            onRemove={removeNotification}
          />
        </div>
      ))}
    </div>
  );
}
