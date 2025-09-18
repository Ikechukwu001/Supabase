import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import Dashboard from "./Dashboard";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [mode, setMode] = useState("signin"); // toggle signin/signup
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  // Sign Up
  const handleSignUp = async () => {
    setLoading(true);
    setMessage("Creating your account...");
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    setLoading(false);
    if (error) setMessage(error.message);
    else setMessage("✅ Check your email to confirm your account!");
  };

  // Sign In
  const handleSignIn = async () => {
    setLoading(true);
    setMessage("Signing you in...");
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (error) setMessage(error.message);
    else {
      setUser(data.user);
      setMessage("✅ Welcome back!");
    }
  };

  // Sign Out
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setMessage("You have been signed out.");
  };

  // Persist session
  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) setUser(data.session.user);
    };
    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {!user ? (
        <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold text-center text-indigo-600 mb-6">
            Supabase Auth
          </h1>

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
              ? (mode === "signin" ? "Signing in..." : "Signing up...")
              : (mode === "signin" ? "Sign In" : "Sign Up")}
          </button>

          {/* Feedback message */}
          {message && (
            <p className="mt-4 text-center text-sm text-gray-600">{message}</p>
          )}
        </div>
      ) : (
        <Dashboard user={user} onSignOut={handleSignOut} />
      )}
    </div>
  );
}

export default App;
