import express from 'express';
import bodyParser  from 'body-parser';
//import 'babel-polyfill';
import cors from 'cors';
import env from './env';
import path from 'path';
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


app.use(express.static(path.join(__dirname, '../dist')));
// redirect to angular app
app.get('/',function(req,res){
  console.log('initialize app and open index.html');
  res.sendFile(path.join(__dirname,'../dist/index.html'));
});

// app.use(express.static(path.join(__dirname,'..','dist')));
// app.get('/',function(req,res){
//   res.sendFile(path.join(__dirname,'..','dist'));
// });


// if (process.env.NODE_ENV === 'production') {
//   const appPath = path.join(__dirname, '..', 'dist');
//   app.use(express.static(appPath));
//   app.get('*', function(req, res) {
//     res.sendFile(path.resolve(appPath, 'index.html'));
//   });
// }

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



// app.use ('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocument))   ;


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("App is running on port " + port);
});
// app.listen(env.port).on('listening', () => {
//   console.log(` Server 🚀 are live on ${env.port} `);
// });

export default app;
// "start": "nodemon --watch . --exec babel-node -- server"
