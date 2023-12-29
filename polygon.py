import cv2
import numpy as np

def draw_rectangle(input_image_path, output_image_path, x, y, width, height):
    # Read the input image
    image = cv2.imread(input_image_path)

    # Draw a rectangle on the image
    color = (0, 255, 0)  # Green color
    thickness = 2
    image_with_rectangle = cv2.rectangle(image, (x, y), (x + width, y + height), color, thickness)

    # Save the output image
    cv2.imwrite(output_image_path, image_with_rectangle)

    # Display the original and modified images (optional)
    cv2.imshow('Original Image', image)
    cv2.imshow('Image with Rectangle', image_with_rectangle)
    cv2.waitKey(0)
    cv2.destroyAllWindows()

# Example usage:
input_image_path = 'images/1.jpeg'
output_image_path = 'image_with_rectangle.jpeg'
x, y, width, height = 10, 10, 500, 500  # Adjust these values based on your requirements

draw_rectangle(input_image_path, output_image_path, x, y, width, height)
