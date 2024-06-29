from utils import WebDriver
from time import sleep
from selenium.webdriver.common.by import By
from utils import WebDriver, load_page

# Test para iniciar sesión

def test_login(web_driver):
    web_driver.initialize_driver()
    load_page(web_driver, 'https://musical-mandazi-5f256e.netlify.app/')
    web_driver.click_element(By.XPATH, '//a[@href="/login"]')

    # Escribir en los campos de texto
    web_driver.write_in_element(By.ID, 'email', "test1@example.com")
    web_driver.write_in_element(By.ID, 'password', "password123")
    sleep(1)
    # Hacer clic en el botón "Iniciar Sesión"
    web_driver.click_element(By.XPATH, '//button[@type="submit"]')
    sleep(3)  # Esperar a que la página se redirija después del inicio de sesión

    # Verificar que se haya iniciado sesión viendo si luego estamos en la página de Chats
    assert web_driver.get_url() == 'https://musical-mandazi-5f256e.netlify.app/chats', 'Login test failed'
    print('Login test passed')
    

# Test para verificar la validación de campos requeridos

def test_validation(web_driver):
    web_driver.initialize_driver()
    load_page(web_driver, 'https://musical-mandazi-5f256e.netlify.app/')
    web_driver.click_element(By.XPATH, '//a[@href="/login"]')
    sleep(1)
    # Intentar enviar el formulario sin llenar los campos
    web_driver.click_element(By.XPATH, '//button[@type="submit"]')
    sleep(2)
    
    # Verificar la validación del campo de correo electrónico
    email_input = web_driver.find_element(By.ID, 'email')
    is_email_input_required = email_input.get_attribute('required')
    assert is_email_input_required, 'Login validation test failed'

    # Verificar la validación del campo de contraseña
    password_input = web_driver.find_element(By.ID, 'password')
    is_password_input_required = password_input.get_attribute('required')
    assert is_password_input_required, 'Validation login test failed'

    web_driver.quit_driver()
    print('Validation login test passed')


# Test para verificar la validación de un email incorrecto

def test_email(web_driver):
    web_driver.initialize_driver()
    load_page(web_driver, 'https://musical-mandazi-5f256e.netlify.app/')
    web_driver.click_element(By.XPATH, '//a[@href="/login"]')
    sleep(1)
    # Escribir un email sin el formato correcto

    web_driver.write_in_element(By.ID, 'email', "testingemail")
    web_driver.write_in_element(By.ID, 'password', "password123")
    sleep(1)
    # Hacer clic en el botón "Iniciar Sesión"
    web_driver.click_element(By.XPATH, '//button[@type="submit"]')
    sleep(2)
    # Verificar que se haya mostrado el mensaje de error
    email_input = web_driver.find_element(By.ID, 'email')
    email_validation_message = email_input.get_attribute('validationMessage')
    assert 'Incluye un signo "@" en la dirección de correo electrónico', 'Email test failed'
    print('Email test passed')
    web_driver.quit_driver()

# Test para cerrar sesión

def test_logout(web_driver):
    web_driver.initialize_driver()
    load_page(web_driver, 'https://musical-mandazi-5f256e.netlify.app/')
    web_driver.click_element(By.XPATH, '//a[@href="/login"]')
    sleep(1)
    # Escribir en los campos de texto
    web_driver.write_in_element(By.ID, 'email', "test1@example.com")
    web_driver.write_in_element(By.ID, 'password', "password123")
    sleep(1)
    # Hacer clic en el botón "Iniciar Sesión"
    web_driver.click_element(By.XPATH, '//button[@type="submit"]')
    sleep(3)  # Esperar a que la página se redirija después del inicio de sesión

    web_driver.click_element(By.XPATH, '//a[@href="/profile"]')
    sleep(1)
    web_driver.click_element(By.XPATH, '//button[text()="Cerrar Sesión"]')
    sleep(2)

    # Verificar que se haya cerrado sesión viendo si luego estamos en la página de Iniciar Sesión

    assert web_driver.get_url() == 'https://musical-mandazi-5f256e.netlify.app/login', 'Logout test failed'

    web_driver.quit_driver()

    print('Logout test passed')

