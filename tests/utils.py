from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.remote.webelement import WebElement as SeleniumWebElement
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from time import sleep

class WebDriver:

    # No modificar
    def __init__(self):
        self.active_tab = 0
        self.driver = None
        self.tabs = []

    def initialize_driver(self) -> None:
        options = Options()
        options.add_argument("--start-maximized")
        self.driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options    )
        self.tabs.append(self.driver.current_url)
        

    def load_page(self, page: str) -> None:
        self.driver.get(page)
        self.tabs[self.active_tab] = page
        

    def new_tab(self, page: str) -> None:
        self.driver.switch_to.new_window(page)
        self.driver.get(page)
        self.tabs.append(page)
        self.active_tab = self.driver.window_handles.index(self.driver.current_window_handle)
        

    def change_tab(self, page_index: int) -> None: 
        self.driver.switch_to.window(self.driver.window_handles[page_index])
        self.active_tab = page_index

    def close_tab(self) -> None:

        if len(self.driver.window_handles) == 1:
            self.driver.close()
            self.driver.quit()
            self.driver = None
        else:
            self.tabs.pop(self.active_tab)
            # Si la pestaña activa es la primera o una intermedia, me quedo en el mismo índice
            if self.active_tab == 0 or self.active_tab < len(self.driver.window_handles) - 1:
                self.driver.close()
                self.driver.switch_to.window(self.driver.window_handles[self.active_tab])
            # Si la pestaña activa es la última, me muevo a la anterior y además bajo el índice de la pestaña activa
            elif self.active_tab == len(self.driver.window_handles) - 1:
                self.driver.close()
                self.driver.switch_to.window(self.driver.window_handles[self.active_tab - 1])
                self.active_tab -= 1
            
    
    def click_element(self, by: By, value: str) -> None:
        self.driver.find_element(by, value).click()
    
    def find_element(self, by: By, value: str) -> SeleniumWebElement:
        return self.driver.find_element(by, value)

    def write_in_element(self, by: By, value: str, text: str) -> None:
        self.driver.find_element(by, value).send_keys(text)

    def get_text(self, by: By, value: str) -> str:
        return self.driver.find_element(by, value).text
    
    def get_title(self, by: By, value: str) -> str:
        return self.driver.find_element(by, value).get_attribute("title")

    def get_url(self) -> str:
        return self.driver.current_url
    
    def quit_driver(self) -> None:
        self.driver.quit()
    

def load_page(web_driver, url):
    web_driver.load_page(url)
    sleep(2)
    return None