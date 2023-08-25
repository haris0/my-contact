import { render } from '@testing-library/react';
import ContactFavoriteWrap from './ContactFavoriteWrap';

describe('ContactFavoriteWrap Component', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <ContactFavoriteWrap />
    );
    expect(baseElement).toBeTruthy();
  });
});
