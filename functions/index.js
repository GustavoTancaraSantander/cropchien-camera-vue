const functions = require('firebase-functions');
const admin = require('firebase-admin')
const axios = require('axios')
var cors = require('cors') ({origin:true})
const serverKey = require('./serverKey')

admin.initializeApp(functions.config().firebase);
let firestore = admin.firestore()

 const moment = require('moment')
// import * as moment from 'moment'


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
 exports.helloWorld = functions.https.onRequest((request, response) => {
	console.log('llego a DogFarm');
  	response.send("Hello from Firebase DogFarm!");
 });
 /* https://stackoverflow.com/questions/48582278/eslint-error-trying-to-deploy-functions-firebase */
/*  exports.GeneralSubscription = functions.https.onRequest((request, response) => {
    console.log('token DogFarm',request.body.token);
  
	cors(request,response,() => {
		axios.post(`https://iid.googleapis.com/iid/v1/${request.body.token}/rel/topics/general`,
		{},
		{
			headers: {
					'Content-Type':'application/json',
					'Authorization': `key=${serverKey}`
			},
		}).then((res) => {
			  firestore.collection('tokens').add({token: request.body.token}).then((ref) => {
					console.log('Document added ID: ', ref.id);
					return response.status(200).send(`notifications subscription successful`);
			}).catch((err) => {
			console.log(err)
			console.log(err.response);
			response.status(500).send({ message: 'Whops! there was an error',error:err.response });
		})
		}).catch((err) => {
			console.log(err)
			console.log(err.response);
			response.status(500).send({ message: 'Whops! there was an error',error:err.response });
		})
	}); 
}); */

/* exports.createDog = functions.firestore
    .document('dogs/{postDogId}')
    .onCreate((snap, context) => {
		 console.log('createDog ==>>>CONTEXT', context);
		 
		let prepareData 
		const ref = firestore.collection('dogs').orderBy('createdAt', 'desc').limit(1)
			ref.onSnapshot( snapshot => {
				console.log('snapshot >>>>>', snapshot);
			
				snapshot.forEach((element) => {
					console.log('element >>>>>',  element);
					console.log('element _fieldsProto >>>>>',  element.fieldsProto);
					prepareData.createdAt = moment( element.createdAt).locale('es').format('MMMM Do YYYY, h:mm:ss a')
					prepareData.info = element.info
					prepareData.snap = snap.data()
					prepareData.id = context.params.postDogId
				});
					console.log('prepareData >>>>>',  prepareData);
			firestore.collection('cloudFunction').doc(prepareData.id).set(prepareData).then(() => {
				console.log('createdDoc==>>in cloudFunction OK!');
					return true
				}).catch((err) => {
					console.log('erroR  createdDoc==>>in cloudFunction OK!', err);
				});
			}) 
    }); */
	 
exports.createDogCS = functions.region('us-east1')
		.firestore.document('dogs/{postDogId}')
	 	.onCreate((snap, context) => {
		let prepareData = {}
		console.log('snapshot >>>>>', snap.data());
		console.log('context.params.postDogId  >>>>>', context.params.postDogId );
		// prepareData.createdAt =  snap.data().createdAt
		// prepareData.createdAt =  moment(snap.data().createdAt, 'YYYY-MM-DD ') 
		// console.log('prepareData.createdAt', moment().format());
		console.log('prepareData.createdAt',moment( snap.data().createdAt ).locale('es').format('MMMM Do YYYY, h:mm:ss a'));
		
		prepareData.createdAt= moment( snap.data().createdAt).locale('es').format('MMMM Do YYYY, h:mm:ss a')
		prepareData.info = snap.data().info
		prepareData.snap = snap.data()
		prepareData.id = context.params.postDogId 
      
     	firestore.collection('cloudFunction').doc(prepareData.id).set(prepareData).then(() => {
			console.log('createdDoc==>>in cloudFunction OK!');
			return;
		}).catch((err) => {
			console.log('erroR  createdDoc==>>in cloudFunction OK!', err);
		});

    });