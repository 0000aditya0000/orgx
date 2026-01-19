import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'nash-button',
  styleUrl: 'nash-button.css',
  shadow: true,
})

export class NashButton {

  @Prop() type: 'basic' | 'raised' | 'outline' | 'flat' = 'basic';
  @Prop() color: 'plain' | 'primary' | 'secondary' | 'danger' = 'plain';
  @Prop() transform: 'none' | 'uppercase' | 'lowercase' | 'capitalize' = 'capitalize';


  render() {
    return (
      <button
        class={`${this.type} ${this.color} ${this.transform}`}
      >
        <slot></slot>
      </button>
    )
  }
}
