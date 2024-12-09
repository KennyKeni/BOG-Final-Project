# Project 2 - Animal Training App

## Description
Welcome to the final project of this year's dev bootcamp! For this project, you will create a full-stack animal training management app (this is a mini version of an app that BoG developed for Healing4Heroes). Your job is to develop a frontend and backend that interact with each other for deployment functionality to manage different users, animals, and training logs. Schemas for these data models can be found in `Schemas.md`.

There are a lot of "bonuses" included in the specifications in this project. We recommend completing all other requirements first and then working on getting through as many bonuses as you're able to. Bonuses aren't required but provide extra credit opportunities.

## Submission
- Present your final project during class on 11/19/24
- **Due: 11/19/24**

## Getting Started
- Create **one** fork of this repository for your entire group, titled project2-f23-[groupname]
- Set the owner of the repository to BoG-Dev-Bootcamp-F24
- Each group member should clone the repository locally, and run `npm install` in the project folder
- You should generate a Next.js app using create-next-app as mentioned in class https://nextjs.org/docs/app/api-reference/cli/create-next-app
- Create a MongoDB Atlas Cluster and share with all group members
- Create a `.env` file in the root for all your environment variables

## Frontend Specifications
We will be incorporating all we have learned thus far such as CSS, components, hooks/state, conditional rendering, and routing! Here's a link to the [Figma designs](https://www.figma.com/file/8nmpzRec6atkZMdXYXH0bW/AnimalTrainingApp?type=design&node-id=0%3A1&mode=design&t=v1XLulgKlPSI40S2-1). We recommend following the general organization of these designs, but feel free to have creative freedom in designing the frontend.

### Log In Page
<img width="600" alt="Screenshot 2023-11-09 at 5 46 35 PM" src="https://github.com/BoG-Dev-Bootcamp-F23/project2-f23/assets/8647920/487260fd-8c0a-44dd-88e2-04cc2b568b42">

