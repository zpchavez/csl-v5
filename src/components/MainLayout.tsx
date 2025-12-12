import { Link } from "@tanstack/react-router";
import { config } from "src/config";
import { MainSearchBar } from "./MainSearchBar";

type NavLinkProps = {
  path: string;
  text: string;
};

function NavLink({ path, text }: NavLinkProps) {
  const baseClasses = "px-4 py-2 text-white! rounded-lg no-underline";
  const activeClasses = "bg-blue-600 hover:bg-blue-500";
  const inactiveClasses = "bg-gray-700 hover:bg-gray-600";

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
        <nav className="flex flex-wrap justify-center gap-3 mt-4">
          <NavLink path="/" text="News" />
          <NavLink path="/browse" text="Browse" />
          <NavLink path="/links" text="Books & Links" />
          <NavLink path="/about" text="About" />
          <NavLink path="/copyright" text="Copyright Statement" />
        </nav>
      </header>
      <hr />
      <div className="mt-6">{children}</div>
    </div>
  );
}
