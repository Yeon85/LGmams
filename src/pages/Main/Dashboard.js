import PropTypes from 'prop-types';
import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  Input,
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu
} from "reactstrap";
import { Link } from "react-router-dom";

// Custom Scrollbar
import SimpleBar from "simplebar-react";

// import images
import servicesIcon1 from "../../assets/images/services-icon/01.png";
import servicesIcon2 from "../../assets/images/services-icon/02.png";
import servicesIcon3 from "../../assets/images/services-icon/03.png";
import servicesIcon4 from "../../assets/images/services-icon/04.png";
import user2 from "../../assets/images/users/user-2.jpg";
import user3 from "../../assets/images/users/user-3.jpg";
import user4 from "../../assets/images/users/user-4.jpg";
import user5 from "../../assets/images/users/user-5.jpg";
import user6 from "../../assets/images/users/user-6.jpg";
import smimg1 from "../../assets/images/small/img-1.jpg";
import smimg2 from "../../assets/images/small/img-2.jpg";

//Import Image
import avatar2 from "../../assets/images/users/user-2.jpg";
import img1 from  "../../assets/images/small/dashboard/img-1.jpg";
import img2 from  "../../assets/images/small/dashboard/img-2.jpg";
import img3 from  "../../assets/images/small/dashboard/img-3.jpg";
import img4 from  "../../assets/images/small/dashboard/img-4.jpg";
import img5 from  "../../assets/images/small/dashboard/img-5.jpg";
import img6 from  "../../assets/images/small/dashboard/img-6.jpg";
import img7 from  "../../assets/images/small/dashboard/img-7.jpg";
import img8 from  "../../assets/images/small/dashboard/img-8.jpg";
import img9 from  "../../assets/images/small/dashboard/img-9.jpg";
import img10 from "../../assets/images/small/dashboard/img-10.jpg";
import img11 from "../../assets/images/small/dashboard/img-11.jpg";
import img12 from "../../assets/images/small/dashboard/img-12.jpg";

// Charts
import LineAreaChart from "../AllCharts/apex/lineareachart";
import RadialChart from "../AllCharts/apex/apexdonut";
import Apexdonut from "../AllCharts/apex/apexdonut1";
import SparkLine from "../AllCharts/sparkline/sparkline";
import SparkLine1 from "../AllCharts/sparkline/sparkline1";
import Salesdonut from "../AllCharts/apex/salesdonut";

import "chartist/dist/scss/chartist.scss";

//i18n
import { withTranslation } from "react-i18next";

