import { Story, Meta } from '@storybook/react'
import InputRHF from '.'

export default {
  title: 'InputFormik',
  component: InputRHF
} as Meta

export const Default: Story = () => <InputRHF name="teste" />
