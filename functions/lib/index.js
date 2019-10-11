"use strict";
// import * as functions from 'firebase-functions';
Object.defineProperty(exports, "__esModule", { value: true });
// // // Start writing Firebase Functions
// // // https://firebase.google.com/docs/functions/typescript
// //
// // export const helloWorld = functions.https.onRequest((request, response) => {
// //  response.send("Hello from Firebase!");
// // });
const functions = require("firebase-functions");
const universal = require(`${process.cwd()}/dist/blog-webpack/server`).app;
// console.log(universal)
exports.angularUniversal = functions.https.onRequest(universal);
//# sourceMappingURL=index.js.map