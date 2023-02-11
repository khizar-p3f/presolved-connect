import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { navigate, Router } from "@gatsbyjs/reach-router";
import { Amplify, Auth } from "aws-amplify";
import oldAwsConfig from "./aws-exports";
import Suspence from "./widgets/suspence";
import { Provider } from "react-redux";
import { store } from "./store";

const App = React.lazy(() => import("./agentApp/index"));
const AdminApp = React.lazy(() => import("./adminApp/index"));
const root = document.getElementById("root");

Amplify.configure(oldAwsConfig);

ReactDOM.render(
    <Provider store={store}>
        <Suspense fallback={<Suspence />}>
            <Router basepath="/">
                <App path="/*" />
                <AdminApp path="/admin/*" />
            </Router>
        </Suspense>
    </Provider>,
    root
);
