import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [mode, setMode] = useState("signin"); // toggle between signin/signup

  // Sign Up
  const handleSignUp = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) alert(error.message);
    else alert("Check your email for confirmation link");
  };

  // Sign In
  const handleSignIn = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) alert(error.message);
    else setUser(data.user);
  };

  // Sign Out
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
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
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-96">
        <h1 className="text-2xl font-bold text-center text-indigo-600 mb-6">
          Supabase Auth
        </h1>

        {!user ? (
          <>
            {/* Toggle buttons */}
            <div className="flex justify-center mb-6">
              <button
                className={`px-4 py-2 rounded-l-lg ${
                  mode === "signin"
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => setMode("signin")}
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
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full text-black p-3 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* Submit button */}
            <button
              onClick={mode === "signin" ? handleSignIn : handleSignUp}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
            >
              {mode === "signin" ? "Sign In" : "Sign Up"}
            </button>
          </>
        ) : (
          <>
<div className="text-center mb-6">
              <p className="text-lg font-semibold text-gray-800">
                👋 Welcome, {user.email}
              </p>
              <p className="mt-2 text-gray-600">
                I’m currently working on a new project.  
                While you wait, check out some of my previous work below:
              </p>
            </div>

            {/* Links to projects */}
            <ul className="space-y-3 text-center grid mb-6">
              <li>
                <a
                  href="#"
                  className="text-indigo-600 hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  🌐 My First Site
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-indigo-600 hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  🚀 Portfolio
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-indigo-600 hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  🎨 CV Generator
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-indigo-600 hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  ⚡ Solar Project
                </a>
              </li>
              <span className="text-black ">and more...</span> 
            </ul>
            <button
              onClick={handleSignOut}
              className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition"
            >
              Sign Out
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
