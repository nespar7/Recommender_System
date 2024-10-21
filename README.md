# Recommendation System for clothing store

## Authors
[Surya Prakash](https://www.github.com/nespar7)
[Burra Nithish](https://github.com/nithishnani-277)
[Jay Kumar Thakur](https://github.com/jkt10125)
[Virinchi Mourya Peddireddy](https://github.com/kreiger444)

## Create and populate database
## How to configure your own database:
* Create an account in MongoDB Atlas and create a project.
* Create a database using the free plan.
* After creating, you would be asked to create your first user. Set up username and password.
* Click on the connect button shown next to your cluster name and then choose the `Drivers` option.
* You will see an instruction saying `connection string` and a string in this format `mongodb+srv://<username>:<password>@cluster0.eurdb3t.mongodb.net/?retryWrites=true&w=majority`. Add your username and password and copy the string.
* Make sure to add your ip address in the accepted address list. set it to accept 0.0.0.0/0 to accept from all addeesses.
* Paste it in place of the similar string in the environment folder(`local-folder/api/.env`) as `MONGO_URL="your_connection_string"`
* Run the api using `nodemon` in the api directory
* Run the product generator using the [generator](./model/synthesize/generateProducts)
* Run [product adder](./model/synthesize/generateProducts) to add products to mongo]
  
## Creating Mqtt broker
* Create an EC2 instance in AWS console with the free tier. Almost all of it can be left at default, the OS should be Ubuntu
* Connect to the EC2 instance. AWS console gives a pretty good UI for this.
* Run these commands for installing Mosquitto.
    1. sudo apt update
    2. sudo apt install -y mosquitto mosquitto-clients
    3. sudo systemctl enable mosquitto
    4. sudo nano /etc/mosquitto/mosquitto.conf
        * Add these two lines at the end of the file using nano
        * `allow_anonymous true`
        * `listener 1883`
    6. sudo systemctl restart mosquitto
* Your mqtt broker should be up and running

## Running the api and client
* Add another line `INSTANCE_PUBLIC_URL="your_instance_url"` in the [api env file](./api/.env) and the [model env file](./model/.env)
* Run the api using `nodemon`
* Run the client using `npm start`
* Run the model using `python connection.py`
