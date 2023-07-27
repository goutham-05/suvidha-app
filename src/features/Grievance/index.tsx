import React from 'react';
import Form from "semantic-ui-react/dist/commonjs/collections/Form";
import TextArea from "semantic-ui-react/dist/commonjs/addons/TextArea";
import Navbar from '../../components/nav-bar';
function Grievance(props:any) {
    return (
        <>
        <Form>
          <h3>FeedBack</h3>
          <TextArea style={{
            resize: 'none'
          }} placeholder="Tell us more" />
        </Form>
      </>
    );
}

export default Grievance;