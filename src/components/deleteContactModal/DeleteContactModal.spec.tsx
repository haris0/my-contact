import { render } from '@testing-library/react';
import { DeleteContactModal } from './DeleteContactModal';

describe('DeleteContactModal Component', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <DeleteContactModal 
        isOpen={false}
        onClose={() => undefined}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
