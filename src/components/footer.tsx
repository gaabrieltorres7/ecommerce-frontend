export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <p className="text-center text-gray-600 text-sm">
          © {currentYear} Made by Gabriel Torres. 🤩
        </p>
      </div>
    </footer>
  );
}
