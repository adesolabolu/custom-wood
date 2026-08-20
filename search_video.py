import urllib.request
import re

url = "https://www.pexels.com/search/videos/woodworking/"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    html = urllib.request.urlopen(req).read().decode('utf-8')
    links = set(re.findall(r'https://videos\.pexels\.com/video-files/[^"]+', html))
    for link in links:
        print(link)
except Exception as e:
    print(e)
