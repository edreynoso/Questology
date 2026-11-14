## How to run

```bash
git clone https://github.com/edreynoso/Questology.git
cd Questology
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).

## Viewing on mobile

The app is designed for mobile screens only. On desktop, open the browser dev tools and turn on device emulation (Chrome: `Ctrl+Shift+M` / `Cmd+Shift+M`), then choose a phone such as iPhone 14 or Pixel 7.

## Notes for user testing

State is kept in `localStorage`, so it survives page refreshes:

| Key | Holds |
|---|---|
| `questology:loggedIn` | Whether the tester is logged in |
| `questology:questState` | Created quests, approvals/denials and RSVPs |

To reset the app between testers, clear both keys (dev tools → Application → Local Storage), or clear site data. Seed data always reloads from `src/data`.

## Team contributions

- **Edgar**: login and signup pages, create quest flow and modal views
