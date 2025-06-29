// app/about/page.tsx or wherever your About page is

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-800 from-20% via-neutral-900 to-neutral-950 px-6 py-16 md:px-20">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-orange-500 mb-6">
          About Examify
        </h1>
        <p className="text-lg text-neutral-400 mb-12 max-w-3xl mx-auto">
          Examify is a powerful platform designed to streamline the examination process for students, instructors, and administrators. With smart tools, robust security, and user-friendly interfaces, Examify empowers educational success at every level.
        </p>

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
              className="bg-neutral-800 hover:shadow-md hover:shadow-orange-500 transition-all duration-300 rounded-xl p-6 text-left"
            >
              <h3 className="text-sm md:text-lg font-semibold text-orange-500 mb-2">
                {item.title}
              </h3>
              <p className="text-neutral-500 text-xs md:text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <h2 className="text-2xl md:text-3xl font-semibold text-orange-500 mb-4">
            Our Mission
          </h2>
          <p className="text-white max-w-2xl mx-auto">
            To simplify online exams and enhance learning outcomes through a secure, accessible, and intelligent platform that adapts to the needs of modern education.
          </p>
        </div>
      </div>
    </div>
  );
}
