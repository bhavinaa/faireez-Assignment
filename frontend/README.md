## Frontend of the contacts app

This helps to display and manages the list of contcts fetched from an API

It supports the features like
- viewing the cards
- searching by the name/email
- sorting by name/email/phone
- mark/unmark the fav
- filter the fav
- simple paging

### tech stack
- react (typescript)
- tailwind css
- lucide icons
- fetch api

### components breakdown

#### ContactsApp.tsx
- main logic and layout of the contact list interface

Key responsibilites
- Parent compontent that helps with the state maangement for the contacts, filters, and UI
- loads the data from the backend
- renders the layout section (stats, filters, contacts, pagination)
- passes the data to child

Props: none (self-contained)
State: contacts, searchTerm, isModalOpen, selectedContact, etc.

#### contact card.tsx
- displays the indiviudal contact (reusable)

Props
- contact (contact object)
- on click (open modal)
- on toggle fav (fav status)

#### ContactModal.tsx
Modal popup for viewing contact details and calling.

Props:
contact: Selected contact object
isOpen: Boolean to control visibility
onClose: Close modal
onCall: Simulate call
onToggleFavorite: Toggle favorite status

#### Tailwind styling
- Layout: grid, flex, gap, justify-between
- Typography: text-gray-700, font-bold
- Spacing: p-4, px-6, mb-8
- Responsiveness: sm:, lg:, xl:
- Interactivity: hover:bg-gray-100, focus:ring-2
- Reusability


### UI considerations
- layout 
- cards 
- responsive grid (for optimal usage of the screen space)
- interaction (hoverv, focus)
- modals (accessible + center aligned when it pops up)


### Data Flow
User Visits App 
↓
[App Load]
↓
useEffect → fetch API → setContacts
↓
State: contacts[] → filteredAndSortedContacts[]
↓
Render:
- Stats Section (uses counts)
- Filter Bar (searchTerm, sortBy, filterFavorites)
- Grid → ContactCard[]
- Modal (selectedContact)

###  API endpoint
- GET http://localhost:3000/contacts
- Expects a JSON array of contacts.
- Each contact should have:
```
interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  picture: string;
  isFavorite: boolean;
}
```

### App Logic

#### Search Logic
contacts.filter(c =>
  `${c.name} ${c.email}`.toLowerCase().includes(searchTerm.toLowerCase())
)
#### Sort Logic
filtered.sort((a, b) => a.name.localeCompare(b.name))

#### Fav Logic
filterFavorites ? contacts.filter(c => c.isFavorite) : contacts

### Future improvements
- add animations
- local storage sync for fav


### react design patterns

- react functional comp (no classes)
- react hooks 
* use state (for local state + UI)
* use effect (side effects as i fetch the API to mount)
- single responsibility components (for the contact card, and the contact modal)
* receives props
* manages no internal state (statless)
- presentational vs container component pattern


Did not use redux (no complex state managment)
- currently using props to pass from the parent to the children (very small app)
- the prop drilling is easy to follow, and the tree is shallow

- conditional rendering
{selectedContact && <ContactModal ... />}

- component state sep
* curr ui state is kept separate from the derived data 
- typescript has an interface 