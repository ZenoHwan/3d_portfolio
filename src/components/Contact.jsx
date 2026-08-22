import React, { useRef, useState } from "react";
import { motion } from "motion/react";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      alert("One of the fields is empty. Please fill up the form.");
      return;
    }
    setLoading(true);
    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "Hwan Chin Yang",
          from_email: form.email,
          to_email: "hwanchinyang@gmail.com",
          message: `from ${form.email}: ${form.message}`,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);
          alert("Thank you. I will get back to you as soon as possible.");
          setForm({ name: "", email: "", message: "" });
        },
        (error) => {
          setLoading(false);
          console.error(error);
          alert("Something went wrong. Please try again.");
        }
      );
  };

  return (
    <div className="xl:mt-12 flex xl:flex-row flex-col gap-10 overflow-hidden">
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] tui-card p-5 sm:p-8 font-mono"
      >
        <p className={styles.sectionSubText}>// 04_contact</p>
        <h3 className={`${styles.sectionHeadText} mt-2 font-sans`}>
          <span className="text-accent">&gt;</span> send-message
        </h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-10 flex flex-col gap-6"
        >
          <label className="flex flex-col">
            <span className="text-accent text-[12px] mb-2">
              <span className="text-muted">$</span> name
            </span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="your name..."
              className="bg-primary py-3 px-4 placeholder:text-muted text-text border border-border focus:border-accent outline-none font-mono text-base sm:text-[14px] transition-colors"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-accent text-[12px] mb-2">
              <span className="text-muted">$</span> email
            </span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className="bg-primary py-3 px-4 placeholder:text-muted text-text border border-border focus:border-accent outline-none font-mono text-base sm:text-[14px] transition-colors"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-accent text-[12px] mb-2">
              <span className="text-muted">$</span> message
            </span>
            <textarea
              rows={6}
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="type your message..."
              className="bg-primary py-3 px-4 placeholder:text-muted text-text border border-border focus:border-accent outline-none font-mono text-base sm:text-[14px] resize-none transition-colors"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="border border-accent text-accent hover:bg-accent hover:text-primary min-h-11 py-3 px-6 w-full sm:w-fit font-mono font-bold text-[14px] transition-colors disabled:opacity-50"
          >
            {loading ? "sending..." : "./send-message"}
          </button>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="hidden md:block xl:flex-1 xl:h-auto md:h-[550px]"
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
