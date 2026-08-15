# UX/UI Requirements – Login & Team Pages
 
## Overview
This task focuses on improving the **UX/UI design** of the Login Page and Team Page.
 
The goal is to create a clean, modern, professional interface while keeping the existing functionality unchanged.
 
## Scope
- Front-end styling and presentation only
- HTML/CSS changes only
- Improve layout, spacing, typography, colours, forms, buttons, and cards
- Add clear hover and focus states
- Maintain basic accessibility
 
> **Important:** Do not modify backend logic, authentication, Firebase, database logic, API calls, routing, validation, or existing business logic.
 
## Login Page
The Login Page should:
- Keep the sign-in form as the main visual focus
- Use clear labels and readable input fields
- Have a clear visual hierarchy
- Make the main sign-in button easy to identify
 
## Team Page
Each team member must display:
- **Name**
- **Profile picture/avatar**
- **Role**
- **Short blurb** describing their responsibilities or contribution
 
The Team Page should use a clean and consistent card-based layout with readable typography and clear spacing between elements.
 
## Team Page Edge Cases
The requirements and mock-up must show how the design handles these edge cases:
 
### Missing Profile Photo
- If a profile photo is unavailable, display a consistent fallback avatar or the team member's initials.
- The missing image must not break the card layout or leave an empty image area.
 
### Long Blurb / Text Overflow
- Long blurbs must wrap within the team member card.
- Text must not overflow outside the card or overlap other elements.
- Card spacing and readability should remain consistent when descriptions have different lengths.
 
## Design Guidelines
- Modern, minimal, and professional
- Consistent styling across the Login Page and Team Page
- Clean and readable typography
- Consistent colours, spacing, borders, and card styles
- Clear visual hierarchy
- Subtle hover and focus effects where appropriate
 
## Deliverables
Create mock-ups for:
- Login Page
- Team Page
- Team Page edge cases:
  - Missing profile photo
  - Long blurb / text overflow
 
## Acceptance Criteria
- Both pages look professional and consistent
- Login flow is clear and easy to understand
- Each team profile includes **name, profile picture/avatar, role, and blurb**
- Missing profile photos have a clear fallback state
- Long blurbs remain contained and readable without text overflow
- Team member cards remain visually consistent across the documented edge cases
- Existing functionality remains unchanged
- No backend logic is modified new file