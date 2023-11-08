import requests
import csv

# Read a csv file named products.csv and make a list of json objects of the form
# {
#   "name": string,
#   "description": string,
#   "tags": [],
#   "imageLink": string,
#   "price": number
# }
# To get the tags array from the tags column, split the string by space and convert to list

data = []

# read the csv file
with open('products.csv', 'r') as file:
    # read the lines

    lines = file.readlines()

    # for each line, split the line by comma and create a dictionary
    for line in lines:
        try:
            line = line.split(',')
            print(float((line[4][:-1])))
            product = {
                'name': line[0],
                'description': line[1],
                'tags': line[2].split(' '),
                'imageLink': line[3],
                # remove the trailing \n from the price
                'price': float(line[4][:-1])
            }
        except Exception as e:
            print(e)
            continue
    
        # append the dictionary to the list
        data.append(product)

# for each object in the list, make a POST request to the API
print(len(data))

for product in data:
    print("adding product " + product['name'])
    response = requests.post('http://localhost:3004/api/product', json=product)
    print(response.text)