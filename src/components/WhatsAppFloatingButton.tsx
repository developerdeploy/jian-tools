import React from 'react';

export const WhatsAppFloatingButton: React.FC = () => {
  const phoneNumber = '917984876123';
  const defaultMessage = encodeURIComponent(
    'Hello JIAN TOOLS, I am interested in precision carbide cutting tools and modular crown drills.'
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[999999] select-none flex items-center justify-center">

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with JIAN TOOLS on WhatsApp"
        className="group relative flex items-center space-x-2.5 px-4 py-3 sm:px-5 sm:py-3.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white transition-all duration-300 transform hover:scale-105 active:scale-95 border border-black/5 dark:border-white/10 shadow-lg shadow-black/10"
      >

        {/* WhatsApp Icon */}
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6 fill-current relative z-10 shrink-0"
          viewBox="0 0 24 24"
        >
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.992.54 1.83.824 2.796.825 3.183 0 5.768-2.587 5.769-5.766.001-3.182-2.585-5.771-5.769-5.771zm3.374 8.163c-.144.405-.837.774-1.17.825-.311.05-.712.063-2.12-.518-1.503-.62-2.457-2.157-2.531-2.257-.075-.101-.607-.808-.607-1.543s.385-1.097.522-1.246c.137-.149.3-.187.4-.187.1 0 .2.002.288.006.091.005.213-.035.333.254.125.3.424 1.037.461 1.112.037.075.062.162.013.26-.05.101-.075.163-.15.251-.075.088-.158.196-.226.263-.075.074-.153.155-.066.305.087.149.387.638.831 1.032.571.507 1.053.664 1.203.739.15.075.238.063.326-.038.088-.1.376-.438.476-.588.1-.15.2-.125.337-.075.138.05.875.413 1.026.488.15.075.25.112.288.175.037.062.037.362-.107.767zM12.04 2C6.495 2 2 6.495 2 12.04c0 1.77.46 3.498 1.332 5.02L2 22l5.09-1.334c1.472.802 3.14 1.224 4.88 1.224 5.545 0 10.04-4.495 10.04-10.04C22.01 6.495 17.585 2 12.04 2zm0 18.064c-1.528 0-3.027-.411-4.336-1.187l-.311-.184-3.224.846.86-3.142-.202-.321c-.854-1.359-1.306-2.936-1.306-4.566 0-4.664 3.794-8.458 8.459-8.458 4.664 0 8.458 3.794 8.458 8.458 0 4.665-3.794 8.459-8.458 8.459z" />
        </svg>

        {/* Label */}
        <span className="text-xs sm:text-sm font-bold tracking-wide whitespace-nowrap relative z-10 font-sans">
          WhatsApp Direct
        </span>
      </a>
    </div>
  );
};
