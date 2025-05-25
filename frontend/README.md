
# Frontend of the Contacts App

This helps to display and manage the list of contacts fetched from an API.

It supports features like:

* Viewing the contact cards
* Searching by name/email
* Sorting by name/email/phone
* Marking/unmarking contacts as favorite
* Filtering favorites
* Simple pagination

---

### Tech Stack

* React (TypeScript)
* Tailwind CSS
* Lucide Icons
* Fetch API

---

### Components Breakdown

#### `ContactsApp.tsx`

Main logic and layout of the contact list interface.

**Key responsibilities:**

* Parent component handling state management for contacts, filters, and UI
* Loads the data from the backend
* Renders layout sections: stats, filters, contacts, pagination
* Passes data to children

**Props:** None (self-contained)
**State:** `contacts`, `searchTerm`, `isModalOpen`, `selectedContact`, etc.

---

#### `ContactCard.tsx`

Displays an individual contact card (reusable).

**Props:**

* `contact`: Contact object
* `onClick`: Opens modal
* `onToggleFavorite`: Toggles favorite status

---

#### `ContactModal.tsx`

Modal popup for viewing contact details and simulating a call.

**Props:**

* `contact`: Selected contact object
* `isOpen`: Boolean to control visibility
* `onClose`: Close modal
* `onCall`: Simulate a call
* `onToggleFavorite`: Toggle favorite status

---

### Tailwind Styling

* **Layout:** `grid`, `flex`, `gap`, `justify-between`
* **Typography:** `text-gray-700`, `font-bold`
* **Spacing:** `p-4`, `px-6`, `mb-8`
* **Responsiveness:** `sm:`, `lg:`, `xl:`
* **Interactivity:** `hover:bg-gray-100`, `focus:ring-2`
* **Reusability:** Utility-first approach

---

### UI Considerations

* Clean layout and visual hierarchy
* Responsive grid for optimal screen space
* Hover/focus interactions
* Center-aligned accessible modals

---

###  Sequence Diagram

![image](https://github.com/user-attachments/assets/effdabb3-49f5-4b69-98eb-f6fd0ce4aa83)


---

###  API Endpoint

```
GET http://localhost:3000/contacts
```

**Response Format:**

```ts
interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  picture: string;
  isFavorite: boolean;
}
```

---

###  App Logic

#### Search Logic

```ts
contacts.filter(c =>
  `${c.name} ${c.email}`.toLowerCase().includes(searchTerm.toLowerCase())
)
```

####  Sort Logic

```ts
filtered.sort((a, b) => a.name.localeCompare(b.name))
```

#### Favorite Filter Logic

```ts
filterFavorites ? contacts.filter(c => c.isFavorite) : contacts
```

---

### Future Improvements

* Add animations and transitions
* Sync favorite status with local storage

---

### React Design Patterns Used

* **Functional Components** (no class components)
* **React Hooks**

  * `useState` for local and UI state
  * `useEffect` for data fetching (side-effects)
* **Single Responsibility Principle**

  * `ContactCard` and `ContactModal` 
* **Presentational vs Container Components**

  * Logic in parent (`ContactsApp`), view-only children
* **No Redux**

  * Simple state, shallow component tree → prop drilling is manageable
* **Conditional Rendering**

  ```tsx
  {selectedContact && <ContactModal ... />}
  ```
* **Separation of State and Derived Data**

  * UI state is distinct from filtered/sorted data
* **TypeScript**

  * Interfaces used for type safety

---

##  Design Decisions (Frontend)

### 1. **Component Architecture**

*  **Single Responsibility Principle**
  Each component does one thing well:

  * `ContactsApp` manages state and logic
  * `ContactCard` displays one contact
  * `ContactModal` handles UI for details
### 2. **UI Library: Tailwind CSS**

*  Rapid prototyping and consistent styling
  * Eliminated need for writing custom CSS classes
  * Used by faireez too

* **Design Consideration:**

  * Tailwind scales well with component-based frameworks
  * Responsiveness is handled using built-in breakpoints

### 3. **Icons: Lucide**

* Lightweight icon set
  and has better integration with React than alternatives like FontAwesome

### 4. **Data Fetching: `fetch()` API inside `useEffect()`**

* Ensures the data loads only once when the app mounts
  Simple and avoids external libraries (e.g., Axios)

* **Alternative Considered:** Axios 
  *  `fetch` is enough for a single GET request

### 5. **State Management Strategy**

*  Local state using `useState`

  * `contacts`, `searchTerm`, `sortBy`, `filterFavorites`, etc. all kept in `ContactsApp`

*   `filteredAndSortedContacts` is calculated via chaining filters and sorters instead of storing extra states


  * No use of reducers or context since the state logic is straightforward and app size is small

### 6. **UI Responsiveness & Accessibility**

*  Used Tailwind’s responsive utilities (`sm:`, `md:`, `xl:`)
*  Modal is centered and focus-aware
*  Contact cards adapt to screen size using `grid-cols-*` utilities

### 7. **Performance Considerations**

*  Fetch data once → in-memory caching on frontend
*  Only display 100 contacts out of 300 fetched for performance


