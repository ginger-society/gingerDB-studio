import { createHashRouter } from "react-router-dom";
import { withAuthHOC } from "./WithAuthHOC";
import Editor from "@/pages/Editor";
import HandleNavigation from "@/pages/HandleAuth";
import { SwaggerViewPage } from "@/pages/SwaggerView";
import { SysDesignView } from "@/pages/SysDesignView";
import ManageWorkspacePage from "@/pages/ManageWorkspaceView";
import {
  WorkspaceSettingsTokensPage,
  WorkspaceSettingsMembersPage,
} from "@/pages/WorkspaceSettingsView";

const AuthenticatedHome = withAuthHOC(Editor);
const AuthenticatedSwaggerViewPage = withAuthHOC(SwaggerViewPage);
const AuthenticatedSysDesignView = withAuthHOC(SysDesignView);
const AuthenticatedManageWorkspacesView = withAuthHOC(ManageWorkspacePage);
const AuthenticatedWorkspaceSettingsTokensView = withAuthHOC(
  WorkspaceSettingsTokensPage
);

const AuthenticatedWorkspaceSettingsMembersPage = withAuthHOC(
  WorkspaceSettingsMembersPage
);

const router = createHashRouter([
  {
    path: "/:org_id/:env",
    element: <AuthenticatedSysDesignView />,
  },
  {
    path: "/manage-workspaces",
    element: <AuthenticatedManageWorkspacesView />,
  },
  {
    path: "/manage-workspaces/:org_id/tokens",
    element: <AuthenticatedWorkspaceSettingsTokensView />,
  },
  {
    path: "/manage-workspaces/:org_id/members",
    element: <AuthenticatedWorkspaceSettingsMembersPage />,
  },
  {
    path: "/editor/:docId/:branch",
    element: <AuthenticatedHome />,
  },
  {
    path: "/services/swagger/:org_id/:service_identifier/:env_id",
    element: <AuthenticatedSwaggerViewPage />,
  },
  {
    path: "/handle-auth/:access_token/:refresh_token",
    element: <HandleNavigation />,
  },
]);

export default router;
