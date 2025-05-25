import React, { useState, useEffect, useMemo } from 'react';
import { Search, User, Star } from 'lucide-react';
import ContactCard from './ContactCard';
import { ContactModal } from './ContactModal';
import { generateFakeContacts } from '../../data';

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  picture: string;
  isFavorite: boolean;
}
const ContactsApp = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState('name');
  const [filterFavorites, setFilterFavorites] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const contactsPerPage = 12;

  // Simulate API loading
  useEffect(() => {
    const loadContacts = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3000/contacts');
        const data = await response.json();
        setContacts(data);

        setError(null);
      } catch (err) {
        setError('Oh no! Something went wrong, unable to find the backend! Our engineers are working on it.');
      } finally {
        setLoading(false);
      }
    };

    loadContacts();
  }, []);

  // Filter and sort contacts
  const filteredAndSortedContacts = useMemo(() => {
    let filtered = contacts.filter(contact => {
      const matchesSearch = contact && `${contact.name || ''} ${contact.email || ''}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesFavorites = !filterFavorites || contact.isFavorite;
      return matchesSearch && matchesFavorites;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return (a.name || '').localeCompare(b.name || '');
        case 'email':
          return (a.email || '').localeCompare(b.email || '');
        case 'phone':
          return (a.phone || '').localeCompare(b.phone || '');
        default:
          return 0;
      }
    });

    return filtered;
  }, [contacts, searchTerm, sortBy, filterFavorites]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedContacts.length / contactsPerPage);
  const startIndex = (currentPage - 1) * contactsPerPage;
  const paginatedContacts = filteredAndSortedContacts.slice(startIndex, startIndex + contactsPerPage);

  const handleContactClick = (contact: Contact): void => {
    setSelectedContact(contact);
    setIsModalOpen(true);
  };

  const handleCall = (contact: Contact): void => {
    alert(`Calling ${contact.name} at ${contact.phone}`);
    setIsModalOpen(false);
  };

  const handleToggleFavorite = (contactId: string): void => {
    setContacts(prev => prev.map(contact =>
      contact.id === contactId
        ? { ...contact, isFavorite: !contact.isFavorite }
        : contact
    ));
  };

  const favoriteCount = contacts.filter(c => c.isFavorite).length;

  if (error) {
    return (
      <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md w-full">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Contact App Application
          </h1>
          <p className="text-gray-600">Manage your contacts efficiently</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
            <div className="flex items-center">
              <User className="w-8 h-8 text-blue-600 flex-shrink-0" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{contacts.length}</p>
                <p className="text-gray-600">Total Contacts</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
            <div className="flex items-center">
              <Star className="w-8 h-8 text-yellow-500 flex-shrink-0" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{favoriteCount}</p>
                <p className="text-gray-600">Favorites</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center">
              <Search className="w-8 h-8 text-green-600 flex-shrink-0" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{filteredAndSortedContacts.length}</p>
                <p className="text-gray-600">Filtered Results</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white text-black rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 mb-6 sm:mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search contacts..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3  text-black  border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="name">Sort by Name</option>
                <option value="email">Sort by Email</option>
                <option value="phone">Sort by Phone</option>
              </select>

              <button
                onClick={() => {
                  setFilterFavorites(!filterFavorites);
                  setCurrentPage(1);
                }}
                className={`px-4 py-3 rounded-lg font-medium transition-colors duration-200 whitespace-nowrap ${filterFavorites
                  ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                  : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                  }`}
              >
                {filterFavorites ? 'Show All' : 'Favorites Only'}
              </button>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading contacts...</p>
          </div>
        )}

        {/* Contacts Grid */}
        {!loading && (
          <>
            {paginatedContacts.length === 0 ? (
              <div className="text-center py-12">
                <Search className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No contacts found</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-8">
                {paginatedContacts.map((contact) => (
                  <ContactCard
                    key={contact.id}
                    contact={contact}
                    onClick={handleContactClick}
                    onToggleFavorite={handleToggleFavorite}
                  />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2 pb-8">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>

                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  let page: number;
                  if (totalPages <= 5) {
                    page = i + 1;
                  } else if (currentPage <= 3) {
                    page = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    page = totalPages - 4 + i;
                  } else {
                    page = currentPage - 2 + i;
                  }

                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-2 text-sm font-medium rounded-lg ${currentPage === page
                        ? 'text-blue-600 bg-blue-50 border border-blue-200'
                        : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                        }`}
                    >
                      {page}
                    </button>
                  );
                })}

                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}

        {/* Contact Modal */}
        {selectedContact && (
          <ContactModal
            contact={selectedContact}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onCall={handleCall}
            onToggleFavorite={handleToggleFavorite}
          />
        )}
      </div>
    </div>
  );
};

export default ContactsApp;

