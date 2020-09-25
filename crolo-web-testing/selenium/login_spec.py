from selenium import webdriver
from time import sleep
 
driver = webdriver.Chrome(r'C:\chromedriver.exe') ## webdriver 경로 설정
 
driver.implicitly_wait(3)  ## 암시적 대기?
 
driver.get('http://34.85.63.192:3000/')  ## 네이버 접속
print(driver.title)
 
sleep(5)

