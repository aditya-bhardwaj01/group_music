# Melody Minge
This is an application where users can easily create account, make different groups with family/friends with different name in each group and vibe on same song at a time, along with chatting with others.

# Contents
- Steps to run on your local machine
  - Using docker (need to have docker installed on you system)
  - Normal setup
- Technologies Used
- Database design
- Landing Page
- Signup Page
- Login Page
- Profile Page
- Main Music Page
- Chat

## Steps to run on your local machine
### Using docker
- Running the app using the docker container is the simplest way to run this app.
- All you need to have is Docker on you system.
- Then go to the root repository of the project containing client folder, server folder, compose.yml, group_music.sql.
- Open the terminal at that location and run the command `docker-compose up`
- The app is up and running on localhost:3000

### Normal setup
- You need to have Node and MySQl installed on your system.
- Import the group_music.sql file to whichever database client you are using (MySQl workbench or phpMyAdmin)
- Navigate to the server folder and run the 2 commands `npm install` and `npm start`.
- Now go to the client folder and run the 2 commands `npm install` and `npm run dev`.
- The application is up and running on localhost:3000

## Technologies used
- ReactJS for frontend
- ExpressJS for backend
- MySQL for database
- Docker for containerization
- Used WebSocket for chat and music synchronization among all members of a group
- Spotify's API for getting the song and all it's details

## Database design
- Users table containing the user data
  ![image](https://github.com/user-attachments/assets/3d6a6901-5900-4805-b631-52a78b272247)
- Groupsdata table for storing the details of each group
  ![image](https://github.com/user-attachments/assets/d6801af2-b34b-4389-b524-e71cea699219)
- Members table for storing the details of the members in every group
  ![image](https://github.com/user-attachments/assets/047a59c6-0fcf-4326-8537-cc1b7cc324df)
- Groupmusicdetails table for storing the data of the music played in every group
  ![image](https://github.com/user-attachments/assets/51a9289b-2248-4f08-ac35-aca92ff435c7)
- Chatmessages table for storing the chat messages of every group
  ![image](https://github.com/user-attachments/assets/884edcf6-42e6-46f7-9dc9-bcad0e8d6ad7)

## Landing Page
- Click on the Login button to Login if you already have an account.
- Click on the Signu free to create an account
  ![image](https://github.com/user-attachments/assets/88b72f7e-82ba-4c24-b13c-49d714d8e63a)

## Signup page
- Provide your mail and name to proceed with you account creation.
- After this step user will have to enter an OTP received on his email and then he can set his password
  ![image](https://github.com/user-attachments/assets/e9c7d4fb-0c9e-4b59-905d-4570e09442fd)

## Login page
- Provide your email and password for logging in to your account.
- Users also have the privilage to reset his password if forgotten.
  ![image](https://github.com/user-attachments/assets/326d6646-e1c7-4de8-8959-6acb855a283a)

## Profile page
- There are 3 sections in the profile page - Home, Groups for which you are admin, Groups in which you are a member
- You can navigate to each section using the 3 buttons present on the left of the screen
- The last button is the logout button
  ![image](https://github.com/user-attachments/assets/77f1b013-3b21-46b3-8e85-cd59a41c0cba)

### Creating or Joining a group (Home section - Section 1)
- On clicking "Create Group" button the below form will appear.
- After providing the name for the group and you display name for that group you will get a secret code.
- Others can use this code to join the group you have created.
  ![image](https://github.com/user-attachments/assets/7bbbe341-4f3c-4af0-8a1d-df2cfa3568d6)
- For joining a group you can click on "Join Group" button on the Home section and give the needed details to become member of the group
  ![image](https://github.com/user-attachments/assets/a6e83231-7ce6-44d8-85ab-f8bc79f56611)

### Admin Groups (Section 2)
- You can vies the list of all the groups where you re admin
- You can hover on any group to either join or even view more details of the group.
- You also have the functionality of searching a group.
  ![image](https://github.com/user-attachments/assets/1dd8ea8b-84c1-493f-8d7c-5cc4ab10615f)
  ![image](https://github.com/user-attachments/assets/f25f1459-1c97-4b77-9f6d-0277495b2b36)

### Member Groups (Section 3)
- Similar to above section here you can view the groups where you are a member, join it or view the details
  ![image](https://github.com/user-attachments/assets/ae4711eb-9900-45c7-bd3c-856b2c4fb9f9)

## Main Music page
- On joining any group this is what the users will see
  ![image](https://github.com/user-attachments/assets/52224175-f308-4125-9b47-29658e187ccf)
- There are 4 main sections for showing the songs and artists similar to song which is currently getting played, top songs sung by any artist you click on and similar songs on any genre of your choice (Dance, Children, Classical ...)
- If another member of the group joins the groups at the same time when you are playing a song he will be able to hear the same song.
- If any member of the group pause the song it will be paused for all the members of the group and vice-versa.
- If any member changes the song it will be changed for all the users of the group.
- WebSocket protocol is being used for ensuring such synchronization.
- Users also have the previlage of searching songs, artists, albums and playlist in the top bar
  ![image](https://github.com/user-attachments/assets/1bc69de8-82d6-43a1-82d6-d9ff857edbbf)
- The bottom bar shows the progress and details of the song currently being playes
- Users can also see more details of any artists or song by clicking on the "View More" button
  ![image](https://github.com/user-attachments/assets/7b9cf0e2-e843-41fb-a695-14bc8645a09a)
- He can also see any artist or song on Spotify by clicking on "View on Spotify" button
  
## Chat
- Users can chat with all other members of the group and chat and also view the online/offline status of other members
- Chat for all the groups are different and isolated with each other.
  ![image](https://github.com/user-attachments/assets/0ddf4eb2-a781-4c37-b025-888a82f6fd9a)
