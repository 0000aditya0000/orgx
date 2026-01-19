import { newE2EPage } from '@stencil/core/testing';

describe('nash-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<nash-button></nash-button>');

    const element = await page.find('nash-button');
    expect(element).toHaveClass('hydrated');
  });
});
