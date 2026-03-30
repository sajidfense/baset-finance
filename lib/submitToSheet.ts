const WEBHOOK_URL = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_WEBHOOK_URL || "";

interface SheetPayload {
  name: string;
  email: string;
  phone: string;
  loan: string;
  message: string;
}

interface SubmitResult {
  success: boolean;
  error?: string;
}

/**
 * Submit form data to Google Sheets via Apps Script webhook.
 *
 * The Apps Script expects: { name, email, phone, loan, message }
 * and appends a row: [Date, name, email, phone, loan, message]
 *
 * Google Apps Script redirects the response, so we use `mode: "no-cors"`
 * which makes the response opaque. We assume success if no network error.
 */
export async function submitToSheet(data: SheetPayload): Promise<SubmitResult> {
  if (!WEBHOOK_URL) {
    console.error(
      "[submitToSheet] No webhook URL configured. Set NEXT_PUBLIC_GOOGLE_SHEETS_WEBHOOK_URL."
    );
    return { success: false, error: "Form submission is not configured." };
  }

  try {
    await fetch(WEBHOOK_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(data),
    });

    // With mode: "no-cors" the response is opaque (status 0).
    // If fetch didn't throw, the request was sent successfully.
    return { success: true };
  } catch (err) {
    console.error("[submitToSheet] Network error:", err);
    return {
      success: false,
      error: "Network error. Please check your connection and try again.",
    };
  }
}
