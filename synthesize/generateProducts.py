import csv
import random

# Define the sets
set1 = ['topwear', 'bottomwear', 'footwear']
settopwear = ['tshirt', 'shirt', 'polo', 'sweatshirt', 'hoodies']
setbottomwear = ['trousers', 'jeans', 'shorts', 'boxers', 'formals', 'trackpants']
setshoes = ['formal', 'sports', 'sneakers', 'socks', 'sandals', 'belted']
set3 = ['red', 'green', 'yellow', 'blue', 'black', 'purple', 'orange', 'cyan', 'white', 'lilac', 'lavender']
set4 = ['cotton', 'wool', 'synthetic', 'denim', 'leather', 'silk']

# Generate the dataset
dataset = []
for i in range(100):
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
    tags = f"{choice_set1} {choice_set} {choice_set3} {choice_set4}"
    
    # Assume name and price are placeholders; modify as needed
    name = f"Product_{i+1}"
    price = random.randint(20, 200)  # Randomly generate price between 20 to 200 for illustration
    
    dataset.append([name, '', tags, '', price])

# Save to CSV file
with open('products.csv', 'w', newline='') as file:
    writer = csv.writer(file)
    writer.writerow(['name', 'description', 'tags', 'imageLink', 'price'])  # Header
    writer.writerows(dataset)
