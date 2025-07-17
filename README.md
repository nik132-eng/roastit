# RoastIt 🔥

Welcome to RoastIt, a full-stack web application where you can share anything—a photo, a drawing, a screenshot—and have the community roast it for fun.

This project was built with the help of an AI software engineering agent.

<img width="1470" height="731" alt="Screenshot 2025-07-18 at 3 45 50 AM" src="https://github.com/user-attachments/assets/82de5302-8077-4644-9c34-c53c434da7e4" />

## Features

*   **Secure User Authentication:** Sign up and sign in using your Google account.
*   **Image Uploads:** Easily upload images with a title using a modern interface.
*   **Cloud Storage:** Images are stored and delivered via Cloudinary for scalability.
*   **The Roast Feed:** A gallery of all user-submitted images on the home page.
*   **Dedicated Roast Pages:** View a single image and all the roasts (comments) it has received.
*   **Interactive Roasting:** Submit your own roasts on any post.
*   **User Profiles:** View a user's profile and all the images they have posted.

## Tech Stack

*   **Framework:** [Next.js](https://nextjs.org/) (React/Node.js)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **Database:** [Prisma](https://www.prisma.io/) ORM with SQLite
*   **Authentication:** [NextAuth.js (Auth.js)](https://next-auth.js.org/)
*   **Image Handling:** [Cloudinary](https://cloudinary.com/)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   [Node.js](https://nodejs.org/en/) (v18 or later recommended)
*   [npm](https://www.npmjs.com/)
*   A [Google Cloud](https://console.cloud.google.com/) account for OAuth credentials.
*   A [Cloudinary](https://cloudinary.com/) account for image storage.

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/YOUR_USERNAME/roastit.git
    cd roastit
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up your environment variables:**
    *   Rename the `.env.example` file to `.env`.
    *   Open the `.env` file and add your credentials. See the file for details on where to find the Google and Cloudinary keys.
    *   Generate a `NEXTAUTH_SECRET` by running the following command in your terminal:
        ```bash
        openssl rand -base64 32
        ```
        Paste the output into the `.env` file.

4.  **Set up the database:**
    *   Prisma will create and set up the SQLite database based on the schema.
    ```bash
    npx prisma db push
    ```

5.  **Run the development server:**
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. You can now sign in, upload images, and start roasting!
