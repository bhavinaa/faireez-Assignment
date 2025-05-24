import { Phone, Heart, Star, Mail } from 'lucide-react';

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  picture: string;
  isFavorite: boolean;
}

interface ContactCardProps {
  contact: Contact;
  onClick: (contact: Contact) => void;
  onToggleFavorite: (id: string) => void;
}

const ContactCard = ({ contact, onClick, onToggleFavorite }: ContactCardProps) => (
  <div className=
  "bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 cursor-pointer">
    <div onClick={() => onClick(contact)}>
      <div className="flex items-center space-x-4 mb-4">
        <img
          src={contact.picture}
          alt={contact.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 truncate">{contact.name}</h3>
          <p className="text-sm text-gray-500 truncate">{contact.email}</p>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center text-sm text-gray-600">
          <Mail className="w-4 h-4 mr-2" />
          <span className="truncate">{contact.email}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Phone className="w-4 h-4 mr-2" />
          <span>{contact.phone}</span>
        </div>
      </div>
    </div>
    <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite(contact.id);
        }}
        className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm transition-colors ${
          contact.isFavorite
            ? 'bg-red-50 text-red-600 hover:bg-red-100'
            : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
        }`}
      >
        <Heart className={`w-4 h-4 ${contact.isFavorite ? 'fill-current' : ''}`} />
        <span>{contact.isFavorite ? 'Favorited' : 'Favorite'}</span>
      </button>
    </div>
  </div>
);
export default ContactCard;

