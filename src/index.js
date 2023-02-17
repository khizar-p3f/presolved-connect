import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { navigate, Router } from "@gatsbyjs/reach-router";
import { Amplify, Auth } from "aws-amplify";
import oldAwsConfig from "./aws-exports";
import Suspence from "./widgets/suspence"; 
import { Provider } from "react-redux";
import { store } from "./store";
import AppGlobal from "./widgets/global";

const App = React.lazy(() => import("./agentApp/index"));
const AdminApp = React.lazy(() => import("./adminApp/index"));
const LoginPage = React.lazy(() => import("./login/index"));
const root = document.getElementById("root");

Amplify.configure(oldAwsConfig);
const globalConfig =  new AppGlobal()


ReactDOM.render(
    <Provider store={store}>
        <Suspense fallback={<Suspence />}>
            <Router basepath="/">
                <App path="/*" />
                <App path="/agent/*" />
                <AdminApp path="/admin/*" />
                <LoginPage path="/login" />    
            </Router>
        </Suspense>
    </Provider>,
    root
);
