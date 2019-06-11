# selenium 임포트
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys
import time
from bs4 import BeautifulSoup

room_urls = []

with open('rooms.txt', 'r') as file:
    urls = file.readlines()
    for url in urls:
        room_urls.append(url)

# webdriver 설정(Chrome, Firefox 등)
chrome_options = Options()
# chrome_options.add_argument("--headless")
browser = webdriver.Chrome('./chromedriver', options=chrome_options)

# 크롬 브라우저 내부 대기
browser.implicitly_wait(2)
time.sleep(1)

# 브라우저 사이즈
browser.set_window_size(1920, 1280)  # maximize_window(), minimize_window()

# 페이지 이동
browser.get(room_urls[120])
browser.implicitly_wait(2)
time.sleep(1)

# 버튼 누르기
browser.implicitly_wait(2)
# browser.find_element_by_id('details').find_element_by_class_name('_1dv8bs9v').click()
browser.find_element_by_id('details').find_element_by_class_name('_1dv8bs9v').send_keys(Keys.ENTER)
browser.implicitly_wait(2)

# bs4 초기화
soup = BeautifulSoup(browser.page_source, "html.parser")

# 소스코드 정리
# print(soup.prettify())

'''
이미지 가져오기
'''
time.sleep(1)
db_room_image_urls = []
room_images = soup.select_one("._167bw5o").select("img._uttz43")
for room_image in room_images:
    db_room_image_urls.append(room_image['src'])

for idx, db_room_image_url in enumerate(db_room_image_urls):
    print('{}번째 Image URL: {}'.format(idx,db_room_image_url))

'''
방 제목 가져오기
'''
time.sleep(1)
room_title = soup.select_one("div#summary").select_one("span._18hrqvin").text
room_location = soup.select_one("div#summary").select_one("div._1hpgssa1").select_one("div._czm8crp").text
print()
print('title: {}'.format(room_title))
print('location: {}'.format(room_location))

'''  
방 정보 가져오기
'''
time.sleep(1)

db_room_type = soup.select_one("div#summary").next_sibling.select_one("div._hgs47m").select_one("div._1p3joamp").text
print()
print('room_type: {}'.format(db_room_type))

room_infos = soup.select_one("div#summary").next_sibling.select_one("div._hgs47m").select("div._czm8crp")
db_capacity_cnt = room_infos[0].text[-2]
db_bedroom_cnt = 1 if room_infos[1].text == '원룸' else room_infos[1].text[-2]
db_bed_cnt = room_infos[2].text[-2]
db_bathroom_cnt = room_infos[3].text[-2]
print()
print('capacity_cnt: {}'.format(db_capacity_cnt))
print('bedroom_cnt: {}'.format(db_bedroom_cnt))
print('bed_cnt: {}'.format(db_bed_cnt))
print('bathroom_cnt: {}'.format(db_bathroom_cnt))

'''  
방 소개 가져오기
'''
time.sleep(1)
room_summary = soup.select_one("div#details > div").contents[0]
spans_root = room_summary.select('span._czm8crp')
db_detail_summary = ''

for span_root in spans_root:
    spans = span_root.select('span')

    for span in spans:
        db_detail_summary += str(span.text)
        db_detail_summary += '\n'

    db_detail_summary += '\n'

room_details = []
room_detail_tag = soup.select_one("div#details > div").contents[1]
room_detail_tag = room_detail_tag.select_one("div._kj7i925 > div")

for content in room_detail_tag.contents:

    title = content.select_one("div._1p3joamp").text
    room_detail = str(title) + '\n\n'
    spans_root = content.select('span._czm8crp')

    for span_root in spans_root:
        spans = span_root.select('span')

        for span in spans:
            room_detail += str(span.text)
            room_detail += '\n'

        room_detail += '\n'

    room_details.append(room_detail)

print()
for room_detail in room_details:
    print(room_detail)

'''
방 lat, lng 가져오기
'''
time.sleep(1)
script_tag = soup.select_one("script[data-state=true]")
lat_start_idx = script_tag.text.find('"lat"') + len('"lat":')
lng_start_idx = script_tag.text.find('"lng"') + len('"lng":')

db_lat = script_tag.text[lat_start_idx:lat_start_idx+11].split(',')[0]
db_lng = script_tag.text[lng_start_idx:lng_start_idx+13].split(',')[0]

if db_lat == 'null':
    print('lat, lng should be parsed')
else:
    print()
    print('lat: {}, lng: {}'.format(db_lat, db_lng))


# google_map_tag = soup.select_one("._1fmyluo4")
# print(google_map_tag.prettify())

# google_map_src = soup.select_one("._1fmyluo4 > img")['src']
# cut_word_from = 'center='
# cut_word_to = '&scale'
# cut_index_from = google_map_src.find(cut_word_from) + len(cut_word_from)
# cut_index_to = google_map_src.find(cut_word_to)

# latlng = google_map_src[cut_index_from:cut_index_to]
# db_lat = latlng.split(',')[0]
# db_lng = latlng.split(',')[1]

browser.implicitly_wait(3)

# 브라우저 종료
browser.quit()

