import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Card,
} from "reactstrap";

// Import Editor
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

//Import images
import avatar2 from "../../assets/images/users/user-2.jpg";
import avatar3 from "../../assets/images/users/user-3.jpg";
import avatar4 from "../../assets/images/users/user-4.jpg";
import avatar6 from "../../assets/images/users/user-6.jpg";
import Select from 'react-select';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
];



const EmailSideBar = () => {
  const [modal, setmodal] = useState(false);
  
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]

  const options1 = [
    { value: 'DGZ', label: 'DGZ' },
    { value: 'DMZ', label: 'DMZ' },
  ]

  const options2 = [
    { value: 'JEJO_1', label: '제조1계' },
    { value: 'JEJO_2', label: '제조2계' },
    { value: 'JEJO_3', label: '제조3계' },
  ]

  const options3 = [
    { value: 'CAC01', label: 'CAC01' },
    { value: 'CAC02', label: 'CAC02' },
    { value: 'CAC03', label: 'CAC03' },
    { value: 'CAC04', label: 'CAC04' },
  ]


  return (
    <React.Fragment>
      <Card className="email-leftbar">
        사업부
        <Select options={options1} />
        부서(계)
        <Select options={options2} />
        라인
        <Select options={options3} />
        
        {/* 
        <Link to="/email-compose" className="btn btn-danger rounded btn-custom">Compose</Link>
         */}

        {/* <Button
          type="button"
          color="danger"
          className="waves-effect waves-light"
          onClick={() => {
            setmodal(!modal);
          }}
          block
        >
          Compose
        </Button> */}




      </Card>

      <Modal
        isOpen={modal}
        role="dialog"
        autoFocus={true}
        centered={true}
        className="exampleModal"
        tabIndex="-1"
        toggle={() => {
          setmodal(!modal);
        }}
      >
        <div className="modal-content">
          <ModalHeader
            toggle={() => {
              setmodal(!modal);
            }}
          >
            New Message
          </ModalHeader>
          <ModalBody>
            <form>
              <div className="mb-3">
                <Input type="email" className="form-control" placeholder="To" />
              </div>

              <div className="mb-3">
                <Input
                  type="text"
                  className="form-control"
                  placeholder="Subject"
                />
              </div>
              <Editor
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
              />
            </form>
          </ModalBody>
          <ModalFooter>
            <Button
              type="button"
              color="secondary"
              onClick={() => {
                setmodal(!modal);
              }}
            >
              Close
            </Button>
            <Button type="button" color="primary">
              Send <i className="fab fa-telegram-plane ms-1"></i>
            </Button>
          </ModalFooter>
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default EmailSideBar;
