import { newSpecPage } from '@stencil/core/testing';
import { NtgToggle } from '../ntg-toggle';

describe('ntg-toggle', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [NtgToggle],
      html: `<ntg-toggle></ntg-toggle>`,
    });
    expect(page.root).toEqualHtml(`
      <ntg-toggle>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ntg-toggle>
    `);
  });
});
