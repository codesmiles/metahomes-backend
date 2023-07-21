const client = require("../../Config/cache");

// try and catch functions are used to handle errors in asynchronous functions
const tryCatchMe = async (func) => { 
    try {
     return await func;
    }
    catch(err) {
        throw errorDey(500, err, "Node Cache Error");
    }
}
// SAVE VALUE TO CACHE for 4 hrs
const cacheDataWithExpiry = async (key, value,ex=86400) => await tryCatchMe(client.set(key, value, ex))
const getData = async(key)=> await tryCatchMe(await client.get(key));
const takeData = async (key) => await tryCatchMe(await client.take(key));

module.exports = {
    cacheDataWithExpiry,
    takeData,
    getData
}