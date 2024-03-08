import React from "react";
import { Row, Col, Card, CardBody, Container
  ,  Input
,Label
,Form
, FormGroup} from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { Link } from "react-router-dom";
// Charts
import Gauge from "../AllCharts/echart/gaugechart";
import Line from "../AllCharts/echart/linechart";
import LineBar from "../AllCharts/echart/linebarchart";
import Doughnut from "../AllCharts/echart/doughnutchart";
import Pie from "../AllCharts/echart/piechart";
import Scatter from "../AllCharts/echart/scatterchart";
import Bubble from "../AllCharts/echart/bubblechart";
import Candlestick from "../AllCharts/echart/candlestickchart";
import servicesIcon1 from "../../assets/images/services-icon/01.png";
const EChart = () => {
  document.title = "LG | 현재인재육성";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          {/* Render Breadcrumb */}
          <Breadcrumbs maintitle="Dashboard" title="현장개선반" breadcrumbItem="현장인재육성" />
          
          
          <Row>
            <Col lg={12}>
           
            <Card className="mini-stat bg-primary text-white">
                <CardBody>
                  <div className="mb-4">
                    <div className="float-start mini-stat-img me-4">
                      <img src={servicesIcon1} alt="" />
                    </div>
                    <div className="float-start me-4">
                      
                     총인원<Input
                          type="text"
                          
                          placeholder=""
                          />
                    </div>

                    <div className="float-start me-4">
                    참여인원<Input
                          type="text"
                          
                          placeholder=""
                          />
                    </div>
                    
                    
                    <div className="mini-stat-label bg-success">
                      <Link to="/field-small" className="dropdown-item">소분류로 이동
                        <i className="mdi mdi-arrow-right h5"></i>
                      </Link>
                    </div>
                  </div>
                  
                </CardBody>
              </Card>

            </Col>

          </Row>
          
          <Row>
            <Col lg="6">
              <Card>
                <CardBody>
                  <h4 className="mt-0 header-title mb-4"></h4>
                  <div id="line-chart" className="e-chart">
                    <Line />
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg="6">
              <Card>
                <CardBody>
                  <h4 className="mt-0 header-title mb-4"></h4>
                  <div id="pie-chart" className="e-chart">
                    <Pie />
                  </div>
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

export default EChart;