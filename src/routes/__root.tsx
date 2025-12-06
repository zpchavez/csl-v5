import { createRootRoute, Outlet } from "@tanstack/react-router";
import { MainLayout } from "src/components/MainLayout";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}
