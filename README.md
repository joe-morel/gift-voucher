# Gift Voucher for Mom

A small, heartfelt project created for Mother's Day — an app that generates a beautiful voucher to send to your mom from afar. More than a bank transfer, it's a thoughtful gesture with design, a personal message, and warmth.

✨ Why this project?

- Because sometimes what matters most is the thought, not just the money: a message, an image, or a keepsake voucher.
- Designed for people who want to send a meaningful gift from a distance without relying solely on bank transfers.

Features

- Friendly UI to create and personalize a voucher.
- Add recipient name, a personal message, occasion, and date.
- Generate a visual voucher ready to share (image/PDF or link for WhatsApp/email).
- Confirmation/receipt modal to simulate delivery and make the experience feel complete.

How to use (development)

- Clone the repo:
  ```bash
  git clone https://github.com/<your-username>/<repo-name>.git
  cd <repo-name>
  ```
- Install dependencies (this project uses `pnpm`):
  ```bash
  pnpm install
  ```
- Run in development:
  ```bash
  pnpm dev
  ```
- Open `http://localhost:3000` in your browser.

Environment variables

- Do not store secrets in the repository. If you integrate email or third-party APIs, configure keys in your hosting provider (Vercel/Netlify) or a `.env` file that is ignored by Git.
- Example variable names (set these outside the repo):
  - `NEXT_PUBLIC_APP_NAME` — public app name
  - `MAIL_FROM` — sender email address
  - `MAIL_PROVIDER_API_KEY` — API key for email provider

Deployment

- Recommended: Vercel (Next.js ready to deploy). Connect the repository and set environment variables in the dashboard.

Best practices

- Add `/.env*` to `.gitignore` if not already present.
- Do not commit keys or secrets to Git history; if you already did, rotate those credentials and follow steps to remove them from history.

Contributing

- Pull requests welcome. Use descriptive branch names (`feat/xxx`, `fix/xxx`).

License

- This project is licensed under the MIT License — see the `LICENSE` file.

Personal note
This project was born on Mother's Day as a way to bridge distance with a small, meaningful gift. If you'd like, I can create the first commit, add a `.gitignore`, or push the repository to GitHub for you — tell me your GitHub username or remote URL and I will handle it.

---

Made with love 💐

---
