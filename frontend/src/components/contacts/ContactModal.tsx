
import { Phone, Heart, Mail, X, Star } from 'lucide-react';
export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  picture: string;
  isFavorite: boolean;
}

interface ContactModalProps {
  contact: Contact;
  isOpen: boolean;
  onClose: () => void;
  onCall: (contact: Contact) => void;
  onToggleFavorite: (id: string) => void;
}

export const ContactModal = ({ contact, isOpen, onClose, onCall, onToggleFavorite }: ContactModalProps) => {
  if (!isOpen || !contact) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex justify-between items-center rounded-t-2xl">
          <h2 className="text-xl font-bold text-gray-900">Contact Details</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="text-center mb-6">
            <div className="relative inline-block">
              <img 
                src={contact.picture} 
                alt={`${contact.name} `}
                className="w-24 h-24 rounded-full mx-auto object-cover ring-4 ring-gray-100"
              />
              {contact.isFavorite && (
                <div className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-2">
                  <Star className="w-4 h-4 text-white fill-current" />
                </div>
              )}
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mt-4">
              {contact.name} 
            </h3>
            
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <Mail className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-gray-900">{contact.email}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <Phone className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="text-gray-900">{contact.phone}</p>
              </div>
            </div>
            
          </div>
          
          <div className="flex space-x-3 mt-6">
            <button
              onClick={() => onCall(contact)}
              className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <Phone className="w-5 h-5" />
              <span>Call</span>
            </button>
            <button
              onClick={() => onToggleFavorite(contact.id)}
              className={`px-4 py-3 rounded-xl font-semibold transition-colors duration-200 flex items-center justify-center ${
                contact.isFavorite 
                  ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Heart className={`w-5 h-5 ${contact.isFavorite ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
