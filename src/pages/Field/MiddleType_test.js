import React from "react";
import { Row, Col, Card, CardBody, CardTitle, Container 
,  Input
,Label
,Form
, FormGroup} from "reactstrap";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
// import charts
import BarChart from "../AllCharts/chartist/barchart";
import Bar from "../AllCharts/chartist/stackedbarchart";
import DountChart from "../AllCharts/chartist/dountchart";
import PieChart from "../AllCharts/chartist/piechart";
import SmilAnimationsChart from "../AllCharts/chartist/smilanimations";
import LineChart from "../AllCharts/chartist/linechart";
import ChartBar from "../AllCharts/chartist/chartbar";
import LineAreaChart from "../AllCharts/chartist/lineareachart";
import servicesIcon1 from "../../assets/images/services-icon/01.png";
import servicesIcon2 from "../../assets/images/services-icon/02.png";
import servicesIcon3 from "../../assets/images/services-icon/03.png";
import servicesIcon4 from "../../assets/images/services-icon/04.png";
import { Link } from "react-router-dom";


//사진 삽입
import user2 from "../../assets/images/users/user-2.jpg";
import user3 from "../../assets/images/users/user-3.jpg";
import user4 from "../../assets/images/users/user-4.jpg";
import user5 from "../../assets/images/users/user-5.jpg";
import user6 from "../../assets/images/users/user-6.jpg";
import smimg1 from "../../assets/images/small/img-1.jpg";
import smimg2 from "../../assets/images/small/img-2.jpg";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";




