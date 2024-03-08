import React, { useCallback, useState } from "react";
import { useDropzone } from 'react-dropzone';

import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Container,
} from "reactstrap";
import { connect } from "react-redux";
import { Map, InfoWindow, GoogleApiWrapper } from "google-maps-react";
//Lightbox
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import ModalVideo from "react-modal-video";
import "react-modal-video/scss/modal-video.scss";

//Side Effect
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

// import image
import img1 from "../../assets/images/small/img-1.jpg";
import img2 from "../../assets/images/small/img-2.jpg";
import img3 from "../../assets/images/small/img-3.jpg";
import img4 from "../../assets/images/small/img-4.jpg";
import img5 from "../../assets/images/small/img-5.jpg";
import img6 from "../../assets/images/small/img-6.jpg";
import img7 from "../../assets/images/small/img-7.jpg";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";




const images = [img1, img2, img3, img4, img5, img6];
const zoomImages = [img3, img7];

const LoadingContainer = () => <div>Loading...</div>;

const UiLightbox = (props) => {

  const [isFits, setisFits] = useState(false);
  const [isEffects, setisEffects] = useState(false);
  const [isGallery, setisGallery] = useState(false);
  const [isGalleryZoom, setisGalleryZoom] = useState(false);
  const [isOpen, setisOpen] = useState(false);
  const [isOpen1, setisOpen1] = useState(false);
  const [modal, setmodal] = useState(false);
  const [map, setMap] = useState(false);

  function tog_map() {
    setMap(!map);
  }
  
const [isImageMoved, setIsImageMoved] = useState(false);

const handleButtonClick = () => {
  setIsImageMoved(true);
};


  const spanStyle = {
    padding: '20px',
    background: '#efefef',
    color: '#000000'
  }

const divStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundSize: 'cover',
  height: '600px'
}


const slideImages = [
  {
    url: 'https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
    caption: 'Slide 1'
  },
  {
    url: 'https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80',
    caption: 'Slide 2'
  },
  {
    url: 'https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
    caption: 'Slide 3'
  },
];



const [files, setFiles] = useState([]);
const [disableClick, setDisableClick] = useState(false);
const onDrop = useCallback((acceptedFiles) => {
  setFiles([...files, ...acceptedFiles]);
}, [files]);

const deleteFile = (index) => {
  //alert(index);
  setDisableClick(true);
    const updatedFiles = [...files];
   updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
    alert(updatedFiles.some((file)=> !file.deleteFile));
//    setDisableClick(true);
setDisableClick(updatedFiles.some((file)=> !file.deleteFile))
  };


const deleteFiles = () => {
  const updatedFiles = files.filter((file, index) => !file.checked);
  setFiles(updatedFiles);
};

//체크박스 선택시
const handleCheckboxChange = (index) => {
  const updatedFiles = [...files];
  updatedFiles[index].checked = !updatedFiles[index].checked;
  setFiles(updatedFiles);
  setDisableClick(updatedFiles.some((file) => file.checked)); // 체크된 파일이 있는 경우에만 클릭 비활성화
};

const { getRootProps, getInputProps, isDragActive } = useDropzone({
  onDrop,
  noClick: disableClick, // disableClick 값에 따라 클릭 활성화/비활성화 설정
});

//파일업로드 버튼1
const openFileDialog = () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.multiple = true; // 여러 개의 파일 선택 가능
  input.onchange = handleImageUpload;
  input.click();
};

//파일업로드 버튼2
const handleImageUpload = (event) => {
  const selectedFiles = Array.from(event.target.files);
  setFiles([...files, ...selectedFiles]);
};



  document.title = "LG | 반성회 이미지 관리";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs maintitle="자율운영" title="작업시간준수" breadcrumbItem="반성회 이미지 관리_NEW" />
            <Row>
              <Col lg={9}>
                <Card>
                  <CardBody>
                    <CardTitle className="h4"></CardTitle>
                      <Slide>
                        {slideImages.map((slideImage, index)=> (
                          <div key={index}>
                            <div style={{ ...divStyle, 'backgroundImage': `url(${slideImage.url})` }}>
                              <span style={spanStyle}>{slideImage.caption}</span>
                            </div>
                          </div>
                        ))} 
                      </Slide>
                  </CardBody>
                </Card>
              </Col>
              <Col lg={3}>
              <Card>
                <CardBody>
                  <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
                  <input {...getInputProps()} />
                  {files.length > 0 ? (
                    <div>
                      {files.map((file, index) => (
                            <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              
                             <img src={URL.createObjectURL(file)} alt={`Uploaded ${index + 1}`} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                             <button style={{ marginLeft: 'auto' }} className="waves-effect waves-light btn btn-outline-danger" onClick={() => deleteFile(index)}><i className="mdi mdi-trash-can-outline"></i></button>
                            </div>
                      ))}
                      {/* <button onClick={deleteFiles}>선택된 항목 삭제</button> */}
                    </div>
                  ) : isDragActive ? (
                    <p>여기에 파일을 드롭하세요!</p>
                  ) : (
                    <p>여기로 파일을 드래그 앤 드롭하세요.</p>
                  )}
                </div>
                <Row>
                  <div className="mt-2"  style={{ display: 'flex', justifyContent: 'center' }}>
                    <button className="btn btn-secondary me-2 md-1" style={{ marginRight: '10px' }} onClick={openFileDialog}>이미지 찾기</button>
                    <Button  className="btn btn-secondary me-2 md-1" >이미지 저장</Button>
                  </div>
                </Row>
               </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};
export default connect(
  null,
  {}
)(
  GoogleApiWrapper({
    apiKey: "AIzaSyAbvyBxmMbFhrzP9Z8moyYr6dCr-pzjhBE",
    LoadingContainer: LoadingContainer,
    v: "3",
  })(UiLightbox)
);
