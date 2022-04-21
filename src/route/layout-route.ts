import WizardSetupPage from "../pages/WizardSetupPage/WizardSetupPage";
import DashboardPageStandard from "../pages/DashboardPageStandard";
import UserManagementPage from "../pages/UserManagementPage";
import DashboardPageAdmin from "../pages/DashboardPageAdmin";
import DashboardPageAssistantDG from "../pages/DashboardPageAssistantDG";
import DashboardPageDirecteurAdjoint from "../pages/DashboardPageDirecteurAdjoint";
import DepartmentManagementPage from "../pages/DepartmentManagementPage";
import DashboardPageDirection from "../pages/DashboardPageDirection";

export const layoutRoute = [
    {path: "/wizard-setup", Component: WizardSetupPage},
];

export const dashboardLayoutRoute = [
    {path: "/dashboard-standard", Component: DashboardPageStandard},
    {path: "/dashboard-admin", Component: DashboardPageAdmin},
    {path: "/dashboard-assistant-dg", Component: DashboardPageAssistantDG},
    {path: "/dashboard-dga", Component: DashboardPageDirecteurAdjoint},
    {path: "/user-management", Component: UserManagementPage},
    {path: "/department-management", Component: DepartmentManagementPage},
    {path: "/dashboard-direction", Component: DashboardPageDirection},
];
