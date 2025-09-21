export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="text-sm text-gray-300">
            © {currentYear} TaimiLab. Todos os direitos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
}