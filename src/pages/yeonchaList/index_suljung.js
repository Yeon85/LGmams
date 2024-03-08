import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect, useDispatch } from "react-redux";
import { isEmpty } from "lodash";
import Dropzone from "react-dropzone";

import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';

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
import { MDBDataTable } from "mdbreact";
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


  //data_2
  const data_2 = {
    columns: [
      {
        label: "기준일자",
        field: "name",
        sort: "asc",
        width: 150,
      },
      {
        label: "근태구분",
        field: "position",
        sort: "asc",
        width: 270,
      },
    
    ],
    rows: [
        {
          name: "2024-02-26",
          position: "공가",
         /*  office: "Edinburgh",
          age: "61",
          date: "2011/04/25",
          salary: "$320", */
        },
        /* {
          name: "공가",
          position: "Accountant",
          office: "Tokyo",
          age: "63",
          date: "2011/07/25",
          salary: "$170",
        }, */
      ]
    };


  const data = {
    columns: [
      {
        label: "사업부",
        field: "name",
        sort: "asc",
        width: 150,
      },
      {
        label: "부서(계)",
        field: "position",
        sort: "asc",
        width: 270,
      },
      {
        label: "라인",
        field: "office",
        sort: "asc",
        width: 200,
      },
      {
        label: "이벤트 종류",
        field: "age",
        sort: "asc",
        width: 100,
      },
      {
        label: "시작일자",
        field: "date",
        sort: "asc",
        width: 150,
      },
      {
        label: "가격",
        field: "salary",
        sort: "asc",
        width: 100,
      },
    ],
    rows: [
      {
        name: "Tiger Nixon",
        position: "System Architect",
        office: "Edinburgh",
        age: "61",
        date: "2011/04/25",
        salary: "$320",
      },
      {
        name: "Garrett Winters",
        position: "Accountant",
        office: "Tokyo",
        age: "63",
        date: "2011/07/25",
        salary: "$170",
      },
      {
        name: "Ashton Cox",
        position: "Junior Technical Author",
        office: "San Francisco",
        age: "66",
        date: "2009/01/12",
        salary: "$86",
      },
      {
        name: "Cedric Kelly",
        position: "Senior Javascript Developer",
        office: "Edinburgh",
        age: "22",
        date: "2012/03/29",
        salary: "$433",
      },
      {
        name: "Airi Satou",
        position: "Accountant",
        office: "Tokyo",
        age: "33",
        date: "2008/11/28",
        salary: "$162",
      },
      {
        name: "Brielle Williamson",
        position: "Integration Specialist",
        office: "New York",
        age: "61",
        date: "2012/12/02",
        salary: "$372",
      },
      {
        name: "Herrod Chandler",
        position: "Sales Assistant",
        office: "San Francisco",
        age: "59",
        date: "2012/08/06",
        salary: "$137",
      },
      {
        name: "Rhona Davidson",
        position: "Integration Specialist",
        office: "Tokyo",
        age: "55",
        date: "2010/10/14",
        salary: "$327",
      },
      {
        name: "Colleen Hurst",
        position: "Javascript Developer",
        office: "San Francisco",
        age: "39",
        date: "2009/09/15",
        salary: "$205",
      },
      {
        name: "Sonya Frost",
        position: "Software Engineer",
        office: "Edinburgh",
        age: "23",
        date: "2008/12/13",
        salary: "$103",
      },
      {
        name: "Jena Gaines",
        position: "Office Manager",
        office: "London",
        age: "30",
        date: "2008/12/19",
        salary: "$90",
      },
      {
        name: "Quinn Flynn",
        position: "Support Lead",
        office: "Edinburgh",
        age: "22",
        date: "2013/03/03",
        salary: "$342",
      },
      {
        name: "Charde Marshall",
        position: "Regional Director",
        office: "San Francisco",
        age: "36",
        date: "2008/10/16",
        salary: "$470",
      },
      {
        name: "Haley Kennedy",
        position: "Senior Marketing Designer",
        office: "London",
        age: "43",
        date: "2012/12/18",
        salary: "$313",
      },
      {
        name: "Tatyana Fitzpatrick",
        position: "Regional Director",
        office: "London",
        age: "19",
        date: "2010/03/17",
        salary: "$385",
      },
      {
        name: "Michael Silva",
        position: "Marketing Designer",
        office: "London",
        age: "66",
        date: "2012/11/27",
        salary: "$198",
      },
      {
        name: "Paul Byrd",
        position: "Chief Financial Officer (CFO)",
        office: "New York",
        age: "64",
        date: "2010/06/09",
        salary: "$725",
      },
      {
        name: "Gloria Little",
        position: "Systems Administrator",
        office: "New York",
        age: "59",
        date: "2009/04/10",
        salary: "$237",
      },
      {
        name: "Bradley Greer",
        position: "Software Engineer",
        office: "London",
        age: "41",
        date: "2012/10/13",
        salary: "$132",
      },
      {
        name: "Dai Rios",
        position: "Personnel Lead",
        office: "Edinburgh",
        age: "35",
        date: "2012/09/26",
        salary: "$217",
      },
      {
        name: "Jenette Caldwell",
        position: "Development Lead",
        office: "New York",
        age: "30",
        date: "2011/09/03",
        salary: "$345",
      },
      {
        name: "Yuri Berry",
        position: "Chief Marketing Officer (CMO)",
        office: "New York",
        age: "40",
        date: "2009/06/25",
        salary: "$675",
      },
      {
        name: "Caesar Vance",
        position: "Pre-Sales Support",
        office: "New York",
        age: "21",
        date: "2011/12/12",
        salary: "$106",
      },
      {
        name: "Doris Wilder",
        position: "Sales Assistant",
        office: "Sidney",
        age: "23",
        date: "2010/09/20",
        salary: "$85",
      },
      {
        name: "Angelica Ramos",
        position: "Chief Executive Officer (CEO)",
        office: "London",
        age: "47",
        date: "2009/10/09",
        salary: "$1",
      },
      {
        name: "Gavin Joyce",
        position: "Developer",
        office: "Edinburgh",
        age: "42",
        date: "2010/12/22",
        salary: "$92",
      },
      {
        name: "Jennifer Chang",
        position: "Regional Director",
        office: "Singapore",
        age: "28",
        date: "2010/11/14",
        salary: "$357",
      },
      {
        name: "Brenden Wagner",
        position: "Software Engineer",
        office: "San Francisco",
        age: "28",
        date: "2011/06/07",
        salary: "$206",
      },
      {
        name: "Fiona Green",
        position: "Chief Operating Officer (COO)",
        office: "San Francisco",
        age: "48",
        date: "2010/03/11",
        salary: "$850",
      },
      {
        name: "Shou Itou",
        position: "Regional Marketing",
        office: "Tokyo",
        age: "20",
        date: "2011/08/14",
        salary: "$163",
      },
      {
        name: "Michelle House",
        position: "Integration Specialist",
        office: "Sidney",
        age: "37",
        date: "2011/06/02",
        salary: "$95",
      },
      {
        name: "Suki Burks",
        position: "Developer",
        office: "London",
        age: "53",
        date: "2009/10/22",
        salary: "$114",
      },
      {
        name: "Prescott Bartlett",
        position: "Technical Author",
        office: "London",
        age: "27",
        date: "2011/05/07",
        salary: "$145",
      },
      {
        name: "Gavin Cortez",
        position: "Team Leader",
        office: "San Francisco",
        age: "22",
        date: "2008/10/26",
        salary: "$235",
      },
      {
        name: "Martena Mccray",
        position: "Post-Sales support",
        office: "Edinburgh",
        age: "46",
        date: "2011/03/09",
        salary: "$324",
      },
      {
        name: "Unity Butler",
        position: "Marketing Designer",
        office: "San Francisco",
        age: "47",
        date: "2009/12/09",
        salary: "$85",
      },
      {
        name: "Howard Hatfield",
        position: "Office Manager",
        office: "San Francisco",
        age: "51",
        date: "2008/12/16",
        salary: "$164",
      },
      {
        name: "Hope Fuentes",
        position: "Secretary",
        office: "San Francisco",
        age: "41",
        date: "2010/02/12",
        salary: "$109",
      },
      {
        name: "Vivian Harrell",
        position: "Financial Controller",
        office: "San Francisco",
        age: "62",
        date: "2009/02/14",
        salary: "$452",
      },
      {
        name: "Timothy Mooney",
        position: "Office Manager",
        office: "London",
        age: "37",
        date: "2008/12/11",
        salary: "$136",
      },
      {
        name: "Jackson Bradshaw",
        position: "Director",
        office: "New York",
        age: "65",
        date: "2008/09/26",
        salary: "$645",
      },
      {
        name: "Olivia Liang",
        position: "Support Engineer",
        office: "Singapore",
        age: "64",
        date: "2011/02/03",
        salary: "$234",
      },
      {
        name: "Bruno Nash",
        position: "Software Engineer",
        office: "London",
        age: "38",
        date: "2011/05/03",
        salary: "$163",
      },
      {
        name: "Sakura Yamamoto",
        position: "Support Engineer",
        office: "Tokyo",
        age: "37",
        date: "2009/08/19",
        salary: "$139",
      },
      {
        name: "Thor Walton",
        position: "Developer",
        office: "New York",
        age: "61",
        date: "2013/08/11",
        salary: "$98",
      },
      {
        name: "Finn Camacho",
        position: "Support Engineer",
        office: "San Francisco",
        age: "47",
        date: "2009/07/07",
        salary: "$87",
      },
      {
        name: "Serge Baldwin",
        position: "Data Coordinator",
        office: "Singapore",
        age: "64",
        date: "2012/04/09",
        salary: "$138",
      },
      {
        name: "Zenaida Frank",
        position: "Software Engineer",
        office: "New York",
        age: "63",
        date: "2010/01/04",
        salary: "$125",
      },
      {
        name: "Zorita Serrano",
        position: "Software Engineer",
        office: "San Francisco",
        age: "56",
        date: "2012/06/01",
        salary: "$115",
      },
      {
        name: "Jennifer Acosta",
        position: "Junior Javascript Developer",
        office: "Edinburgh",
        age: "43",
        date: "2013/02/01",
        salary: "$75",
      },
      {
        name: "Cara Stevens",
        position: "Sales Assistant",
        office: "New York",
        age: "46",
        date: "2011/12/06",
        salary: "$145",
      },
      {
        name: "Hermione Butler",
        position: "Regional Director",
        office: "London",
        age: "47",
        date: "2011/03/21",
        salary: "$356",
      },
      {
        name: "Lael Greer",
        position: "Systems Administrator",
        office: "London",
        age: "21",
        date: "2009/02/27",
        salary: "$103",
      },
      {
        name: "Jonas Alexander",
        position: "Developer",
        office: "San Francisco",
        age: "30",
        date: "2010/07/14",
        salary: "$86",
      },
      {
        name: "Shad Decker",
        position: "Regional Director",
        office: "Edinburgh",
        age: "51",
        date: "2008/11/13",
        salary: "$183",
      },
      {
        name: "Michael Bruce",
        position: "Javascript Developer",
        office: "Singapore",
        age: "29",
        date: "2011/06/27",
        salary: "$183",
      },
      {
        name: "Donna Snider",
        position: "Customer Support",
        office: "New York",
        age: "27",
        date: "2011/01/25",
        salary: "$112",
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


  //연도

/*   const [year, setYear] = useState('');
 */
/*   const handleYearChange = (e) => {
    setYear(e.target.value);
  }; */

  const handleYearSubmit = (e) => {
    e.preventDefault();
    // 입력된 연도를 처리하는 로직을 추가하세요.
    if (year.length === 4) {
      // 입력된 연도가 4자리인 경우에만 처리
      console.log(`선택된 연도: ${year}`);
      // 년도 처리 로직을 추가하세요.
    }
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
          <Breadcrumbs maintitle="자율운영"  title="작업시간준수" breadcrumbItem="연차 현황" />
          <Row>
             <Col className="col-12">
              <Row>
                  <Col lg={2}>
                    <Card>
                      <CardBody>
                        <p className="card-title-desc">
                          사업부
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
                          기준년도
                          <Select
                            value={selectedYear}
                            options={years}
                            onChange={handleYearChange}
                          />
                        </p>
                      </CardBody>
                    </Card>
                  </Col>
                <Col lg={7}>
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
                          <Label htmlFor="validationCustom01">사업부</Label>
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
      
                      <MDBDataTable
                      noBottomColumns={true} 
      
      maxHeight="300px"
      striped
      bordered
      data={data}
    />
                      <MDBTable responsive>
      <MDBTableHead columns={data.columns} />
      <MDBTableBody rows={data.rows} />


    </MDBTable>
                      <MDBTable scrollY
                        striped
                        bordered
                        small
                        hover={true} onClick={toggleCategory}
                       MDBTableHead columns={data.columns}
                        searchLabel="검색:"
                        search
                        responsive
                        paging
                        paginationLabel={['이전', '다음']}
                        entriesLabel="페이지당 항목 수:"
                        infoLabel={['_START_ - _END_ (총 _TOTAL_ 개)', '0개 ', '(전체 _MAX_ 명 중 검색결과)']}
                        info
                      />

                      <MDBDataTable responsive bordered hover={true} onClick={toggleCategory} data={data} />
                    </div>
                  </div>
                </Col>
                <Col lg={3}>
                  <div className="card">
                    <div className="card-body">
                      <MDBDataTable responsive bordered hover={true} onClick={toggleCategory} data={data_2} />
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