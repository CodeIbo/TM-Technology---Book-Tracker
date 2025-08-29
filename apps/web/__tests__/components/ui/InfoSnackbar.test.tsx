import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { InfoSnackbar } from '@/components/ui/InfoSnackbar';

describe('InfoSnackbar', () => {
  it('renders alert with message when open', async () => {
    const onClose = vi.fn();
    render(<InfoSnackbar message="Hello" onClose={onClose} duration={60000} />);
    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent('Hello');
  });

  it('clicking close button calls onClose', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(<InfoSnackbar message="X" onClose={onClose} duration={60000} />);
    const closeBtn = await screen.findByRole('button');
    await user.click(closeBtn);
    expect(onClose).toHaveBeenCalled();
  });

  it('auto hides after default duration (1000ms) and calls onClose', async () => {
    vi.useFakeTimers();
    const onClose = vi.fn();
    render(<InfoSnackbar message="Auto-hide" onClose={onClose} />);
    await act(async () => {
      vi.advanceTimersByTime(1000);
      await Promise.resolve();
    });

    expect(onClose).toHaveBeenCalled();

    vi.useRealTimers();
  });
});
