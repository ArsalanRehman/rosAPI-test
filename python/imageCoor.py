# import matplotlib.pyplot as plt
# import numpy as np

# def onclick(event):
#     if event.xdata is not None and event.ydata is not None:
#         x = int(round(event.xdata))
#         y = int(round(event.ydata))
#         print(f"Clicked at (x, y) = ({x}, {y})")

# def main():
#     # Load your image here, for example:
#     image = plt.imread("images/1.jpeg")

#     fig, ax = plt.subplots()
#     ax.imshow(image)

#     plt.connect('button_press_event', onclick)
#     plt.title("Click on an image point to get its pixel coordinates")

#     plt.show()

# if __name__ == "__main__":
#     main()

# import matplotlib.pyplot as plt
# import numpy as np

# def onclick(event):
#     if event.xdata is not None and event.ydata is not None:
#         x = int(round(event.xdata))
#         y = int(round(event.ydata))
        
#         # Flip the y-coordinate with respect to the height of the image
#         height = image.shape[0]
#         new_y = height - abs(y)
        
#         print(f"Clicked at (x, y) = ({x}, {new_y})")

# def main():
#     # Load your image here, for example:
#     image = plt.imread("images/1.jpeg")

#     fig, ax = plt.subplots()
#     ax.imshow(image)

#     plt.connect('button_press_event', onclick)
#     plt.title("Click on an image point to get its pixel coordinates with flipped y-axis")

#     plt.show()

# if __name__ == "__main__":
#     main()

import matplotlib.pyplot as plt
import numpy as np

def onclick(event, image):
    if event.xdata is not None and event.ydata is not None:
        x = int(round(event.xdata))
        
        # Flip the y-coordinate with respect to the height of the image
        height = image.shape[0]
        y = int(round(height - event.ydata))
        
        print(f"Clicked at (x, y) = ({x}, {y})")

def main():
    # Load your image here, for example:
    image = plt.imread("images/1.jpeg")

    fig, ax = plt.subplots()
    ax.imshow(image)

    # Pass the image as an argument to the onclick function
    plt.connect('button_press_event', lambda event: onclick(event, image))
    plt.title("Click on an image point to get its pixel coordinates with flipped y-axis (bottom-left reference)")

    plt.show()

if __name__ == "__main__":
    main()
