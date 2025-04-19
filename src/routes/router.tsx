import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import AuthLayout from "@/layouts/AuthLayout";
import { MainLayout } from "@/layouts/MainLayout";
import ProtectedRoute from "@/routes/ProtectedRoute";
import { LoginPage } from "@/pages/auth/LoginPage";
import { DashboardPage } from "@/pages/DashboardPage";
import { AllPropertiesPage } from "@/pages/properties/all-properties";
import { PropertyNewPage } from "@/pages/properties/new";
import { ErrorPage } from "@/pages/ErrorPage";
import { InquiriesPage } from "@/pages/inquiries/InquiriesPage";
import { PropertiesByTypePage } from "@/pages/properties/properties-by-type";
import { PropertyAreasPage } from "@/pages/properties/areas/PropertyAreasPage";
import { PropertyEditPage } from "@/pages/properties/edit";
import GuestRoute from "./GuestRoute";
import ScrollToTop from "@/components/ScrollToTop";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <ScrollToTop />
        <App />
      </>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/auth",
        element: <AuthLayout />,
        children: [
          {
            path: "login",
            element: (
              <GuestRoute>
                <LoginPage />
              </GuestRoute>
            ),
          },
        ],
      },
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <DashboardPage />,
            handle: {
              crumb: () => ({ title: "Dashboard", path: "/" }),
            },
          },
          {
            path: "properties",
            handle: {
              crumb: () => ({ title: "Properties", path: "/properties" }),
            },
            children: [
              {
                index: true,
                element: <AllPropertiesPage />,
              },
              {
                path: "new",
                element: <PropertyNewPage />,
                handle: {
                  crumb: () => ({
                    title: "New Property",
                    path: "/properties/new",
                  }),
                },
              },
              // {
              //   path: ":id/edit",
              //   element: <PropertyEditPage />,
              //   handle: {
              //     crumb: () => ({
              //       title: "Edit Property",
              //       // path="/properties/:id/edit",
              //     }),
              //   },
              // },

              // Add these new routes
              // {
              //   path: "types",
              //   element: <PropertiesByTypePage />,
              //   // element: <PropertyTypesPage />,
              //   handle: {
              //     crumb: () => ({
              //       title: "Property Types",
              //       path: "/properties/types",
              //     }),
              //   },
              // },
              // {
              //   path: "types",
              //   element: <PropertyAreasPage />,
              //   handle: {
              //     crumb: () => ({
              //       title: "Property Areas",
              //       path: "/properties/areas",
              //     }),
              //   },
              // },
              // {
              //   path: "types/:id/edit",
              //   element: <PropertyTypeEditPag />,
              //   handle: {
              //     crumb: () => ({
              //       title: "Edit Type",
              //       path: "/properties/types/edit",
              //     }),
              //   },
              // },
            ],
          },

          // {
          //   path: "Inquiries",
          //   element: <InquiriesPage />,
          //   handle: {
          //     crumb: () => ({ title: "Inquiries", path: "/Inquiries" }),
          //   },
          // },
          // Add similar handle.crumb to other routes
        ],
      },
    ],
  },
]);
