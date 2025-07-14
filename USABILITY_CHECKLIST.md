# Usability Checklist

This project implements several UI components that follow recommendations from **ISO 9241-11** and **ISO 25010:2011**. The main forms and menu were reviewed and updated to include good practices for accessibility and usability.

## System Menu
- Consistent top location and logical order of options.
- Active item highlighted through the `active` class on navigation links.
- Skip link and language switcher for quick access.
- Responsive layout handled in CSS (`Landing.css`).

## Login Form
- Explicit labels for email and password fields.
- Real time validation with messages for incorrect email and weak password.
- Show/Hide password button with `aria-label`.
- Autocomplete attributes and new **Remember me** option storing the username locally.
- Error and success messages announced with `aria-live`.

## Register Form
- Labels associated with each field and password strength meter.
- Autocomplete hints (`email`, `new-password`).
- Show/Hide password button with accessible label.
- Validation messages displayed while typing.

## Contact Form
- Single form requesting **Name**, **Email**, **Subject** and **Message**.
- Required fields and confirmation message after sending.
- Autocomplete attributes for name and email.
- Clear instructions and contact information provided.

These adjustments aim to make the application easier to use with keyboards, screen readers and mobile devices while keeping the interface simple.
