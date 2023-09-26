import { initializeApp } from "firebase/app"
import { 
    getFirestore, 
    collection, 
    doc, 
    getDoc, 
    getDocs, 
    query, 
    where
 } from "firebase/firestore/lite"

const firebaseConfig = {
  apiKey: "AIzaSyDqyWX0jkYEOF4uECAzE0Ozbv3YZbfbnks",
  authDomain: "vanlife-7ab15.firebaseapp.com",
  projectId: "vanlife-7ab15",
  storageBucket: "vanlife-7ab15.appspot.com",
  messagingSenderId: "98001913898",
  appId: "1:98001913898:web:cead8c5feddbb126871b53"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const vansCollectionRef = collection(db, "vans")

export async function getVans() {
    const snapshot = await getDocs(vansCollectionRef)
    const vans = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return vans
}

export async function getVan(id) {
    const docRef = doc(db, "vans", id)
    const snapshot = await getDoc(docRef)
    return {
        ...snapshot.data(),
        id: snapshot.id
    }
}

export async function getHostVans() {
    const q = query(vansCollectionRef, where("hostId", "==", "123"))
    const snapshot = await getDocs(q)
    const hostVans = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return hostVans
}

// export async function getHostVans(id) {
//     const url = id ? `/api/host/vans/${id}` : "/api/host/vans"
//     const res = await fetch(url)
//     if (!res.ok) {
//         throw {
//             message: "Failed to fetch vans",
//             statusText: res.statusText,
//             status: res.status
//         }
//     }
//     const data = await res.json()
//     return data.vans
// }

export async function loginUser(creds) {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}