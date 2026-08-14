//FANCY FIREBASE FIRESTOR STUFF
import { initializeApp } from "firebase/app";
import {
    collection,
    doc,
    getDoc,
    getFirestore,
    addDoc,
    setDoc,
    updateDoc,
    deleteDoc,
    onSnapshotsInSync,
    onSnapshot,
} from "firebase/firestore";// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyAuEz3JIVLCKUV-_jlmRytldLJU5qnnFZM",
  authDomain: "test-bdb0b.firebaseapp.com",
  projectId: "test-bdb0b",
  storageBucket: "test-bdb0b.firebasestorage.app",
  messagingSenderId: "572350694455",
  appId: "1:572350694455:web:c06d6dd4ce637bb8ab2bb2",
  measurementId: "G-WV58WKDE5M"
};

const app = initializeApp(firebaseConfig); 
const db = getFirestore(app); 
const dataCollection = collection(db,"Applications");

// FANCY FIRESTOR STUFF END HERE

const approve = document.getElementById("approveButton");
const disapprove = document.getElementById("disapproveButton");

var teachersName;
var teacherEmail;
var studentsName;
var studentID;
var timeNeeded;
var dateForApplication;
var periodOfLeave;
var reasonOfLeave;
var timeOfApplication;
var timeOfDecisionMade; //the other attribute which needs information from the extension to complete

async function GeneralTextAssigning(){

    console.log(chrome);
    console.log(chrome.storage);

    const data =  await chrome.storage.local.get(null); //get everything from the storage stored into there by the backgound script

    const studentName = document.getElementById("studentName");
    const teacherName = document.getElementById("teacherName");
    const details = document.getElementById("details");
    const date = document.getElementById("date");
    const reason = document.getElementById("studentsReason");

    teachersName = data.teachersName;
    teacherEmail = data.teacherEmail;
    studentsName = data.studentsName;
    studentID = data.studentID;
    timeNeeded = data.timeNeeded;
    dateForApplication = data.dateForApplication;
    periodOfLeave = data.periodOfLeave;
    reasonOfLeave = data.reasonOfLeave;
    timeOfApplication = data.timeOfApplication;
    
    studentName.textContent = studentsName + " ("+ studentID + " )";
    teacherName.textContent = teachersName + " (" + teacherEmail + " )";
    date.textContent = timeOfApplication + ", " + dateForApplication;
    reason.textContent = reasonOfLeave;
    details.textContent = "This student would like to leave class on Period " + periodOfLeave +
    " for " + timeNeeded + " minutes."

}

document.addEventListener("DOMContentLoaded",GeneralTextAssigning);


async function Approved(){

    const documentName = studentID + "-" + dateForApplication + "-" + timeOfApplication; //remake the document name
    const docRef = doc(db, "Applications", documentName);

    GetTimeOfDecision();

    await updateDoc(docRef, {
        isApproved:true,
        timeOfDecision: timeOfDecisionMade //the time of the decision made
    });  //access firestore and change the two things. onsnapshot should ensure updating

    CleanStorage(); //cleaning the storage for next time's use
    window.close(); //close the window

}

approve.onclick = Approved; //execute when approve button is clicked

async function Disapprove(){

    const documentName = studentID + "-" + dateForApplication + "-" + timeOfApplication; //remake the document name
    const docRef = doc(db, "Applications", documentName);
    
    GetTimeOfDecision();

    await updateDoc(docRef, {
        timeOfDecision: timeOfDecisionMade //the time of the decision made
    }); //update firestore
    
    CleanStorage();

    window.close();

}

disapprove.onclick = Disapprove;


function CleanStorage(){
    const keysToRemove = [
        "teachersName",
        "teacherEmail",
        "studentsName",
        "studentID",
        "timeNeeded",
        "dateForApplication",
        "periodOfLeave",
        "reasonOfLeave",
        "timeOfApplication"
    ];

    // precise cleaning of those infomation linked to those keys
    chrome.storage.local.remove(keysToRemove).then(
        chrome.storage.local.set({
            teachersName:"(Placeholder)",
            teacherEmail:"(Placeholder)",
            studentsName: "(Placeholder)",
            studentID: "(Placeholder)",
            timeNeeded: "(Placeholder)",
            dateForApplication:"(Placeholder)",
            periodOfLeave:"(Placeholder)",
            reasonOfLeave:"(Placeholder)",
            timeOfApplication:"(Placeholder)",
            isApproved:false})
        );
}

function GetTimeOfDecision(){ //get the time of which the decision is made

    const now = new Date();

    timeOfDecisionMade = now.toLocaleTimeString("en-GB", {
        timeZone: "Pacific/Auckland",
        hour12: false
    }).slice(0,5); 

}
