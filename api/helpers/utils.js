import requestIp from 'request-ip';


const dateFormat = () => {
  return new Date(Date.now()).toLocaleString();
}

const getUserIp = (req) => {
  return requestIp.getClientIp(req);
}
  

export {
  dateFormat,
  getUserIp,
};
