// app/career/page.tsx

export default function CareerPage() {
  return (
    <div className="min-h-screen bg-[#f5f7fa] px-6 py-16 md:px-20">
      <div className="max-w-5xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Work With Us
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Join our mission to revolutionize the exam experience. We’re always on the lookout for passionate educators, engineers, and creators.
        </p>
      </div>

      <section className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
        <div className="bg-white shadow-md rounded-xl p-6 space-y-3 border border-gray-200">
          <h3 className="text-xl font-semibold text-emerald-600">Frontend Developer</h3>
          <p className="text-gray-700 text-sm">
            Help us build beautiful, intuitive interfaces for our users. Experience with React or Next.js preferred.
          </p>
          <p className="text-gray-500 text-sm">Location: Remote | Type: Full-time</p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6 space-y-3 border border-gray-200">
          <h3 className="text-xl font-semibold text-emerald-600">Instructor (Subject Expert)</h3>
          <p className="text-gray-700 text-sm">
            Create and review high-quality exam questions. Must have strong subject knowledge and teaching experience.
          </p>
          <p className="text-gray-500 text-sm">Location: Remote | Type: Part-time / Freelance</p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6 space-y-3 border border-gray-200">
          <h3 className="text-xl font-semibold text-emerald-600">Backend Engineer</h3>
          <p className="text-gray-700 text-sm">
            Work on scalable APIs and data security. Experience with Node.js, MongoDB, or Firebase is a plus.
          </p>
          <p className="text-gray-500 text-sm">Location: Remote | Type: Full-time</p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6 space-y-3 border border-gray-200">
          <h3 className="text-xl font-semibold text-emerald-600">Content Reviewer</h3>
          <p className="text-gray-700 text-sm">
            Review and verify exam content quality and relevance. Attention to detail and educational background required.
          </p>
          <p className="text-gray-500 text-sm">Location: Remote | Type: Freelance</p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto mt-16 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Didn’t find the role you’re looking for?</h2>
        <p className="text-gray-600 mb-6">
          We&apos;re always open to connecting with talented individuals. Share your profile and we’ll reach out when a matching role comes up.
        </p>
        <a
          href="mailto:careers@examify.com"
          className="inline-block bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition"
        >
          Send Your Resume
        </a>
      </div>
    </div>
  );
}
