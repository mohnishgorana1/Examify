export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-900 via-neutral-950 to-black px-6 py-16 md:px-20 text-white">
      <div className="max-w-5xl mx-auto text-center">
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-gradient-to-r from-indigo-400 via-indigo-500 to-indigo-600 bg-clip-text mb-6 animate-gradient">
          About Examify
        </h1>

        {/* Subheading */}
        <p className="text-base md:text-lg text-neutral-300 mb-12 max-w-3xl mx-auto leading-relaxed">
          Examify is a powerful platform designed to streamline the examination
          process for students, instructors, and administrators. With smart
          tools, robust security, and user-friendly interfaces, Examify empowers
          educational success at every level.
        </p>

        {/* Cards Section */}
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              title: "Student-Centric",
              desc: "Personal dashboards, result tracking, and real-time notifications for an optimal learning experience.",
            },
            {
              title: "Instructor Tools",
              desc: "Easily create and schedule exams, monitor performance, and analyze results in a few clicks.",
            },
            {
              title: "Admin Controls",
              desc: "Secure management of users, exams, and system settings with full scalability and control.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-neutral-900 border-t border-neutral-800 shadow-lg shadow-neutral-900 hover:shadow-md hover:shadow-indigo-600 transition-all duration-300 rounded-2xl p-6 text-left"
            >
              <h3 className="text-lg font-semibold text-indigo-400 mb-2">
                {item.title}
              </h3>
              <p className="text-neutral-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Mission Section */}
        <div className="mt-20">
          <h2 className="text-3xl md:text-4xl font-semibold text-transparent bg-gradient-to-r from-indigo-400 via-indigo-500 to-indigo-600 bg-clip-text mb-4 animate-gradient">
            Our Mission
          </h2>
          <p className="text-neutral-300 max-w-2xl mx-auto leading-relaxed text-base md:text-lg">
            To simplify online exams and enhance learning outcomes through a
            secure, accessible, and intelligent platform that adapts to the
            needs of modern education.
          </p>
        </div>

        {/* Vision Section */}
        <div className="mt-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-transparent bg-gradient-to-r from-indigo-400 via-indigo-500 to-indigo-600 bg-clip-text mb-4 animate-gradient">
            Our Vision
          </h2>
          <p className="text-neutral-300 max-w-2xl mx-auto leading-relaxed text-base md:text-lg">
            To redefine how institutions conduct assessments by providing a
            smooth, reliable, and scalable examination experience that inspires
            both educators and learners to achieve excellence.
          </p>
        </div>
      </div>

     
    </div>
  );
}
