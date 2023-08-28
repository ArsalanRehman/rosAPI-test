import requests

# Set the data to be sent in the request
data = {
    'logType':'test',
    'logInfo':'testing log',
    'logCategory':'test'
}

# uncomment this line if you wanna modify the body as well (also uncomment data object )
response = requests.post(
    'http://127.0.0.1:5050/api/v1/systemlog/createSystemlog', json=data)


# Check the status code of the response
if response.status_code == 200:

    data = response.json()
    print(data)
else:
    # If the status code is not 201, the request was not successful
    print("An error occurred:", response.status_code)