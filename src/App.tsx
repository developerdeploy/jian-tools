import React, { useState } from 'react';
import { ThemeProvider } from './hooks/useTheme';
import { Navbar, PageId } from './components/Navbar';
import { HeroExperience } from './sections/HeroExperience';
import { ModularCrownAssembly } from './components/ModularCrownAssembly';
import { TubeSheetApplication } from './sections/TubeSheetApplication';
import { ProductSystem } from './sections/ProductSystem';
import { FinalCTA } from './sections/FinalCTA';
import { Footer } from './components/Footer';
import { ProductCatalogue } from './pages/ProductCatalogue';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { ApplicationsPage } from './pages/ApplicationsPage';
import { TechnicalPage } from './pages/TechnicalPage';
import { AnimationComingSoonPage } from './pages/AnimationComingSoonPage';
import { CalculatorsPage } from './pages/CalculatorsPage';
import { ProductDetailModal } from './components/ProductDetailModal';
import { EnquiryModal } from './components/EnquiryModal';
import { ToolingCalculatorModal } from './components/ToolingCalculatorModal';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { JTProduct } from './data/jtProducts';

const AppContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [catalogueInitialCategory, setCatalogueInitialCategory] = useState<string | null>(null);
  const [appSectionSlug, setAppSectionSlug] = useState<string | null>(null);
  const [techSectionSlug, setTechSectionSlug] = useState<string | null>(null);
  
  // Modals
  const [isEnquiryOpen, setIsEnquiryOpen] = useState<boolean>(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState<boolean>(false);
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<JTProduct | null>(null);
  const [selectedEnquiryProduct, setSelectedEnquiryProduct] = useState<string | null>(null);

  const handleNavigate = (page: PageId, categorySlug?: string) => {
    if (page === 'products') {
      setCatalogueInitialCategory(categorySlug || 'all');
    } else if (page === 'applications') {
      setAppSectionSlug(categorySlug || null);
    } else if (page === 'technical') {
      setTechSectionSlug(categorySlug || null);
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenEnquiry = (productName?: string) => {
    setSelectedEnquiryProduct(productName || null);
    setIsEnquiryOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#F3F3F1] dark:bg-[#080A0C] text-[#080A0C] dark:text-[#E2E8F0] selection:bg-precision-blue/30 selection:text-white font-sans antialiased transition-colors duration-200">
      {/* Floating Header with Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenEnquiry={() => handleOpenEnquiry()}
        onOpenCalculator={() => setIsCalculatorOpen(true)}
      />

      {/* Dynamic Page View Rendering */}
      {currentPage === 'home' && (
        <main className="relative w-full">
          {/* 01: Hero Experience (Clean Static Industrial Hero + Teaser CTA) */}
          <HeroExperience
            onExploreClick={() => handleNavigate('products')}
            onOpenEnquiry={() => handleOpenEnquiry()}
            onViewAnimationSoon={() => handleNavigate('animation-soon')}
          />

          {/* 02: Flagship Modular Crown Drilling Interactive System (1D–12D Ultra Sharp) */}
          <ModularCrownAssembly onOpenEnquiry={handleOpenEnquiry} />

          {/* 03: Core Tube Sheet & Baffle Stack Application */}
          <TubeSheetApplication
            onOpenCatalogue={(cat) => handleNavigate('products', cat)}
            onOpenEnquiry={handleOpenEnquiry}
          />

          {/* 04: Product System Gateway (All 11 Precision Tool Categories) */}
          <ProductSystem
            onOpenCatalogue={(cat) => handleNavigate('products', cat)}
            onOpenEnquiry={handleOpenEnquiry}
          />

          {/* 05: Final Engineering Consultation CTA */}
          <FinalCTA
            onOpenEnquiry={() => handleOpenEnquiry()}
            onOpenCatalogue={() => handleNavigate('products')}
          />
        </main>
      )}

      {currentPage === 'products' && (
        <main className="relative w-full">
          <ProductCatalogue
            onBackToHome={() => handleNavigate('home')}
            onOpenDetails={(product) => setSelectedProductForDetail(product)}
            onOpenEnquiry={handleOpenEnquiry}
            initialCategory={catalogueInitialCategory}
          />
        </main>
      )}

      {currentPage === 'about' && (
        <main className="relative w-full">
          <AboutPage
            onOpenEnquiry={handleOpenEnquiry}
            onNavigateHome={() => handleNavigate('home')}
            onNavigateProducts={() => handleNavigate('products')}
          />
        </main>
      )}

      {currentPage === 'contact' && (
        <main className="relative w-full">
          <ContactPage
            onNavigateHome={() => handleNavigate('home')}
            onNavigateProducts={() => handleNavigate('products')}
          />
        </main>
      )}

      {currentPage === 'applications' && (
        <main className="relative w-full">
          <ApplicationsPage
            onBackToHome={() => handleNavigate('home')}
            onOpenEnquiry={handleOpenEnquiry}
            initialSectionSlug={appSectionSlug}
          />
        </main>
      )}

      {currentPage === 'technical' && (
        <main className="relative w-full">
          <TechnicalPage
            onBackToHome={() => handleNavigate('home')}
            onOpenEnquiry={handleOpenEnquiry}
            initialSectionSlug={techSectionSlug}
          />
        </main>
      )}

      {currentPage === 'animation-soon' && (
        <main className="relative w-full">
          <AnimationComingSoonPage
            onBackToHome={() => handleNavigate('home')}
            onNavigateProducts={() => handleNavigate('products')}
            onOpenEnquiry={() => handleOpenEnquiry()}
          />
        </main>
      )}

      {currentPage === 'calculators' && (
        <main className="relative w-full">
          <CalculatorsPage
            onBackToHome={() => handleNavigate('home')}
            onOpenEnquiry={() => handleOpenEnquiry()}
          />
        </main>
      )}

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenEnquiry={() => handleOpenEnquiry()}
      />

      {/* Persistent Floating WhatsApp Direct Button */}
      <WhatsAppFloatingButton />

      {/* Interactive Detail & Inquiry Modals */}
      <ProductDetailModal
        product={selectedProductForDetail}
        onClose={() => setSelectedProductForDetail(null)}
        onOpenEnquiry={handleOpenEnquiry}
      />

      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        initialProduct={selectedEnquiryProduct}
      />

      <ToolingCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
