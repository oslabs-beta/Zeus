/**
 * @jest-environment jsdom
 */

 test('use jsdom in this test file', () => {
    const element = document.createElement('div');
    expect(element).not.toBeNull();
  });

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../components/Header';

// can use DESCRIBE BLOCKS to nest mulitple tests that are similar 
// ie: all are for a component and some functionality for it
describe("Header component testing", () => {

    // what we are testing
test('Header component should have a title', 
async () => {
    // 1st render the component we want to test
    render(<Header title="I am the Header" subtitle="I am the Header's subtile" />);
    // find an element we want to interact with
    const divElement = screen.getByRole("header");
    // use screen to interact with it via its methods
    expect(divElement).toContain("I am the Header");
    //Assertion that the results are as expected
});

});