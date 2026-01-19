import { newSpecPage } from '@stencil/core/testing';
import { NashButton } from '../nash-button';

describe('nash-button', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [NashButton],
      html: `<nash-button></nash-button>`,
    });
    expect(page.root).toEqualHtml(`
      <nash-button>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </nash-button>
    `);
  });
});
