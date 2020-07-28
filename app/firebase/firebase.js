// Initialize Firebase
import app from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './config';

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.auth = app.auth();
  }
  register(email,password) {
      await
  }
}
