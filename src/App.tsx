import "./App.css";
import SuperTokens, { SuperTokensWrapper } from "supertokens-auth-react";
import { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react/ui";
import { SessionAuth } from "supertokens-auth-react/recipe/session";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home";
import AdminView from "./pages/admin";
import UserView from "./pages/user";
import ProtectedView from "./pages/protected";
import ViewAll from "./pages/ViewAll";
import { PreBuiltUIList, SuperTokensConfig, ComponentWrapper } from "./config";
import { UserRoleClaim, /*PermissionClaim*/ } from 'supertokens-auth-react/recipe/userroles';
import { AccessDeniedScreen } from 'supertokens-auth-react/recipe/session/prebuiltui';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

SuperTokens.init(SuperTokensConfig);

function App() {
    return (
        <SuperTokensWrapper>
            <ToastContainer
                position="top-right"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <ComponentWrapper>
                <div className="App app-container">
                    <Router>
                        <div className="fill">
                            <Routes>
                                {/* This shows the login UI on "/auth" route */}
                                {getSuperTokensRoutesForReactRouterDom(require("react-router-dom"), PreBuiltUIList)}

                                <Route
                                    path="/"
                                    element={
                                        <SessionAuth>
                                            <Home />
                                        </SessionAuth>
                                    }
                                />
                                <Route
                                    path="/not-protected"
                                    element={
                                        <ViewAll />
                                    }
                                />
                                <Route
                                    path="/protected"
                                    element={
                                        <SessionAuth>
                                            <ProtectedView />
                                        </SessionAuth>
                                    }
                                />
                                <Route
                                    path="/admin-view"
                                    element={
                                        <SessionAuth
                                            accessDeniedScreen={AccessDeniedScreen}
                                            overrideGlobalClaimValidators={(globalValidators) => [
                                                ...globalValidators, UserRoleClaim.validators.includes("admin"),
                                            ]}>
                                            <AdminView />
                                        </SessionAuth>
                                    }
                                />
                                <Route
                                    path="/user-view"
                                    element={<SessionAuth
                                        accessDeniedScreen={AccessDeniedScreen}
                                        overrideGlobalClaimValidators={(globalValidators) => [
                                            ...globalValidators, UserRoleClaim.validators.includes("user"),
                                        ]}>
                                        <UserView />
                                    </SessionAuth>

                                    }
                                />
                            </Routes>
                        </div>
                    </Router>
                </div>
            </ComponentWrapper>
        </SuperTokensWrapper>
    );
}

export default App;
