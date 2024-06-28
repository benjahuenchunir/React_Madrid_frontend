from utils import WebDriver, load_page
from time import sleep
from selenium.webdriver.common.by import By
import os
from login import test_login, test_validation, test_email, test_logout
from register import test_register, test_validation_register, test_delete_account
from chats import test_send_message

def main():
    web_driver = WebDriver()
    test_register(web_driver)
    test_validation_register(web_driver)
    test_login(web_driver)
    test_validation(web_driver)
    test_delete_account(web_driver)
    test_email(web_driver)
    test_logout(web_driver)
    test_send_message(web_driver)

if __name__ == '__main__':
    main()