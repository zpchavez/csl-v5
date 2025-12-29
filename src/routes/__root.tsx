import { createRootRoute, Outlet, redirect } from "@tanstack/react-router";
import { MainLayout } from "src/components/MainLayout";
import { NotFound } from "src/components/NotFound";

export const Route = createRootRoute({
  beforeLoad: ({ location }) => {
    // Handle old PHP-style links to specific episodes
    if (location.pathname === "/display.php") {
      const searchParams = new URLSearchParams(location.search);
      const id = searchParams.get("id");
      if (id) {
        throw redirect({
          to: "/display/$id",
          params: { id: id },
        });
      } else {
        throw redirect({
          to: "/",
        });
      }
    }
  },
  component: RootComponent,
  notFoundComponent: () => <NotFound message="Page not found" />,
});

function RootComponent() {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}
