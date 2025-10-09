"use client";

import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Phone } from "lucide-react";
import ky from "ky";

interface FormResponse {
  success: boolean;
  message: string;
}

interface FormValues {
  name: string;
  phone: string;
  vehicle: string;
  date: Date;
  additional: string;
}

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  phone: Yup.string().required("Phone Number is required"),
  vehicle: Yup.string().required("Vehicle Make & Model is required"),
  date: Yup.date().required("Preferred Date is required"),
  additional: Yup.string(),
});

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const initialValues: FormValues = {
    name: "",
    phone: "",
    vehicle: "",
    date: new Date(),
    additional: "",
  };

  const handleSubmit = async (values: FormValues, { resetForm }: any) => {
    setLoading(true);
    setSuccess(null);
    setError(null);

    try {
      const response: FormResponse = await ky.post("/api/contact", { json: { formData: { ...values } } }).json();
      if (response.success) {
        resetForm();
        setSuccess(response.message || "Your message has been sent!");
      } else {
        setError(response.message || "Failed to send message.");
      }
    } catch (err) {
      setError("Something went wrong. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-lg w-full">
      {/* Outer card like screenshot */}
      <div className="bg-black/90 border border-white/10 rounded-sm p-8 sm:p-10">
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          <Form className="space-y-8">
            {/* Name */}
            <div className="space-y-3">
              <Label htmlFor="name" className="block text-white text-lg tracking-wide">
                Name: <span className="text-white/60">*</span>
              </Label>
              <Field
                as={Input}
                id="name"
                name="name"
                type="text"
                placeholder=""
                className="w-full bg-transparent border-0 border-b-2 border-white/30 rounded-none text-white placeholder:text-white/30 px-0 py-3 focus:outline-none focus:border-white transition"
              />
              <ErrorMessage name="name" component="p" className="text-red-400 text-sm mt-1" />
            </div>

            {/* Phone */}
            <div className="space-y-3">
              <Label htmlFor="phone" className="block text-white text-lg tracking-wide">
                Phone Number: <span className="text-white/60">*</span>
              </Label>
              <div className="relative">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 text-white/80 pl-1">
                  <Phone className="h-5 w-5" />
                </div>
                <Field
                  as={Input}
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder=""
                  className="w-full bg-transparent border-0 border-b-2 border-white/30 rounded-none text-white placeholder:text-white/30 pl-10 py-3 focus:outline-none focus:border-white transition"
                />
              </div>
              <ErrorMessage name="phone" component="p" className="text-red-400 text-sm mt-1" />
            </div>

            {/* Vehicle */}
            <div className="space-y-3">
              <Label htmlFor="vehicle" className="block text-white text-lg tracking-wide">
                Vehicle Make &amp; Model: <span className="text-white/60">*</span>
              </Label>
              <Field
                as={Input}
                id="vehicle"
                name="vehicle"
                type="text"
                placeholder=""
                className="w-full bg-transparent border-0 border-b-2 border-white/30 rounded-none text-white placeholder:text-white/30 px-0 py-3 focus:outline-none focus:border-white transition"
              />
              <ErrorMessage name="vehicle" component="p" className="text-red-400 text-sm mt-1" />
            </div>

            {/* Date */}
            <div className="space-y-3">
              <Label htmlFor="date" className="block text-white text-lg tracking-wide">
                Preferred Date: <span className="text-white/60">*</span>
              </Label>
              <Field
                as={Input}
                id="date"
                name="date"
                type="date"
                className="w-full bg-transparent border-0 border-b-2 border-white/30 rounded-none text-white placeholder:text-white/30 px-0 py-3 focus:outline-none focus:border-white transition"
              />
              <ErrorMessage name="date" component="p" className="text-red-400 text-sm mt-1" />
            </div>

            {/* Additional Info */}
            <div className="space-y-3">
              <Label htmlFor="additional" className="block text-white text-lg tracking-wide">
                Additional Info:
              </Label>
              <Field
                as={Textarea}
                id="additional"
                name="additional"
                className="w-full bg-transparent border-0 border-b-2 border-white/30 rounded-none text-white placeholder:text-white/30 px-0 py-4 min-h-[120px] focus:outline-none focus:border-white transition"
              />
              <ErrorMessage name="additional" component="p" className="text-red-400 text-sm mt-1" />
            </div>

            {/* messages */}
            <div>
              {error && <p className="text-red-400 text-sm mb-2">{error}</p>}
              {success && <p className="text-green-400 text-sm mb-2">{success}</p>}
            </div>

            {/* Send button (outlined box) */}
            <div>
              <Button
                type="submit"
                className="w-auto px-8 py-3 border-2 border-white text-white bg-transparent hover:bg-white/5 hover:text-white transition-none"
              >
                <span className="tracking-widest"> {loading ? "Submitting..." : "SEND"} </span>
              </Button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
