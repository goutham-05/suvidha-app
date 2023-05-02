import React from "react";
import TextArea from "semantic-ui-react/dist/commonjs/addons/TextArea";
import Form from "semantic-ui-react/dist/commonjs/collections/Form";
import Label from "semantic-ui-react/dist/commonjs/elements/Label";
import Navbar from "../../components/nav-bar";

function Request() {
  return (
    <>
      <Navbar />
      <Form>
        <h3>Re</h3>
        <TextArea style={{
          resize: 'none'
        }} placeholder="Tell us more" />
      </Form>
    </>
  );
}

export default Request;