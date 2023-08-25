import { render } from '@testing-library/react';
import { HeaderWithAva } from './HeaderWithAva';

describe('HeaderWithAva Component', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <HeaderWithAva 
        name='Test'
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
