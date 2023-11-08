import csv
import random
from serpapi import GoogleSearch
from dotenv import load_dotenv
import os

load_dotenv()

api_key = os.getenv('API_KEY')

file = open('products.csv', 'a', newline='')
writer = csv.writer(file)
# Save to CSV file
writer.writerow(['name', 'description', 'tags', 'imageLink', 'price'])  # Header




# Define the sets
set1 = ['topwear', 'bottomwear', 'footwear']
settopwear = ['tshirt', 'shirt', 'polo', 'sweatshirt', 'hoodies', 'vest']
setbottomwear = ['trousers', 'jeans', 'shorts', 'boxers', 'formals', 'trackpants', 'pajamas']
setshoes = ['formal', 'running', 'sneakers', 'socks', 'sandals', 'belted', 'studs']
set3 = ['red', 'green', 'yellow', 'blue', 'black', 'purple', 'orange', 'cyan', 'white', 'lilac', 'lavender']
set4 = ['cotton', 'wool', 'synthetic', 'denim', 'leather', 'silk']

# Generate the dataset
dataset = []
start = 103
for i in range(50):
    try:
        print(start+i)
        # Randomly pick from set1
        choice_set1 = random.choice(set1)
        
        # Depending on the choice from set1, pick from the respective set
        if choice_set1 == 'topwear':
            choice_set = random.choice(settopwear)
        elif choice_set1 == 'bottomwear':
            choice_set = random.choice(setbottomwear)
        elif choice_set1 == 'footwear':
            choice_set = random.choice(setshoes)
        
        # Randomly pick from set3 and set4
        choice_set3 = random.choice(set3)
        
        choice_set4 = random.choice(set4)

        # Form the tags
        if choice_set1 == "footwear":
            tags = f"{choice_set1} {choice_set} {choice_set3}"
        else:
            tags = f"{choice_set1} {choice_set} {choice_set3} {choice_set4}"

        # Assume name and price are placeholders; modify as needed
        name = f"Product_{start+i+1}"
        price = random.randint(20, 200)  # Randomly generate price between 20 to 200 for illustration
        # Search for the tags string and link to the first image that google images returns
        params = {
            "engine": "google_images",
            "q": tags,
            "api_key": api_key
        }

        search = GoogleSearch(params)
        results = search.get_dict()
        print(results['images_results'][0])
        image_link = results["images_results"][0]["original"]

        print([name, '', tags, image_link, price])
        writer.writerow([name, '', tags, image_link, price])
    # print the error
    except Exception as e:
        print(e)

