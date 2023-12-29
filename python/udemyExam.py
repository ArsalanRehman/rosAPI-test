
import pyautogui
import time
from pynput import keyboard

# Set the failsafe to True (moving the mouse to the top-left corner will terminate the script)
pyautogui.FAILSAFE = True

terminate_shortcut = {keyboard.Key.ctrl, keyboard.KeyCode.from_char('c')}
current_keys = set()

def on_press(key):
    if any([key in shortcut for shortcut in [terminate_shortcut]]):
        current_keys.add(key)
        if any(all(k in current_keys for k in shortcut) for shortcut in [terminate_shortcut]):
            print("Script terminated by user.")
            return False
    return True

def on_release(key):
    try:
        current_keys.remove(key)
    except KeyError:
        pass

def click_at_location(x, y, num_clicks):
    time.sleep(5)  # Wait for 5 seconds 
    with keyboard.Listener(on_press=on_press, on_release=on_release) as listener:
        try:
            for _ in range(num_clicks):
                pyautogui.click(x, y)
                time.sleep(1)
        except pyautogui.FailSafeException:
            print("Script terminated due to mouse moving to the top-left corner.")
        finally:
            listener.stop()

# coordinates 
click_location = (1705, 1048)
            

# number of clicks
num_clicks = 92

#  perform the clicks
click_at_location(*click_location, num_clicks)
