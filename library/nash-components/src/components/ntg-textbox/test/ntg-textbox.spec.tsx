import { newSpecPage } from '@stencil/core/testing';
import { NtgTextbox } from '../ntg-textbox';

describe('ntg-textbox', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [NtgTextbox],
      html: `<ntg-textbox></ntg-textbox>`,
    });
    expect(page.root).toEqualHtml(`
      <ntg-textbox>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ntg-textbox>
    `);
  });
});
