export type Phone = {
  number: string;
}

export type Contact = {
  created_at: string;
  id: number;
  first_name: string;
  last_name: string;
  phones: Phone[];
}

export type Contacts = {
  contact: Contact[]
}
