# User and operator walkthrough

[Back to project overview](../README.md) · [Architecture](architecture.md) · [Validation](validation.md)

This is a synthetic textual walkthrough based on the implementation. It is not a recording of a deployed session; no customer, applicant, or subscriber records are reproduced.

## A visitor becomes an applicant

1. A visitor explores services and a fleet company's vessels, then opens the sea-careers page.
2. They select a vacancy, which preselects its rank in the application dialog, or open a general application.
3. They enter contact and career information and optionally attach a PDF or DOCX CV within the file-size limit.
4. The browser submits multipart form data. The server validates it, uploads any CV, saves the application, and attempts the emails.
5. Success displays a confirmation. Applicant acknowledgement is best-effort; a success response does not prove that email arrived. If recruitment notification fails after saving, staff should check existing records before encouraging another submission.

Shore vacancies use an email link rather than this structured intake flow. This distinction is intentional in the walkthrough because the two paths differ in source.

## Staff maintain the website

1. Staff authenticate and pass the administrative role check.
2. They edit a news item, vacancy, fleet entry, team profile, or other managed content.
3. Relevant screens upload images and save structured data. Some image workflows resize large inputs before upload.
4. Public views query the content. Staff verify the presentation; a save is not a substitute for visual review.

## Staff review applications

The application screen lists submissions and supports status changes, a temporary signed download link for an attached CV, and deletion. This showcase does not expose that interface or any CV. Its role is to explain the implementation for an interview.

## Staff send a newsletter

1. Select news articles and enter a subject.
2. Send a single-recipient test preview and inspect it.
3. Start the bulk send. Keep the browser open while it requests successive batches and displays processed counts.
4. Review the send history, including failed recipients. Processed includes both successes and failures; it does not mean inbox delivery.
5. Subscribers can confirm an unsubscribe through the token-based flow.

The [offline example](../examples/README.md) models batch progression and an unsubscribe-related offset problem. It sends no messages and needs no account.
