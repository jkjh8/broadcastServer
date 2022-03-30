from urllib.request import urlopen
from bs4 import BeautifulSoup
import os
from dotenv import load_dotenv

load_dotenv(dotenv_path='../.env', verbose=True)
mongopath = os.getenv('DB_URL')

url = "http://192.168.1.15/status"
html = urlopen(url).read()
soup = BeautifulSoup(html, 'html.parser')

rt = {
    'uptime': int(soup.find('span', 'uptime').get_text()),
    'hardwaretype': soup.find('span', 'hwtype').get_text()
}

print(rt)
