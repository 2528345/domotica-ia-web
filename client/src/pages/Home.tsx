import { useAuth } from '@/_core/hooks/useAuth';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import FeaturesSection from '@/components/FeaturesSection';
import SecuritySection from '@/components/SecuritySection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

/**
 * Página principal - Domótica Inteligente con IA Offline
 * 
 * Diseño: Futurismo Minimalista Tecnológico
 * - Paleta: Negro profundo (#0A0E27), Azul oscuro (#1A2A4E)
 * - Acentos: Cian brillante (#00D9FF), Verde neón (#00FF88)
 * - Tipografía: Poppins (títulos), Inter (cuerpo)
 * - Animaciones: Transiciones suaves, efectos de hover energéticos
 */
export default function Home() {
  // Obtener estado de autenticación
  const { user, loading, isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ServicesSection />
        <FeaturesSection />
        <SecuritySection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
