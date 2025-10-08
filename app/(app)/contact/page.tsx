import { Button } from "@/components/ui/button";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-800 from-5% via-30% via-neutral-900 to-80% to-neutral-950 py-8 px-6 md:px-20">
      <div className="max-w-4xl md:max-w-5xl mx-auto text-center mb-8">
        <h1 className="text-2xl md:text-4xl font-bold text-white opacity-90 mb-4">
          Get in Touch
        </h1>
        <p className="text-lg text-neutral-300">
          Have questions, suggestions, or need support? We'd love to hear from you.
        </p>
      </div>

      <div className="max-w-4xl md:max-w-5xl  mx-auto backdrop-blur-md bg-transparent border border-neutral-200 shadow-xl rounded-xl p-8 md:p-12 space-y-6">
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-neutral-200 text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full px-4 py-1 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-orange-500 text-neutral-200"
              />
            </div>
            <div>
              <label className="block text-neutral-200 text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-1 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-orange-500 text-neutral-200"
              />
            </div>
          </div>

          <div>
            <label className="block text-neutral-200 text-sm font-medium mb-1">Subject</label>
            <input
              type="text"
              placeholder="Subject"
              className="w-full px-4 py-1 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-orange-500 text-neutral-200"
            />
          </div>

          <div>
            <label className="block text-neutral-200 text-sm font-medium mb-1">Message</label>
            <textarea
              rows={5}
              placeholder="Write your message here..."
              className="w-full px-4 py-1 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-orange-500 text-neutral-200"
            ></textarea>
          </div>

          <Button
            type="submit"
            className="cursor-pointer bg-orange-600 hover:bg-orange-700 text-white px-6 py-1 rounded-lg font-semibold transition duration-300"
          >
            Send Message
          </Button>
        </form>
      </div>

      <div className="text-center text-sm text-white-500 mt-12">
        Or email us directly at{" "}
        <span className="text-orange-600 font-medium">support@examify.com</span>
      </div>
    </div>
  );
}
