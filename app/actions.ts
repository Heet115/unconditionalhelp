"use server"

import fs from "fs/promises"
import path from "path"

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

const DATA_DIR = path.join(process.cwd(), "data")
const SUBMISSIONS_FILE = path.join(DATA_DIR, "submissions.json")

async function ensureSubmissionsFile() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true })
    try {
      await fs.access(SUBMISSIONS_FILE)
    } catch {
      await fs.writeFile(SUBMISSIONS_FILE, JSON.stringify({ contact: [], volunteer: [] }, null, 2))
    }
  } catch (error) {
    console.error("Failed to initialize submissions file:", error)
  }
}

export async function submitContactForm(data: ContactInput) {
  // Simple validation
  if (!data.name || !data.email || !data.message) {
    return { success: false, error: "Please fill in all required fields." }
  }

  try {
    await ensureSubmissionsFile()
    const fileContent = await fs.readFile(SUBMISSIONS_FILE, "utf-8")
    const db = JSON.parse(fileContent)

    const newSubmission = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      ...data,
    }

    db.contact.push(newSubmission)
    await fs.writeFile(SUBMISSIONS_FILE, JSON.stringify(db, null, 2))

    return { success: true, message: "Thank you! Your message has been sent successfully." }
  } catch (error) {
    console.error("Contact form error:", error)
    return { success: false, error: "Something went wrong. Please try again later." }
  }
}

export async function submitVolunteerForm(data: VolunteerInput) {
  // Simple validation
  if (!data.name || !data.email || !data.phone || !data.focusArea) {
    return { success: false, error: "Please fill in all required fields." }
  }

  try {
    await ensureSubmissionsFile()
    const fileContent = await fs.readFile(SUBMISSIONS_FILE, "utf-8")
    const db = JSON.parse(fileContent)

    const newSubmission = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      ...data,
    }

    db.volunteer.push(newSubmission)
    await fs.writeFile(SUBMISSIONS_FILE, JSON.stringify(db, null, 2))

    return { success: true, message: "Thank you for volunteering! We will contact you soon." }
  } catch (error) {
    console.error("Volunteer form error:", error)
    return { success: false, error: "Something went wrong. Please try again later." }
  }
}
