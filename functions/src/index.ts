// import * as functions from 'firebase-functions';

// // // Start writing Firebase Functions
// // // https://firebase.google.com/docs/functions/typescript
// //
// // export const helloWorld = functions.https.onRequest((request, response) => {
// //  response.send("Hello from Firebase!");
// // });

import * as functions from 'firebase-functions';
const universal = require(`${process.cwd()}/dist/blog-webpack/server`).app;
// console.log(universal)
export const angularUniversal = functions.https.onRequest(universal);