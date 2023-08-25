import { render } from '@testing-library/react';
import { UserNotFound } from './UserNotFound';

describe('UserNotFound Component', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <UserNotFound />
    );
    expect(baseElement).toBeTruthy();
  });
});
