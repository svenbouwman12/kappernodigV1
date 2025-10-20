# Kapper Nodig - Monorepo

Dit project is opgesplitst in een monorepo structuur met aparte frontend en backend voor deployment op Vercel.

## Project Structuur

```
/
├── frontend/          # React + Vite frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vercel.json
├── backend/           # Node.js + Express backend
│   ├── api/
│   ├── supabase/
│   ├── index.js
│   ├── package.json
│   └── vercel.json
└── README.md
```

## Lokaal Ontwikkelen

### Frontend Starten

```bash
cd frontend
npm install
cp env.example .env
# Vul je Supabase credentials in .env
npm run dev
```

Frontend draait op: http://localhost:5173

### Backend Starten

```bash
cd backend
npm install
cp env.example .env
# Vul je Supabase credentials in .env
npm run dev
```

Backend draait op: http://localhost:3001

## Environment Variables

### Voor Lokale Ontwikkeling
Kopieer `env.example` naar `.env` in de root directory en vul de waarden in:

```bash
cp env.example .env
```

### Frontend Environment Variables
```bash
# Voor lokale ontwikkeling
VITE_API_URL=http://localhost:3001

# Voor productie (na backend deployment)
VITE_API_URL=https://your-backend-url.vercel.app

# Supabase Configuration
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Backend Environment Variables
```bash
PORT=3001
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
GEOCODE_JOB_TOKEN=your_secure_random_token
OPENCAGE_API_KEY=your_opencage_key  # Optioneel
```

### Waar vind je deze waarden?
- **Supabase**: Ga naar je project → Settings → API
- **OpenCage**: Registreer op [opencagedata.com](https://opencagedata.com) (optioneel)
- **Geocode Token**: Maak een willekeurige string voor authenticatie

## Deployment op Vercel

### Frontend Deployen
1. Push code naar GitHub
2. Verbind repository met Vercel
3. Selecteer `/frontend` als root directory
4. Vercel detecteert automatisch Vite configuratie
5. Voeg environment variables toe in Vercel dashboard

### Backend Deployen
1. Push code naar GitHub
2. Maak nieuwe Vercel project
3. Selecteer `/backend` als root directory
4. Vercel detecteert automatisch Node.js configuratie
5. Voeg environment variables toe in Vercel dashboard

### Deployment Status
- ✅ Monorepo structuur klaar
- ✅ Vercel configuratie geoptimaliseerd
- ✅ Environment variables gedocumenteerd
- ✅ Root vercel.json toegevoegd voor backend deployment
- ✅ Vercel project settings geconfigureerd (Root Directory: backend)

### Environment Variables voor Production

Na deployment, update de frontend environment variable:
```
VITE_API_URL=https://your-backend-url.vercel.app
```

## Wat is Aangepast

1. **Monorepo Structuur**: Project opgesplitst in `/frontend` en `/backend` mappen
2. **Frontend Verplaatsing**: Alle React/Vite bestanden naar `/frontend`
3. **Backend Verplaatsing**: API bestanden naar `/backend` met Express server
4. **Package.json**: Aparte package.json voor frontend en backend
5. **API Service**: Nieuwe `src/lib/api.js` voor backend communicatie
6. **Environment Variables**: Voorbeeld .env bestanden voor beide mappen
7. **Vercel Configuratie**: Aparte vercel.json voor frontend en backend
8. **Express Server**: Backend omgezet naar Express.js voor Vercel deployment

## Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build voor production
- `npm run preview` - Preview production build

### Backend
- `npm run dev` - Start development server met nodemon
- `npm start` - Start production server
