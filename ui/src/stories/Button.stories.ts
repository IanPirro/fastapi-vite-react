import type { Meta, StoryObj } from '@storybook/react'

import Button from '../framework/Button'

const meta = {
  title: 'Button',
  component: Button,
  tags: ['autodocs'],
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Click me',
  },
  parameters: {
    layout: 'centered',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    children: 'Click me',
  },
  parameters: {
    layout: 'centered',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    children: 'Click me',
  },
  parameters: {
    layout: 'centered',
  },
}

export const FullWidth: Story = {
  args: {
    size: 'small',
    fullWidth: true,
    children: 'Click me',
  },
}
