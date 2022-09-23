const docsModel = {
    baseUrl: window.location.href.includes("X") ?
        "http://localhost:3003" :
        "https://jsramverk-editor-hajh20.azurewebsites.net",
    getAllDoc: async function getAllDoc() {
        const response = await fetch(`${docsModel.baseUrl}/`);

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

        window.location.reload();
        const result = await response.json();
    },
    updateDoc: async function updateDoc(doc) {

        await fetch(`${docsModel.baseUrl}/update`, {
            body: JSON.stringify(doc),
            headers: {
                'content-type': 'application/json'
            },
            method: 'PUT'
        });

        window.location.reload();

    }
};

export default docsModel;
