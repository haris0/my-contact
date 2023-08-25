import { render } from '@testing-library/react';
import { ContactCard } from './ContactCard';

describe('ContactCard Component', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <ContactCard 
        firstName='Test'
        lastName='Test'
        phoneNumber='08123456789'
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
