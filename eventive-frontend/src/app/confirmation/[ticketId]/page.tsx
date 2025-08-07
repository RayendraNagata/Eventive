import Link from 'next/link';

// Mock function to fetch ticket data
async function fetchTicket(ticketId: string) {
  // In real app, this would be an API call
  return {
    id: ticketId,
    eventTitle: 'Tech Innovation Summit 2025',
    eventDate: '2025-08-15T10:00:00Z',
    eventLocation: 'Convention Center, Jakarta',
    ticketNumber: `TIX-${ticketId.toUpperCase()}`,
    holderName: 'John Doe',
    holderEmail: 'john@example.com',
    price: 150,
    qrCode: `QR-${ticketId}` // In real app, generate actual QR code
  };
}

// QR Code Component (simplified)
const QRCodeDisplay = ({ data }: { data: string }) => {
  return (
    <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center mx-auto">
      {/* In real app, use a QR code library like 'qrcode' */}
      <div className="text-center">
        <div className="text-xs text-gray-600 mb-1">QR Code</div>
        <div className="text-xs text-gray-500 font-mono">{data}</div>
      </div>
    </div>
  );
};

// Ticket Card Component
const TicketCard = ({ ticket }: { ticket: any }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 mt-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">
        {ticket.eventTitle}
      </h2>
      
      {/* QR Code */}
      <QRCodeDisplay data={ticket.qrCode} />
      
      {/* Ticket Details */}
      <div className="mt-4 space-y-2">
        <div className="text-center">
          <div className="text-gray-700 font-medium">Ticket Number</div>
          <div className="text-lg font-mono text-gray-900">{ticket.ticketNumber}</div>
        </div>
        
        <div className="border-t border-gray-200 pt-4 space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Event Date:</span>
            <span className="text-gray-900">
              {new Date(ticket.eventDate).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Time:</span>
            <span className="text-gray-900">
              {new Date(ticket.eventDate).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Location:</span>
            <span className="text-gray-900">{ticket.eventLocation}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Holder:</span>
            <span className="text-gray-900">{ticket.holderName}</span>
          </div>
          
          <div className="flex justify-between font-semibold">
            <span className="text-gray-600">Price:</span>
            <span className="text-green-600">${ticket.price}</span>
          </div>
        </div>
      </div>
      
      {/* Download Button */}
      <button className="w-full bg-indigo-500 text-white rounded-md shadow mt-4 py-3 hover:bg-indigo-600 transition-colors">
        <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-4-4m4 4l4-4m-6 8h8a2 2 0 002-2V7a2 2 0 00-2-2H8a2 2 0 00-2 2v11a2 2 0 002 2z" />
        </svg>
        Download PDF
      </button>
    </div>
  );
};

export default async function TicketConfirmationPage({ 
  params 
}: { 
  params: { ticketId: string } 
}) {
  const ticket = await fetchTicket(params.ticketId);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Eventive</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-8 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Success Banner */}
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-green-800">
                  Thank you for your purchase!
                </h3>
                <p className="mt-1 text-sm text-green-700">
                  Your ticket has been confirmed and is ready to use.
                </p>
              </div>
            </div>
          </div>

          {/* Ticket Card */}
          <TicketCard ticket={ticket} />

          {/* Navigation Links */}
          <div className="text-center mt-6 space-x-4">
            <Link 
              href="/dashboard/user" 
              className="inline-flex items-center text-sky-500 hover:text-sky-600 transition-colors"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to My Tickets
            </Link>
            
            <Link 
              href="/events" 
              className="inline-flex items-center text-gray-500 hover:text-gray-700 transition-colors"
            >
              Browse More Events
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Important Notice */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="text-sm font-medium text-blue-900 mb-2">Important Information</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Please bring this ticket (digital or printed) to the event</li>
              <li>• Arrive 30 minutes before the event start time</li>
              <li>• Valid ID may be required for entry</li>
              <li>• Tickets are non-refundable unless the event is cancelled</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
