from utils import WebDriver, load_page
from utils import WebDriver, load_page
from time import sleep
from selenium.webdriver.common.by import By
import os

def test_register(web_driver):
    web_driver.initialize_driver()
    load_page(web_driver, 'https://musical-mandazi-5f256e.netlify.app/')
    web_driver.click_element(By.XPATH, '//a[@href="/register"]')
    sleep(2)
    # Escribir en los campos de texto
    web_driver.write_in_element(By.ID, 'email', "test4@example.com")
    web_driver.write_in_element(By.ID, 'password', "password123")
    web_driver.write_in_element(By.ID, 'name', "Bob")
    web_driver.write_in_element(By.ID, 'lastname', "Doe")
    web_driver.write_in_element(By.ID, 'phone', "12345678")
    file_input = web_driver.find_element(By.XPATH, '//input[@type="file"]')
    file_input.send_keys(os.path.abspath('assets/test.png'))
    sleep(2)


    web_driver.click_element(By.XPATH, '//button[@type="submit"]')

    sleep(3)

    try:
        notification = web_driver.find_element(By.XPATH, '//div[@id="notification-container"]//div[contains(@class, "success")]')
        assert notification.is_displayed(), 'Register test failed'
        print('Register test passed')
    except Exception as e:
        print(f'Register test failed')

    web_driver.quit_driver()
# Test para verificar la validación de campos requeridos

def test_validation_register(web_driver):
    web_driver.initialize_driver()
    load_page(web_driver, 'https://musical-mandazi-5f256e.netlify.app/')
    web_driver.click_element(By.XPATH, '//a[@href="/register"]')
    sleep(2)

    # Intentar enviar el formulario sin llenar los campos
    web_driver.click_element(By.XPATH, '//button[@type="submit"]')
    sleep(2)

    assert web_driver.find_element(By.ID, 'email').get_attribute('required'), 'Register validation test failed'
    assert web_driver.find_element(By.ID, 'password').get_attribute('required'), 'Register validation test failed'
    assert web_driver.find_element(By.ID, 'name').get_attribute('required'), 'Register validation test failed'
    assert web_driver.find_element(By.ID, 'lastname').get_attribute('required'), 'Register validation test failed'
    assert web_driver.find_element(By.ID, 'phone').get_attribute('required'), 'Register validation test failed'
    print('Register validation test passed')
    web_driver.quit_driver()

def test_delete_account(web_driver):
    web_driver.initialize_driver()
    load_page(web_driver, 'https://musical-mandazi-5f256e.netlify.app/')
    web_driver.click_element(By.XPATH, '//a[@href="/login"]')
    sleep(1)
    # Escribir en los campos de texto
    web_driver.write_in_element(By.ID, 'email', "test4@example.com")
    web_driver.write_in_element(By.ID, 'password', "password123")
    sleep(1)
    # Hacer clic en el botón "Iniciar Sesión"
    web_driver.click_element(By.XPATH, '//button[@type="submit"]')
    sleep(3)  # Esperar a que la página se redirija después del inicio de sesión

    web_driver.click_element(By.XPATH, '//a[@href="/profile"]')
    sleep(1)
    web_driver.click_element(By.XPATH, '//button[text()="Eliminar Cuenta"]')
    sleep(2)

    # Verificar que se haya cerrado sesión viendo si luego estamos en la página de Iniciar Sesión

    assert web_driver.get_url() == 'https://musical-mandazi-5f256e.netlify.app/login', 'Delete account test failed'

    web_driver.quit_driver()

    print('Delete account test passed')


