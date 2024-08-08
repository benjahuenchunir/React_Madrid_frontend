import AccordionDocs from '../../components/AccordionDocs/AccordionDocs.jsx';
import './docs.scss';

function DocsPage(){
    return (
        <div id="docs-container">
            <div className="instructions-page">
                <h1>Funcionalidades de la Aplicación</h1>
                <AccordionDocs 
                    title="Navegación Principal" 
                    content="La aplicación cuenta con una barra de navegación en la parte superior de la pantalla que permite acceder a las diferentes funcionalidades de la aplicación. Las opciones de navegación incluyen: Inicio, Sobre Nosotros, Documentación y Registro/Inicio de Sesión. Puedes clickear en cada una de ellas para acceder a la página correspondiente. Ahora, si ya iniciaste sesión, podrás ver una opción en la barra de navegación adicional que te permitirá acceder a tus chats y ver tu perfil. Si eres un Administrador, podrás ver una opción adicional para acceder a la sección de Reportes."
                />
                <AccordionDocs
                    title="Inicio" 
                    content="La página de inicio de la aplicación deepspace muestra la presentación de la página y una breve descripción de sus funcionalidades. Se puede iniciar sesión o registrar directamente desde este apartado."/>
                <AccordionDocs 
                    title="Registro" 
                    content="Esta funcionalidad permite a los nuevos usuarios crear una cuenta al apretar el botón de Registro. Se deben ingresar datos válidos como email, nombre, teléfono, etc. Consiste en un formulario donde debes rellenar los datos y de no hacerlo correctamente se avisa de manera oportuna."
                />
                <AccordionDocs 
                    title="Inicio de Sesión" 
                    content="Permite a los usuarios registrados acceder a la aplicación introduciendo su nombre de usuario y contraseña. Si los datos son correctos entonces se redirige al usuario a la página principal de la aplicación y podrá ver sus Chats."
                />
                <AccordionDocs 
                    title="Chats" 
                    content="Esta funcionalidad accesible mediante la barra de navegación siempre y cuando esté con la sesión iniciada permite a los usuarios observar e interactuar con todos sus chats. Cada chat tiene un nombre y se puede ver el último mensaje, y puedes hacer click en alguno de los chats para ver el historial de mensajes y mandar nuevos mensajes al escribir en la barra principal y apretar 'Enter'. Sumado a lo anterior, ¡se pueden compartir todos los archivos que quieras!. Finalmente, en la parte superior izquierda se cuenta con una barra de búsqueda para encontrar chats específios. Se pueden hacer chats en grupo, fijar, editar, eliminar, reportar, responder o reportar mensajes."
                />
                <AccordionDocs 
                    title="Sobre Nosotros" 
                    content="En esta sección se presenta información sobre el equipo de desarrollo de la aplicación DeepSpace. Se incluyen fotos y descripciones de los miembros del equipo. Para interactuar con esta sección, se puede hacer click en el nombre de cada miembro para ver más información sobre ellos."

                />
                <AccordionDocs 
                    title="Mi Perfil"
                    content="En esta sección se presenta información sobre el usuario que ha iniciado sesión. Se pueden ver los datos del usuari. Además, se puede cerrar sesión y eliminar la cuenta."
                />
                <AccordionDocs 
                    title="Reportes"
                    content="Esta funcionalidad es accesible solo para los administradores. En esta sección se pueden ver los reportes de los usuarios y mensajes que han sido reportados por otros usuarios. Se pueden eliminar los reportes y los mensajes reportados o eliminar al usuario que ha mandaddo este mensaje."
                />
            </div>
        </div>
    );
}

export default DocsPage;
