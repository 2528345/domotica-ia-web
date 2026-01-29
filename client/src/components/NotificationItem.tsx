import { useEffect, useState } from 'react';
import { Notification } from '@/contexts/NotificationContext';
import { X, AlertCircle, CheckCircle2, Info, AlertTriangle } from 'lucide-react';

interface NotificationItemProps {
  notification: Notification;
  onRemove: (id: string) => void;
}

export default function NotificationItem({ notification, onRemove }: NotificationItemProps) {
  const [isExiting, setIsExiting] = useState(false);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onRemove(notification.id);
    }, 300);
  };

  useEffect(() => {
    if (notification.duration && notification.duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, notification.duration);

      return () => clearTimeout(timer);
    }
  }, [notification.duration, notification.id]);

  const getStyles = () => {
    switch (notification.type) {
      case 'success':
        return {
          bg: 'bg-green-500/10',
          border: 'border-green-500/30',
          icon: <CheckCircle2 className="w-5 h-5 text-green-400" />,
          accent: 'from-green-500 to-emerald-500',
        };
      case 'error':
        return {
          bg: 'bg-red-500/10',
          border: 'border-red-500/30',
          icon: <AlertCircle className="w-5 h-5 text-red-400" />,
          accent: 'from-red-500 to-pink-500',
        };
      case 'warning':
        return {
          bg: 'bg-yellow-500/10',
          border: 'border-yellow-500/30',
          icon: <AlertTriangle className="w-5 h-5 text-yellow-400" />,
          accent: 'from-yellow-500 to-orange-500',
        };
      case 'info':
      default:
        return {
          bg: 'bg-cyan-500/10',
          border: 'border-cyan-500/30',
          icon: <Info className="w-5 h-5 text-cyan-400" />,
          accent: 'from-cyan-500 to-blue-500',
        };
    }
  };

  const styles = getStyles();

  return (
    <div
      className={`
        transform transition-all duration-300 ease-out
        ${isExiting ? 'opacity-0 translate-x-full' : 'opacity-100 translate-x-0'}
      `}
    >
      <div
        className={`
          relative overflow-hidden rounded-lg border ${styles.bg} ${styles.border}
          backdrop-blur-md p-4 shadow-lg
          hover:shadow-xl transition-shadow duration-300
        `}
      >
        {/* Línea superior decorativa */}
        <div
          className={`
            absolute top-0 left-0 right-0 h-1
            bg-gradient-to-r ${styles.accent}
          `}
        />

        <div className="flex gap-4">
          {/* Icono */}
          <div className="flex-shrink-0 flex items-start pt-0.5">
            {styles.icon}
          </div>

          {/* Contenido */}
          <div className="flex-1 min-w-0">
            <h3 className="font-poppins font-semibold text-foreground text-sm">
              {notification.title}
            </h3>
            <p className="text-muted-foreground text-sm mt-1">
              {notification.message}
            </p>
          </div>

          {/* Botón cerrar */}
          <button
            onClick={handleClose}
            className={`
              flex-shrink-0 p-1 rounded-lg
              hover:bg-white/10 transition-colors duration-200
              text-muted-foreground hover:text-foreground
            `}
            aria-label="Cerrar notificación"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Barra de progreso (si tiene duración) */}
        {notification.duration && notification.duration > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
            <div
              className={`h-full bg-gradient-to-r ${styles.accent}`}
              style={{
                animation: `shrink ${notification.duration}ms linear forwards`,
              }}
            />
          </div>
        )}
      </div>

      <style>{`
        @keyframes shrink {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
      `}</style>
    </div>
  );
}
