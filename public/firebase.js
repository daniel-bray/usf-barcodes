      // Your web app's Firebase configuration
      // For Firebase JS SDK v7.20.0 and later, measurementId is optional
      var firebaseConfig = {
        apiKey: 'AIzaSyCAlrs18XCXGkTQZOBx4Q5qRpM8sqAuK5o',
        authDomain: 'barcodegenerator-b311a.firebaseapp.com',
        projectId: 'barcodegenerator-b311a',
        storageBucket: 'barcodegenerator-b311a.appspot.com',
        messagingSenderId: '646549143384',
        appId: '1:646549143384:web:38ee9f784f62e35dccaf2d',
        measurementId: 'G-WJK9CDHRK5',
      }
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig)
      const db = firebase.firestore()
      db.settings({ timestampsInSnapshots: true })
      firebase.analytics()
