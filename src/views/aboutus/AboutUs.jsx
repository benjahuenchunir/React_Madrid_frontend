import React from 'react';
import './AboutUs.css';
import AccordionAbout from '../../components/AccordionAU/AccordionAbout.jsx'
import pipet from '/face-members/pipet.jpg'
import benja from '/face-members/benja.jpg'
import pipev from '/face-members/pipev.png'


function AboutUs(){
    return (
          <div className="about-container">
              <div className="about-content">
                  <h1 className="aboutus-title">Sobre Nosotros</h1>
                  <p className="aboutus-text">Nuestra misión es  proporcionar una nueva plataforma de mensajería eficiente y personalizable que facilite la comunicación entre grupos e individuos de personas siendo "deepspace" una forma rápida y confiable de mantenerse en contacto, ya sea para fines de ocio, profesionales, comunitarios, entre otros. Aquí te presentamos a nuestro querido equipo, ¡puedes saber más sobre ellos haciendo click en alguno de sus nombres!</p>
              </div>
              <div className="members">
                  <div className="member">
                      <div className="photo-container">
                          <img src={benja} className="member-photo"></img>
                      </div>
                      <AccordionAbout
                              title="Benjamín Huenchuñir"
                              text="Estudiante de tercer año de ingeniería de software con una ferviente pasión por el desarrollo móvil y web. Dedicado al backend, fusiona habilidades en diseño para concebir aplicaciones intuitivas y de alto rendimiento.
                              "/>
                  </div>
                  <div className="member">
                      <div className="photo-container">
                          <img src={pipet} className="member-photo"></img>
                      </div>
                      <AccordionAbout
                              title="Felipe Torres"
                              text="Estudiante de cuarto año de Ingeniería de Software con un interés especial en data science y el aprendizaje automático. Ha sido ayudante de algunos cursos del DCC y le gusta crear código que ayuden a los demás."/>
                  </div>
                  <div className="member">
                      <div className="photo-container">
                          <img src={pipev} className="member-photo"></img>
                      </div>
                      <AccordionAbout
                              title="Felipe Vidal"
                              text="Estudiante de cuarto año de ingeniería de software con interés en Machine-Learning y desarrollo de software. Le gusta usar su experiencia en áreas como la docencia y el diseño para crear software más intuitivo y amigable."/>
                  </div>

              </div>
          
          </div>
    );
  };

export default AboutUs;
