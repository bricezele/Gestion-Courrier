import WizardSetupPage from "../pages/WizardSetupPage/WizardSetupPage";
import DashboardPage from "../pages/DashboardPage";
import UserManagementPage from "../pages/UserManagementPage";

export const layoutRoute = [
    {path: "/wizard-setup", Component: WizardSetupPage},
];

export const dashboardLayoutRoute = [
    {path: "/dashboard", Component: DashboardPage},
    {path: "/user-management", Component: UserManagementPage},
];
