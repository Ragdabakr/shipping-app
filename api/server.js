import express from 'express';
import bodyParser  from 'body-parser';
//import 'babel-polyfill';
import cors from 'cors';
import env from './env';
import userRoute from './routes/userRoute';


import groupRoute from './routes/groupRoute';
import roleRoute from './routes/roleRoute';
import customerRoute from './routes/customerRoute';
import uploadRoute from './routes/uploadRoute';
import orderRoute from './routes/orderRoute';
import supplierRoute from './routes/supplierRoute';
import lookupRoute from './routes/lookupRoute';


const app = express();

// resolve the upload issue
// const corsOptions = {
//   origin: 'http://localhost:4200',
//   credentials: true,
// }

// Add middleware for parsing URL encoded bodies (which are usually sent by browser)
app.use(bodyParser.json());
app.use(cors());
// Add middleware for parsing JSON and urlencoded data and populating `req.body`
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/',function(req,res){
  res.send('start the node server on port : '+ env.port);
});

app.use('/api/v1', userRoute);
app.use('/api/v1', groupRoute);
app.use('/api/v1', roleRoute);


app.use('/api/v1', customerRoute);
app.use('/api/v1', uploadRoute);
app.use('/api/v1', customerRoute);
app.use('/api/v1', uploadRoute);
app.use('/api/v1', orderRoute);
app.use('/api/v1', lookupRoute);
app.use('/api/v1', supplierRoute);
app.use('/api/v1', lookupRoute);

// >>>>>>> c913ae83738c0d1b9410fb336270714d4085f330
// app.use ('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocument))   ;


var port = env.PORT || 8080;
app.listen(port, () => {
  console.log("App is running on port " + port);
});

// app.listen(env.port).on('listening', () => {
//   console.log(` Server 🚀 are live on ${env.port} `);
// });

export default app;
