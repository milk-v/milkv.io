---
sidebar_label: 'Setting Up'
sidebar_position: 20
---

# Set up the working environment

## USBnet setup

We have enabled RNDIS and DHCP on the system by default in order to use USB network.

### Windows

1. Connect the Duo to the computer via Type-C cable

2. The "RNDIS" device appear in the Device Manager

![rndis-step1](/images/duo/rndis-step1.png)

3. Select "RNDIS" and right click to update the driver

![rndis-step2](/images/duo/rndis-step2.png)

4. Select "Browse my computer for drivers"

![rndis-step3](/images/duo/rndis-step3.png)

5. Select "Let me pick from a list of available drivers on my computer"

![rndis-step4](/images/duo/rndis-step4.png)

6. Select "Network adapters"

![rndis-step5](/images/duo/rndis-step5.png)

7. Manufacturer/Model: Microsoft/USB RNDIS Adapter

![rndis-step6](/images/duo/rndis-step6.png)

8. Ignore warning message

![rndis-step7](/images/duo/rndis-step7.png)

9. Driver update successful

![rndis-step8](/images/duo/rndis-step8.png)

10. Check "USB RNDIS Adapter"

![rndis-step9](/images/duo/rndis-step9.png)

11. Find the IP and test the network using ping

![rndis-step10](/images/duo/rndis-step10.png)

### Linux

In general, Linux can use RNDIS without configuration.

### macOS

I'm sorry I couldn't find a way to use RNDIS on the latest macOS. If you know of a way to do this, please feel free to share it.

## SSH

1. Open the terminal, type **ssh root@192.168.42.1**, and answer yes

![rndis-ssh1](/images/duo/rndis-ssh1.png)

2. Enter the password **mlikv** 

    (The password will not be displayed on the screen)

![rndis-ssh2](/images/duo/rndis-ssh2.png)

3. Login successful

![rndis-ssh3](/images/duo/rndis-ssh3.png)

## sysroot
