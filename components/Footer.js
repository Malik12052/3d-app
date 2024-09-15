
const Footer = () => {
  return (
    <footer className="bg-black text-white py-4 text-center">
      <p>© 2023 3D Interactive Portfolio. All rights reserved.</p>
      <div className="flex justify-center space-x-4 mt-2">
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-indigo-500 transition"
        >
          Twitter
        </a>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-indigo-500 transition"
        >
          GitHub
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-indigo-500 transition"
        >
          LinkedIn
        </a>
      </div>
    </footer>
  );
};

export default Footer;
