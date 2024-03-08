//import React, { useState } from "react";
import React, { useCallback, useState } from "react";

import {
  Table,
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

//react-dropzone
//import { useDropzone } from 'react-dropzone';
import Dropzone from "react-dropzone";

import { Link } from "react-router-dom";

// import image
//import img1 from "../../assets/images/small/img-1.jpg";
//import img2 from "../../assets/images/small/img-2.jpg";
//import img3 from "../../assets/images/small/img-3.jpg";
//import img4 from "../../assets/images/small/img-4.jpg";
//import img5 from "../../assets/images/small/img-5.jpg";
//import img6 from "../../assets/images/small/img-6.jpg";
//import img7 from "../../assets/images/small/img-7.jpg";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

//const images = [img1, img2, img3, img4, img5, img6];
//const zoomImages = [img3, img7];

//const LoadingContainer = () => <div>Loading...</div>;



//const slideImages = [
//  {
//    url: 'https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
//    caption: 'Slide 1'
//  },
//  {
//    url: 'https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80',
//    caption: 'Slide 2'
//  },
//  {
//    url: 'https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
//    caption: 'Slide 3'
//  },
//  {
//    url: 'https://www.google.co.kr/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
//    caption: 'Slide 3'
//  },
//  
//];

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
  height: '650px'
}


