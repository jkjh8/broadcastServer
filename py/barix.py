from urllib.request import urlopen
from bs4 import BeautifulSoup
import os
from dotenv import load_dotenv

load_dotenv(dotenv_path='../.env', verbose=True)
mongopath = os.getenv('DB_URL')

url = "http://192.168.1.21/status"
html = urlopen(url).read()
dv = BeautifulSoup(html, 'html.parser')

rt = {
    'uptime': int(dv.find('span', 'uptime').get_text()),
    'hardwaretype': dv.find('span', 'hwtype').get_text(),
    'mac': dv.find('span', 'mac').get_text(),
    'fwname': dv.find('span', 'fwname').get_text(),
    'ipaddress': dv.find('span', 'ip').get_text(),
    'netmask': dv.find('span', 'netmask').get_text(),
    'gateway': dv.find('span', 'gateway').get_text(),
    'dns': dv.find('span', 'dns').get_text(),
    'url': dv.find('span', 'url').get_text(),
    'status': dv.find('span', 'status').get_text(),
    'relay1': int(dv.find('span', 'relay1').get_text()),
    'relay2': int(dv.find('span', 'relay2').get_text()),
    'relay3': int(dv.find('span', 'relay3').get_text()),
    'relay4': int(dv.find('span', 'relay4').get_text()),
}

print(rt)

if __name__=="__main__":
    main()