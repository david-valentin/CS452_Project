# import libraries
import requests
import os
import selenium
from selenium import webdriver
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys
# need brew install chromedriver
from selenium.webdriver.firefox.firefox_binary import FirefoxBinary



def scrape_directory(first_name, last_name):
    try:
        driver = webdriver.Firefox('/home/dvalentin/Image_Processing_Project/CS452_Project/flask_server/')
        # Open the url
        driver.get('https://directory.middlebury.edu')
        # Select the last name
        last_name_box = driver.find_element_by_name('ctl00$ctl00$PageContent$PageContent$middDirectoryForm$txtLastName')
        # Select the first name
        first_name_box = driver.find_element_by_name('ctl00$ctl00$PageContent$PageContent$middDirectoryForm$txtFirstName')
        last_name_box.send_keys(last_name)
        first_name_box.send_keys(first_name)
        login_button = driver.find_element_by_name('ctl00$ctl00$PageContent$PageContent$middDirectoryForm$btnSearch')
        # Click login
        login_button.click()
        # Get the properties of the user:
        user_email = driver.find_element_by_id("rptProperties_ctl02_lblPropertyValue")
        student_address = driver.find_element_by_id("rptProperties_ctl03_lblPropertyValue")
        user_email_text = user_email.text
        student_address_text = student_address.text
        driver.close()
        return user_email_text, student_address_text
    except Exception as e:
        print(e)
