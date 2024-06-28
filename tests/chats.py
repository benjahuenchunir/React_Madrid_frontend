from utils import WebDriver
from time import sleep
from selenium.webdriver.common.by import By
import os
from utils import WebDriver, load_page
from selenium.webdriver.common.keys import Keys

def test_send_message(web_driver):
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

    # Apretar un chat

    web_driver.click_element(By.ID, 'chat-card')
    sleep(2)

    web_driver.write_in_element(By.CLASS_NAME, 'message-input', "Hola, soy un robot")

    # apretar enter

    web_driver.write_in_element(By.CLASS_NAME, 'message-input', Keys.ENTER)
    sleep(2)

    web_driver.quit_driver()

