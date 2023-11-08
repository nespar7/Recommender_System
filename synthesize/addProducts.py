import requests

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

with open('products.csv', 'r') as file:
    # for each line except title

    for line in file.readlines()[1:]:
        # split the line by comma
        line = line.split(',')
        # create a dictionary
        product = {
            'name': line[0],
            'description': line[1],
            'tags': line[2].split(' '),
            'imageLink': line[3],
            # remove the trailing \n from the price
            'price': float(line[4][:-1])
        }
    
        # append the dictionary to the list
        data.append(product)

# for each object in the list, make a POST request to the API

for product in data:
    response = requests.post('http://localhost:3004/api/product', json=product)
    print(response.text)