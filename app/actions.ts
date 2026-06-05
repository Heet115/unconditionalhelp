"use server"

import { supabase } from "@/lib/supabase"

export interface ContactInput {
  name: string
  email: string
  phone?: string
  message: string
}

export interface VolunteerInput {
  name: string
  email: string
  phone: string
  focusArea: string
  message?: string
}

export async function submitContactForm(data: ContactInput) {
  // Simple validation
  if (!data.name || !data.email || !data.message) {
    return { success: false, error: "Please fill in all required fields." }
  }

  try {
    const { error } = await supabase.from("contact_submissions").insert([
      {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        message: data.message,
      },
    ])

    if (error) {
      throw error
    }

    return {
      success: true,
      message: "Thank you! Your message has been sent successfully.",
    }
  } catch (error) {
    console.error("Contact form error:", error)
    return {
      success: false,
      error: "Something went wrong. Please try again later.",
    }
  }
}

export async function submitVolunteerForm(data: VolunteerInput) {
  // Simple validation
  if (!data.name || !data.email || !data.phone || !data.focusArea) {
    return { success: false, error: "Please fill in all required fields." }
  }

  try {
    const { error } = await supabase.from("volunteer_applications").insert([
      {
        name: data.name,
        email: data.email,
        phone: data.phone,
        focus_area: data.focusArea,
        message: data.message || null,
      },
    ])

    if (error) {
      throw error
    }

    return {
      success: true,
      message: "Thank you for volunteering! We will contact you soon.",
    }
  } catch (error) {
    console.error("Volunteer form error:", error)
    return {
      success: false,
      error: "Something went wrong. Please try again later.",
    }
  }
}
