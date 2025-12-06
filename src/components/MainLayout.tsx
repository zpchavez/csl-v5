import { Link } from "@tanstack/react-router";

type NavLinkProps = {
  path: string;
  text: string;
};

function NavLink({ path, text }: NavLinkProps) {
  return (
    <Link
      to={path}
      activeProps={{
        className: "button--color--primary",
      }}
    >
      {text}
    </Link>
  );
}

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="main-layout container">
      <h1 className="site-title">Comic Strip Library</h1>
      <div className="searchbar">
        {/* @TODO search bar goes here */}
        {/* <form
          onSubmit={handleSubmit(this.handleSubmit)}
          className="input-scaffold"
        >
          <Field
            name="query"
            label="Search"
            component={ReduxFormsField}
            required
          >
            <input id="searchbar" type="text" />
          </Field>
        </form> */}
      </div>
      <nav>
        <NavLink path="/" text="News" />
        <NavLink path="/browse" text="Browse" />
        <NavLink path="/links" text="Books & Links" />
        <NavLink path="/about" text="About" />
        <NavLink path="/copyright" text="Copyright Statement" />
        <NavLink path="/contact" text="Contact" />
      </nav>
      <div className="main-layout__children paper">{children}</div>
    </div>
  );
}
