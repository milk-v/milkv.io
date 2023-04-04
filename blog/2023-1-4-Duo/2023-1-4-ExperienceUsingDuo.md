# Experience using Duo
As an engineer who was not involved in the development of Duo, I received the first MilkV Duo MPU for the entire company and was told by my colleagues that my experience was critical to the subsequent optimization of Duo and that I was expected to talk about Duo's performance in application scenarios from a developer's perspective. The benefit of Duo is that he can run Linux and even AliOS at the same time, making it very simple for me to perform many control operations via software.

## Smart door locks
The vast majority of smart locks today are unlocked with a password, which can be accomplished with a very common MPU. Face-recognition smart door locks are very expensive, and manufacturers must invest a significant amount of money in custom development. With the introduction of ***Duo***, such scenarios now have a new solution.  

Face recognition and door lock motor control are the two primary functional modules of smart door locks.  

And because ***Duo*** runs Linux and AliOS, we can easily deploy face recognition algorithms on the system. I chose to take advantage of Duo's AMP feature. I ran the CenterFace algorithm on my PC to generate a minimal model, which I then deployed on Duo's AliOS-Things, while Linux was used to control the opening and closing of door locks and other functions, allowing the face recognition module to run more reliably and with less impact on performance. I did not optimize or validate the model's recognition accuracy, but the actual running results satisfy the smart door lock scenario.
Please keep in mind that if you are training your model with PyTorch, you must convert it to an ONXX model. Because ***Duo*** only supports ***ONXX*** and ***Caffe*** at the moment.
## End
In the above section, I have shared the simple idea of Duo based development. To be honest, I realized near the end of the development that a development board with such powerful features is smaller than a credit card in appearance. Thanks to the engineers who developed Duo, Duo has made it easier for me to tackle AIoT projects and to be able to finish developing smart products more easily.  
Duo will be ready to meet you soon and believe me, you will experience the excitement when Duo is actually in your hands!