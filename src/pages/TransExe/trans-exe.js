import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect, useDispatch } from "react-redux";
import { isEmpty } from "lodash";
import Dropzone from "react-dropzone";


import "react-datepicker/dist/react-datepicker.css";

import { useFormik } from "formik";
import * as Yup from "yup";
import Select from 'react-select'
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormFeedback,
  Input,
  InputGroup,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Table,
  FormGroup
  ,CardTitle
} from "reactstrap";

//추가
import { Link } from "react-router-dom";
import { MDBDataTable, MDBDataTableV5 } from "mdbreact";
import "./datatables.scss";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import BootstrapTheme from "@fullcalendar/bootstrap";
import listPlugin from '@fullcalendar/list';

//Import Flatepicker
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import {
  addNewEvent,
  deleteEvent,
  getCategories,
  getEvents,
  updateEvent,
} from "../../store/actions";
import DeleteModal from "./DeleteModal";
//css
import "@fullcalendar/bootstrap"
// import "@fullcalendar/bootstrap/main.css";

const Calender = props => {

  const { events, categories } = props;
  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [modalcategory, setModalcategory] = useState(false);
  const [event, setEvent] = useState({});
  const [selectedDay, setSelectedDay] = useState(0);
  const [isEdit, setIsEdit] = useState(false);

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

  const options4 = [
    { value: '휴가(일반)', label: '🔖 휴가(일반)' },
    { value: '휴가(주요)', label: '🏷️휴가(주요)' },
    { value: 'FI-11', label: '📗FI-11' },
    { value: '위험성평가', label: '📕 위험성평가' },
    { value: 'ILO 품질진단', label: '📘 ILO 품질진단' },
    { value: '안전환경 평가', label: '📒안전환경 평가' },
  ]

  const options8 = [
    { value: '김종진', label: '김종진' },
    { value: '박가경', label: '박가경' },
    { value: '김석진', label: '김석진' },
    { value: '강로이', label: '강로이' },
    { value: '이산', label: '이산' },
    { value: '민지혜', label: '민지혜' },
  ]

  const options9 = [
    { value: '김종진', label: '김종진' },
    { value: '박가경', label: '박가경' },
    { value: '김석진', label: '김석진' },
    { value: '강로이', label: '강로이' },
    { value: '이산', label: '이산' },
    { value: '민지혜', label: '민지혜' },
  ]

  const dispatch = useDispatch();

  // events validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      title: (event && event.title) || '',
      category: (event && event.category) || '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Please Enter Your Event Name"),
      category: Yup.string().required("Please Select Your Category"),
    }),
    onSubmit: (values) => {
      if (isEdit) {
        const updatedEvent = {
          id: event.id,
          title: values.title,
          classNames: values.category + " text-white",
          start: event.start,
        };
        // update event
        dispatch(updateEvent(updatedEvent));
        validation.resetForm();
      } else {
        const newEvent = {
          id: Math.floor(Math.random() * 100),
          title: values["title"],
          start: selectedDay ? selectedDay.date : new Date(),
          className: values.category + " text-white",
        };
        // save new event
        dispatch(addNewEvent(newEvent));
        validation.resetForm();
      }
      setSelectedDay(null);
      toggle();
    },
  });

  // category validation
  const categoryValidation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      title: (event && event.title) || '',
      category: (event && event.category) || '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Please Enter Your Event Name"),
      category: Yup.string().required("Please Enter Your Billing Name"),
    }),
    onSubmit: (values) => {
      const newEvent = {
        id: Math.floor(Math.random() * 100),
        title: values["title"],
        start: selectedDay ? selectedDay.date : new Date(),
        className: values.event_category
          ? values.event_category + " text-white"
          : "bg-danger text-white",
      };
      // save new event

      dispatch(addNewEvent(newEvent));
      toggleCategory();
    },
  });

  useEffect(() => {
    const { onGetCategories, onGetEvents } = props;
    onGetCategories();
    onGetEvents();
    //new Draggable(document.getElementById("external-events"), {
    //  itemSelector: ".external-event",
    //});
  }, []);

  useEffect(() => {
    if (!modal && !isEmpty(event) && !!isEdit) {
      setTimeout(() => {
        setEvent({});
        setIsEdit(false);
      }, 800);
    }
  }, [modal, event]);

  /**
   * Handling the modal state
   */
  const toggle = () => {
    setModal(!modal);
  };

  const toggleCategory = () => {
    setModalcategory(!modalcategory);
  };


  

  /**
   * Handling date click on calendar
   */
  const handleDateClick = arg => {
    setSelectedDay(arg);
    toggle();
  };

  /**
   * Handling click on event on calendar
   */
  const handleEventClick = arg => {
    const event = arg.event;
    setEvent({
      id: event.id,
      title: event.title,
      title_category: event.title_category,
      start: event.start,
      className: event.classNames,
      category: event.classNames[0],
      event_category: event.classNames[0],
    });
    setIsEdit(true);
    toggle();
  };


  /**
   * On delete event
   */
  const handleDeleteEvent = () => {
    const { onDeleteEvent } = props;
    onDeleteEvent(event);
    setDeleteModal(false);
    toggle();
  };

  /**
   * On category darg event
   */
  const onDrag = (event) => {
    event.preventDefault();
  };

  /**
   * On calendar drop event
   */
  const onDrop = event => {
    const { onAddNewEvent } = props;
    const draggedEl = event.draggedEl;
    const newEvent = {
      id: Math.floor(Math.random() * 100),
      title: draggedEl.innerText,
      start: event.date,
      className: draggedEl.className,
    };
    onAddNewEvent(newEvent);
  };


  const data = {
    columns: [
      {
        label: "교육항목",
        field: "type",
        sort: "asc",
        width: 150,
      },
      {
        label: "1월",
        field: "1",
        sort: "asc",
        width: 100,
      }, 
      {
        label: "2월",
        field: "2",
        sort: "asc",
        width: 100,
      }, 
      {
        label: "3월",
        field: "3",
        sort: "asc",
        width: 100,
      }, 
      {
        label: "4월",
        field: "4",
        sort: "asc",
        width: 100,
      }, 
      {
        label: "5월",
        field: "5",
        sort: "asc",
        width: 100,
      }, 
      {
        label: "6월",
        field: "6",
        sort: "asc",
        width: 100,
      }, 
      {
        label: "7월",
        field: "7",
        sort: "asc",
        width: 100,
      }, 
      {
        label: "8월",
        field: "8",
        sort: "asc",
        width: 100,
      }, 
      {
        label: "9월",
        field: "9",
        sort: "asc",
        width: 100,
      }, 
      {
        label: "10월",
        field: "10",
        sort: "asc",
        width: 100,
      }, 
      {
        label: "11월",
        field: "11",
        sort: "asc",
        width: 100,
      }, 
      {
        label: "12월",
        field: "12",
        sort: "asc",
        width: 100,
      }, 
    ],
    rows: [   
      {
        type : "FLO교육",
         1:  "🔘"
        ,2:  "🔘"
        ,3:  "🟡"
        ,4:  "🟠"
        ,5:  "🔘"
        ,6:  "🔘"
        ,7:  "🟢"
        ,8:  "🔘"
        ,9:  "🔘"
        ,10:  "🔘"
        ,11:  "🔘"
        ,12:  "🔘"
      },
      {
        type : "CS교육",
         1:  "🟢"
        ,2: "🟡"
        ,3:  "🟡"
        ,4:  "🟠"
        ,5:  "🔘"
        ,6:  "🔘"
        ,7: "🔘"
        ,8:  "🔘"
        ,9:  "🔘"
        ,10:  "🔘"
        ,11:  "🔘"
        ,12:  "🔘"
      },
      {
        type : "TMO교육",
         1: "🔘"
        ,2: "🟠"
        ,3: "🔘"
        ,4: "🔘"
        ,5: "🔘"
        ,6: "🔘"
        ,7: "🔘"
        ,8: "🔘"
        ,9: "🔘"
        ,10: "🔘"
        ,11: "🔘"
        ,12: "🔘"
      },
      {
        type : "실행력 강화 교육",
         1:  "🔘"
        ,2:  "🔘"
        ,3:  "🟡"
        ,4:  "🟠"
        ,5:  "🔘"
        ,6:  "🔘"
        ,7:  "🔘"
        ,8:  "🔘"
        ,9:  "🔘"
        ,10:  "🔘"
        ,11:  "🔘"
        ,12:  "🔘"
      },
      {
        type : "사외교육"
        , 1:   "🟡"
        ,2:  "🔘"
        ,3:  "🟡"
        ,4: "🔘"
        ,5:  "🔘"
        ,6:  "🔘"
        ,7:  "🔘"
        ,8:  "🔘"
        ,9:  "🔘"
        ,10:  "🔘"
        ,11:  "🔘"
        ,12:  "🔘"
      },
    ],
  };

  const [selectedFiles, setselectedFiles] = useState([]);

  function handleAcceptedFiles(files) {
    files.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    );
    setselectedFiles(files);
  }

  /**
   * Formats the size
   */
  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }



  //연도_2
  const [selectedYear, setSelectedYear] = useState(null);

  const years = [];
  const currentYear = new Date().getFullYear();
  for (let i = currentYear; i >= 1900; i--) {
    years.push({ value: i, label: i.toString() });
  }

  const handleYearChange = (selectedOption) => {
    setSelectedYear(selectedOption);
  };



  const handleYearSubmit = (e) => {
    e.preventDefault();
    // 입력된 연도를 처리하는 로직을 추가하세요.
    if (year.length === 4) {
      // 입력된 연도가 4자리인 경우에만 처리
      console.log(`선택된 연도: ${year}`);
      // 년도 처리 로직을 추가하세요.
    }
  };




