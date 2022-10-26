const mailModel = {
    baseUrl: window.location.href.includes("localhost") ?
        "http://localhost:3132" :
        "https://jsramverk-editor-hajh20.azurewebsites.net",
    sendAccessMail: async function sendAccessMail(userMail, doc) {

        let response = await fetch(`${mailModel.baseUrl}/api/sendaccessemail/${userMail}`, {
            method: 'POST',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "content-type",
                "X-Powered-By": "ASP.NET"
            },
        })
        .then(async function(response){
            const docId=doc['_id']
            const users=doc['allowed_users']
            users.push(userMail)

            const resUpdate = await fetch(`${mailModel.baseUrl}/api/update/${users}/${docId}`, {
                    method: 'POST',
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Headers": "content-type",
                        "X-Powered-By": "ASP.NET"
                    },
                });
            
            return [response.status, resUpdate.status];
    
        })
        return response;
    }
};

export default mailModel;
