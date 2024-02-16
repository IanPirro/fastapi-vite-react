import type { Meta, StoryObj } from '@storybook/react'

import FullPageLoader from '../framework/FullPageLoader'

const meta = {
  title: 'Full Page Loader',
  component: FullPageLoader,
  tags: ['autodocs'],
} satisfies Meta<typeof FullPageLoader>

export default meta
type Story = StoryObj<typeof meta>

export const FullPageLoaderStory: Story = {
  args: {},
  parameters: {
    layout: 'fullscreen',
  },
  render: (args) => <FullPageLoader {...args} />,
}
