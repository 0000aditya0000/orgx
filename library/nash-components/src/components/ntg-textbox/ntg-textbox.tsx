import { Component, Prop, Event, EventEmitter, h } from '@stencil/core';

@Component({
  tag: 'ntg-textbox',
  styleUrl: 'ntg-textbox.scss',
  shadow: true,
})
export class NtgTextbox {

  @Prop({ mutable: true }) value: string;
  @Prop() label:string;
  @Prop() type:string;

  @Event() valueChanged: EventEmitter<string>;

  inputChanged(ev: any) {
    let val = ev.target && ev.target.value;
    this.value = val;
    this.valueChanged.emit(this.value);
  }


  handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.valueChanged.emit(this.value);
  }

  render() {
    return (
      <label class="input-textfield">
        <input type={this.type ? this.type : "text"} value={this.value} placeholder=' ' onInput={this.inputChanged.bind(this)}/>
          <span>{this.label}</span>
      </label>
    );
  }
}