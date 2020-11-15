import uuidAPIKey from 'uuid-apikey';
// console.log (uuidAPIKey.create());

const generateApi = ()=>{
    return uuidAPIKey.create()
}
const isAPIKeyValid = (apikey,uuId)=>{
  let validApiKey = uuidAPIKey.isAPIKey(apikey);
  if(!validApiKey)
    return false;
  return uuidAPIKey.check(apikey,uuId);  

}

export{
    generateApi,
    isAPIKeyValid
}