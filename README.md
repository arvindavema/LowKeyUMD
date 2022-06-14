# LowKeyUMD
 ## Overview
This is a react native mobile app allows only UMD students to post anonymous posts that are visible to everyone. However, everyone remains anonymous unless they choose an obvious username. The application is almost done, with some minor cosmetic details requiring my attention. Other than that, the application works as well as twitter. 
 
## Authentication
Authentication is done using Firebase Authentication. All user accounts are created as email/password accounts, and only students with a TERPmail can create an account with this app. 
Upon registration, they recieve an email verification to the provided TERPmail at Sign Up. Once they verify their email, they are granted access to the app. 
The registration only asks for username, terpmail, and a password. No other data is required and every TERPmail address is only allowed 1 account. 

<p float="left">
<img src="./lowkeyImages/login.PNG" alt="login" width="100"/>
<img src="./lowkeyImages/terpsregister.PNG" alt="register" width="100"/>
</p>

## Storage
Firebase Firestore is used to store data about the users and any content and posts they create or interact with. Posts and their content, including their like and dislike counts are stored in firestore and when it is time to render the feed, the app fetches the latest posts and displays the data on the feed screen.

### Heres how a typical feed would look like:

<p float="left">
 <img src="./lowkeyImages/terpspost.PNG" alt="login" width="100"/>
 <img src="./lowkeyImages/terpsresult.PNG" alt="register" width="100"/>
 <img src="./lowkeyImages/terpsfeed.PNG" alt="login" width="100"/>
</p>

### TODO
I need to implement the bottom three tabs still, I havent gotten aroud to it because of school but the trending tab is for posts that are gaining the most likes per hour, bookmarks is for posts the user wants to save for later, and notifications is for recieved notifications about interactions with their posts such as likes and comments from other users.
