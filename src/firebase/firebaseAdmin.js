import { initializeApp, credential as _credential } from "firebase-admin";
import serviceAccount from "../../serviceAccountKey.json";

initializeApp({
    credential: _credential.cert(serviceAccount)
});
