# Melody Minge
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
- Main Group Page
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



