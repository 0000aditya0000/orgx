import { newE2EPage } from '@stencil/core/testing';

describe('ntg-toggle', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ntg-toggle></ntg-toggle>');

    const element = await page.find('ntg-toggle');
    expect(element).toHaveClass('hydrated');
  });
});
