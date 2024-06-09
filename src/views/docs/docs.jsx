import AccordionDocs from '../../components/AccordionDocs/AccordionDocs.jsx';
import './docs.scss';

function DocsPage(){
    return (
        <div id="docs-container">
            <div className="instructions-page">
                <h1>Funcionalidades de la Aplicación</h1>
                <AccordionDocs 
                    title="Navegación Principal" 
                    content="La aplicación cuenta con una barra de navegación en la parte superior de la pantalla que permite acceder a las diferentes funcionalidades de la aplicación. Las opciones de navegación incluyen: Landing, Chats, Sobre Nosotros, Documentación y Registro/Inicio de Sesión. Puedes clickear en cada una de ellas para acceder a la página correspondiente."
                />
                <AccordionDocs
                    title="Inicio" 
                    content="La página de inicio de la aplicación deepspace muestra la presentación de la página y una breve descripción de sus funcionalidades. Se puede iniciar sesión o registrar directamente desde este apartado."/>
                <AccordionDocs 
                    title="Registro" 
                    content="Esta funcionalidad permite a los nuevos usuarios crear una cuenta al apretar el botón de Registro. Se deben ingresar datos válidos como email, nombre, teléfono, etc. Aún no implementado."
                />
                <AccordionDocs 
                    title="Inicio de Sesión" 
                    content="Permite a los usuarios registrados acceder a la aplicación introduciendo su nombre de usuario y contraseña. Si los datos son correctos entonces se redirige al usuario a la página principal de la aplicación y podrá ver sus Chats. En desarrollo."
                />
                <AccordionDocs 
                    title="Chats" 
                    content="Esta funcionalidad accesible mediante la barra de navegación permite a los usuarios observar e interactuar con todos sus chats. Cada chat tiene un nombre y se puede ver el último mensaje, y puedes hacer click en alguno de los chats para ver el historial de mensajes y mandar nuevos mensajes al escribir en la barra principal y clickear 'Enviar'. Sumado a lo anterior, ¡se pueden compartir todos los archivos que quieras!. Finalmente, en la parte superior izquierda se cuenta con una barra de búsqueda para encontrar chats específicos. Próximamente se implementará la funcionalidad de chats en grupo, notificaciones, fijar chats, reportar, y más."
                />
                <AccordionDocs 
                    title="Sobre Nosotros" 
                    content="En esta sección se presenta información sobre el equipo de desarrollo de la aplicación DeepSpace. Se incluyen fotos y descripciones de los miembros del equipo. Para interactuar con esta sección, se puede hacer click en el nombre de cada miembro para ver más información sobre ellos."
                />
            </div>
        </div>
    );
};

export default DocsPage;
