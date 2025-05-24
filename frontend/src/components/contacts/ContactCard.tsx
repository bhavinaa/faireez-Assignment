import { Phone, Heart, Star } from 'lucide-react';

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

export const ContactCard = ({ contact, onClick, onToggleFavorite }: ContactCardProps) => (
  <div 
    className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 cursor-pointer border border-gray-100 hover:border-blue-200 group"
    onClick={() => onClick(contact)}
  >
    <div className="flex items-center space-x-4">
      <div className="relative">
        <img 
          src={contact.picture} 
          alt={`${contact.name}`}
          className="w-16 h-16 rounded-full object-cover ring-2 ring-gray-100 group-hover:ring-blue-200 transition-all duration-300"
        />
        {contact.isFavorite && (
          <div className="absolute -top-1 -right-1 bg-yellow-400 rounded-full p-1">
            <Star className="w-3 h-3 text-white fill-current" />
          </div>
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-semibold text-gray-900 truncate">
          {contact.name} 
        </h3>
        <p className="text-sm text-gray-600 truncate">{contact.phone}</p>
        <p className="text-sm text-gray-500 truncate">{contact.email}</p>
      </div>
      
      <div className="flex flex-col items-end space-y-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(contact.id);
          }}
          className={`p-2 rounded-full transition-all duration-200 ${
            contact.isFavorite 
              ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200' 
              : 'bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600'
          }`}
        >
          <Heart className={`w-4 h-4 ${contact.isFavorite ? 'fill-current' : ''}`} />
        </button>
        <button className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-all duration-200">
          <Phone className="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
);
