class AppGlobal {

    constructor() {
        window.config = {
            user: new Map(),
            agent: new Map(),
            contacts: new Map(),

        }
    }

    registerUser(user) {
        window.config.user = user

    }


}


export default AppGlobal