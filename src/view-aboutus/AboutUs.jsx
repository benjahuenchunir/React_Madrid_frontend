import React from 'react';
import './AboutUs.css';
import Accordion from '../components/Accordion.jsx'
import yo from '../assets/face-members/pipet.jpg'
import benja from '../assets/face-members/benja.jpg'
import pipev from '../assets/face-members/pipev.png'


function AboutUs(){
  return (
    <>
        <div className="about-container">
            <div className="about-content">
                <h1 className="aboutus-title">Sobre Nosotros</h1>
                <p className="aboutus-text">Nuestra misión es  proporcionar una nueva plataforma de mensajería eficiente y personalizable que facilite la comunicación entre grupos e individuos de personas siendo "deepspace" una forma rápida y confiable de mantenerse en contacto, ya sea para fines de ocio, profesionales, comunitarios, etc.</p>
            </div>
            <div className="members">
                <div className="member">
                    <div className="photo-container">
                        <img src={benja} className="member-photo"></img>
                    </div>
                    <Accordion
                            title="Benjamín Huenchuñir"
                            text="Con una sólida base en programación en Java y Swift, ha creado varias aplicaciones innovadoras que han sido bien recibidas en su universidad. Benja es conocido por su capacidad para trabajar en equipo.

                            "/>
                </div>
                <div className="member">
                    <div className="photo-container">
                        <img src={yo} className="member-photo"></img>
                    </div>
                    <Accordion
                            title="Felipe Torres"
                            text="Es estudiante de cuarto año de Ingeniería de Software con un interés especial en la inteligencia artificial y el aprendizaje automático. Ha trabajado en varios proyectos de investigación que involucra Machine Learning"/>
                </div>
                <div className="member">
                    <div className="photo-container">
                        <img src={pipev} className="member-photo"></img>
                    </div>
                    <Accordion
                            title="Felipe Vidal"
                            text="Es un estudiante de cuarto año de Ingeniería de Software que se especializa en el desarrollo de software de seguridad y redes. Felipe es reconocido por su habilidad para analizar y mitigar riesgos de seguridad."/>
                </div>

            </div>
        
        </div>
    </>
  );
};

export default AboutUs;
