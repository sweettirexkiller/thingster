---
path: "/git-device-deploy"
date: "2018-04-22"
title: "Deploy code to embedded device with Git!"
tags: ['git', 'deploy', 'hooks', 'repository']
excerpt: "Send your code to device without usb, scp, rsync. Fast workflow."
---

# Deploy code to embedded device with Git

Connect to your device and create directory for bare repository.

    ssh pi@raspberry.local
    mkdir -p mycode.git && cd $_
    
Create Bare repository. 

    git init --bare
    
 > **Bare repository** is one without the copy of code but only with its versions (history of changes/commits)
 
Go into hooks directory and create a hook script file. 

    cd hooks
    touch post-receive
    
In the `post-receive` write the following: 

    #!/bin/sh
    git --work-tree=/path/to/deployment --git-dir=/home/pi/mycode.git checkout -f
  
 Explanation: `--work-tree` tells where the hook should redirect code to and `--git-dir` directs to the repository directory (so that git can compare histories).
 
 Make sure that the file is executable
 
    chmod +x post-receive
    
Now in your *local* version of repository add a ***new remote***

    git add remote mydevice ssh://pi@raspberry/home/pi/mycode.git

After that you are almost ready! Run the test push: 

     touch test.txt
     git add text.txt
     git commit -m "test"
     git push remote mydevice master
Now on your device go to: `/path/to/deployment`. You should see: 

    
     cd /path/to/deployment
     ls -al  
     ... 
     test.txt
     ...
That's it! Hope it helped! Cheers!

<style type="text/css">
  
</style>