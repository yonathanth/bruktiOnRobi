"use client";
import Link from "next/link";
import { useEffect } from "react";
import { Home, Store } from "lucide-react";
import { usePathname } from "next/navigation";
import CartModal from "./CartModal";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children }) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  const className = isActive
    ? "text-accentthirty dark:text-thirty sm:underline-active"
    : "text-accentthirty dark:text-accentthirty hover:text-thirty dark:hover:text-purple-900 transition-colors duration-300";

  return (
    <Link href={href} className={`${className}`}>
      {children}
    </Link>
  );
};

const Nav: React.FC = () => {
  const pathname = usePathname();

  useEffect(() => {}, [pathname]);

  return (
    <nav className="w-full flex items-center justify-between pr-8 pl-0 md:pl-5 pb-4 bg-transparent">
      <Link href="/" className="text-3xl font-bold logo-hover pl-4">
        <img
          className="scale-110"
          src={"/brukti-logo-1.png"}
          alt={"brukti_logo"}
          height={100}
          width={100}
        />
      </Link>
      <div className="flex items-center space-x-2 md:space-x-10">
        <NavLink href="/">
          <div className=" p-3 bg-thirty text-white rounded-full shadow-lg hover:bg-accentthirty transition-all z-30">
            <Home className="text-white w-5 h-5" />
          </div>
        </NavLink>

        <NavLink href="/shop">
          <div className=" p-3 bg-thirty text-white rounded-full shadow-lg hover:bg-accentthirty transition-all z-30">
            <Store className="text-white w-5 h-5" />
          </div>
        </NavLink>

        {/* Spacer for future icon */}
        <div className="w-6"></div>

        <CartModal />
      </div>
    </nav>
  );
};

export default Nav;
