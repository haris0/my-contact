import { render } from '@testing-library/react';
import { ContactForm } from './ContactForm';

describe('ContactForm Component', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <ContactForm 
        firstName='Test'
        lastName='Test'
        phones={[]}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