const ChartistChart = () => {
  document.title = "LG | 현장인재육성";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs maintitle="Dashboard" title="현장개선반" breadcrumbItem="현장인재육성" />
            <Row>
                <Col md="3">
                        <FormGroup className="mb-3">
                          <Label htmlFor="validationCustom01">First name</Label>
                          <Input
                            name="firstname"
                            placeholder="Mark"
                            type="text"
                            className="form-control"
                            id="validationCustom01"
                          />
                        </FormGroup>
                      </Col>
                      <Col md="3">
                        <FormGroup className="mb-3">
                          <Label htmlFor="validationCustom01">First name</Label>
                          <Input
                            name="firstname"
                            placeholder="Mark"
                            type="text"
                            className="form-control"
                            id="validationCustom01"
                          />
                        </FormGroup>
                      </Col>
                      <Col md="3">
                        <FormGroup className="mb-3">
                          <Label htmlFor="validationCustom02">Last name</Label>
                          <Input
                            name="lastname"
                            placeholder="Otto"
                            type="text"
                            className="form-control"
                            id="validationCustom02"
                          />
                        </FormGroup>
                      </Col>
                      <Col md="3">
                        <FormGroup className="mb-3">
                          <Label htmlFor="validationCustom06">User Name</Label>
                          <div className="input-group has-validation">
                            <span className="input-group-text" id="inputGroupPrepend">@</span>
                            <Input
                              name="userName"
                              placeholder="Please choose a username"
                              type="text"
                              className="form-control"
                              id="validationCustom06"
                            />
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
            <Row>
                      

                <Col md="6">
                <FormGroup className="mb-3">
                    <Label htmlFor="validationCustom01">총인원</Label>
                        <Input
                            name="firstname_3"
                            placeholder="Mark"
                            type="text"
                            className="form-control"
                            id="validationCustom01"
                          />
                        </FormGroup>
            </Col>
                      
            <Col md="6">
                        <FormGroup className="mb-3">
                          <Label htmlFor="validationCustom02">참여인원</Label>
                          <Input
                            name="firstname_4"
                            placeholder="Otto"
                            type="text"
                            className="form-control"
                            id="validationCustom02"
                          />
                        </FormGroup>
            </Col>
                    
        </Row>

              
        <Row>
            <Col md="12">

                    <FormGroup className="mb-3">
                          <Label htmlFor="validationCustom01">총인원</Label>
                          <Input
                            name="firstname_3"
                            placeholder="Mark"
                            type="text"
                            className="form-control"
                            id="validationCustom01"
                            
                            />
                    </FormGroup>
                    <FormGroup className="mb-3">
                          <Label htmlFor="validationCustom01">참여인원</Label>
                          <Input
                            name="firstname_4"
                            placeholder="Mark"
                            type="text"
                            className="form-control"
                            id="validationCustom01"
                            
                            />
                    </FormGroup>
                        
                      
            </Col>
        </Row>


        <Row>
            <Col xl={12} md={6}>
              <Card className="mini-stat bg-primary text-white">
                <CardBody>
                  <div className="mb-1">
                <Col className="col-1">
                    <div className="float-start mini-stat-img me-3">
                      <img src={servicesIcon1} alt="" />
                    </div>
                </Col>
                <Col className="col-11">
                        <Input
                          type="text"
                          className="chat-input"
                          placeholder="Enter your text"
                          />
                           <Input
                          type="text"
                          className="chat-input"
                          placeholder="Enter your text"
                        />
                    <h5 className="font-size-16 text-uppercase mt-0 text-white-50">
                      제조 인원 30% 참여
                    </h5>
                    <h4 className="fw-medium font-size-24">
                      1,685{" "}
                      <i className="mdi mdi-arrow-up text-success ms-2"></i>
                    </h4>
                    <div className="mini-stat-label bg-success">
                      <Link to="/field-small" className="dropdown-item">소분류로 이동
                        <i className="mdi mdi-arrow-right h5"></i>
                      </Link>
                    </div>
                    </Col>
                  </div>
                 
                </CardBody>
              </Card>
            </Col>
          </Row>
<Row>
<Col lg={12}>
              <Card className="mini-stat bg-primary text-white">
                <CardBody>
                  <div className="mb-4">
                    <div className="float-start mini-stat-img me-4">
                      <img src={servicesIcon1} alt="" />
                    </div>
                    <h5 className="font-size-16 text-uppercase mt-0 text-white-50">
                    <Input
                          type="text"
                          
                          placeholder="Enter your text"
                          />
                    </h5>
                    <h4 className="fw-medium font-size-24">
                      1,685{" "}   <Input
                          type="text"
                          
                          placeholder="Enter your text"
                          />
                      <i className="mdi mdi-arrow-up text-success ms-2"></i>
                    </h4>
                    <div className="mini-stat-label bg-success">
                      <p className="mb-0">+ 12%</p>
                    </div>
                  </div>
                  <div className="pt-2">
                    <div className="float-end">
                      <Link to="#" className="text-white-50">
                        <i className="mdi mdi-arrow-right h5"></i>
                      </Link>
                    </div>
                    <p className="text-white-50 mb-0 mt-1">Since last month</p>
                  </div>
                </CardBody>
              </Card>
            </Col>

</Row>

          <Row>
          <Col lg={6}>
              <Card>
                <CardBody>
                  <CardTitle className="h4 mb-4">Stacked bar chart</CardTitle>
                  <Row className="justify-content-center">
                    <Col sm={4}>
                      <div className="text-center">
                        <h5 className="mb-0 font-size-20">5241</h5>
                        <p className="text-muted">Activated</p>
                      </div>
                    </Col>
                    <Col sm={4}>
                      <div className="text-center">
                        <h5 className="mb-0 font-size-20">65411</h5>
                        <p className="text-muted">Pending</p>
                      </div>
                    </Col>
                    <Col sm={4}>
                      <div className="text-center">
                        <h5 className="mb-0 font-size-20">88</h5>
                        <p className="text-muted">Deactivated</p>
                      </div>
                    </Col>
                  </Row>
                  <Bar />
                </CardBody>
              </Card>
            </Col>
            <Col lg={6}>
              <Card>
                <CardBody>
                  <CardTitle className="h4 mb-4">Simple pie chart</CardTitle>
                  <Row className="justify-content-center">
                    <Col sm={4}>
                      <div className="text-center">
                        <h5 className="mb-0 font-size-20">48484</h5>
                        <p className="text-muted">Activated</p>
                      </div>
                    </Col>
                    <Col sm={4}>
                      <div className="text-center">
                        <h5 className="mb-0 font-size-20">48652</h5>
                        <p className="text-muted">Pending</p>
                      </div>
                    </Col>
                    <Col sm={4}>
                      <div className="text-center">
                        <h5 className="mb-0 font-size-20">85412</h5>
                        <p className="text-muted">Deactivated</p>
                      </div>
                    </Col>
                  </Row>
                  <PieChart />
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col lg={6}>
              <Card>
                <CardBody>
                  <h4 className="card-title mb-4"></h4>
                  <div className="table-responsive">
                    <table className="table table-hover table-centered table-nowrap mb-0">
                      <thead>
                        <tr>
                          <th scope="col">소속</th>
                          <th scope="col">1분기</th>
                          <th scope="col">2분기</th>
                          <th scope="col">3분기</th>
                          <th scope="col">4분기</th>
                          <th scope="col">참여인원</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">제조1계</th>
                          <td>3</td>
                          <td>0</td>
                          <td>0</td>
                          <td>0</td>
                          <td>3</td>
                        </tr>
                        <tr>
                          <th scope="row">제조2계</th>
                          <td>0</td>
                          <td>0</td>
                          <td>0</td>
                          <td>0</td>
                          <td>0</td>
                        </tr>
                        <tr>
                          <th scope="row">제조3계</th>
                          <td>0</td>
                          <td>0</td>
                          <td>0</td>
                          <td>0</td>
                          <td>0</td>
                        </tr>
                        <tr>
                          <th scope="row">제조4계</th>
                          <td>0</td>
                          <td>0</td>
                          <td>0</td>
                          <td>0</td>
                          <td>0</td>
                        </tr>
                        <tr>
                          <th scope="row">제조5계</th>
                          <td>0</td>
                          <td>0</td>
                          <td>0</td>
                          <td>0</td>
                          <td>0</td>
                        </tr>
                        <tr>
                          <th scope="row">개선A반</th>
                          <td>7</td>
                          <td>1</td>
                          <td>0</td>
                          <td>3</td>
                          <td>11</td>
                        </tr>
                        <tr>
                          <th scope="row">개선B반</th>
                          <td>0</td>
                          <td>0</td>
                          <td>0</td>
                          <td>0</td>
                          <td>0</td>
                        </tr>
                        <tr>
                          <th scope="row">TOTAL</th>
                          <td>10</td>
                          <td>1</td>
                          <td>0</td>
                          <td>3</td>
                          <td>14</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg={6}>
              <Card>
                <CardBody>
                  <h4 className="card-title mb-4"></h4>
                  <div className="table-responsive">
                    <table className="table table-hover table-centered table-nowrap mb-0">
                      <thead>
                        <tr>
                          <th text-center scope="col">소속</th>
                          <th scope="col">누적 인원</th>
                          <th scope="col">참여율(%)</th>
                          <th scope="col">전체 인원</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">제조1계</th>
                          <td className="align-center">3</td>
                          <td>6%</td>
                          <td>47</td>
                        </tr>
                        <tr>
                          <th scope="row">제조2계</th>
                          <td claassName="text-center">0</td>
                          <td>0%</td>
                          <td>16</td>
                        </tr>
                        <tr>
                          <th scope="row">제조3계</th>
                          <td>0</td>
                          <td>0%</td>
                          <td>103</td>
                        </tr>
                        <tr>
                          <th scope="row">제조4계</th>
                          <td>0</td>
                          <td>0%</td>
                          <td>73</td>
                        </tr>
                        <tr>
                          <th scope="row">제조5계</th>
                          <td>0</td>
                          <td>0%</td>
                          <td>45</td>
                        </tr>
                        <tr>
                          <th scope="row">개선A반</th>
                          <td>11</td>
                          <td>157%</td>
                          <td>7</td>
                        </tr>
                        <tr>
                          <th scope="row">개선B반</th>
                          <td>1</td>
                          <td>13%</td>
                          <td>8</td>
                        </tr>
                        <tr>
                          <th scope="row">TOTAL</th>
                          <td>15</td>
                          <td>5%</td>
                          <td>299</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ChartistChart;
