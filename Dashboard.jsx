import React from "react";
import Post from "./Post";

export default function Dashboard({ user, onSignOut }) {
  const posts = [
    {
      id: 1,
      author: {
        name: "Michael Justice",
        avatar: "https://i.pravatar.cc/100?img=32",
      },
      time: "2 hrs ago",
      content:
        "Testing my new Supabase + React practice app. Looks almost like Facebook 😎",
      image: "https://picsum.photos/seed/fb1/800/400",
    },
    {
      id: 2,
      author: {
        name: "Ada N.",
        avatar: "https://i.pravatar.cc/100?img=47",
      },
      time: "Yesterday",
      content: "Started working on my new portfolio today 🚀",
    },
  ];

  const links = [
    { title: "CV Generator", url: "#" },
    { title: "Slang Dictionary", url: "#" },
    { title: "Solar Project", url: "#" },
  ];

  return (
    <div className="bg-fb-bg min-h-screen font-sans text-fb-text">
      {/* Top Navbar */}
      <header className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 h-14">
          {/* Left: Logo & Search */}
          <div className="flex items-center gap-2">
            <div className="text-fb-blue font-bold text-2xl">f</div>
            <input
              className="hidden sm:block bg-gray-100 rounded-full px-3 py-1 text-sm focus:outline-none"
              placeholder="Search Facebook"
            />
          </div>

          {/* Middle: Nav */}
          <nav className="hidden md:flex gap-8 text-gray-600">
            <button className="hover:text-fb-blue">🏠</button>
            <button className="hover:text-fb-blue">🎥</button>
            <button className="hover:text-fb-blue">🛒</button>
            <button className="hover:text-fb-blue">👥</button>
          </nav>

          {/* Right: Profile + Sign Out */}
          <div className="flex items-center gap-3">
            <span className="hidden sm:block text-sm">{user.email}</span>
            <button
              onClick={onSignOut}
              className="bg-red-500 text-white px-3 py-1 rounded-md text-xs hover:bg-red-600"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <main className="max-w-7xl mx-auto grid grid-cols-12 gap-4 px-4 mt-4">
        {/* Left Sidebar */}
        <aside className="hidden lg:block col-span-3 space-y-4">
          <div className="bg-white rounded-lg shadow p-3">
            <p className="font-semibold">Shortcuts</p>
            <ul className="mt-2 space-y-1 text-sm">
              {links.map((link) => (
                <li key={link.url}>
                  <a
                    href={link.url}
                    className="text-fb-blue hover:underline"
                    target="_blank"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Feed */}
        <section className="col-span-12 lg:col-span-6 space-y-4">
          {/* Create Post */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center gap-3">
              <img
                src={user.user_metadata?.avatar || "https://i.pravatar.cc/100"}
                alt="me"
                className="w-10 h-10 rounded-full"
              />
              <input
                placeholder={`What's on your mind, ${
                  user.email.split("@")[0]
                }?`}
                className="flex-1 bg-gray-100 rounded-full px-3 py-2 text-sm focus:outline-none"
              />
            </div>
            <div className="flex justify-around mt-3 text-xs text-gray-600">
              <button className="hover:text-fb-blue">📷 Photo</button>
              <button className="hover:text-fb-blue">🎥 Video</button>
              <button className="hover:text-fb-blue">😊 Feeling</button>
            </div>
          </div>

          {/* Posts */}
          {posts.map((p) => (
            <Post key={p.id} {...p} />
          ))}
        </section>

        {/* Right Sidebar */}
        <aside className="hidden xl:block col-span-3 space-y-4">
          <div className="bg-white rounded-lg shadow p-4">
            <p className="font-semibold text-sm mb-2">Contacts</p>
            <ul className="space-y-2 text-sm">
              {[1, 2, 3].map((i) => (
                <li key={i} className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gray-200" />
                  <span>Friend {i}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow p-4 text-sm">
            <p className="font-semibold mb-1">Sponsored</p>
            <p className="text-gray-600">Practice Tailwind UI layouts 🚀</p>
          </div>
        </aside>
      </main>
    </div>
  );
}
