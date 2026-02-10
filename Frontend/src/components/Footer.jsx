

function Footer() {
  return (
    <footer className="dark:bg-gray-900 bg-gray-200 dark:text-gray-400 text-gray-700 py-4 border-t dark:border-gray-800 border-gray-500 z-50">
      <div className="text-center text-sm">
        © {new Date().getFullYear()} <span className="dark:text-blue-400 text-blue-800 font-semibold cursor-pointer">Notes-Book</span>. Made with efforts.
      </div>
    </footer>
  );
}

export default Footer;