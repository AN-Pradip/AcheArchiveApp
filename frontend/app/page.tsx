'use client';

import "../styles/Homepage.css"
import "../styles/HumanBody.css"
import BodyParts from "../BodyPartsData.json"

export default function HomePage(){

  const CreateArchive = (e: any) => {
    console.log(e.target.id)
    return("hello")
  }

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
    </div>
  );
}