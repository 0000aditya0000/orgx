import { newE2EPage } from '@stencil/core/testing';

describe('ntg-textbox', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ntg-textbox></ntg-textbox>');

    const element = await page.find('ntg-textbox');
    expect(element).toHaveClass('hydrated');
  });
});
