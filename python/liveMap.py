import rclpy
from rclpy.node import Node
from nav_msgs.msg import OccupancyGrid
from std_msgs.msg import String  # Add this import
from PIL import Image as PILImage
import io
import base64


class OccupancyGridSubscriber(Node):
    def __init__(self):
        super().__init__('occupancy_grid_subscriber')
        # Create publisher for 'live_map' topic
        self.publisher_ = self.create_publisher(String, 'live_map', 10)

        self.subscription = self.create_subscription(
            OccupancyGrid,
            '/map',
            self.occupancy_grid_callback,
            10
        )

    def occupancy_grid_callback(self, msg):
        # Retrieve occupancy grid properties
        width = msg.info.width
        height = msg.info.height
        data = msg.data

        # Create PIL image from occupancy grid data
        image = PILImage.new('L', (width, height))
        for y in range(height):
            for x in range(width):
                index = y * width + x
                value = data[index]
                inverted_value = 255 if value == 0 else 0
                image.putpixel((x, y), inverted_value)

        # Convert PIL image to Base64 string
        buffered = io.BytesIO()
        image.save(buffered, format='JPEG')
        image_base64 = base64.b64encode(buffered.getvalue()).decode('utf-8')

        # Publish the Base64 encoded image as a string
        msg = String()
        msg.data = image_base64
        self.publisher_.publish(msg)


def main(args=None):
    rclpy.init(args=args)
    occupancy_grid_subscriber = OccupancyGridSubscriber()
    rclpy.spin(occupancy_grid_subscriber)
    rclpy.shutdown()


if __name__ == '__main__':
    main()

# import rclpy
# from rclpy.node import Node
# from nav_msgs.msg import OccupancyGrid
# from std_msgs.msg import String
# from PIL import Image as PILImage
# import io
# import base64
# import time


# class OccupancyGridSubscriber(Node):
#     def __init__(self):
#         super().__init__('occupancy_grid_subscriber')
#         self.publisher_ = self.create_publisher(String, 'live_map', 10)
#         self.subscription = self.create_subscription(
#             OccupancyGrid,
#             '/map',
#             self.occupancy_grid_callback,
#             10
#         )

#     def occupancy_grid_callback(self, msg):
#         # Retrieve occupancy grid properties
#         width = msg.info.width
#         height = msg.info.height
#         data = msg.data

#         # Create PIL image from occupancy grid data
#         image = PILImage.new('L', (width, height))
#         for y in range(height):
#             for x in range(width):
#                 index = y * width + x
#                 value = data[index]
#                 inverted_value = 255 if value == 0 else 0
#                 image.putpixel((x, y), inverted_value)

#         # Convert PIL image to Base64 string
#         buffered = io.BytesIO()
#         image.save(buffered, format='JPEG')
#         image_base64 = base64.b64encode(buffered.getvalue()).decode('utf-8')

#         # Publish the Base64 encoded image as a string
#         msg = String()
#         msg.data = image_base64
#         self.publisher_.publish(msg)


# def main(args=None):
#     rclpy.init(args=args)
#     occupancy_grid_subscriber = OccupancyGridSubscriber()

#     while rclpy.ok():
#         # Execute once every 2 seconds
#         rclpy.spin_once(occupancy_grid_subscriber, timeout_sec=1)
#         time.sleep(1)  # Delay for 2 seconds

#     rclpy.shutdown()


# if __name__ == '__main__':
#     main()
