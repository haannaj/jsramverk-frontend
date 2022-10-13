const authModel = {
    baseUrl: window.location.href.includes("localhost") ?
        "http://localhost:3132" :
        "https://jsramverk-editor-hajh20.azurewebsites.net",
    getAllUsers: async function getAllUsers() {

        const response = await fetch(`${authModel.baseUrl}/auth/`);

        const allUsers = await response.json();

        return allUsers.data;
    },
    getUserGraphql: async function getUserGraphql() {

        const response = await fetch(`${authModel.baseUrl}/graphql`, {     
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ query: `{ users {
                email
              }}` })
        })
        
        const res = await response.json();

        return res.data.users;


    },
    login: async function login(user) {
        const response = await fetch(`${authModel.baseUrl}/auth/login`, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
            'content-type': 'application/json'
            },
        });

        const result = await response.json();

        return result;
    },
    register: async function register(user) {
        const response = await fetch(`${authModel.baseUrl}/auth/register`, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
            'content-type': 'application/json'
            },
        });

        const result = await response.json();

        return result;

    },
};

export default authModel;
