import { render } from '@testing-library/react';
import { Pagination } from './Pagination';

describe('Pagination Component', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Pagination 
        currectPage={1}
        dataLength={10}
        limit={10}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
