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
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const initialValues: FormValues = {
    name: "",
    phone: "",
    vehicle: "",
    date: new Date(),
    additional: "",
  };

  const handleSubmit = async (values: FormValues, { resetForm }: { resetForm: () => void }) => {
    setLoading(true);
    setSuccess(null);
    setError(null);

    const submissionData = {
      formData: {
        ...values,
      },
    };

    try {
      const response: FormResponse = await ky
        .post("/api/contact", { json: submissionData })
        .json();

      if (response.success) {
        resetForm();
        setSuccess(response.message || "Your message has been sent successfully!");
      } else {
        setError(response.message || "Failed to send your message. Please try again later.");
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md w-full">

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white">Name: *</Label>
            <Field
              as={Input}
              id="name"
              name="name"
              type="text"
              className="bg-transparent border-b border-white/50 rounded-none text-white placeholder:text-white/70"
            />
            <ErrorMessage
              name="name"
              component="p"
              className="text-red-500 text-sm"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-white">Phone Number: *</Label>
            <div className="relative">
              <Phone className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 text-white/70" />
              <Field
                as={Input}
                id="phone"
                name="phone"
                type="tel"
                className="pl-6 bg-transparent border-b border-white/50 rounded-none text-white placeholder:text-white/70"
              />
            </div>
            <ErrorMessage
              name="phone"
              component="p"
              className="text-red-500 text-sm"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="vehicle" className="text-white">Vehicle Make & Model: *</Label>
            <Field
              as={Input}
              id="vehicle"
              name="vehicle"
              type="text"
              className="bg-transparent border-b border-white/50 rounded-none text-white placeholder:text-white/70"
            />
            <ErrorMessage
              name="vehicle"
              component="p"
              className="text-red-500 text-sm"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date" className="text-white">Preferred Date: *</Label>
            <Field
              as={Input}
              id="date"
              name="date"
              type="date"
              className="bg-transparent border-b border-white/50 rounded-none text-white placeholder:text-white/70"
            />
            <ErrorMessage
              name="date"
              component="p"
              className="text-red-500 text-sm"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="additional" className="text-white">Additional Info:</Label>
            <Field
              as={Textarea}
              id="additional"
              name="additional"
              className="bg-transparent border-b border-white/50 rounded-none text-white placeholder:text-white/70 min-h-[100px]"
            />
            <ErrorMessage
              name="additional"
              component="p"
              className="text-red-500 text-sm"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}

          <Button
            type="submit"
            className="w-full bg-transparent border border-white text-white hover:bg-white hover:text-black"
          >
            {loading ? "Submitting" : "SEND"}
          </Button>
        </Form>
      </Formik>
    </div>
  );
}