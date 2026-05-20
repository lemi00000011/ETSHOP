import { motion } from 'framer-motion';

/* ETShop Backend Upgrade: PostgreSQL + Prisma
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/etshop

prisma/schema.prisma
model User {
 id Int @id @default(autoincrement())
 name String
 email String @unique
 password String
 role String @default("user")
 listings Listing[]
}
model Listing {
 id Int @id @default(autoincrement())
 title String
 price Float
 category String
 approved Boolean @default(false)
 userId Int
}
model Payment {
 id Int @id @default(autoincrement())
 amount Float
 status String @default("pending")
 listingId Int
}
API Endpoints:
POST /api/auth/register
POST /api/auth/login
GET /api/listings
POST /api/listings
POST /api/payments/verify/:id
GET /api/admin/stats
*/

const API_BASE = 'http://localhost:5000/api';
const MOBILE_CONFIG = {
  platform: 'android',
  apkReady: true,
  bottomTabs: ['Home','Categories','Sell','Messages','Profile'],
  androidPackage: 'com.etshop.app',
  appName: 'ETShop',
  version: '1.0.0',
  expoReady: true,
  apiBase: API_BASE
};

export default function ETShop() {
  async function loadListings(){
    try { const res = await fetch(`${API_BASE}/listings`); return await res.json(); } catch { return []; }
  }
  const categories = ['Electronics','Mobiles','Computers','TV & Audio','Home Appliances','Fashion','Beauty','Groceries','Baby Products','Sports','Cars','Motorcycles','Property','Jobs','Services','Furniture','Books','Pets','Agriculture','Travel','Tickets','Wholesale','Local Deals'];
  const listings = [
    { id: 1, name: 'Electronics', price: 15000 },
    { id: 2, name: 'Cars', price: 850000 },
    { id: 3, name: 'Fashion', price: 2500 },
    { id: 4, name: 'Property', price: 2500000 },
    { id: 5, name: 'Jobs', price: 5000 },
    { id: 6, name: 'Services', price: 3000 }
  ];
  const productImages = [
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=90',
    'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1200&q=90',
    'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=90',
    'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=90',
    'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=90',
    'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=90'
  ];
  const userStats = ['My Listings', 'Messages', 'Sold Items', 'Balance'];
  const adminStats = ['Total Users', 'Pending Ads', 'Payments', 'Reports'];

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans overflow-x-hidden">
      <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="sticky top-0 z-20 backdrop-blur-xl bg-slate-950/80 p-6 border-b border-white/10 flex justify-between items-center">
        <h1 className="text-4xl font-black bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">ETShop</h1>
        <button className="px-4 py-2 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 font-semibold shadow-2xl">Post Ad</button>
      </motion.header>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="p-10 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <div className="w-full h-64 rounded-3xl mb-6 border border-white/10 shadow-2xl bg-gradient-to-br from-white to-slate-100 flex items-center justify-center relative overflow-hidden p-6">
            <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 260'><defs><linearGradient id='g' x1='0' x2='1'><stop offset='0%' stop-color='%230ea5e9'/><stop offset='100%' stop-color='%2322c55e'/></linearGradient></defs><rect width='100%' height='100%' fill='white'/><text x='300' y='95' text-anchor='middle' font-size='72' font-family='Arial' font-weight='700' fill='url(%23g)'>ET</text><text x='300' y='170' text-anchor='middle' font-size='68' font-family='Arial' font-weight='800' fill='%230b5cab'>ETSHOP</text><text x='300' y='220' text-anchor='middle' font-size='30' font-family='Arial' fill='%236b7280'>ONLINE STORE</text></svg>" alt="ETShop Logo" className="max-h-full max-w-full object-contain drop-shadow-2xl scale-110" />
          </div>
          <h2 className="text-6xl md:text-7xl font-black leading-tight">Buy & Sell Across Ethiopia</h2>
          <p className="mt-4 text-white/70 text-lg">Modern marketplace for products, cars, homes and services.</p>
          <div className="mt-6 flex gap-3">
            <input className="px-4 py-3 rounded-2xl w-full text-slate-900" placeholder="Search products..." />
            <button className="px-5 py-3 rounded-2xl bg-blue-500">Search</button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {categories.map((category) => (
            <div key={category} className="p-6 rounded-3xl bg-white/10 border border-white/10 backdrop-blur-xl shadow-2xl hover:-translate-y-2 transition">
              {category}
            </div>
          ))}
        </div>
      </motion.section>

      <section className="p-10">
        <h3 className="text-3xl font-semibold mb-6">Featured Listings</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {listings.map((item) => (
            <div key={item.id} className="group rounded-3xl overflow-hidden bg-white/10 border border-white/10 shadow-2xl hover:-translate-y-2 transition duration-300">
              <img src={productImages[item.id - 1]} alt={item.name} className="h-56 w-full object-cover object-center transition duration-500 group-hover:scale-110" />
              <div className="p-5">
                <h4 className="text-xl font-semibold">{item.name}</h4>
                <p className="text-white/70">Addis Ababa</p>
                <p className="mt-2 font-bold text-2xl">ETB {item.price.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="p-10">
        <h3 className="text-3xl font-semibold mb-6">User Dashboard</h3>
        <div className="grid md:grid-cols-4 gap-6">
          {userStats.map((label) => (
            <div key={label} className="rounded-3xl bg-white/10 p-6 border border-white/10">
              <p className="text-white/70">{label}</p>
              <p className="text-4xl font-bold mt-2">12</p>
            </div>
          ))}
        </div>
      </section>

      <section className="p-10">
        <h3 className="text-3xl font-semibold mb-6">Admin Dashboard</h3>
        <div className="grid md:grid-cols-4 gap-6">
          {adminStats.map((label) => (
            <div key={label} className="rounded-3xl bg-white/10 p-6 border border-white/10">
              <p className="text-white/70">{label}</p>
              <p className="text-4xl font-bold mt-2">24</p>
            </div>
          ))}
        </div>
      </section>

      <section className="p-10 grid md:grid-cols-2 gap-8 items-start">
        <div className="rounded-3xl bg-white/20 p-8 border-2 border-cyan-400/60 shadow-2xl backdrop-blur-2xl">
          <h3 className="text-3xl font-semibold mb-2 text-cyan-300">Login</h3>
          <p className="text-white/70 mb-6">Sign in to your ETShop account</p>
          <div className="space-y-4">
            <label className="block text-sm text-white/80">Email Address</label>
            <input className="w-full px-4 py-3 rounded-2xl bg-white text-slate-900 border-2 border-cyan-300 outline-none" placeholder="Enter your email" />
            <label className="block text-sm text-white/80">Password</label>
            <input type="password" className="w-full px-4 py-3 rounded-2xl bg-white text-slate-900 border-2 border-cyan-300 outline-none" placeholder="Enter your password" />
            <button className="w-full px-4 py-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 font-bold shadow-xl">Sign In</button>
          </div>
        </div>

        <div className="rounded-3xl bg-white/20 p-8 border-2 border-emerald-400/60 shadow-2xl backdrop-blur-2xl">
          <h3 className="text-3xl font-semibold mb-2 text-emerald-300">Register</h3>
          <p className="text-white/70 mb-6">Create your seller or buyer account</p>
          <div className="space-y-4">
            <label className="block text-sm text-white/80">Full Name</label>
            <input className="w-full px-4 py-3 rounded-2xl bg-white text-slate-900 border-2 border-emerald-300 outline-none" placeholder="Enter full name" />
            <label className="block text-sm text-white/80">Email Address</label>
            <input className="w-full px-4 py-3 rounded-2xl bg-white text-slate-900 border-2 border-emerald-300 outline-none" placeholder="Enter your email" />
            <label className="block text-sm text-white/80">Password</label>
            <input type="password" className="w-full px-4 py-3 rounded-2xl bg-white text-slate-900 border-2 border-emerald-300 outline-none" placeholder="Create password" />
            <button className="w-full px-4 py-3 rounded-2xl bg-gradient-to-r from-emerald-400 to-green-500 font-bold shadow-xl">Create Account</button>
          </div>
        </div>
      </section>

      <section className="p-10">
        <h3 className="text-3xl font-semibold mb-6">Mobile App Ready</h3>
        <div className="mb-6 rounded-3xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 p-6">
          <h4 className="text-2xl font-bold mb-2">Android APK Connected</h4>
          <p className="text-white/70">Package: {MOBILE_CONFIG.androidPackage}</p>
          <p className="text-white/70">Version: {MOBILE_CONFIG.version}</p>
          <p className="text-white/70">API: {MOBILE_CONFIG.apiBase}</p>
          <p className="text-emerald-300 mt-2">Ready for React Native / Expo APK build</p>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-3">
            {MOBILE_CONFIG.bottomTabs.map((tab) => (
              <div key={tab} className="px-3 py-2 rounded-2xl bg-white/10 text-center text-sm border border-white/10">{tab}</div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl bg-white/10 border border-white/10 p-8 grid md:grid-cols-3 gap-6">
          <div className="md:col-span-3 rounded-3xl bg-slate-900 border border-white/10 p-4 mb-4">
            <div className="mx-auto max-w-xs rounded-[2rem] border-4 border-slate-700 bg-black p-3 shadow-2xl">
              <div className="rounded-[1.5rem] bg-slate-950 overflow-hidden">
                <div className="p-4 text-center border-b border-white/10 font-bold">ETShop Mobile</div>
                <div className="p-4 space-y-3">
                  <div className="h-20 rounded-2xl bg-gradient-to-r from-cyan-500/30 to-blue-500/30"></div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="h-16 rounded-2xl bg-white/10"></div>
                    <div className="h-16 rounded-2xl bg-white/10"></div>
                  </div>
                </div>
                <div className="grid grid-cols-5 gap-1 p-2 border-t border-white/10 text-[10px] text-center text-white/70">
                  {MOBILE_CONFIG.bottomTabs.map((tab)=><div key={tab}>{tab}</div>)}
                </div>
              </div>
            </div>
          </div>
          <div><h4 className="font-bold text-xl mb-2">Android APK</h4><p className="text-white/70">Ready to convert into installable Android app.</p></div>
          <div><h4 className="font-bold text-xl mb-2">iPhone App</h4><p className="text-white/70">Can be packaged for iOS App Store.</p></div>
          <div><h4 className="font-bold text-xl mb-2">Website + App</h4><p className="text-white/70">Single brand across web and mobile devices.</p></div>
        </div>
      </section>

      <footer className="p-10 text-center text-white/50 border-t border-white/10 mt-10">© 2026 ETShop Marketplace • Immersive 3D Experience</footer>
    </div>
  );
}