//테스트 

const [colSize, setColSize] = useState(10);

const [isExpanded, setIsExpanded] = useState(true);

const handleToggle = () => {
  setIsExpanded(!isExpanded);
  isExpanded ? setColSize(12) : setColSize(10);
};

//아이콘
//마우스 핸들러
const handleMouseEnter = () => {
  document.body.style.cursor = 'pointer';
};

const handleMouseLeave = () => {
  document.body.style.cursor = 'auto';
};



  document.title = "LG - 작업시간준수 소분류";
  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteEvent}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <Container fluid={true}>
          {/* Render Breadcrumb */}
          <Breadcrumbs maintitle="자율운영"  title="작업시간준수" breadcrumbItem="감독자 교육 실행 관리_eduExe" />
        <Row>

        </Row>
          <Row>
             <Col className="col-12">
              <Row>
                  <Col lg={2}>
                    <Card>
                      <CardBody>
          {isExpanded && (
            <div className="container">
              <div  onMouseEnter={handleMouseEnter} className="float-end">
                {/* 내용 */}
                <Col className="col-3 text-end">
                  <i class="dripicons-cross m-2" onClick={handleToggle}></i>
                </Col>
                
              </div>
                  <p className="card-title-desc">
                          사업계
                          <Select options={options1} />
                        </p>
                        <p className="card-title-desc">
                          부서(계)
                          <Select options={options2} />
                        </p>
                        <p className="card-title-desc">
                          라인
                          <Select options={options3} />
                        </p>
                        <p className="card-title-desc">
                          기준일자
                          <input
                            className="form-control d-block"
                            type="date"
                            defaultValue="2024-03-05"
                            id="example-date-input"
                          />
                        </p>


              
            </div>
          )}
          {!isExpanded && (
            <button onClick={handleToggle} className="toggle-button">
              조회 창 열기+
            </button>
          )}


                        
                      </CardBody>
                    </Card>
                  </Col>
                <Col lg={colSize}>
                  <div className="card">
                    <div className="card-body">
                      {/* New/Edit event modal */}
                        <Modal isOpen={modal} className={props.className} size="xl">
                          <ModalHeader toggle={toggle} tag="h6">
                          {!!isEdit ? "Edit Event" : "Add Event"}
                          </ModalHeader>
                        <ModalBody>
                          <Form
                            onSubmit={(e) => {
                              e.preventDefault();
                              validation.handleSubmit();
                              return false;
                            }}
                          >
                            <Row>
                              <Col className="col-12">
                                <div className="mb-3">
                                  <Label className="form-label">Event Name</Label>
                                  <Input
                                    name="title"
                                    type="text"
                                    // value={event ? event.title : ""}
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.title || ""}
                                    invalid={
                                      validation.touched.title && validation.errors.title ? true : false
                                    }
                                  />
                                  {validation.touched.title && validation.errors.title ? (
                                    <FormFeedback type="invalid">{validation.errors.title}</FormFeedback>
                                  ) : null}
                                </div>
                              </Col>
                              <Col className="col-12">
                                <div className="mb-3">
                                  <Label className="form-label">Category</Label>
                                  <Input
                                    type="select"
                                    name="category"
                                    // value={event ? event.category : "bg-primary"}
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.category || ""}
                                    invalid={
                                      validation.touched.category && validation.errors.category ? true : false
                                    }
                                  >
                                    <option value="bg-danger">Danger</option>
                                    <option value="bg-success">Success</option>
                                    <option value="bg-primary">Primary</option>
                                    <option value="bg-info">Info</option>
                                    <option value="bg-dark">Dark</option>
                                    <option value="bg-warning">Warning</option>
                                  </Input>
                                  {validation.touched.category && validation.errors.category ? (
                                    <FormFeedback type="invalid">{validation.errors.category}</FormFeedback>
                                  ) : null}
                                </div>
                              </Col>
                            </Row>

                            <Row className="mt-2">
                              <Col className="col-6">
                                {!!isEdit && (
                                  <button
                                    type="button"
                                    className="btn btn-danger me-2"
                                    onClick={() => setDeleteModal(true)}
                                  >
                                    Delete
                                  </button>
                                )}
                              </Col>
                              <Col className="col-6 text-end">
                                <button
                                  type="button"
                                  className="btn btn-light me-2"
                                  onClick={toggle}
                                >
                                  Close
                                </button>
                                <button type="submit"
                                  className="btn btn-success"
                                  id="btn-save-event"
                                >
                                  Save
                                </button>
                              </Col>
                            </Row>
                          </Form>
                        </ModalBody>
                      </Modal>
                      <Modal  size="xl" 
                        isOpen={modalcategory}
                        toggle={toggleCategory}
                        className={props.className}
                        centered
                      >
                        <ModalHeader toggle={toggleCategory} tag="h5">
                          HOME!!!!
                        </ModalHeader>
                        <ModalBody>
                          <Form
                            onSubmit={(e) => {
                              e.preventDefault();
                              categoryValidation.handleSubmit();
                              return false;
                            }}
                          >
                    <Row>
                      <Col md="4">
                        <FormGroup className="mb-3">
                          <Label htmlFor="validationCustom01"></Label>
                          <Input
                            name="firstname"
                            placeholder="DMZ"
                            type="text"
                            className="form-control"
                            id="validationCustom01"
                          />
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup className="mb-3">
                          <Label htmlFor="validationCustom02">부서(계)</Label>
                          <Input
                            name="lastname"
                            placeholder="제조3계"
                            type="text"
                            className="form-control"
                            id="validationCustom02"
                          />
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup className="mb-3">
                          <Label htmlFor="validationCustom06">라인</Label>
                          <Select options={options3} />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <FormGroup className="mb-3">
                          <Label htmlFor="validationCustom01">이벤트종류</Label>
                          <Select options={options4} />
                        </FormGroup>
                      </Col>
                      <Col md="4">
                      <Label>시작일자</Label>
                    <div className="col-md-12">
                      <input
                        className="form-control d-block"
                        type="date"
                        defaultValue="2019-08-19"
                        id="example-date-input"
                      />
                    </div>
                      </Col>
                  <Col md="4">
                      <Label>종료일자</Label>
                    <div className="col-md-12">
                      <input
                        className="form-control d-block"
                        type="date"
                        defaultValue="2019-08-19"
                        id="example-date-input"
                      />
                    </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <FormGroup className="mb-3">
                          <Label htmlFor="validationCustom01">작업자</Label>
                          <Select options={options8} />
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup className="mb-3">
                          <Label htmlFor="validationCustom02">작업자레벨</Label>
                          <Input
                            name="lastname"
                            placeholder=""
                            type="text"
                            className="form-control"
                            id="validationCustom02"
                          />
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup className="mb-3">
                          <Label htmlFor="validationCustom06">대체작업자</Label>
                          <Select options={options9} />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <FormGroup className="mb-3">
                          <Label htmlFor="validationCustom01">제목</Label>
                          <Input
                            name="firstname"
                            placeholder="개인휴가"
                            type="text"
                            className="form-control"
                            id="validationCustom01"
                          />
                        </FormGroup>
                      </Col>
                      </Row>
                      <Row>
                      <Col md="12">
                        <FormGroup className="mb-3">
                          <Label htmlFor="validationCustom01">내용</Label>
                            <div className="col-lg-12">
                               <textarea id="txtAddress1Billing" name="txtAddress1Billing"
                                 rows="4" className="form-control" placeholder="아들졸업식으로 서울올라감"></textarea>
                            </div>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                          {/* <p className="card-title-desc">
                              첨부파일
                            </p> */}
                            <div className="mb-12">
                              <Form>
                                <Row>
                                  <Col className="col-6">
                                    <Label htmlFor="validationCustom01">첨부파일</Label>
                                  </Col>
                                  <Col className="col-3">
                                    <Label htmlFor="validationCustom01">파일 list</Label>
                                  </Col>
                                  <Col className="col-3 text-end">
                                    <i class="dripicons-folder-open m-2"></i>
                                    <i class="dripicons-arrow-thin-down m-2"></i>
                                    <i class="dripicons-cross m-2"></i>
                                    <i class="ti-search m-2"></i>
                                  </Col>
                                </Row>
                                <Row>
                                <Col className="col-6">
                                  <Dropzone
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
                                          <div className="mb-10">
                                            <i className="mdi mdi-cloud-upload display-4 text-muted"></i>
                                          </div>
                                        {/*  <h4>{props.t("Extras")}</h4> */}
                                        </div>
                                      </div>
                                    )}
                                  </Dropzone>
                                  </Col>
                                  <Col className="col-6">
                                  <div className="dropzone-previews mt-10" id="file-previews">
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
                                            </Row>
                                          </div>
                                        </Card>
                                      );
                                    })}
                                  </div>
                                    </Col>
                                </Row>
                              </Form>
                            </div>
                            <div className="text-center mt-4">
                              <button
                                type="button"
                                className="btn btn-primary waves-effect waves-light"
                              >
                                Send Files
                              </button>
                            </div>
                          </Col>
                        </Row>
                            <Row className="mt-2">
                              <Col className="col-6">
                                <button type="button" className="btn btn-danger" id="btn-delete-event">Delete</button>
                              </Col>
                              <Col className="col-6 text-end">
                                <button
                                  type="button"
                                  className="btn btn-light me-1"
                                  onClick={toggleCategory}
                                >
                                  Close
                                </button>
                                <button
                                  type="submit" 
                                  className="btn btn-primary me-1"
                                  id="btn-new-event"
                                >
                                  New
                                </button>
                                <button
                                  type="submit"
                                  className="btn btn-success"
                                  id="btn-save-event"
                                >
                                  Save
                                </button>
                              </Col>
                            </Row>
                          </Form>
                        </ModalBody>
                      </Modal>
                     {/*  <span style={{ color: 'red' , textAlign: 'right'}}>추가할 글자 태그 내용</span> */}
                        <div className="float-end gap-2">
                            🔘 초기  &nbsp;&nbsp; 🟡 진행 &nbsp;&nbsp; 🟠 진행 &nbsp;&nbsp;   🟢 완료
                         </div>
                      <MDBDataTableV5  //responsive bordered 
                        hover  
                        //bordered 
                        searchBottom={false} 
                        entriesOptions={[10, 20, 50, 100]}  
                        searchTop
                        searchLabel="검색:"
                        paginationLabel={['이전', '다음']}
                        entriesLabel="항목 수:"
                        infoLabel={['', '- ', '(전체 ',' 건)']}
                       data={data} 
                       onClick={toggleCategory} 
                       />
                    </div>
                    </div>
                </Col>
            

              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

Calender.propTypes = {
  events: PropTypes.array,
  categories: PropTypes.array,
  className: PropTypes.string,
  onGetEvents: PropTypes.func,
  onAddNewEvent: PropTypes.func,
  onUpdateEvent: PropTypes.func,
  onDeleteEvent: PropTypes.func,
  onGetCategories: PropTypes.func,
};

const mapStateToProps = ({ calendar }) => ({
  events: calendar.events,
  categories: calendar.categories,
});

const mapDispatchToProps = dispatch => ({
  onGetEvents: () => dispatch(getEvents()),
  onGetCategories: () => dispatch(getCategories()),
  onAddNewEvent: event => dispatch(addNewEvent(event)),
  onUpdateEvent: event => dispatch(updateEvent(event)),
  onDeleteEvent: event => dispatch(deleteEvent(event)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Calender);