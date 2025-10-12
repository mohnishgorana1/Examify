import { Button } from "@/components/ui/button";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-900 to-black py-12 px-6 md:px-16 text-white">
      <div className="max-w-4xl mx-auto text-center mb-12">
        {/* <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-400 via-indigo-500 to-indigo-600 bg-clip-text text-transparent animate-gradient">
          Get in Touch
        </h1> */}

        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-400 via-indigo-500 to-indigo-600 bg-clip-text text-transparent bg-[length:200%_200%] animate-gradient">
          Get in Touch
        </h1>
        <p className="mt-4 text-base md:text-lg text-neutral-300 max-w-2xl mx-auto leading-relaxed">
          Have a question, feedback, or need assistance? Fill out the form
          below, and our team will get back to you as soon as possible.
        </p>
      </div>

      <div className="max-w-3xl mx-auto backdrop-blur-lg bg-neutral-900/50 border border-neutral-800 rounded-2xl shadow-[0_0_25px_-5px_rgba(79,70,229,0.4)] p-8 md:p-12 transition-all duration-300 hover:shadow-[0_0_35px_-5px_rgba(99,102,241,0.6)]">
        <form className="space-y-6">
          {/* Name & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-neutral-300 text-sm font-medium mb-1">
                Name
              </label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full px-4 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-neutral-300 text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all duration-200"
              />
            </div>
          </div>

          {/* Subject */}
          <div>
            <label className="block text-neutral-300 text-sm font-medium mb-1">
              Subject
            </label>
            <input
              type="text"
              placeholder="Subject"
              className="w-full px-4 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all duration-200"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-neutral-300 text-sm font-medium mb-1">
              Message
            </label>
            <textarea
              rows={5}
              placeholder="Write your message here..."
              className="w-full px-4 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all duration-200 resize-none"
            ></textarea>
          </div>

          {/* Button */}
          <div className="pt-2 text-center">
            <Button
              type="submit"
              className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-2 rounded-lg font-semibold shadow-md shadow-indigo-800/30 transition duration-300"
            >
              Send Message
            </Button>
          </div>
        </form>
      </div>

      {/* Email fallback */}
      <div className="text-center text-sm text-neutral-400 mt-12">
        Or reach us directly at{" "}
        <span className="text-indigo-400 font-medium">support@examify.com</span>
      </div>
    </div>
  );
}