const UiLightbox = (props) => {

  //////////////////////////////////////////////////////////////////////////////////////
  //react-slideshow-image
  //////////////////////////////////////////////////////////////////////////////////////
  //const selectedPlace = {};

  // const [photoIndex, setphotoIndex] = useState(0);
  // //const [isFits, setisFits] = useState(false);
  // //const [isEffects, setisEffects] = useState(false);
  const [isGallery, setisGallery] = useState(false);
  // //const [isGalleryZoom, setisGalleryZoom] = useState(false);
  // //const [isOpen, setisOpen] = useState(false);
  // //const [isOpen1, setisOpen1] = useState(false);
  // //const [modal, setmodal] = useState(false);
  // //const [map, setMap] = useState(false);
  // //function tog_map() {
  // //  setMap(!map);
  // //}


  //const [slideImages, setSlideImages] = useState([]);
  //slideImages.push({
  //  url: 'https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
  //  caption: 'Slide 1'
  //});

  //기본이미지
  const [slideImages, setSlideImages] = useState([
    { url: "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80" },
    { url: "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80" },
    { url: "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80" },
    //{ url: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" },
    
  ]);

  //////////////////////////////////////////////////////////////////////////////////////
  //react-dropzone
  //////////////////////////////////////////////////////////////////////////////////////
  //const [disableClick, setDisableClick] = useState(false);
  //const [files, setFiles] = useState([]);
  //const onDrop = useCallback((acceptedFiles) => {
  //  setFiles([...files, ...acceptedFiles]);
  //}, [files]);
  //
  //
  //const { getRootProps, getInputProps, isDragActive } = useDropzone({
  //  onDrop,
  //  noClick: disableClick, // disableClick 값에 따라 클릭 활성화/비활성화 설정
  //});

  //const {acceptedFiles, getRootProps, getInputProps} = Dropzone({
  //  accept: 'image/*',
  //});

  const [refreshKey, setRefreshKey] = useState(0);

  const [selectedFiles, setselectedFiles] = useState([]);

  function handleAcceptedFiles(files) {
    //files.map(file =>
    //  Object.assign(file, {
    //    preview: URL.createObjectURL(file),
    //    formattedSize: formatBytes(file.size),
    //  })
    //);
    //setselectedFiles(files);
    //const updatedImages = [...slideImages];
    const updatedImages = [];

    files.forEach((file) => {
      if (file.type.startsWith('image/')) {
        Object.assign(file, {
          preview: URL.createObjectURL(file),
          formattedSize: formatBytes(file.size),
        });

        //slideImages.push({
        //  url: URL.createObjectURL(file) + "&auto=format&fit=crop&w=1500&q=80",
        //  //caption: 'Slide 4'
        //})

        //slideImages.push({ url: URL.createObjectURL(file) });

        //setSlideImages(slideImages);
        // Create a copy of the existing array
        

        // Add new images to the copied array using push
       // newImages.forEach(newImage => {
          
          //updatedImages.push({ url: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" });
          
       // });

        //console.log(updatedImages);

        // Update the state with the modified array
        //새로추가된이미지만 추가
        updatedImages.push({ url: URL.createObjectURL(file) });
        setSlideImages(updatedImages);
        
        
        //이미지 더하기
        //slideImages.push({ url: URL.createObjectURL(file) });
        //setSlideImages(slideImages);

        //console.log("prevKey", prevKey);
        console.log("refreshKey", refreshKey);
        //refreshKey
        //setRefreshKey(prevKey => prevKey + 1);
        setRefreshKey(0);

      } else {
        Object.assign(file, {
          preview: "",
          formattedSize: formatBytes(file.size),
        });
      }
    });



    setselectedFiles(files);

  }

  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  const deleteFile = (index) => {
    setselectedFiles(selectedFiles.filter((selectedFiles, i) => i !== index));
    setSlideImages(slideImages.filter((selectedFiles, i) => i !== index));
  };



  document.title = "LG | 반성회 이미지 관리";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs maintitle="자율운영" title="작업시간준수" breadcrumbItem="반성회 이미지 관리" />

{/* 
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
          ) : null} */}

          <Row>
            <Col lg={9}>
              <Card>
                <CardBody>
                  <CardTitle className="h4"></CardTitle>
                  <Slide key={refreshKey}>
                    {slideImages.map((slideImage, index) => (
                      <div key={index} >
                        <div style={{ ...divStyle, 'backgroundImage': `url(${slideImage.url})` }}>
                          {/* <span style={spanStyle}>{slideImage.caption}</span> */}
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
                  <Dropzone
                    Accept=".jpg,.jpeg,.png"
                    onDrop={acceptedFiles => {
                      handleAcceptedFiles(acceptedFiles);
                    }}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div className="dropzone">
                        <div
                          className="dz-message needsclick"
                          {...getRootProps()}
                        >
                          <input {...getInputProps()} />
                          <div className="mb-3">
                            <i className="mdi mdi-cloud-upload display-4 text-muted"></i>
                          </div>
                          <h4>Drop files here or click to upload.</h4>
                        </div>
                      </div>
                    )}
                  </Dropzone>
                  <div className="dropzone-previews mt-3" id="file-previews">
                    <div className="table-responsive">
                      <Table className="table mb-0">
                        {/* <thead>
                        <tr>
                          <th>#</th>
                          <th>First Name</th>
                          <th>Last Name</th>
                          <th>Username</th>
                        </tr>
                      </thead> */}
                        <tbody>
                          {selectedFiles.map((f, i) => {
                            return (
                              <tr key={i + "-file"}>
                                <td>
                                  {/* <img
                                    data-dz-thumbnail=""
                                    height="80"
                                    className="avatar-sm rounded bg-light"
                                    alt={f.name}
                                    src={f.preview}
                                  /> */}
                                  {f.preview != "" ? (
                                    <img
                                      data-dz-thumbnail=""
                                      height="80"
                                      className="avatar-sm rounded bg-light"
                                      alt={f.name}
                                      src={f.preview}
                                    />
                                  ) : (
                                    // <h1 className="display-6"><i className="mdi mdi-file"></i></h1>
                                    // <h3><i className="mdi mdi-file"></i></h3>
                                    <i className="mdi mdi-file"></i>
                                  )}
                                </td>
                                <td>{f.name}</td>
                                <td>
                                  <button className="waves-effect waves-light btn btn-outline-danger" onClick={() => deleteFile(i)}><i className="mdi mdi-trash-can-outline"></i></button>
                                </td>
                              </tr>
                            );
                          }
                          )}
                        </tbody>
                      </Table>
                    </div>

                    {/* <button className="btn btn-primary waves-effect waves-light btn btn-primary">Move Images</button> */}

                    {/* 
                        {selectedFiles.map((f, i) => {
                          return (
                            
                            
                            <Card
                              className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                              key={i + "-file"}
                            >
                              <div className="p-2">
                                <Row className="align-items-center">
                                  <Col className="col-auto">
                                    <img
                                      data-dz-thumbnail=""
                                      height="80"
                                      className="avatar-sm rounded bg-light"
                                      alt={f.name}
                                      src={f.preview}
                                    />
                                  </Col>
                                  <Col>
                                    <Link
                                      to="#"
                                      className="text-muted font-weight-bold"
                                    >
                                      {f.name}
                                    </Link>
                                    <p className="mb-0">
                                      <strong>{f.formattedSize}</strong>
                                    </p>
                                  </Col>
                                  <Col></Col>
                                </Row>
                              </div>
                            </Card> 



                          );
                        })} 

*/}

                  </div>




                </CardBody>
              </Card>
            </Col>

            {/* 
            <Col lg={6}>
              <Card>
                <CardBody>
                  <CardTitle className="h4">Lightbox gallery</CardTitle>
                  <p className="card-title-desc">
                    In this example lazy-loading of images is enabled for the
                    next image based on move direction.{" "}
                  </p>
                  <div className="popup-gallery d-flex flex-wrap">
                    <div className="img-fluid float-left">
                      <img
                        src={img1}
                        onClick={() => {
                          setisGallery(true);
                          setphotoIndex(0);
                        }}
                        alt=""
                        width="120"
                      />
                    </div>
                    <div className="img-fluid float-left">
                      <img
                        src={img2}
                        onClick={() => {
                          setisGallery(true);
                          setphotoIndex(1);
                        }}
                        alt=""
                        width="120"
                      />
                    </div>
                    <div className="img-fluid float-left">
                      <img
                        src={img3}
                        onClick={() => {
                          setisGallery(true);
                          setphotoIndex(2);
                        }}
                        alt=""
                        width="120"
                      />
                    </div>
                    <div className="img-fluid float-left">
                      <img
                        src={img4}
                        onClick={() => {
                          setisGallery(true);
                          setphotoIndex(3);
                        }}
                        alt=""
                        width="120"
                      />
                    </div>
                    <div className="img-fluid float-left">
                      <img
                        src={img5}
                        onClick={() => {
                          setisGallery(true);
                          setphotoIndex(4);
                        }}
                        alt=""
                        width="120"
                      />
                    </div>
                    <div className="img-fluid float-left">
                      <img
                        src={img6}
                        onClick={() => {
                          setisGallery(true);
                          setphotoIndex(5);
                        }}
                        alt=""
                        width="120"
                      />
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col> */}




          </Row>


        </Container>
      </div>
    </React.Fragment>
  );
};

export default UiLightbox;

