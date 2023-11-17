import subprocess
import time
def get_router_mac_address(router_ip):
    try:
        arp_output = subprocess.check_output(["arp", "-n", router_ip])
        arp_output = arp_output.decode("utf-8").strip()

        # Find the MAC address in the arp output
        for line in arp_output.splitlines():
            if router_ip in line:
                mac_address = line.split()[2]
                return mac_address
        else:
            return None

    except subprocess.CalledProcessError:
        print("Error: Unable to retrieve router MAC address.")
        return None

router_ip_address = "192.168.109.10"

while True:
    router_mac_address = get_router_mac_address(router_ip_address)

    if router_mac_address:
        print(f"Router MAC Address: {router_mac_address}")
    else:
        print("Router MAC Address not found.")

    time.sleep(3)