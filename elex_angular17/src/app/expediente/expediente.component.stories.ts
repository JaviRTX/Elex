import { Meta, StoryObj } from '@storybook/angular';

import { ExpedienteComponent } from './expediente.component';

type ComponentWithCustomControls = ExpedienteComponent;

const meta: Meta<ComponentWithCustomControls> = {
  // title: 'Components/Expediente',
  component: ExpedienteComponent,
  // decorators: [moduleMetadata({imports: []})],
  parameters: {
    docs: { description: { component: `Expediente` } },
  },
  argTypes: {},
  args: {},
};
export default meta;

export const Expediente: StoryObj<ComponentWithCustomControls> = {
  render: (args: ComponentWithCustomControls) => ({ props: args }),
  args: {},
}
