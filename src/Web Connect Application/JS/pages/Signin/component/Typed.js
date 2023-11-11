import React from 'react';
import Typed from 'typed.js';

class TypedStrings extends React.Component {
  componentDidMount() {
    // If you want to pass more options as props, simply add
    // your desired props to this destructuring assignment.
    const { strings } = this.props;
    // You can pass other options here, such as typing speed, back speed, etc.
    const options = {
      strings: strings,
      typeSpeed: 45,
      startDelay: 1000,
      backSpeed: 20,
      backDelay: 500,
      loop: true,
      loopCount: 2,
      showCursor: true,
      cursorChar: "|",
      attr: null,
      contentType: 'html'
    };
    // this.el refers to the <span> in the render() method
    this.typed = new Typed(this.el, options);
  }

  componentWillUnmount() {
    // Make sure to destroy Typed instance on unmounting
    // to prevent memory leaks
    this.typed.destroy();
  }

  render() {
    return (
      <>
        <span
          // style={{ whiteSpace: 'pre' }}
          ref={(el) => { this.el = el; }}
        />
      </>
    );
  }
}

export default TypedStrings