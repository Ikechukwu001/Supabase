import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import Dashboard from "./Dashboard";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [mode, setMode] = useState("signin"); // toggle signin/signup
  const [loading, setLoading] = useState(false);

  // Alert wrapper
  const notify = (msg) => alert(msg);

  // Sign Up
  const handleSignUp = async () => {
    setLoading(true);
    notify("Creating your account...");
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    setLoading(false);
    if (error) notify(error.message);
    else notify("✅ Check your email to confirm your account!");
  };

  // Sign In
  const handleSignIn = async () => {
    setLoading(true);
    notify("Signing you in...");
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (error) notify(error.message);
    else {
      setUser(data.user);
      notify("✅ Welcome back!");
    }
  };

  // Sign Out
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    notify("You have been signed out.");
  };

  // Persist session
  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) setUser(data.session.user);
    };
    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      {!user ? (
        <div className="text-center max-w-3xl px-6">
          {/* Landing Section */}
          <h1 className="text-4xl font-extrabold text-indigo-600 mb-4">
            Welcome to iK Online 🚀
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            A practice app where I test out authentication, UI layouts, and cool
            ideas. Sign in to explore, or create an account if you're new.
          </p>

          {/* Auth Box */}
          <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md mx-auto">
            {/* Toggle buttons */}
            <div className="flex justify-center mb-6">
              <button
                className={`px-4 py-2 rounded-l-lg ${
                  mode === "signin"
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => setMode("signin")}
                disabled={loading}
              >
                Sign In
              </button>
              <button
                className={`px-4 py-2 rounded-r-lg ${
                  mode === "signup"
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => setMode("signup")}
                disabled={loading}
              >
                Sign Up
              </button>
            </div>

            {/* Input fields */}
            <input
              type="email"
              placeholder="Email"
              className="w-full text-black p-3 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full text-black p-3 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />

            {/* Submit button */}
            <button
              onClick={mode === "signin" ? handleSignIn : handleSignUp}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
              disabled={loading}
            >
              {loading
                ? mode === "signin"
                  ? "Signing in..."
                  : "Signing up..."
                : mode === "signin"
                ? "Sign In"
                : "Sign Up"}
            </button>
          </div>
        </div>
      ) : (
        <Dashboard user={user} onSignOut={handleSignOut} />
      )}
    </div>
  );
}

export default App;
