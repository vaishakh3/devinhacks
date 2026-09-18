/* Set registrationUrl to the confirmed application URL when registration opens.
   Only HTTPS URLs are accepted. null keeps the honest pre-registration state.
   Event copy is server-rendered in index.html so it remains useful without JS.
   The calendar is a date-only reminder: it does not invent a start time. */
window.DEVIN_EVENT = Object.freeze({ registrationUrl: null });
