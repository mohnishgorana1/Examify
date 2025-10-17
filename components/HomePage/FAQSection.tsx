'use client'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  {
    question: "What types of exams and question formats does Examify support?",
    answer:
      "Currently, Examify supports core objective formats, including **Multiple-Choice Questions (MCQ)** and **True/False**. We are actively developing support for **Short Descriptive/Subjective answers** and **Numerical answers**, which will be available soon. You can combine the currently supported types within a single exam for comprehensive assessment.",
  },
  {
    question:
      "Is Examify secure enough for conducting high-stakes institutional exams?",
    answer:
      "While we are confident in our current security measures for individual instructors (including **secure login** and **role-based access**), we are committed to building full institutional security. We are implementing **modern encryption standards** for all data and records. Our **AI-powered proctoring** and advanced anti-cheating measures, launching in Q1 2026, will solidify Examify as a trusted platform for high-stakes assessments.",
  },
  {
    question: "What is the current cost to use Examify?",
    answer:
      "Currently, **Examify is completely free to use**! Instructors can create and deploy any number of exams, and students can join and take those exams at no charge. We are focused on growing our user base and gathering feedback. Future paid tiers will be introduced for advanced features and institutional licenses, but core features will remain accessible.",
  },
  {
    question: "What is the 'AI-Powered Proctored Security' feature?",
    answer:
      "This is a major future feature (launching **Q1 2026**) designed to maintain exam integrity remotely. It will use artificial intelligence to **monitor student activity** during the exam via webcam and screen. The system will flag potential cheating behaviors, such as looking away from the screen, detecting unauthorized materials, or the presence of a second person, ensuring a fair and verifiable testing environment.",
  },
  {
    question:
      "Can I integrate Examify with my existing Learning Management System (LMS)?",
    answer:
      "While direct, out-of-the-box LMS integration is not yet a core feature, Examify's robust **data export capabilities (e.g., CSV reports)** allow for easy transfer of results and grades to your existing systems. We are currently developing seamless integration APIs for popular LMS platforms like **Moodle and Canvas**.",
  },
  {
    question:
      "Does Examify offer different dashboards and features for various user roles?",
    answer:
      "Yes, the platform is **fully role-based** for maximum efficiency. **Students** get a dashboard to track progress and take secure tests. **Instructors** have dedicated tools for exam creation, question bank management, grading, and analytics. **Admins** maintain comprehensive institutional oversight, including user management and platform configuration.",
  },
  {
    question: "How long does it take to set up and deploy my first exam?",
    answer:
      "Our platform is designed for **instant deployment**. Instructors can create their first exam, select questions from the bank (or add new ones), define parameters, and schedule it in **under 5 minutes**. Our intuitive interface eliminates complex setup processes.",
  },
  {
    question: "Is there a limit to the number of students or exams I can host?",
    answer:
      "Examify is built to be **scalable**. Our infrastructure can support thousands of concurrent users and a high volume of exams without performance degradation. For institutional licenses, there are typically no hard limits, ensuring reliable service even during peak assessment periods.",
  },
  {
    question: "How do I get technical support or training for my staff?",
    answer:
      "We offer dedicated support for all users. Our documentation and **self-help center** are available 24/7. For institutional clients, we provide personalized **onboarding and training sessions** for instructors and administrators, along with priority technical support via email and dedicated chat channels.",
  },
];

export default function FAQSection ()  {
  return (
    <main className="py-24 px-6 md:px-20 bg-gradient-to-b from-neutral-950 via-gray-900/50 to-gray-950/10 border-t border-neutral-900/50">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-14 uppercase">
        Frequently Asked Questions
      </h2>
      <div className="max-w-4xl mx-auto border border-neutral-800/40 bg-neutral-900/50  px-2 py-2 md:px-6 md:py-2 rouned-3xl">
        <Accordion type="single" collapsible className="w-full rounded-3xl">
          {FAQS.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`item-${i + 1}`}
              className="border-b border-neutral-800"
            >
              <AccordionTrigger className="text-left text-lg hover:no-underline transition-colors duration-200 py-4 text-white hover:text-indigo-400">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-neutral-400 text-base pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </main>
  );
};