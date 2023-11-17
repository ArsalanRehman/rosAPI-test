import pyautogui
from pynput.mouse import Listener

# Define a list to store mouse click events
click_pattern = []

# Callback function to capture mouse click events
def on_click(x, y, button, pressed):
    if pressed:
        click_pattern.append((x, y))

# Create a listener for mouse clicks
with Listener(on_click=on_click) as listener:
    print("Please click the desired pattern of mouse clicks.")
    listener.join()

while True:
    repeat = input("Do you want to repeat the pattern? (yes/no): ").lower()
    
    if repeat == "yes":
        for x, y in click_pattern:
            pyautogui.click(x, y)
    else:
        break
