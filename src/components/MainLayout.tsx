import { Link } from "@tanstack/react-router";
import { config } from "src/config";
import { MainSearchBar } from "./MainSearchBar";

type NavLinkProps = {
  path: string;
  text: string;
};

function NavLink({ path, text }: NavLinkProps) {
  const baseClasses =
    "px-3 py-2 text-lg font-medium transition-all duration-200 relative no-underline";
  const activeClasses =
    "text-blue-700 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-700";
  const inactiveClasses =
    "text-gray-700 hover:text-blue-600 hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:right-0 hover:after:h-0.5 hover:after:bg-blue-300";

  return (
    <Link
      to={path}
      activeProps={{
        className: `${baseClasses} ${activeClasses}`,
      }}
      inactiveProps={{
        className: `${baseClasses} ${inactiveClasses}`,
      }}
    >
      {text}
    </Link>
  );
}

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-parchment height-full min-h-screen pb-8 pt-4">
      <header className="text-center mb-8">
        <Link to="/">
          <img
            src={`${config.s3BucketUrl}/assets/csl_logo.png`}
            alt="Comic Strip Library"
            className="mx-auto mb-4 border-black border rounded-lg"
          />
        </Link>
        <MainSearchBar />
        <nav className="flex flex-wrap justify-center gap-4 mt-6 border-b border-gray-300 pb-6">
          <NavLink path="/" text="News" />
          <NavLink path="/browse" text="Browse" />
          <NavLink path="/links" text="Books & Links" />
          <NavLink path="/about" text="About" />
          <NavLink path="/copyright" text="Copyright Statement" />
        </nav>
      </header>
      <div className="mt-6">{children}</div>
    </div>
  );
}
