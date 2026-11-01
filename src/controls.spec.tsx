import { act, fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Button } from './button.js';
import { AppFrame, AppHeader, Drawer } from './chrome.js';
import { ChipSelect, RadioGroup, Segmented, Switch } from './form.js';
import { ToastProvider, useToast } from './overlay.js';

afterEach(() => {
  vi.useRealTimers();
});

describe('Button', () => {
  it('marks ghost and danger variants, and a busy loading state', () => {
    const { rerender } = render(<Button variant="ghost">Save</Button>);
    expect(screen.getByRole('button', { name: 'Save' }).className).toContain('btn-ghost');
    rerender(
      <Button variant="danger" loading>
        Delete
      </Button>,
    );
    const danger = screen.getByRole('button', { name: '…' });
    expect(danger.className).toContain('btn-danger');
    expect(danger).toHaveProperty('disabled', true);
    expect(danger.getAttribute('aria-busy')).toBe('true');
  });
});

function Chips() {
  const [value, setValue] = useState<string[]>(['a']);
  return <ChipSelect label="Cite" options={[{ value: 'a', label: '1' }, { value: 'b', label: '2' }]} value={value} onChange={setValue} />;
}

describe('ChipSelect', () => {
  it('toggles a value on and off', () => {
    render(<Chips />);
    const first = screen.getByRole('button', { name: '1' });
    const second = screen.getByRole('button', { name: '2' });
    expect(first.getAttribute('aria-pressed')).toBe('true');
    fireEvent.click(second);
    expect(second.getAttribute('aria-pressed')).toBe('true');
    fireEvent.click(first);
    expect(first.getAttribute('aria-pressed')).toBe('false');
  });
});

function SwitchDemo() {
  const [on, setOn] = useState(false);
  return <Switch label="Published" checked={on} onCheckedChange={setOn} />;
}

describe('Switch', () => {
  it('reports the new checked value', () => {
    render(<SwitchDemo />);
    const box = screen.getByRole('switch', { name: 'Published' });
    fireEvent.click(box);
    expect((box as HTMLInputElement).checked).toBe(true);
  });
});

function RadioDemo() {
  const [value, setValue] = useState<'asc' | 'desc'>('desc');
  return <RadioGroup label="Order" value={value} onChange={setValue} options={[{ value: 'desc', label: 'Descending' }, { value: 'asc', label: 'Ascending' }]} />;
}

describe('RadioGroup', () => {
  it('reports the chosen option', () => {
    render(<RadioDemo />);
    fireEvent.click(screen.getByRole('radio', { name: 'Ascending' }));
    expect((screen.getByRole('radio', { name: 'Ascending' }) as HTMLInputElement).checked).toBe(true);
  });
});

function SegmentDemo() {
  const [value, setValue] = useState('list');
  return (
    <Segmented
      label="View"
      value={value}
      onChange={setValue}
      options={[
        { value: 'list', label: 'List' },
        { value: 'grid', label: 'Grid' },
      ]}
    />
  );
}

describe('Segmented', () => {
  it('selects the clicked choice', () => {
    render(<SegmentDemo />);
    fireEvent.click(screen.getByRole('radio', { name: 'Grid' }));
    expect((screen.getByRole('radio', { name: 'Grid' }) as HTMLInputElement).checked).toBe(true);
  });
});

function ToastDemo() {
  const push = useToast();
  return <button type="button" onClick={() => push('Saved')}>Ping</button>;
}

describe('Toast', () => {
  it('shows a message and dismisses it', () => {
    vi.useFakeTimers();
    render(
      <ToastProvider>
        <ToastDemo />
      </ToastProvider>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Ping' }));
    expect(screen.getByRole('status').textContent).toContain('Saved');
    act(() => {
      vi.advanceTimersByTime(3000);
    });
    expect(screen.getByRole('status').textContent).not.toContain('Saved');
  });
});

describe('frame and drawer', () => {
  it('renders the header brand and an open drawer title', () => {
    render(
      <AppFrame>
        <AppHeader brand={<span>GREED</span>} />
        <Drawer open title="Menu" onOpenChange={() => undefined}>
          <p>Links</p>
        </Drawer>
      </AppFrame>,
    );
    expect(screen.getByText('GREED')).toBeTruthy();
    expect(screen.getByRole('heading', { name: 'Menu' })).toBeTruthy();
  });
});
