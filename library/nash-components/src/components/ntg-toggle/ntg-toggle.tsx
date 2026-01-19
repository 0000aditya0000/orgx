import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'ntg-toggle',
  styleUrl: 'ntg-toggle.css',
  shadow: true,
})
export class NtgToggle {
  @Prop() checked: true | false;

  render() {
    return (
      <div class="toggle">
          <div class="input-flex">
            <input type="checkbox" checked={this.checked} id="switch" /><label htmlFor="switch">Toggle</label>
          </div>
      </div>
    );
  }

}
