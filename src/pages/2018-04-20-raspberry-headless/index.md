---
path: "/headless-pi"
date: "2018-04-21"
title: "Completely Headless Raspberry"
tags: ['raspberrypi', 'setup']
excerpt: "No keyboard, display, mouse or ethernet needed."
---
# Completely headless Raspberry Pi 3 B+ setup

Start by preparing system for raspberry. Download Rasbian Lite zip file from [raspberrypi.org/downloads/raspbian/](https://www.raspberrypi.org/downloads/raspbian/)

##### Find the SD card device with `diskutil list`

In this case, the SD card is `/dev/disk4`. DO NOT get this wrong or you may destroy all the data on the wrong disk/card/drive.

	diskutil list

	/dev/disk0
	   #:                       TYPE NAME                    SIZE       IDENTIFIER
	   0:      GUID_partition_scheme                        *160.0 GB   disk0
	   1:                        EFI                         209.7 MB   disk0s1
	   2:                  Apple_HFS Macintosh HD            159.2 GB   disk0s2
	   3:                 Apple_Boot Recovery HD             650.0 MB   disk0s3
	/dev/disk1
	   #:                       TYPE NAME                    SIZE       IDENTIFIER
	   0:      GUID_partition_scheme                        *160.0 GB   disk1
	   1:                        EFI                         209.7 MB   disk1s1
	   2:                  Apple_HFS 160GB                   159.7 GB   disk1s2
	/dev/disk2
	   #:                       TYPE NAME                    SIZE       IDENTIFIER
	   0:      GUID_partition_scheme                        *320.1 GB   disk2
	   1:                        EFI                         209.7 MB   disk2s1
	   2:          Apple_CoreStorage                         319.6 GB   disk2s2
	   3:                 Apple_Boot Boot OS X               134.2 MB   disk2s3
	/dev/disk3
	   #:                       TYPE NAME                    SIZE       IDENTIFIER
	   0:                  Apple_HFS Backup                 *319.3 GB   disk3
	/dev/disk4
	   #:                       TYPE NAME                    SIZE       IDENTIFIER
	   0:     FDisk_partition_scheme                        *3.9 GB     disk4
	   1:             Windows_FAT_32                         98.6 MB    disk4s1
	   2:                      Linux                         1.9 GB     disk4s2

##### Umount the disk, NOT eject

	diskutil unmountDisk /dev/disk4

##### Write the image to the SD card with `dd`

	cd ~/Donwloads

	dd if=2018-04-18-raspbian-stretch.img of=/dev/rdisk4 bs=1m conv=sync
This might take few minutes to finish.

##### After burning the sd card enable ssh before booting (just create ssh file).

	cd /Volumes/boot
	touch ssh

##### While beeing in `boot` direcotry pass credentials for wifi, so that raspberry will automatically find anmd connect to wifi even without monitor, keyboard or mouse. 

	sudo nano wpa_supplicant.conf
The inside of the file should look like this: 

	ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
	network={
	    ssid="YOUR_NETWORK_NAME"
	    psk="YOUR_PASSWORD"
	    key_mgmt=WPA-PSK
	}
	
`Ctr+O` to save and `Ctr+X` to close nano. With this file in place, Raspbian will move it in /etc/wpa_supplicant/ when the system is booted.

##### With this configuration you can ssh into you raspberry right after first boot. 

By default Rasbian has an `avahi-daemon` which means that you can ssh to the machine with a domain name without knowing the ip address. 

	ssh pi@raspberrypi.local
	
	password: raspberry
	
You might want to pass your ssh key by `ssh-copy-id pi@raspberry.local` so that you don't have to type your password everytime connecting to raspberry. 


##### Chaning host name

First open hosts file: 
	
	sudo nano /etc/hosts
	
and change the host for example to this: 

	127.0.1.1           wheatherstation
	
Then open hostname file: 
	
	sudo nano /etc/hostname
	
and change the name to the same as previous one. Finally commit the changes: 
	
	sudo /etc/init.d/hostname.sh

Reboot and check the name change. After that you can do `ssh pi@weatherstation.local`.

##### And that's it - the basic configuration for a developer without spare display, keyboard, mouse, ethernet cable and patience. 

It is recommended to change the password to smth different than `raspberry`.
	
	passwd
	
	Enter new UNIX password:
	Retype new UNIX password:
	passwd: password updated successfully

From here you can do whatever you want with your rasbperry. For example install node.js, add bare git repository with post-receive hooks for code deployment or install mosca client for mqtt broker. It is yout choice!