/**
 * Encodes a flat object as `application/x-www-form-urlencoded`, the format
 * Netlify Forms expects for AJAX submissions.
 */
export function encodeFormData(data: Record<string, string>): string {
  return Object.keys(data)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`,
    )
    .join("&");
}

/**
 * Submits a set of form values to Netlify Forms. Netlify intercepts POST
 * requests to "/" (or any path) whose body matches a form it detected at
 * build time via the `form-name` field.
 */
export async function submitToNetlify(
  formName: string,
  values: Record<string, string>,
): Promise<void> {
  const response = await fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: encodeFormData({ "form-name": formName, ...values }),
  });

  if (!response.ok) {
    throw new Error(`Form submission failed with status ${response.status}`);
  }
}
