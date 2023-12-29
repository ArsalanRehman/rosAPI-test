import pyautogui

print("Move the mouse to the desired location and press Ctrl+C to exit.")

try:
    while True:
        x, y = pyautogui.position()
        position_str = f"X: {x}, Y: {y}"
        print(position_str, end="\r")
except KeyboardInterrupt:
    print("\nMouse position tracking stopped.")
