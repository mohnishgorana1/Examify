'use client'
import Tilt from "react-parallax-tilt";

const TESTIMONIALS = [
  {
    name: "Anjali Sharma",
    role: "NEET Aspirant",
    feedback:
      "Examify helped me practice hundreds of mock tests with ease and the detailed result analysis showed me exactly where to focus.",
    rating: 5,
  },
  {
    name: "Rohit Mehta",
    role: "Instructor (Physics)",
    feedback:
      "As an instructor, the evaluation dashboard is a game-changer. Grading subjective papers is now faster and much more consistent.",
    rating: 4.5,
  },
  {
    name: "Sneha Kulkarni",
    role: "B.Tech Final Year",
    feedback:
      "The platform is so intuitive! Whether it's for practice exams or semester assessments, Examify is smooth and reliable.",
    rating: 4.8,
  },
  {
    name: "Karan Verma",
    role: "MBA Entrance Student",
    feedback:
      "I used Examify to prepare for CAT and it made a huge difference. The interface mimics the actual exam perfectly.",
    rating: 4.9,
  },
  {
    name: "Dr. Neeta Joshi",
    role: "College Dean",
    feedback:
      "We implemented Examify in our institution to digitize our semester assessments. The setup was easy and the data security is top-notch.",
    rating: 5,
  },
];
export default function TestimonialSection() {
  return (
    <main className="testimonial-section py-24 px-6 md:px-20 bg-neutral-900/50">
      <h2 className="text-4xl font-bold text-center mb-14">
        What Our Users Say
      </h2>
      <div className="grid gap-10 md:grid-cols-3">
        {TESTIMONIALS.map((t, i) => (
          <Tilt
            key={i}
            glareEnable
            scale={1.05}
            glareMaxOpacity={0.2}
            className="bg-neutral-900 border shadow-lg shadow-neutral-800 rounded-xl p-6 hover:shadow-indigo-500 transition"
          >
            <p className="text-neutral-300 text-sm mb-4">
              &quot;{t.feedback}&quot;
            </p>
            <div>
              <div className="text-indigo-500 font-semibold">{t.name}</div>
              <div className="text-neutral-400 text-sm">{t.role}</div>
              <div className="text-yellow-400 text-sm mt-2">
                {"★".repeat(Math.floor(t.rating)) + (t.rating % 1 ? "½" : "")}
              </div>
            </div>
          </Tilt>
        ))}
      </div>
    </main>
  );
};