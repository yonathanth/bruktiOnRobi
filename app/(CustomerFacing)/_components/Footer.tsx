import { FaTelegram, FaInstagram, FaTiktok } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b  from-thirty to-accentthirty  text-gray-200 py-6 px-8 mt-24">
      <div className="h-40"></div>
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
        {/* Logo and Description */}
        <div className="text-center md:text-left">
          <h2 className="text-xl font-bold text-white">Brukti&apos;s</h2>
          <p className="text-sm mt-2">
            Trendy fashion & accessories, all in one place.
          </p>
        </div>

        {/* Social Media Links */}
        <div className="flex space-x-6">
          <a
            href="https://t.me/brkti_shop"
            className="hover:text-complimentSeventy"
          >
            <FaTelegram size={20} />
          </a>
          <a
            href="https://www.instagram.com/tenbit_daniel23/"
            className="hover:text-complimentSeventy"
          >
            <FaInstagram size={20} />
          </a>
          <a
            href="https://www.tiktok.com/@brukti_shopping23"
            className="hover:text-complimentSeventy"
          >
            <FaTiktok size={20} />
          </a>
        </div>

        {/* Contact Info */}
        <div className="text-center md:text-right">
          <p className="text-sm">info@briktis.com | 0926292483</p>
        </div>
      </div>

      {/* Footer Bottom */}

      <div className="border-t border-gray-700 mt-6 pt-4 text-center text-sm">
        &copy; {new Date().getFullYear()} Brikti&apos;s. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
