const admin = require("firebase-admin");
require("dotenv").config();

let db;
let auth;

/**
 * Initializes Firebase Admin SDK and Firestore.
 * This function ensures that Firebase is initialized only once and returns the Firestore database instance.
 * @returns {Promise<{ db: FirebaseFirestore.Firestore, auth: admin.auth.Auth }>}
 */
function initializeFirebase() {
  if (!db || !auth) {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      projectId: process.env.FIREBASE_PROJECT_ID, // Use environment variable for project ID
      databaseURL: process.env.FIREBASE_DATABASE_URL, // Use environment variable for database URL
    });
    db = admin.firestore();
    auth = admin.auth();
  }
  return { db, auth };
}

module.exports = {
  initializeFirebase,
  getAuth: () => auth,
  getDb: () => db,
};
