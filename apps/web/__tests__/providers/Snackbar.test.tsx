import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useContext } from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SnackbarContext } from '@/context/Snackbar';
import { SnackbarProvider } from '@/providers/Snackbar';

let lastProps: any;

vi.mock('@/components/ui/InfoSnackbar', () => {
  const InfoSnackbar = (p: any) => {
    lastProps = p;
    return p.message ? <div role="alert">{p.message}</div> : null;
  };
  return { InfoSnackbar };
});

function Consumer() {
  const { showSnackbar } = useContext(SnackbarContext)!;
  return <button onClick={() => showSnackbar('Hi', 'success', 1234)}>open</button>;
}

beforeEach(() => {
  lastProps = undefined;
});

describe('SnackbarProvider', () => {
  it('exposes showSnackbar and passes the correct props to InfoSnackbar', async () => {
    const user = userEvent.setup();
    render(
      <SnackbarProvider>
        <Consumer />
      </SnackbarProvider>,
    );

    await user.click(screen.getByRole('button', { name: /open/i }));

    expect(lastProps).toMatchObject({
      message: 'Hi',
      severity: 'success',
      duration: 1234,
      onClose: expect.any(Function),
    });

    lastProps.onClose();

    await waitFor(() => {
      expect(lastProps.message).toBeNull();
      expect(screen.queryByRole('alert')).toBeNull();
    });
  });

  it('renders an alert with content when it is open', async () => {
    const user = userEvent.setup();
    render(
      <SnackbarProvider>
        <Consumer />
      </SnackbarProvider>,
    );

    await user.click(screen.getByRole('button', { name: /open/i }));
    expect(await screen.findByRole('alert')).toHaveTextContent('Hi');
  });
});
