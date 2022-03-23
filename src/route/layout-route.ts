import WizardSetupPage from "../pages/WizardSetupPage/WizardSetupPage";
import DashboardPageStandard from "../pages/DashboardPageStandard";
import UserManagementPage from "../pages/UserManagementPage";

export const layoutRoute = [
    {path: "/wizard-setup", Component: WizardSetupPage},
];

export const dashboardLayoutRoute = [
    {path: "/dashboard-standard", Component: DashboardPageStandard},
    {path: "/user-management", Component: UserManagementPage},
];