const Dashboard = props => {
  const [menu, setMenu] = useState(false);
  const toggle = () => {
    setMenu(!menu);
  };
  document.title = "LG - Dashboard ";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <div className="page-title-box">
            <Row className="align-items-center">
              <Col md={8}>
                <h6 className="page-title">Dashboard</h6>
                <ol className="breadcrumb m-0">
                  <li className="breadcrumb-item active"></li>
                </ol>
              </Col>

              <Col md="4">
                {/* <div className="float-end d-none d-md-block">
                  <Dropdown isOpen={menu} toggle={toggle}>
                    <DropdownToggle color="primary" className="btn btn-primary dropdown-toggle waves-effect waves-light">
                      <i className="mdi mdi-cog me-2"></i> Settings
                    </DropdownToggle>
                    <DropdownMenu end>
                      <DropdownItem tag="a" href="#">Action</DropdownItem>
                      <DropdownItem tag="a" href="#">Another action</DropdownItem>
                      <DropdownItem tag="a" href="#">Something else here</DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem tag="a" href="#">Separated link</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div> */}
              </Col>
            </Row>
          </div>
        
        {/* 코딩시작 */}
        {/* 1st */}
        <Row>
            <Col xl={4}>
              <Card>
                <CardBody>
                <Row>
                    <Col>
                      <p className="fw-bolder">Clean Up</p> 
                    </Col>
                    <Col>
                      <div className="float-end">
                        <Link to = "/field-middle">
                        <p className="float-end mb-2">중분류 이동</p>
                        </Link>
                      </div>
                    </Col>
                </Row>
                <Row>
                  <div className="mb-2">
                    <div className="row">
                      <div className="col-md-6">
                    <SimpleBar style={{ height: "220px" }}>
                        <table className="table table-hover table-left table-nowrap mb-0">
                        <tbody>
                            <tr>
                              <th scope="row"> 5S(<span>{props.t("Site/Parts/Materials")}</span>)</th>
                            </tr>
                            <tr>
                              <th scope="row">5S(
                              <span>{props.t("Measuring instruments/tools")}</span>) 
                    
                                 </th>
                            </tr>
                            <tr>
                              <th scope="row">3정(<span>{props.t("Parts/Inventory/Tools")}
                              </span> )      
                                </th>
                            </tr>
                            <tr>
                              <th scope="row"><span>{props.t("Improvement of production environment")}</span> </th>
                            </tr>
                            <tr>
                              <th scope="row"><span>{props.t("Management at a glance")}</span>     
                              </th>
                            </tr>
                          </tbody>
                        </table>
                        </SimpleBar>
                      </div>
                      <div className="col-md-6">
                        <img
                              className="card-img-end img-fluid"
                              src={img1}
                              />
                      </div>
                    </div>
                  </div>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col xl={4}>
              <Card>
                <CardBody>
                <Row>
                    <Col>
                      <p className="fw-bolder">자율운영</p> 
                    </Col>
                    <Col>
                      <div className="float-end">
                        <Link to = "/field-middle">
                        <p className="float-end mb-2">중분류 이동</p>
                        </Link>
                      </div>
                    </Col>
                </Row>
                <Row>
                  <div className="mb-2">
                    <div className="row">
                      <div className="col-md-6">
                      <SimpleBar style={{ height: "220px" }}>
                        <table className="table table-hover table-centered table-nowrap mb-0">
                          <tbody>
                            <tr>
                              <th scope="row">작업시간준수</th>
                            </tr>
                            <tr>
                              <th scope="row">작업집중</th>
                            </tr>
                            <tr>
                              <th scope="row">현장조직문화</th>
                            </tr>
                            <tr>
                              <th scope="row">감독역량향상</th>
                            </tr>
                            <tr>
                              <th scope="row">감독자주도Patrol</th>
                            </tr>
                          </tbody>
                        </table>
                        </SimpleBar>
                      </div>
                      <div className="col-md-6">
                        <img
                            className="card-img-top img-fluid"
                            src={img2}
                            alt="veltrix"
                            />
                      </div>
                    </div>
                  </div>
                </Row>
                </CardBody>
              </Card>
            </Col>
            <Col xl={4}>
              <Card>
                <CardBody>
                  <Row>
                    <Col>
                      <p className="fw-bolder">6Tools</p> 
                    </Col>
                    <Col>
                      <div className="float-end">
                        <Link to = "/field-middle">
                        <p className="float-end mb-2">중분류 이동</p>
                        </Link>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                  <div className="mb-2">
                    <div className="row">
                      <div className="col-md-6">
                      <SimpleBar style={{ height: "220px" }}>
                        <table className="table table-hover table-centered table-nowrap mb-0">
                        <tbody>
                            <tr>
                              <th scope="row">자주/순차 검사</th>
                            </tr>
                            <tr>
                              <th scope="row">Time/Spec Check</th>
                            </tr>
                            <tr>
                              <th scope="row">주요공정 관리</th>
                            </tr>
                            <tr>
                              <th scope="row">품질 반성회</th>
                            </tr>
                            <tr>
                              <th scope="row">Line Audit</th>
                            </tr>
                          </tbody>
                        </table>
                        </SimpleBar>
                      </div>
                      <div className="col-md-6">
                          <img
                            className="card-img-top img-fluid"
                            src={img3}
                            alt="veltrix"
                            />
                      </div>
                    </div>
                  </div>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        {/* 2st */}
          <Row>
            <Col xl={4}>
              <Card>
                <CardBody>
                <Row>
                    <Col>
                      <p className="fw-bolder">ESD</p> 
                    </Col>
                    <Col>
                      <div className="float-end">
                        <Link to = "/field-middle">
                        <p className="float-end mb-2">중분류 이동</p>
                        </Link>
                      </div>
                    </Col>
                </Row>
                <Row>
                  <div className="mb-2">
                    <div className="row">
                      <div className="col-md-6">
                      <SimpleBar style={{ height: "220px" }}>
                        <table className="table table-hover table-centered table-nowrap mb-0">
                          <tbody>
                            <tr>
                              <th scope="row">접지 관리</th>
                            </tr>
                            <tr>
                              <th scope="row">ESD 관리</th>
                            </tr>
                          </tbody>
                        </table>
                        </SimpleBar>
                      </div>
                      <div className="col-md-6">
                        <img
                              className="card-img-top img-fluid"
                              src={img4}
                              alt="veltrix"
                              />
                      </div>
                    </div>
                  </div>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col xl={4}>
              <Card>
                <CardBody>
                <Row>
                    <Col>
                      <p className="fw-bolder">사출/Press</p> 
                    </Col>
                    <Col>
                      <div className="float-end">
                        <Link to = "/field-middle">
                        <p className="float-end mb-2">중분류 이동</p>
                        </Link>
                      </div>
                    </Col>
                </Row>
                <Row>
                  <div className=" mb-2">
                    <div className="row">
                      <div className="col-md-6">
                      <SimpleBar style={{ height: "220px" }}>
                        <table className="table table-hover table-centered table-nowrap mb-0">
                          <tbody>
                            <tr>
                              <th scope="row">원재료 관리</th>
                            </tr>
                            <tr>
                              <th scope="row">금형 관리</th>
                            </tr>
                            <tr>
                              <th scope="row">설비관리</th>
                            </tr>
                          </tbody>
                        </table>
                        </SimpleBar>
                      </div>
                      <div className="col-md-6">
                        <img
                            className="card-img-top img-fluid"
                            src={img5}
                            alt="veltrix"
                            />
                      </div>
                    </div>
                  </div>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col xl={4}>
              <Card>
                <CardBody>
                <Row>
                    <Col>
                      <p className="fw-bolder">공정Loss</p> 
                    </Col>
                    <Col>
                      <div className="float-end">
                        <Link to = "/field-middle">
                        <p className="float-end mb-2">중분류 이동</p>
                        </Link>
                      </div>
                    </Col>
                </Row>
                <Row>
                  <div className=" mb-2">
                    <div className="row">
                      <div className="col-md-6">
                      <SimpleBar style={{ height: "220px" }}>
                        <table className="table table-hover table-centered table-nowrap mb-0">
                          <tbody>
                            <tr>
                              <th scope="row">동작Loss 제거</th>
                            </tr>
                            <tr>
                              <th scope="row">Foo/proof 관리</th>
                            </tr>
                            <tr>
                              <th scope="row">다기능공 육성</th>
                            </tr>
                          </tbody>
                        </table>
                        </SimpleBar>
                      </div>
                      <div className="col-md-6">
                        <img
                            className="card-img-top img-fluid"
                            src={img5}
                            alt="veltrix"
                            />
                      </div>
                    </div>
                  </div>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>

          {/* 3st */}
          <Row>
            <Col xl={4}>
              <Card>
                <CardBody>
                  <Row>
                    <Col>
                    <p className="fw-bolder">설비 Loss</p>
                    </Col>
                    <Col>
                      <div className="float-end">
                        <Link to = "/field-middle">
                        <p className="float-end mb-2">중분류 이동</p>
                        </Link>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                  <div className="mb-2">
                    <div className="row">
                      <div className="col-md-6">
                      <SimpleBar style={{ height: "220px" }}>
                        <table className="table table-hover table-centered table-nowrap mb-0">
                          <tbody>
                            <tr>
                              <th scope="row">자주보전</th>
                            </tr>
                            <tr>
                              <th scope="row">계획보전</th>
                            </tr>
                            <tr>
                              <th scope="row">Spare Part관리</th>
                            </tr>
                            <tr>
                              <th scope="row">전원참여 TPM활동 중분류</th>
                            </tr>
                            <tr>
                              <th scope="row">설비점검표</th>
                            </tr>
                          </tbody>
                        </table>
                        </SimpleBar>
                      </div>
                      <div className="col-md-6">
                        <img
                          className="card-img-top img-fluid"
                          src={img7}
                          alt="veltrix"
                          />
                      </div>
                    </div>
                  </div>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col xl={4}>
              <Card>
                <CardBody>
                  <Row>
                    <Col>
                      <p className="fw-bolder">물류 Loss</p> 
                    </Col>
                    <Col>
                      <div className="float-end">
                        <Link to = "/field-middle">
                        <p className="float-end mb-2">중분류 이동</p>
                        </Link>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                  <div className="mb-2">
                    <div className="row">
                      <div className="col-md-6">
                      <SimpleBar style={{ height: "220px" }}>
                        <table className="table table-hover table-centered table-nowrap mb-0">
                          <tbody>
                            <tr>
                              <th scope="row">입/출고차량관리</th>
                            </tr>
                            <tr>
                              <th scope="row">Depot관리</th>
                            </tr>
                            <tr>
                              <th scope="row">사내물류개선</th>
                            </tr>
                            <tr>
                              <th scope="row">Re-Handing 개선</th>
                            </tr>
                          </tbody>
                        </table>
                        </SimpleBar>
                      </div>
                      <div className="col-md-6">
                        <img
                            className="card-img-top img-fluid"
                            src={img8}
                            alt="veltrix"
                        />
                      </div>
                    </div>
                  </div>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col xl={4}>
              <Card>
                <CardBody>
                  <Row>
                     <div className="col-6">
                        <Col>
                        <p className="fw-bolder">현장개선반</p>
                        </Col>
                        </div>
                        <Col>
                         <div className="float-end">
                        <Link to = "/field-middle">
                        <p className="float-end mb-2">중분류 이동</p>
                        </Link>
                      </div>
                      </Col>
                   </Row>
                   <Row>
                   <div className="mb-2">
                    <div className="row">
                      <div className="col-md-6">
                      <SimpleBar style={{ height: "220px" }}>
                        <table className="table table-hover table-centered table-nowrap mb-0">
                          <tbody>
                            <tr>
                              <th scope="row">현장인재육성</th>
                            </tr>
                            <tr>
                              <th scope="row">성과창출</th>
                            </tr>
                          </tbody>
                        </table>
                        </SimpleBar>
                      </div>
                      <div className="col-md-6">
                       <img
                        className="card-img-top img-fluid"
                        src={img9}
                        alt="veltrix"
                      />
                      </div>
                    </div>
                  </div>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
          {/* 4st from start*/}
          <Row>
            <Col xl={4}>
              <Card>
                <CardBody>
                  <Row>
                    <Col>
                      <p className="fw-bolder">쪽지제안</p> 
                    </Col>
                    <Col>
                      <div className="float-end">
                        <Link to = "/field-middle">
                        <p className="float-end mb-2">중분류 이동</p>
                        </Link>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <div className="mb-2">
                      <div className="row">
                        <div className="col-md-6">
                          <SimpleBar style={{ height: "220px" }}>
                            <table className="table table-hover table-centered table-nowrap mb-0">
                              <tbody>
                                <tr>
                                  <th scope="row">제안 참여 유도</th>
                                </tr>
                                <tr>
                                  <th scope="row">감독자 역량 향상 중분류</th>
                                </tr>
                              </tbody>
                            </table>
                          </SimpleBar>
                        </div>
                        <div className="col-md-6">
                          <img
                            className="card-img-top img-fluid"
                            src={img10}
                            alt="veltrix"
                            />
                        </div>
                      </div>
                    </div>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col xl={4}>
              <Card>
                <CardBody>
                <Row>
                    <Col>
                      <p className="fw-bolder">현장관리</p> 
                    </Col>
                    <Col>
                      <div className="float-end">
                        <Link to = "/field-middle">
                        <p className="float-end mb-2">중분류 이동</p>
                        </Link>
                      </div>
                    </Col>
                </Row>
                <Row>
                  <div className="mb-2">
                    <div className="row">
                      <div className="col-md-6">
                      <SimpleBar style={{ height: "220px" }}>
                        <table className="table table-hover table-centered table-nowrap mb-0">
                          <tbody>
                           
                          </tbody>
                        </table>
                        </SimpleBar>
                      </div>
                      <div className="col-md-6">
                        <img
                            className="card-img-top img-fluid"
                            src={img11}
                            alt="veltrix"
                            />
                      </div>
                    </div>
                  </div>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col xl={4}>
              <Card>
                <CardBody>
                  <Row>
                    <Col>
                      <p className="fw-bolder">기준정보</p> 
                    </Col>
                    <Col>
                      <div className="float-end">
                        <Link to = "/field-middle">
                        <p className="float-end mb-2">중분류 이동</p>
                        </Link>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <div className="mb-2">
                      <div className="row">
                          <div className="col-md-6">
                            <SimpleBar style={{ height: "220px" }}>
                              <table className="table table-hover table-centered table-nowrap mb-0">
                                <tbody>
                                  <tr>
                                    <th scope="row">공통코드 관리</th>
                                  </tr>
                                  <tr>
                                    <th scope="row">공정 관리</th>
                                  </tr>
                                  <tr>
                                    <th scope="row">부서 이동/제외관리</th>
                                  </tr>
                                  <tr>
                                    <th scope="row">기능공 관리</th>
                                  </tr>
                                  <tr>
                                    <th scope="row">사용자 관리</th>
                                  </tr>
                                  <tr>
                                    <th scope="row">Excel UpLoad 관리</th>
                                  </tr>
                                </tbody>
                              </table>
                            </SimpleBar>
                          </div>
                          <div className="col-md-6">
                            <img
                            className="card-img-top img-fluid"
                            src={img12}
                            alt="veltrix"
                            />
                          </div>
                      </div>
                    </div>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        {/* 4st to end*/}
        </Container>
      </div>
    </React.Fragment>
  );
};

Dashboard.propTypes = {
  t: PropTypes.any
};

export default withTranslation()(Dashboard);
