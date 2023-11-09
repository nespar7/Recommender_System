import paho.mqtt.client as mqtt
from model import model
import json

# Waits on port 1883 for incoming user inputs from the topic recommendations
# When a new user input is received, the model is run and the results are published to the topic recommendations


def on_connect(client, userdata, flags, rc):
    print("Connected with result code "+str(rc))
    client.subscribe("recommendations")


def on_message(client, userdata, msg):
    print(msg.payload)
    # The user input is the array of floats received in the payload
    json_string = msg.payload.decode('utf-8')
    user_input = json.loads(json_string)
    user_input = [float(i) for i in user_input]
    # Run the model
    final_ratings = model(user_input)
    # Convert the results to a list and publish to the topic recommendations
    ratings_string = json.dumps(final_ratings[0].tolist())
    client.publish("getRecommendations", ratings_string)


port = 1883
client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message
client.connect("localhost", port, 60)
client.loop_forever()
