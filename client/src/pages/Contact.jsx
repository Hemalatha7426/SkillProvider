import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Sparkles, Mail, MessageSquare, Send } from "lucide-react";

export default function Contact() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    try {
      // Replace with your API call
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      alert("Message sent! Thank you for contacting us.");
      reset();
    } catch (err) {
      alert("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-40 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link to="/">
              <div className="flex items-center gap-2 cursor-pointer">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold font-sans">SkillSync</span>
              </div>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/courses">
                <span className="text-sm font-medium text-gray-500 hover:text-gray-900 cursor-pointer">Courses</span>
              </Link>
              <Link to="/about">
                <span className="text-sm font-medium text-gray-500 hover:text-gray-900 cursor-pointer">About</span>
              </Link>
              <Link to="/contact">
                <span className="text-sm font-medium text-blue-500 cursor-pointer">Contact</span>
              </Link>
            </nav>
            <Link to="/dashboard">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium">
                Dashboard
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Page Header */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4 font-sans">Get in Touch</h1>
          <p className="text-xl text-gray-600">
            Have questions or suggestions? We'd love to hear from you
          </p>
        </div>
      </section>

      {/* Contact Options */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white shadow rounded-xl p-6 text-center hover:shadow-lg transition-all">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 mx-auto mb-4">
            <Mail className="h-6 w-6 text-blue-500" />
          </div>
          <h3 className="font-semibold mb-2">Email Us</h3>
          <p className="text-sm text-gray-600">support@skillsync.com</p>
        </div>

        <div className="bg-white shadow rounded-xl p-6 text-center hover:shadow-lg transition-all">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 mx-auto mb-4">
            <MessageSquare className="h-6 w-6 text-green-500" />
          </div>
          <h3 className="font-semibold mb-2">Live Chat</h3>
          <p className="text-sm text-gray-600">Available 9 AM - 5 PM EST</p>
        </div>

        <div className="bg-white shadow rounded-xl p-6 text-center hover:shadow-lg transition-all">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 mx-auto mb-4">
            <Sparkles className="h-6 w-6 text-purple-500" />
          </div>
          <h3 className="font-semibold mb-2">FAQ</h3>
          <Link href="/faq">
            <p className="text-sm text-purple-500 hover:underline cursor-pointer">Browse common questions</p>
          </Link>
        </div>
      </section>

      {/* Contact Form */}
      <section className="max-w-2xl mx-auto mb-24 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Send us a Message</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block mb-2 font-medium">Name</label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                placeholder="Your name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block mb-2 font-medium">Email</label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                placeholder="your.email@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block mb-2 font-medium">Message</label>
              <textarea
                {...register("message", { required: "Message is required" })}
                placeholder="Tell us how we can help you..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 min-h-32 resize-none"
              />
              {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-md font-medium transition"
            >
              <Send className="h-5 w-5" />
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
