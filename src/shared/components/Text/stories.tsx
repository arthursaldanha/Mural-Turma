import { Story, Meta } from '@storybook/react'
import Text from '.'

export default {
  title: 'Text',
  component: Text
} as Meta

export const Default: Story = () => <Text fontFamily="Inter">Teste</Text>
