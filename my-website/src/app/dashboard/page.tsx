import { UserButton, SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

export default async function DashboardPage() {
  const { userId } = await auth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl p-8">
        <div className="flex justify-between items-center mb-10 pb-6 border-b border-slate-800">
          <h1 className="text-3xl font-bold">User Dashboard</h1>
          
          {userId ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-400">Manage Account</span>
              <UserButton />
            </div>
          ) : (
            <SignInButton mode="modal">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                Sign In to View
              </button>
            </SignInButton>
          )}
        </div>

        {userId ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-800/50">
              <h3 className="text-lg font-medium text-slate-300 mb-2">Total Activity</h3>
              <p className="text-4xl font-bold">1,248</p>
              <div className="mt-4 text-xs text-emerald-400 flex items-center gap-1">
                <span>+12.5% from last month</span>
              </div>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-800/50">
              <h3 className="text-lg font-medium text-slate-300 mb-2">Active Projects</h3>
              <p className="text-4xl font-bold">8</p>
              <div className="mt-4 text-xs text-slate-400 flex items-center gap-1">
                <span>3 pending review</span>
              </div>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-800/50">
              <h3 className="text-lg font-medium text-slate-300 mb-2">Subscription</h3>
              <p className="text-xl font-bold text-indigo-400 mb-1">Pro Plan</p>
              <p className="text-sm text-slate-400">Renews in 14 days</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-48 text-center text-slate-500">
            <p className="mb-4">You must be signed in to view dashboard data.</p>
          </div>
        )}
      </div>
    </main>
  );
}
