'use client';

import "../styles/Homepage.css"
import "../styles/HumanBody.css"
import "../styles/LoginModal.css"
import BodyParts from "../BodyPartsData.json"
import { useEffect } from "react";

export default function HomePage(){

  const CreateArchive = (e: any) => {
    console.log(e.target.id)
    return("hello")
  }

  const Login = async (e: any) => {
    e.preventDefault()
    const inputFirstName = (document.getElementById("firstName") as HTMLInputElement).value ;
    const inputPassword = (document.getElementById("password") as HTMLInputElement).value;
    console.log(inputFirstName + "   " + inputPassword)
    const lengthOfPayload= inputFirstName.length + inputPassword.length
    await fetch("http://localhost:3001/users/login", {
      method: "POST",
      headers: { 
        'Content-Type': 'application/json',
        'Content-Length': lengthOfPayload + "\r\n"
      },
      body: JSON.stringify({
        "FName": inputFirstName,
        "Password": inputPassword
      })
    })
    .then(function (response) {
      console.log(response)
      return response.json();
    })
    .then((data) => {console.log(data.token)})
    .catch(function (error) {
        console.log("ERROR:" + error + error.status)
    })
  }

  useEffect(() => {
    const dialog: any = document.getElementById("DialogTag");
    const login: any = document.getElementById("loginButton");
    const CloseButton: any = document.getElementById("CloseButton");
    login.onclick = () => {dialog.show()}
    CloseButton.onclick = () => {dialog.close()}
  });



  return( 
    <div className="HomepageContainer">
      <div className="GoalContainer"> 
        <h2>Goal</h2>
        <p>
          AcheArchive est une application web basée sur le questionnaire DN4 (Douleur Neuropathique en 4 questions) qui permet de dépister rapidement et efficacement la présence de douleurs neuropathiques. 
          Le questionnaire DN4 est un outil validé et reconnu pour évaluer la neuropathie périphérique chez les patients souffrant de douleurs chroniques. 
          L&apos;application stocke les résultats des questionnaires et les tendances au fil du temps pour permettre de suivre l&apos;évolution des douleurs.
        </p>
      </div>
      <div className="BodyPartContainer"> 
        <h2>Select a body part</h2>
        <div className="human-body">
          {BodyParts.map((BodyPart) => {
            return(
              <svg onClick={(e) => CreateArchive(e)} key={BodyPart.name} data-position={BodyPart.name} id={BodyPart.name} className={BodyPart.name} xmlns='http://www.w3.org/2000/svg' width={BodyPart.width} height={BodyPart.height} viewBox={BodyPart.viewBox}> <path id={BodyPart.name} d={BodyPart.d}> </path></svg>
            )
          })}
        </div>
      </div>
      <dialog id='DialogTag'>
        <form action="" onSubmit={(e) => Login(e)}>
          <h3> Login </h3>
          <p id="CloseButton"> &#10006; </p>
          <label htmlFor="firstName"> First Name</label>
          <input type="text" id="firstName"/>
          <label htmlFor="password"> Password</label>
          <input type="text" id="password"/>
          <button id="SubmitButton"> Submit </button>
        </form>
      </dialog>
    </div>
  );
}