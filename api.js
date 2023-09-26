import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDqyWX0jkYEOF4uECAzE0Ozbv3YZbfbnks",
  authDomain: "vanlife-7ab15.firebaseapp.com",
  projectId: "vanlife-7ab15",
  storageBucket: "vanlife-7ab15.appspot.com",
  messagingSenderId: "98001913898",
  appId: "1:98001913898:web:cead8c5feddbb126871b53"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);







export async function getVans(id) {
    const url = id ? `/api/vans/${id}` : "/api/vans"
    const res = await fetch(url)
    if (!res.ok) {
        throw {
            message: "Failed to fetch vans",
            statusText: res.statusText,
            status: res.status
        }
    }
    const data = await res.json()
    return data.vans
}

export async function getHostVans(id) {
    const url = id ? `/api/host/vans/${id}` : "/api/host/vans"
    const res = await fetch(url)
    if (!res.ok) {
        throw {
            message: "Failed to fetch vans",
            statusText: res.statusText,
            status: res.status
        }
    }
    const data = await res.json()
    return data.vans
}

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