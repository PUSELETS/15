import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, addDoc, setDoc, getDoc, getDocs, updateDoc, deleteDoc, query } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDau8R-Pzq1MLS8wB0177S2XWnSub5DmcA",
  authDomain: "maketplace-63a04.firebaseapp.com",
  projectId: "maketplace-63a04",
  storageBucket: "maketplace-63a04.firebasestorage.app",
  messagingSenderId: "896243862971",
  appId: "1:896243862971:web:66dd421ef41226a2d1c89e",
  measurementId: "G-MN5TBWYL89"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Define collections (equivalent to Appwrite collections)
const collections = [
  {
    databaseId: "dev", // Firestore doesn't use a database ID like Appwrite, but included for structure
    id: "Customers",
    name: "customer"
  },
  {
    databaseId: "dev", 
    id: "admin_profile",
    name: "admin"
  },
  {
    databaseId: "dev",
    id: "Order_Items",
    name: "order_items"
  },
  {
    databaseId: "dev",
    id: "products",
    name: "products"
  },
  {
    databaseId: "dev",
    id: "Addresses",
    name: "address"
  },
  {
    databaseId: "dev",
    id: "Orders",
    name: "sales"
  }
];

// Create a database object to handle CRUD operations
const database = {} as any ;

collections.forEach((col) => {
  database[col.name] = {
    // Create a new document (equivalent to Appwrite's createDocument)
    create: async (data:any , id = null) => {
      try {
        if (id) {
          // If an ID is provided, use it to set the document
          await setDoc(doc(db, col.id, id), data);
          return { id, ...data };
        } else {
          // Otherwise, let Firestore generate an ID
          const docRef = await addDoc(collection(db, col.id), data);
          return { id: docRef.id, ...data };
        }
      } catch (error) {
        console.error(`Error creating document in ${col.name}:`, error);
        throw error;
      }
    },

    // Update an existing document (equivalent to Appwrite's updateDocument)
    update: async (data: any, id: string) => {
      try {
        await updateDoc(doc(db, col.id, id), data);
        return { id, ...data };
      } catch (error) {
        console.error(`Error updating document in ${col.name}:`, error);
        throw error;
      }
    },

    // Get a single document by ID (equivalent to Appwrite's getDocument)
    get: async (id: string) => {
      try {
        const docRef = await getDoc(doc(db, col.id, id));
        if (docRef.exists()) {
          return { id: docRef.id, ...docRef.data() };
        } else {
          throw new Error(`Document ${id} not found in ${col.name}`);
        }
      } catch (error) {
        console.error(`Error fetching document from ${col.name}:`, error);
        throw error;
      }
    },

    // List documents with optional queries (equivalent to Appwrite's listDocuments)
    list: async (queries = []) => {
      try {
        const colRef = collection(db, col.id);
        const q = query(colRef, ...queries); // Apply Firestore queries (e.g., where, orderBy)
        const querySnapshot = await getDocs(q);
        const documents = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        return documents;
      } catch (error) {
        console.error(`Error listing documents in ${col.name}:`, error);
        throw error;
      }
    },

    // Delete a document by ID (equivalent to Appwrite's deleteDocument)
    delete: async (id: string) => {
      try {
        await deleteDoc(doc(db, col.id, id));
        return { success: true };
      } catch (error) {
        console.error(`Error deleting document from ${col.name}:`, error);
        throw error;
      }
    }
  };
});

export { db, database };

