export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  organizationId: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Organization {
  id: string;
  name: string;
  slug: string;
  description?: string;
  logo?: string;
  website?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  slug: string;
  startDate: string;
  endDate: string;
  location: string;
  capacity?: number;
  status: EventStatus;
  type: EventType;
  image?: string;
  organizationId: string;
  createdAt: string;
  updatedAt: string;
}

export interface TicketType {
  id: string;
  eventId: string;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  sold: number;
  status: TicketStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Ticket {
  id: string;
  ticketNumber: string;
  eventId: string;
  ticketTypeId: string;
  userId: string;
  status: TicketStatus;
  qrCode: string;
  checkedInAt?: string;
  createdAt: string;
  updatedAt: string;
}

export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ORG_ADMIN = 'ORG_ADMIN',
  ORG_MEMBER = 'ORG_MEMBER',
  ATTENDEE = 'ATTENDEE',
}

export enum EventStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ONGOING = 'ONGOING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export enum EventType {
  CONFERENCE = 'CONFERENCE',
  SEMINAR = 'SEMINAR',
  WORKSHOP = 'WORKSHOP',
  WEBINAR = 'WEBINAR',
  MEETUP = 'MEETUP',
  CONCERT = 'CONCERT',
  EXHIBITION = 'EXHIBITION',
  OTHER = 'OTHER',
}

export enum TicketStatus {
  AVAILABLE = 'AVAILABLE',
  SOLD_OUT = 'SOLD_OUT',
  INACTIVE = 'INACTIVE',
}
