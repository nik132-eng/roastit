# Database Setup Guide

## Production Deployment on Vercel

### Step 1: Set up PostgreSQL Database
Choose one of these options:

#### Option 1: Vercel Postgres (Recommended)
1. Go to https://vercel.com/dashboard
2. Select your project
3. Go to "Storage" tab
4. Click "Create Database" → "Postgres"
5. Copy the DATABASE_URL

#### Option 2: Neon (Free PostgreSQL)
1. Go to https://neon.tech/
2. Sign up for free
3. Create a new project
4. Copy the connection string

#### Option 3: Railway (Free PostgreSQL)
1. Go to https://railway.app/
2. Sign up and create a new project
3. Add a PostgreSQL service
4. Copy the connection string

### Step 2: Configure Environment Variables in Vercel
1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add these variables:

```
NODE_ENV=production
NEXTAUTH_URL=https://your-app-name.vercel.app
NEXTAUTH_SECRET=your-strong-random-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
DATABASE_URL=your-postgresql-connection-string
CLOUDINARY_CLOUD_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-cloudinary-key
CLOUDINARY_API_SECRET=your-cloudinary-secret
```

### Step 3: Generate a Strong Secret
Generate a strong NEXTAUTH_SECRET:
```bash
openssl rand -base64 32
```

### Step 4: Deploy
1. Push your code to GitHub
2. Vercel will automatically deploy
3. Database tables will be created during build

## Local Development

### Option 1: Use the same database (Recommended)
1. Use your production database URL locally (safe for development)
2. Update your `.env` file with the production DATABASE_URL

### Option 2: Local PostgreSQL
1. Install PostgreSQL on your machine
2. Create a database: `createdb roastit_dev`
3. Update `.env` with: `DATABASE_URL="postgresql://username:password@localhost:5432/roastit_dev"`

## Important Security Notes
- Never commit `.env.production` to git
- Keep all secrets secure and rotate them regularly
- Use different secrets for development and production
