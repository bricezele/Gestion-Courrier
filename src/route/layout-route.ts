import WizardSetupPage from "../pages/WizardSetupPage/WizardSetupPage";
import DashboardPageStandard from "../pages/DashboardPageStandard";
import UserManagementPage from "../pages/UserManagementPage";
import DashboardPageAdmin from "../pages/DashboardPageAdmin";
import DashboardPageAssistantDG from "../pages/DashboardPageAssistantDG";
import DashboardPageDirecteurAdjoint from "../pages/DashboardPageDirecteurAdjoint";
import DepartmentManagementPage from "../pages/DepartmentManagementPage";
import DashboardPageDirection from "../pages/DashboardPageDirection";
import CourrierManagementPage from "../pages/CourrierManagementPage";
import UserDGManagementPage from "../pages/UserDGManagement";
import SocietyManagementPage from "../pages/SocietyManagementPage";

export const layoutRoute = [
    {path: "/wizard-setup", Component: WizardSetupPage},
];

export const dashboardLayoutRoute = [
    {path: "/dashboard-standard", Component: DashboardPageStandard},
    {path: "/dashboard-admin", Component: DashboardPageAdmin},
    {path: "/dashboard-assistant-dg", Component: DashboardPageAssistantDG},
    {path: "/dashboard-dga", Component: DashboardPageDirecteurAdjoint},
    {path: "/user-management", Component: UserManagementPage},
    {path: "/user-dg-management", Component: UserDGManagementPage},
    {path: "/department-management", Component: DepartmentManagementPage},
    {path: "/society-management", Component: SocietyManagementPage},
    {path: "/dashboard-direction", Component: DashboardPageDirection},
    {path: "/dashboard-courrier", Component: CourrierManagementPage},
];
