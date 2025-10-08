export default function CareerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-900 via-neutral-950 to-black px-6 py-20 md:px-20 text-white">
      {/* Header Section */}
      <div className="max-w-5xl mx-auto text-center mb-20">
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-400 via-indigo-500 to-indigo-600 bg-clip-text text-transparent bg-[length:200%_200%] animate-gradient">
          Work With Us
        </h1>
        <p className="text-lg text-neutral-400 max-w-2xl mx-auto mt-4">
          Join our mission to revolutionize the exam experience. We’re always on
          the lookout for passionate educators, engineers, and creators.
        </p>
      </div>

      {/* Roles Section */}
      <section className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
        {[
          {
            title: "Frontend Developer",
            desc: "Help us build beautiful, intuitive interfaces for our users. Experience with React or Next.js preferred.",
            details: "Location: Remote | Type: Full-time",
          },
          {
            title: "Instructor (Subject Expert)",
            desc: "Create and review high-quality exam questions. Must have strong subject knowledge and teaching experience.",
            details: "Location: Remote | Type: Part-time / Freelance",
          },
          {
            title: "Backend Engineer",
            desc: "Work on scalable APIs and data security. Experience with Node.js, MongoDB, or Firebase is a plus.",
            details: "Location: Remote | Type: Full-time",
          },
          {
            title: "Content Reviewer",
            desc: "Review and verify exam content quality and relevance. Attention to detail and educational background required.",
            details: "Location: Remote | Type: Freelance",
          },
        ].map((job, i) => (
          <div
            key={i}
            className="relative group rounded-2xl bg-neutral-900 p-[2px] overflow-hidden shadow-lg transition-transform hover:scale-105 duration-500 ease-out  hover:shadow-indigo-500/20"
          >
            {/* animated border */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 opacity-0 group-hover:opacity-100 blur-[2px] animate-border"></div>

            {/* Card content */}
            <div className="relative bg-neutral-900 rounded-2xl p-6 z-10 space-y-3 border border-neutral-800/70 transition-all">
              <h3 className="text-lg md:text-xl font-semibold text-indigo-400">
                {job.title}
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                {job.desc}
              </p>
              <p className="text-neutral-300 mt-5 text-sm">{job.details}</p>
            </div>
          </div>
        ))}
      </section>

      {/* CTA Section */}
      <div className="max-w-3xl mx-auto mt-20 text-center">
        <h2 className="text-2xl font-bold text-indigo-400 mb-3">
          Didn’t find the role you’re looking for?
        </h2>
        <p className="text-neutral-400 mb-8">
          We&apos;re always open to connecting with talented individuals. Share
          your profile and we’ll reach out when a matching role comes up.
        </p>
        <a
          href="mailto:careers@examify.com"
          className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-semibold transition-transform hover:-translate-y-0.5 hover:shadow-indigo-500/30"
        >
          Send Your Resume
        </a>
      </div>
    </div>
  );
}
