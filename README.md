# faireez-Assignment
This application allows users to manage their contacts efficiently with a modern and intuitive UI. It fetches contacts from the [RandomUser API](https://randomuser.me/), supports filtering, viewing contact details in a modal, and toggling favorites. It also includes proper error handling and loading states throughout the app.

---

## 🧱 Tech Stack

### Frontend
- ⚛️ React (TypeScript)
- 💨 Tailwind CSS
- 🔄 Axios (API integration)
- 🧠 Redux 

### Backend
- 🧭 NestJS (TypeScript)
- 🌐 RESTful API
- 📦 Axios (to call RandomUser API)
- 🪵 NestJS Logger
- ✅ Class-validator (input validation)

---

## 🗂️ Project Structure

```

contacts-app/
├── frontend/               # React app
│   ├── src/
│   │   ├── components/     # UI Components
│   │   ├── pages/          # Home and modal views
│   │   ├── services/       # API services
│   │   ├── store/          # Redux or Context (optional)
│   │   ├── types/          # TypeScript interfaces
│   │   └── utils/          # Helpers (debounce, etc.)
│   └── tailwind.config.js
├── backend/                # NestJS API
│   ├── src/
│   │   ├── contacts/       # Contacts module (controller, service, DTOs)
│   │   ├── common/         # Shared filters, interceptors
│   │   └── main.ts
└── README.md

````

---

## 🛠️ Setup Instructions

### 🖥️ Frontend

```bash
cd frontend
npm install
npm run dev
````

---

### 🧪 Backend

```bash
cd backend
npm install
npm run start:dev
```

> API runs at: `http://localhost:3000`

Make sure to configure CORS in `main.ts` of NestJS if needed:

```ts
app.enableCors({
  origin: 'http://localhost:5173'
});
```
---

## 🌐 API Documentation

### `GET /contacts`

Fetch a list of 50 random contacts.

**Response:**

```json
[
  {
    "id": "user-123",
    "name": "John Smith",
    "email": "john.smith@example.com",
    "phone": "+1 555-123-4567",
    "location": "New York, USA",
    "thumbnail": "https://randomuser.me/api/portraits/men/1.jpg",
    "isFavorite": false
  }
]
```

---

### `GET /contacts/:id`

Fetch a single contact by ID.

---

### `PATCH /contacts/:id/favorite`

Toggle favorite status of a contact.

**Request Body:**

```json
{
  "isFavorite": true
}
```

---

## 🎨 UI Features

* ✅ Contact listing with thumbnail, name, and location
* 🔍 Search bar to filter by name/email
* 📱 Modal popup with detailed contact view and "Call" simulation
* 🌟 Favorite/unfavorite toggle
* 🔁 Loading and error states
* 📱 Mobile-first responsive design

---

## ✨ Bonus Features (If Implemented)

* Pagination for contact list
* Redux for state management
* Sorting by name or location
* Deployed on Vercel / Netlify (frontend) and Render / Heroku (backend)

---

## 🧠 Design Decisions

* **Modular folder structure**: Clear separation by feature and domain
* **API transformation**: Backend transforms RandomUser format into consistent `Contact` DTO
* **Favorites**: Stored in memory for speed; could be extended to persistent storage
* **Tailwind CSS**: Used for rapid and responsive UI development
* **NestJS**: Chosen for its modular, scalable architecture and TypeScript support

---

## ✅ Tests (Optional)

### Backend

```bash
cd backend
npm run test
```

---

## 📦 Deployment URLs (If Applicable)

* **Frontend**: [https://contacts-frontend.vercel.app](https://contacts-frontend.vercel.app)
* **Backend**: [https://contacts-api.onrender.com](https://contacts-api.onrender.com)

---

## 🧑‍💻 Author

Built for the Faireez Home Assignment – Contacts Application
