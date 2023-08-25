import { render } from '@testing-library/react';
import { Layout } from './Layout';

describe('Layout Component', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Layout />
    );
    expect(baseElement).toBeTruthy();
  });
});
