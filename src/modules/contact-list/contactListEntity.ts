type Contact = {
  created_at: string;
  id: number;
  first_name: string;
  last_name: string;
  phones: string[];
}

export type Contacts = {
  contact: Contact[]
}
