
interface ScrollToTopProps {
  scrollPosition: number;
  onClick: () => void;
}

export function ScrollToTop({ scrollPosition, onClick }: ScrollToTopProps) {
  return (
    <button 
      onClick={onClick}
      className={`fixed bottom-6 left-6 z-40 bg-white border-2 border-endereco-blue text-endereco-blue p-3 rounded-full shadow-lg hover:bg-endereco-blue hover:text-white transition-all duration-200 btn-scale focus-endereco no-print ${
        scrollPosition > 500 ? 'block' : 'hidden'
      } md:block`}
      aria-label="Back to top"
    >
      <svg 
        className="w-4 h-4" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M5 15l7-7 7 7" 
        />
      </svg>
    </button>
  );
} 