import PropTypes from 'prop-types'
import React, { useCallback, useState, useRef  } from "react";
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


//Import Breadcrumb
/* import Breadcrumbs from "../../components/Common/Breadcrumb"; */


/* const image = [img1, img2, img3, img4, img5, img6];
const zoomImages = [img3, img7]; */

/* const LoadingContainer = () => <div>Loading...</div>; */


const CreateModal = ({ show, onDeleteClick, onCloseClick }) => {
/* const UiLightbox = (props) => { */
  const selectedPlace = {};

  const [photoIndex, setphotoIndex] = useState(0);
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

  
/* const [isImageMoved, setIsImageMoved] = useState(false);

const handleButtonClick = () => {
  setIsImageMoved(true);
};


const [imagePositions, setImagePositions] = useState([0, 0]); */

/* const handleButtonsClick = () => {
  setImagePositions([imagePositions[0] - 100, imagePositions[1] - 100]);
}; */


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

/* function slideImagesMove(value){

  alert(value);

} */

const [files, setFiles] = useState([]);
const [disableClick, setDisableClick] = useState(false);
const onDrop = useCallback((acceptedFiles) => {
  setFiles([...files, ...acceptedFiles]);
}, [files]);

const deleteFile = (index) => {
    const updatedFiles = [...files];
   updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
    setDisableClick(true);
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




/* const [movedImages, setMovedImages] = useState([]); */

/* const moveImages = () => {
  setMovedImages(images);
  setImages([]);
}; */


/* const moveImages = () => {
  const updatedFiles = files.filter((file, index) => !file.checked);
  setMovedImages(images);
  slideImagesMove(updatedFiles);
}; */


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



  return (
    <Modal size="xl" isOpen={show} toggle={onCloseClick} centered={true}>
    <ModalBody className="py-2 px-0">
      <Row>
        <Col lg={12}>

          {isFits ? (
            <Lightbox
              mainSrc={images[1]}
              enableZoom={false}
              imageCaption={
                "Caption. Can be aligned it to any side and contain any HTML."
              }
              onCloseRequest={() => {
                setisFits(!isFits);
              }}
            />
          ) : null}

          {isEffects ? (
            <Lightbox
              mainSrc={images[2]}
              enableZoom={false}
              onCloseRequest={() => {
                setisEffects(!isEffects);
              }}
            />
          ) : null}

          {isGallery ? (
            <Lightbox
              mainSrc={images[photoIndex]}
              nextSrc={images[(photoIndex + 1) % images.length]}
              prevSrc={images[(photoIndex + images.length - 1) % images.length]}
              enableZoom={true}
              onCloseRequest={() => {
                setisGallery(false);
              }}
              onMovePrevRequest={() => {
                setphotoIndex((photoIndex + images.length - 1) % images.length);
              }}
              onMoveNextRequest={() => {
                setphotoIndex((photoIndex + 1) % images.length);
              }}
              imageCaption={"Project " + parseFloat(photoIndex + 1)}
            />
          ) : null}

          {isGalleryZoom ? (
            <Lightbox
              mainSrc={zoomImages[photoIndex]}
              nextSrc={zoomImages[(photoIndex + 1) % zoomImages.length]}
              prevSrc={zoomImages[(photoIndex + zoomImages.length - 1) % zoomImages.length]}
              onCloseRequest={() => {
                setisGalleryZoom(false);
              }}
              onMovePrevRequest={() => {
                setphotoIndex((photoIndex + zoomImages.length - 1) % zoomImages.length);
              }}
              onMoveNextRequest={() => {
                setphotoIndex((photoIndex + 1) % zoomImages.length);
              }}
            />
          ) : null}

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

      <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`} >
      <input {...getInputProps()} />
      {files.length > 0 ? (
        <div>
          {files.map((file, index) => (
            <>
            <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
             {/*  <input
                type="checkbox"
                checked={file.checked}
                onChange={() => handleCheckboxChange(index)} /> */}
              <img src={URL.createObjectURL(file)} alt={`Uploaded ${index + 1}`} />
              <button onClick={() => deleteFile(index)}>✖️</button>
             </div>
            <div>

              </div>
              </>
          ))}
         {/*  <button onClick={deleteFiles}>선택된 항목 삭제</button> */}
        </div>
      ) : isDragActive ? (
        <p>여기에 파일을 드롭하세요!</p>
      ) : (
        <p>여기로 파일을 드래그앤드롭하세요.</p>
      )}
    </div>

    <div className="mt-2" style={{ display: 'grid', placeItems: 'center' }}>
       <Button
        className="btn btn-secondary me-1"
        onClick={() => {
              openFileDialog
              //handleCheckboxChange(0);
            }}
            >
            이미지 업로드
       </Button> 

       <Button
        className="btn btn-secondary me-1"
        onClick={() => {
              openFileSend
              //handleCheckboxChange(0);
            }}
            >
            이미지 보내기
              </Button> 
             </div>
                   </CardBody>
                 </Card>
               </Col>
            </Row>
           </Col>
         </Row>
         <Row>
            <Col>
                <div className="text-center mt-3">
                  {/*  <button
                      type="button"
                      className="btn btn-success btn-lg ms-2"
                      onClick={onDeleteClick}
                    >
                      Yes, delete it!
                    </button> */}
                <button
                  type="button"
                  className="btn btn-danger btn-lg ms-2"
                  onClick={onCloseClick}
                  >
                Cancel
                </button>
              </div>
            </Col>
          </Row>

      </ModalBody>
    </Modal>
  )
}

CreateModal.propTypes = {
    onCloseClick: PropTypes.func,
    onDeleteClick: PropTypes.func,
    show: PropTypes.any
}

export default CreateModal