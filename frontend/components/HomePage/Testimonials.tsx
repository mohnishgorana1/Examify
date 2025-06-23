"use client";

export default function TestimonialSection() {
  const testimonials = [
    {
      name: "Anjali Sharma",
      role: "NEET Aspirant",
      feedback:
        "Examify helped me practice hundreds of mock tests with ease. The UI is clean, the questions are updated regularly, and the instant results helped me identify my weak topics. Highly recommended for serious learners!",
      rating: 5,
    },
    {
      name: "Rohit Mehta",
      role: "Instructor (Physics)",
      feedback:
        "As an instructor, the dashboard is a game-changer. I can create exams, track student performance, and get analytics all in one place. Their team is also very responsive and open to feedback.",
      rating: 4.5,
    },
    {
      name: "Sneha Kulkarni",
      role: "B.Tech Final Year",
      feedback:
        "The platform is so intuitive! Whether it's for practice exams or submitting assignments, everything works smoothly. I especially liked the instant ranking system after each test.",
      rating: 4.8,
    },
    {
      name: "Karan Verma",
      role: "MBA Entrance Student",
      feedback:
        "I used Examify to prepare for CAT and it made a huge difference. The ability to analyze past test data, see detailed explanations, and improve my weak sections really helped me boost my score.",
      rating: 4.9,
    },
    {
      name: "Dr. Neeta Joshi",
      role: "College Dean",
      feedback:
        "We implemented Examify in our institution to digitize our semester assessments. The onboarding process was seamless, and the support team guided us through every step. It's now an essential part of our exam workflow.",
      rating: 5,
    },
  ];

  return (
    <section className="bg-neutral-900 text-white py-20 px-6 md:px-20">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold text-white-800 mb-4">
          What Our Users Say
        </h2>
        <p className="text-white-600 text-lg max-w-3xl mx-auto">
          Hear from students and educators who’ve transformed their exam
          experience with Examify.
        </p>
      </div>

      <div className="grid gap-10 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="bg-neutral-800 rounded-xl shadow-lg border border-gray-100 p-6 flex flex-col justify-between"
          >
            <p className="text-white-700 text-sm leading-relaxed mb-4">
              "{t.feedback}"
            </p>
            <div className="mt-auto">
              <div className="text-orange-500 font-semibold">{t.name}</div>
              <div className="text-white-500 text-sm">{t.role}</div>
              <div className="text-yellow-400 mt-2 text-sm">
                {"★".repeat(Math.floor(t.rating)) + (t.rating % 1 ? "½" : "")}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
