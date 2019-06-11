# selenium 임포트
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import time
from bs4 import BeautifulSoup

# webdriver 설정(Chrome, Firefox 등)
chrome_options = Options()
# chrome_options.add_argument("--headless")
browser = webdriver.Chrome('./chromedriver', options=chrome_options)

# 크롬 브라우저 내부 대기
browser.implicitly_wait(3)

# 브라우저 사이즈
browser.set_window_size(1920, 1280)  # maximize_window(), minimize_window()

# 페이지 이동
base_url = 'https://www.airbnb.co.kr/rooms/'
# 서울: https://www.airbnb.co.kr/s/%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C/homes?refinement_paths%5B%5D=%2Fhomes&query=%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C&click_referer=t%3ASEE_ALL%7Csid%3A9cd7a909-500f-4b49-86f4-9adf4e1abb9e%7Cst%3AMAGAZINE_HOMES&title_type=MAGAZINE_HOMES&search_type=UNKNOWN&place_id=ChIJzWXFYYuifDUR64Pq5LTtioU&map_toggle=false&s_tag=9XyiV9-L
browser.get('https://www.airbnb.co.kr/s/%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C/homes?refinement_paths%5B%5D=%2Fhomes&query=%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C&click_referer=t%3ASEE_ALL%7Csid%3A9cd7a909-500f-4b49-86f4-9adf4e1abb9e%7Cst%3AMAGAZINE_HOMES&title_type=MAGAZINE_HOMES&search_type=UNKNOWN&place_id=ChIJzWXFYYuifDUR64Pq5LTtioU&map_toggle=false&s_tag=9XyiV9-L')
browser.implicitly_wait(3)

# Scroll 하는 부분
SCROLL_PAUSE_TIME = 1.0

# Get scroll height
last_height = browser.execute_script("return document.body.scrollHeight")

while True:
    # Scroll down to bottom
    browser.execute_script("window.scrollTo(0, document.body.scrollHeight);")

    # Wait to load page
    time.sleep(SCROLL_PAUSE_TIME)

    # Calculate new scroll height and compare with last scroll height
    new_height = browser.execute_script("return document.body.scrollHeight")
    if new_height == last_height:
        break
    last_height = new_height

# bs4 초기화
soup = BeautifulSoup(browser.page_source, "html.parser")

# 소스코드 정리
# print(soup.prettify())

rooms = soup.select("._14csrlku")
# lists = browser.find_elements_by_class_name('_14csrlku')

# print(lists[0].prettify())

room_urls = []

for room in rooms:
    room_url = room.select('meta')[2]['content']
    print(room_url)
    room_urls.append(room_url)

with open('rooms.txt', 'w+') as file:
    for room_url in room_urls:
        file.write('https://'+room_url+'\n')

browser.implicitly_wait(3)

# 브라우저 종료
browser.quit()
