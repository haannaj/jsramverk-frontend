import App from './../App';

const docsModel = {
    baseUrl: window.location.href.includes("localhost") ?
        "http://localhost:3132" :
        "https://jsramverk-editor-hajh20.azurewebsites.net",
    getAllDoc: async function getAllDoc(token) {

        const response = await fetch(`${docsModel.baseUrl}/`, {            
            headers: {
                'x-access-token': token,
            }
        });

        const allDocs = await response.json();

        return allDocs.data;
    },
    saveDoc: async function saveDoc(newDoc) {

        const response = await fetch(`${docsModel.baseUrl}/save`, {
            body: JSON.stringify(newDoc),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST'
        });

        response.json();
        return;

    },
    updateDoc: async function updateDoc(doc) {

        await fetch(`${docsModel.baseUrl}/update`, {
            body: JSON.stringify(doc),
            headers: {
                'content-type': 'application/json'
            },
            method: 'PUT'
        });

        return;

    },
    getDocById: async function getDocById(token, userID) {

        const response = await fetch(`${docsModel.baseUrl}/usersdoc/${userID}`, {       
            headers: {
                'x-access-token': token,
            }
        });

        const allDocs = await response.json();

        return allDocs.data;

    }
    // getDocByIdGraphql: async function getDocById(token, userID) {

    //     const response = await fetch(`http://localhost:3132/graphql`, {     
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json',
    //         },
    //         body: JSON.stringify({ query: `{ doc(allowed_users: "test@test.se") {
    //             namn
    //             text
    //             owner
    //             allowed_users }}` })
    //     })
        
    //     const res = await response.json();

    // }
};

export default docsModel;
