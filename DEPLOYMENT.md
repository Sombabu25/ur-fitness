# 🚀 Vercel Deployment Guide

This guide will help you deploy the UR Fitness Gym Management System to Vercel.

---

## 📋 Prerequisites

- [x] Vercel account (free at [vercel.com](https://vercel.com))
- [x] MongoDB Atlas account (free tier available)
- [x] GitHub repository with your code
- [x] Node.js 18+ installed locally

---

## 🔧 Step 1: Prepare MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account if you don't have one
3. Create a new cluster (free tier is fine)
4. Create a database user:
   - Go to Database Access → Add New Database User
   - Set username and password (save these!)
5. Whitelist IP addresses:
   - Go to Network Access → Add IP Address
   - Select "Allow Access from Anywhere" (0.0.0.0/0) for Vercel
6. Get your connection string:
   - Go to Database → Connect → Connect your application
   - Copy the connection string (replace `<password>` with your actual password)

Your connection string should look like:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/ur-fitness
```

---

## 🔧 Step 2: Push Code to GitHub

1. Initialize git repository (if not already done):
```bash
git init
git add .
git commit -m "Initial commit"
```

2. Create a new repository on GitHub
3. Push your code:
```bash
git remote add origin https://github.com/yourusername/ur-fitness.git
git branch -M main
git push -u origin main
```

---

## 🔧 Step 3: Deploy to Vercel

### Option A: Using Vercel CLI (Recommended)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy from the project root:
```bash
cd c:/Users/ASUS/Desktop/ur-fitness
vercel
```

4. Follow the prompts:
   - **Set up and deploy?** → Yes
   - **Scope?** → Select your account
   - **Link to existing project?** → No
   - **Project name?** → ur-fitness (or your preferred name)
   - **Directory?** → ./ (current directory)
   - **Override settings?** → No

5. Set environment variables when prompted:
   - `MONGODB_URI` → Your MongoDB Atlas connection string
   - `JWT_SECRET` → Generate a strong random string (use: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)
   - `JWT_EXPIRES_IN` → 7d
   - `NODE_ENV` → production
   - `CLIENT_URL` → Will be your Vercel URL (e.g., https://ur-fitness.vercel.app)
   - `NEXT_PUBLIC_API_URL` → Same as CLIENT_URL + /api (e.g., https://ur-fitness.vercel.app/api)

6. After deployment, note your Vercel URL

7. Update environment variables with the actual URL:
```bash
vercel env add CLIENT_URL production
# Enter: https://your-app.vercel.app

vercel env add NEXT_PUBLIC_API_URL production
# Enter: https://your-app.vercel.app/api
```

8. Redeploy to apply changes:
```bash
vercel --prod
```

### Option B: Using Vercel Dashboard

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset** → Next.js
   - **Root Directory** → `./`
   - **Build Command** → `npm run build:client`
   - **Output Directory** → `client/.next`
5. Add environment variables:
   - Go to Settings → Environment Variables
   - Add all the variables listed in Option A step 5
6. Click "Deploy"
7. After deployment, update `CLIENT_URL` and `NEXT_PUBLIC_API_URL` with your actual Vercel URL
8. Redeploy from the dashboard

---

## 🔧 Step 4: Seed Database (Optional)

If you want to seed the database with initial data:

1. Run the seed script locally with your production MongoDB URI:
```bash
cd server
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ur-fitness npm run seed
```

Or create a Vercel cron job / run it manually from the Vercel dashboard.

---

## ✅ Step 5: Verify Deployment

1. Visit your Vercel URL
2. Check the public homepage loads
3. Try the admin login:
   - Go to `/admin/login`
   - Use seeded credentials: `admin@urfitness.com` / `admin123`
4. Test the membership checker
5. Verify API health: `https://your-app.vercel.app/api/health`

---

## 🔄 Step 6: Set Up Custom Domain (Optional)

1. Go to your project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed by Vercel
4. Update environment variables:
   - `CLIENT_URL` → Your custom domain
   - `NEXT_PUBLIC_API_URL` → Your custom domain + /api

---

## 🐛 Troubleshooting

### Build Errors
- Ensure all dependencies are installed: `npm run install:all`
- Check that `vercel.json` is in the root directory

### API Errors
- Verify `MONGODB_URI` is correct and IP is whitelisted
- Check `JWT_SECRET` is set
- Ensure `CLIENT_URL` matches your Vercel domain

### CORS Issues
- Make sure `CLIENT_URL` environment variable is set correctly
- Check that the API URL includes `/api` suffix

### Database Connection Issues
- Verify MongoDB Atlas cluster is running
- Check IP whitelist includes 0.0.0.0/0
- Ensure database user has correct permissions

---

## 📝 Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster.mongodb.net/ur-fitness` |
| `JWT_SECRET` | Secret key for JWT tokens | `random-32-char-string` |
| `JWT_EXPIRES_IN` | JWT token expiration | `7d` |
| `NODE_ENV` | Environment | `production` |
| `CLIENT_URL` | Frontend URL for CORS | `https://ur-fitness.vercel.app` |
| `NEXT_PUBLIC_API_URL` | API URL for frontend | `https://ur-fitness.vercel.app/api` |

---

## 🎯 Production Best Practices

1. **Security**:
   - Use strong, unique `JWT_SECRET`
   - Enable MongoDB Atlas authentication
   - Use environment variables for all sensitive data

2. **Performance**:
   - Enable MongoDB Atlas indexing
   - Use Vercel's Edge Network
   - Optimize images in Next.js

3. **Monitoring**:
   - Enable Vercel Analytics
   - Set up MongoDB Atlas monitoring
   - Check Vercel logs for errors

4. **Backups**:
   - Enable MongoDB Atlas automated backups
   - Keep your code backed up on GitHub

---

## 📞 Support

If you encounter issues:
- Check Vercel deployment logs
- Review MongoDB Atlas logs
- Verify all environment variables are set
- Ensure your code is pushed to GitHub

---

**Happy deploying! 🚀**
