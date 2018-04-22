webpackJsonp([0x7896a044853e],{347:function(e,n){e.exports={pathContext:{posts:[{html:'<h1>Completely headless Raspberry Pi 3 B+ setup</h1>\n<p>Start by preparing system for raspberry. Download Rasbian Lite zip file from <a href="https://www.raspberrypi.org/downloads/raspbian/">raspberrypi.org/downloads/raspbian/</a></p>\n<h5>Find the SD card device with <code>diskutil list</code></h5>\n<p>In this case, the SD card is <code>/dev/disk4</code>. DO NOT get this wrong or you may destroy all the data on the wrong disk/card/drive.</p>\n<pre><code>diskutil list\n\n/dev/disk0\n   #:                       TYPE NAME                    SIZE       IDENTIFIER\n   0:      GUID_partition_scheme                        *160.0 GB   disk0\n   1:                        EFI                         209.7 MB   disk0s1\n   2:                  Apple_HFS Macintosh HD            159.2 GB   disk0s2\n   3:                 Apple_Boot Recovery HD             650.0 MB   disk0s3\n/dev/disk1\n   #:                       TYPE NAME                    SIZE       IDENTIFIER\n   0:      GUID_partition_scheme                        *160.0 GB   disk1\n   1:                        EFI                         209.7 MB   disk1s1\n   2:                  Apple_HFS 160GB                   159.7 GB   disk1s2\n/dev/disk2\n   #:                       TYPE NAME                    SIZE       IDENTIFIER\n   0:      GUID_partition_scheme                        *320.1 GB   disk2\n   1:                        EFI                         209.7 MB   disk2s1\n   2:          Apple_CoreStorage                         319.6 GB   disk2s2\n   3:                 Apple_Boot Boot OS X               134.2 MB   disk2s3\n/dev/disk3\n   #:                       TYPE NAME                    SIZE       IDENTIFIER\n   0:                  Apple_HFS Backup                 *319.3 GB   disk3\n/dev/disk4\n   #:                       TYPE NAME                    SIZE       IDENTIFIER\n   0:     FDisk_partition_scheme                        *3.9 GB     disk4\n   1:             Windows_FAT_32                         98.6 MB    disk4s1\n   2:                      Linux                         1.9 GB     disk4s2\n</code></pre>\n<h5>Umount the disk, NOT eject</h5>\n<pre><code>diskutil unmountDisk /dev/disk4\n</code></pre>\n<h5>Write the image to the SD card with <code>dd</code></h5>\n<pre><code>cd ~/Donwloads\n\ndd if=2018-04-18-raspbian-stretch.img of=/dev/rdisk4 bs=1m conv=sync\n</code></pre>\n<p>This might take few minutes to finish.</p>\n<h5>After burning the sd card enable ssh before booting (just create ssh file).</h5>\n<pre><code>cd /Volumes/boot\ntouch ssh\n</code></pre>\n<h5>While beeing in <code>boot</code> direcotry pass credentials for wifi, so that raspberry will automatically find anmd connect to wifi even without monitor, keyboard or mouse.</h5>\n<pre><code>sudo nano wpa_supplicant.conf\n</code></pre>\n<p>The inside of the file should look like this: </p>\n<pre><code>ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev\nnetwork={\n    ssid="YOUR_NETWORK_NAME"\n    psk="YOUR_PASSWORD"\n    key_mgmt=WPA-PSK\n}\n</code></pre>\n<p><code>Ctr+O</code> to save and <code>Ctr+X</code> to close nano. With this file in place, Raspbian will move it in /etc/wpa_supplicant/ when the system is booted.</p>\n<h5>With this configuration you can ssh into you raspberry right after first boot.</h5>\n<p>By default Rasbian has an <code>avahi-daemon</code> which means that you can ssh to the machine with a domain name without knowing the ip address. </p>\n<pre><code>ssh pi@raspberrypi.local\n\npassword: raspberry\n</code></pre>\n<p>You might want to pass your ssh key by <code>ssh-copy-id pi@raspberry.local</code> so that you don\'t have to type your password everytime connecting to raspberry. </p>\n<h5>Chaning host name</h5>\n<p>First open hosts file:\n\nsudo nano /etc/hosts\n\nand change the host for example to this: </p>\n<pre><code>127.0.1.1           wheatherstation\n</code></pre>\n<p>Then open hostname file:\n\nsudo nano /etc/hostname\n\nand change the name to the same as previous one. Finally commit the changes:\n\nsudo /etc/init.d/hostname.sh</p>\n<p>Reboot and check the name change. After that you can do <code>ssh pi@weatherstation.local</code>.</p>\n<h5>And that\'s it - the basic configuration for a developer without spare display, keyboard, mouse, ethernet cable and patience.</h5>\n<p>It is recommended to change the password to smth different than <code>raspberry</code>.\n\npasswd\n\nEnter new UNIX password:\nRetype new UNIX password:\npasswd: password updated successfully</p>\n<p>From here you can do whatever you want with your rasbperry. For example install node.js, add bare git repository with post-receive hooks for code deployment or install mosca client for mqtt broker. It is yout choice!</p>',frontmatter:{date:"2018-04-21",path:"/headless-pi",title:"Completely Headless Raspberry",excerpt:"No keyboard, display, mouse or ethernet needed.",tags:["raspberrypi","setup"]}}],tagName:"raspberrypi"}}}});
//# sourceMappingURL=path---tags-raspberrypi-68ccdfb50e7dfa99e878.js.map