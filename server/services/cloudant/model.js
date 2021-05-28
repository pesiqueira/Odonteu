const rp = require('request-promise'),
    Cloudant = require ('@cloudant/cloudant'),
    apiKey = 'TX8BqexD6uWNE6yuB3ZvchU1Mlg0AAyI2JWxwEQOtUIT',
    account = 'cb35dd06-6b79-4d1d-958a-9afecf151db3-bluemix',
    cloudantDB = 'odontome',
    cloudant = new Cloudant({account,plugins: {iamauth: {iamApiKey: apiKey}}}),
    db = cloudant.use(cloudantDB);

module.exports = {

    viewDocument(view) {
        const option = optionView(view);
        const localPromise = promise(option);
        return new Promise(localPromise);
    },

    findDocument(id) {
        return db.get(id)
    },

    createDocument(doc) {
        return db.insert(doc);
    },

    updateDocument(doc) {
        if (!doc._id || !doc._rev) 
            return new Promise(promiseReject);
        const option = optionCreate(doc);
        const localPromise = promise(option);
        return new Promise(localPromise);
    },

    query(query,partition) {
        return db.partitionedFind(partition,query);
    },

    deleteDocument(doc) {
        return db.destroy(doc._id,doc._rev);
    },

    viewDesignDoc(design_name,partition){
        const option = optionDesign(design_name,partition);
        const localPromise = promise(option);
        return new Promise(localPromise);
    }
};