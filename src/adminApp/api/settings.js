import { API } from "aws-amplify";
import * as mutations from "../../graphql/mutations";
import * as queries from "../../graphql/queries";

export const saveSettings = (input) => {
    /*
    input: {
        client_name: "string",
        logo: "string",
        theme: "JSON",
        created_by: "string",
    }
    */
    return new Promise((resolve, reject) => {
        API.graphql({
            query: mutations.createSettings,
            variables: { input }
        }).then((res) => {
            resolve(res.data)
        }).catch((err) => {
            reject(err)
        })
    })
}

export const getSettings = () => {
    return new Promise((resolve, reject) => {
        API.graphql({
            query: queries.listSettings
        }).then((res) => {
            resolve(res.data)
        }).catch((err) => {
            reject(err)
        })
    })
}