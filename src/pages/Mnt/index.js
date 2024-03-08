import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect, useDispatch } from "react-redux";
import { isEmpty } from "lodash";

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
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Table
  ,CardTitle
  ,Offcanvas
  ,OffcanvasHeader
  ,OffcanvasBody

} from "reactstrap";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import BootstrapTheme from "@fullcalendar/bootstrap";
import listPlugin from '@fullcalendar/list';
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
import CreateModal from "./CreateModal";
//css
import "@fullcalendar/bootstrap"
// import "@fullcalendar/bootstrap/main.css";
const Calender = props => {
  const { events, categories } = props;
  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [modalcategory, setModalcategory] = useState(false);
  const [event, setEvent] = useState({});
  const [selectedDay, setSelectedDay] = useState(0);
  const [isEdit, setIsEdit] = useState(false);

  const options1 = [
    { value: 'DMZ', label: 'DMZ' },
  ]

  const options2 = [
    { value: 'JEJO_3', label: '제조3계' },
  ]

  const options3 = [
    { value: 'CAC01', label: 'CAC01' },
  ]
  const dispatch = useDispatch();

    //캔버스
    const [isRight, setIsRight] = useState(false);
    const [isBottom, setIsBottom] = useState(false);

  const toggleRightCanvas = () => {
      setIsRight(!isRight);
  };

  const toggleBottomCanvas = () => {
    setIsBottom(!isBottom);
  };


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
    new Draggable(document.getElementById("external-events"), {
      itemSelector: ".external-event",
    });
  }, []);

  useEffect(() => {
    if (!modal && !isEmpty(event) && !!isEdit) {
      setTimeout(() => {
        setEvent({});
        setIsEdit(false);
      }, 500);
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


  
  /**
   * On delete event
  */
  const [selectedGrid, setDeleteMsetSelectedGridodal] = useState(false);
  const handleCreateEvent  = () => {
    const { onCreateEvent } = props;
    onCreateEvent(event);
    setCreateModal(false);
    toggle();
  };

  ///////////////////////////////////////////////////////////
  //달력 카렌다 클릭
  /* const [selectedGrid, setSelectedGrid] = useState(null);

  const handleGridClick = (rowIndex, columnIndex) => {
    setSelectedGrid({ rowIndex, columnIndex });
  };
 */

  // 모달 라우터 
/*   const ModalComponent = ({ selectedGrid }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>선택한 그리드 정보</h2>
        <p>행: {selectedGrid.rowIndex}</p>
        <p>열: {selectedGrid.columnIndex}</p>
        <Link to="/">홈으로 돌아가기</Link>
      </div>
    </div>
  );
}; */
  document.title = "LG - 반성회 모니터링3";
  return (
    <React.Fragment>
       <CreateModal
        show={createModal}
        onCreateClick={handleCreateEvent}
        onCloseClick={() => setCreateModal(false)}
      />

      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteEvent}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <Container fluid={true}>
          {/* Render Breadcrumb */}
          <Breadcrumbs maintitle="자율운영"  title="작업시간준수" breadcrumbItem="반성회 모니터링_MNT" />
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
                    <p className="text-muted">
                    <br/>
                    <br/>
                    <br/>
                    </p>
                    <div className="d-grid"> 
                        <Button
                          color="primary"
                          className="font-size-16 btn-block"
                          onClick={toggleCategory}
                        >
                          <i className="mdi mdi-plus-circle-outline"></i> 오늘의 일정 
                        </Button>
                        <br/>
                        <Button
                          color="primary"
                          className="font-size-16 btn-block"
                          
                          onClick={() => setCreateModal(true)}
                        >
                          <i className="mdi mdi-plus-circle-outline"></i> 반성회이미지넣기
                        </Button>
                      </div>
                      <div id="external-events" className="mt-2">
                        <p className="text-muted">
                          {/* Drag and drop your event or click in the calendar */}
                          아래의 (버튼)을 (드래그앤드롭)하거나 (캘린더)를 (클릭)하세요.
                        </p>
                        {categories &&
                          categories.map((category, i) => (
                            <div
                              className={`external-event ${category.type} fc-event text-white`}
                              key={"cat-" + category.id}
                              draggable
                              onDrag={event => onDrag(event, category)}
                            >
                              <i className="mdi mdi-checkbox-blank-circle font-size-11 me-2" />
                              {category.title}
                            </div>
                          ))}
                      </div>
                     
                    </CardBody>
                  </Card>
                </Col>
                <Col lg={10}>
               
                  <div className="card">
                    <div className="card-body">
                      <div className="float-end gap-2">
                                        <Button
                                            color="primary"
                                            onClick={toggleRightCanvas}
                                        >
                                              +
                                        </Button>
                                    </div>
                      <FullCalendar
                        plugins={[
                          BootstrapTheme,
                          dayGridPlugin,
                          interactionPlugin,
                          listPlugin
                        ]}
                        initialView="dayGridMonth"
                        slotDuration={"00:15:00"}
                        handleWindowResize={true}
                        themeSystem="bootstrap"
                        headerToolbar={{
                          left: "prev,next today",
                          center: "title",
                          right: "dayGridMonth,dayGridWeek,dayGridDay,listWeek",
                   
                          
                          //right:  "prev,next today",    
                        }}
                        events={events}
                        editable={true}
                        droppable={true}
                        selectable={true}
                        dateClick={handleDateClick}
                        eventClick={handleEventClick}
                        drop={onDrop}
                      />

                      {/* New/Edit event modal */}
                      <Modal isOpen={modal} className={props.className} centered>
                        <ModalHeader toggle={toggle} tag="h5">
                          {!!isEdit ? "수정" : "추가"}
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
                                  <Label className="form-label"> 제목 </Label>
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
                                  <Label className="form-label">이벤트 종류</Label>
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
                                    <option value="bg-success">휴가(주요)</option>
                                    <option value="bg-success">휴가(일반)</option>
                                    <option value="bg-info">공가</option>
                                    <option value="bg-warning">조퇴</option>
                                    <option value="bg-danger">지각</option>
                                    <option value="bg-dark">기타</option>
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

                      <Modal
                        isOpen={modalcategory}
                        toggle={toggleCategory}
                        className={props.className}
                        centered
                      >
                        <ModalHeader toggle={toggleCategory} tag="h5">
                          오늘의 일정
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
                              <Col className="col-12">
                                <div className="mb-3">
                                  <Label className="form-label">제목</Label>
                                  <Input
                                    name="title"
                                    type="text"
                                    // value={event ? event.title : ""}
                                    placeholder=""
                                    onChange={categoryValidation.handleChange}
                                    onBlur={categoryValidation.handleBlur}
                                    value={categoryValidation.values.title || ""}
                                    invalid={
                                      categoryValidation.touched.title && categoryValidation.errors.title ? true : false
                                    }
                                  />
                                  {categoryValidation.touched.title && categoryValidation.errors.title ? (
                                    <FormFeedback type="invalid">{categoryValidation.errors.title}</FormFeedback>
                                  ) : null}
                                </div>
                              </Col>
                              <Col className="col-12">
                                <div className="mb-3">
                                  <Label className="form-label">이벤트 종류</Label>
                                  <Input
                                    type="select"
                                    name="category"
                                    placeholder="All Day Event"
                                    onChange={categoryValidation.handleChange}
                                    onBlur={categoryValidation.handleBlur}
                                    value={categoryValidation.values.category || ""}
                                    invalid={
                                      categoryValidation.touched.category && categoryValidation.errors.category ? true : false
                                    }
                                  >
{/*                                     <option value="bg-danger">휴가(주요)</option>
                                    <option value="bg-success">휴가(일반)</option>
                                    <option value="bg-primary">공가</option>
                                    <option value="bg-info">병결</option>
                                    <option value="bg-warning">지각</option>
                                    <option value="bg-dark">기타</option> */}

                                    <option value="bg-success">휴가(주요)</option>
                                    <option value="bg-success">휴가(일반)</option>
                                    <option value="bg-info">공가</option>
                                    <option value="bg-warning">조퇴</option>
                                    <option value="bg-danger">지각</option>
                                    <option value="bg-dark">기타</option>

                                  </Input>
                                  {categoryValidation.touched.category && categoryValidation.errors.category ? (
                                    <FormFeedback type="invalid">{categoryValidation.errors.category}</FormFeedback>
                                  ) : null}
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
                    </div>
                  </div>
                </Col>
                <Col lg={12}>
                    <Card>
                      <CardBody>
                        {/* Right offcanvas */}
                          <Offcanvas
                            isOpen={isRight}
                            direction="end"
                            toggle={toggleRightCanvas}>
                            <OffcanvasHeader toggle={toggleRightCanvas}>
                                           
                              <Col lg={12}>
                                <Card>
                                  <CardBody>
                                  전일
                                  <div className="d-grid">
                                  <Table className="table table-bordered mb-1">
                                    <thead>
                                      <tr>
                                        <th>내용</th>
                                        <th>계획(EA)</th>
                                        <th>실적(EA)</th>
                                        <th>달성률(%)</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td>MOST UPH</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                      </tr>
                                      <tr>
                                        <td>W/O 완료율</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                      </tr>
                                      <tr>
                                        <td>일 계획 달성률</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                      </tr>
                                    </tbody>
                                  </Table>
                                </div>
                                <div className="d-grid">
                                  <Table className="table table-bordered mb-1">
                                    <thead>
                                      <tr>
                                        <th>내용</th>
                                        <th>계획(EA)</th>
                                        <th>수량(EA)</th>
                                        <th>불량률(PPM)</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td>일일 불량현황</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                      </tr>
                                    </tbody>
                                  </Table>
                                </div>
                                <div className="d-grid">
                                  <Table className="table table-bordered mb-1">
                                    <thead>
                                      <tr>
                                        <th>내용</th>
                                        <th>통제 가능 무작업률(%)</th>
                                        <th>통제 불능 무작업률(%)</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td>일일 무작업 현황</td>
                                        <td></td>
                                        <td></td>
                                      </tr>
                                    </tbody>
                                  </Table>
                                </div>
                                <Row className="mb-3"> 당일 
                                </Row>
                                <Row className="mb-3"> 
                                  <label
                                    htmlFor="example-text-input"
                                    className="col-md-4 col-form-label"
                                  >
                                    계획
                                  </label>
                                  <div className="col-md-8">
                                    <input
                                      className="form-control"
                                      type="text"
                                      placeholder=""
                                    />
                                  </div>
                                </Row>
                                <Row className="mb-3">
                                  <label
                                    htmlFor="example-text-input"
                                    className="col-md-4 col-form-label"
                                  >
                                  총원
                                  </label>
                                  <div className="col-md-8">
                                    <input
                                      className="form-control"
                                      type="text"
                                      placeholder=""
                                    />
                                  </div>
                                </Row>
                                <Row className="mb-3">
                                  <label
                                    htmlFor="example-text-input"
                                    className="col-md-4 col-form-label"
                                  >
                                  실적
                                  </label>
                                  <div className="col-md-8">
                                    <input
                                      className="form-control"
                                      type="text"
                                      placeholder=""
                                    />
                                  </div>
                                </Row>
                                <Row className="mb-3">
                                  <label
                                    htmlFor="example-text-input"
                                    className="col-md-4 col-form-label"
                                  >
                                  휴가자(명)
                                  </label>
                                  <div className="col-md-8">
                                    <input
                                      className="form-control"
                                      type="text"
                                      placeholder=""
                                    />
                                  </div>
                                </Row>
                                <Row className="mb-3">
                                  <label
                                    htmlFor="example-text-input"
                                    className="col-md-4 col-form-label"
                                  >
                                  UPH/UPPH
                                  </label>
                                  <div className="col-md-8">
                                    <input
                                      className="form-control"
                                      type="text"
                                      placeholder=""
                                    />
                                  </div>
                                </Row>
                                <Row className="mb-3">
                                  <label
                                    htmlFor="example-text-input"
                                    className="col-md-4 col-form-label"
                                  >
                                  현재원(명)
                                  </label>
                                  <div className="col-md-8">
                                    <input
                                      className="form-control"
                                      type="text"
                                      placeholder=""
                                    />
                                  </div>
                                </Row>
                                  </CardBody>
                                </Card>
                              </Col>
                            </OffcanvasHeader>
                          <OffcanvasBody>
                                            ...
                          </OffcanvasBody>
                        </Offcanvas>
                              {/* Bottom offcanvas */}
                       <Offcanvas
                            isOpen={isBottom}
                            direction="bottom"
                            toggle={toggleBottomCanvas}>
                          <OffcanvasHeader toggle={toggleBottomCanvas}>
                                            Offcanvas Bottom
                          </OffcanvasHeader>
                        <OffcanvasBody>
                                    ...
                        </OffcanvasBody>
                      </Offcanvas>
                    </CardBody>
                  </Card>
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
  onCreateEvent: PropTypes.func,
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
  onCreateEvent: event => dispatch(createvent(event)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Calender);