- This page will be the first page to display when running the application
- It should allow a user to input their email and password and click a login button
    - If the log in is successful (handled in backend verification), we are routed to the Training Logs Dashboard
    - If the log in is unsuccessful (which you can determine using the verify endpoint) then there is some error message (hint: use conditional rendering) to inform the user of the issue and remains on the Log In page
    - Refer to [Next.js documentation](https://nextjs.org/docs/pages/building-your-application/routing/linking-and-navigating) for how routing and navigation work in Next (it's mostly the same as React)
- It also has a link to the Create Account Page in case the user does not have an account
- **Important:** Make sure to track the user's id either through props or [custom hooks](https://react.dev/learn/reusing-logic-with-custom-hooks) (a cleaner way to do it) as you route to other pages

### Create Account Page
<img width="600" alt="Screenshot 2023-11-09 at 5 46 51 PM" src="https://github.com/BoG-Dev-Bootcamp-F23/project2-f23/assets/8647920/a6f3e15f-3c24-4bd2-ad73-592fe93e6731">

- There will be four inputs on this page: Full Name, Email, Password, and Confirm Password
- We will also have a checkbox for if the user is an Admin or not
- There will be a clickable Sign Up button that once clicked:
    - First compares Password and Confirm Password inputs and if they do not match notifies the user and keeps the user on the page
    - Second handles creating a user using your backend code
        - If creating the user was successful then it routes to the Training Logs Dashboard
        - If creating the user was unsuccessful then there is some display to inform the user of the issue and remains on the create account page
- Below the button, there will also be a link to the Log In Page in case the user has already made an account
- **Important:** Make sure to track the user's id either through props or [custom hooks](https://react.dev/learn/reusing-logic-with-custom-hooks) (a cleaner way to do it) as you route to other pages

### Training Logs Dashboard
<img width="600" alt="Screenshot 2023-11-09 at 5 47 03 PM" src="https://github.com/BoG-Dev-Bootcamp-F23/project2-f23/assets/8647920/7c600de3-89ed-4622-bb44-8e1e154f422e">

- This page will have the sidebar and (bonus) search bar components along with displaying all training logs that the current user has for all of their animals.
- Training Log Components display the title, date of the log, user's name, animal's name, animal's breed, hours logged, and the description of the log. They are ordered by date.
- There is also a button that, when clicked, navigates to a form to create a training log that has inputs for title, description hours, and animal id only as the user id should already tracked with a hook and the date should just be the current date (for animal id you will have to manually input an animal id here).
    - If the creation is successful then it just goes back to the dashboard
    - If the creation is unsuccessful it stays on the form and notifies the user or the error
- (Bonus) Include an option to edit existing training logs. This would involve navigating to a similar form as the training log creation form, except the form inputs are all prefilled with the current data

### Animals Dashboard
<img width="600" alt="Screenshot 2023-11-09 at 5 47 21 PM" src="https://github.com/BoG-Dev-Bootcamp-F23/project2-f23/assets/8647920/a9759339-1caa-4326-bce3-56d7b3ddc47f">

- This page will have the sidebar and (bonus) search bar components along with displaying all animals that the current user owns.
- Animal components display an image of the animal from a Google image URL string, its name, breed, owner, and hours it has been trained thus far.
- There is also a button that when clicked displays a form to create an animal that has inputs for name, breed, hoursTrained, and a profile picture url only as user id should already tracked with a hook.
    - If the creation is successful then it just goes back to the dashboard
    - If the creation is unsuccessful it stays on the form and notifies the user or the error

### Sidebar Component
<img width="128" alt="Screenshot 2023-11-09 at 5 48 59 PM" src="https://github.com/BoG-Dev-Bootcamp-F23/project2-f23/assets/8647920/efd8344a-a402-475e-bd5d-8ea650353043">

- This component will hold links to the training log dashboard and animal dashboard.
- If the current user is an admin it will also display links to the Admin View Pages (you can use the return from the verify endpoint to determine this).
- At the bottom, it will display the current user's name and if the user is an admin or not as well as a link to log out (which navigates to the Log In page)

### Admin View Pages
- You will create three pages to display all users, training logs, and animals in the database regardless of the user along with the sidebar and (bonus) search bar components. Refer to the Figma for what they should look like.

### (Bonus) Search Bar Component
<img width="600" alt="Screenshot 2023-11-09 at 5 49 13 PM" src="https://github.com/BoG-Dev-Bootcamp-F23/project2-f23/assets/8647920/ac885c28-fcba-4806-933b-eb324877d438">

- This component is a simple search bar that either filters components when you click an enter button next to the search or as you type without using a button.
- For animal/user pages the search limits by the name of the animal/user and for training log pages the search limits by the title of the training log.

## Backend Specifications
- We will be incorporating all we have learned thus far such as API endpoints and database querying!
- Create all endpoints in `src/pages/api`

### Create Operations
- Create a POST endpoint at `/api/user` to create a user in the database based on information passed into the body
- Create a POST endpoint at `/api/animal` to create an animal in the database based on information passed into the body
- Create a POST endpoint at `/api/training` to create a training log in the database based on information passed into the body
- Note these requests will have a similar request body and response statuses:
    - Body: A JSON containing the user/animal/training log information for the user/animal/training log we want to create
    - Response:
        - **Status 200 (Success):** If the body contains all of the information and is able to create the user/animal/training log
        - **Status 400:** If the body contains incorrect information
        - **Status 500:** For any other errors that occur
- (Bonus) In the `POST /api/training` endpoint, we want to add a check to ensure that the animal specified in the training log belongs to the user specified in the training log. Add in code to do this.
    - Response:
        - **Status 400:** If the training log animal is not owned by specified user

### Update Operations
- Create a PATCH endpoint at `/api/animal` to update the `hoursTrained` of an animal whenever a new training log is made or updated
- (Bonus) Create a PATCH endpoint at `/api/training` to edit the info of a training log.
- Note these requests will have a similar request body and response statuses:
    - Body: A JSON containing the animal/training log id for the animal/training log we want to edit along with the information we want to update
    - Response:
        - **Status 200 (Success):** If the body contains all of the information and is able to update the animal/training log
        - **Status 400:** If the body contains incorrect information (i.e. an animal doesn't exist)
        - **Status 500:** For any other errors that occur

### Read Operations
- We want to add admin functionality to this backend API to allow the admins to view all the data in the database
    - Create a GET endpoint at `/api/admin/users` which will return all of the users in the database (not with their passwords)
    - Create a GET endpoint at `/api/admin/animals` which will return all of the animals in the database
    - Create a GET endpoint at `/api/admin/training` which will return all of the training logs in the database
    - Response:
        - **Status 200 (Success):** If we are able to retrieve the users/animals/training logs
        - **Status 500**: For any other errors
    - (Bonus) These three endpoints can implement pagination -- ideally using the document IDs or some other property that has natural ordering (i.e. take a look at approach 2 in this [article](https://www.codementor.io/@arpitbhayani/fast-and-efficient-pagination-in-mongodb-9095flbqr))

### Verify User
- Create a POST endpoint at `/api/user/verify` that determines if both the email and password match a user in the database for login. Returns both the user's id and true/false depending on whether the user is an admin or not.
    - Response:
        - **Status 200 (Success):** If the user info is valid
        - **Status 500**: If the user info is not valid

### (Bonus) Delete Operations
- Incorporate a way to delete users, animals, and training logs (which would cause animal `hoursTrained` to be decremented) and follow similar response formats as before for error handling.

### (Bonus) Encryption
- Encrypt the user password when storing in the database via hashing (we recommend using the [bcrypt](https://www.npmjs.com/package/bcryptjs) library)
- When we verify a user make sure to compare what is stored in the database with an encrypted version of the login password input.

### (Bonus) JWT Authentication
- Instead of tracking user info using a hook, incorporate JWT authentication and use cookies to track user information.
