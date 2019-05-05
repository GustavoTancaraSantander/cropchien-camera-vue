import firebase from '../../configFirebase'
import router from '../../router'
import  {firebaseApp} from '../../configFirebase'

export default (url, comment, author) => {
	
	let d = new Date();
	let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
	//console.log(firebase.db);
	
	firebaseApp.firestore().collection('dogs').add({
		url,
		comment,
		info: `Posted by ${author != ''? author : 'Unknow' } on ${days[d.getDay()]}`,
		createdAt: new Date().getTime()
	})
	.then(router.push({ name: 'home'}))
	//.then(router.go(-1))
	
	console.log("ADD ok");
	
}