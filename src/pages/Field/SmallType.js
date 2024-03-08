import React from "react";
import { Row, Col, Card, CardBody, Container } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

// Charts
import Gauge from "../AllCharts/echart/gaugechart";
import Line from "../AllCharts/echart/linechart";
import LineBar from "../AllCharts/echart/linebarchart";
import Doughnut from "../AllCharts/echart/doughnutchart";
import Pie from "../AllCharts/echart/piechart";
import Scatter from "../AllCharts/echart/scatterchart";
import Bubble from "../AllCharts/echart/bubblechart";
import Candlestick from "../AllCharts/echart/candlestickchart";


const ChartistChart = () => {
  document.title = "LG | 현장개선반인원관리";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs maintitle="Dashboard" title="현장개선반" breadcrumbItem="현장개선반인원관리" />
          <Row>
            <Col lg={12}>
             <Card>
                <CardBody>
                  <h4 className="mt-0 header-title mb-4">개선반 역량 향상 현황</h4>
                  <div id="mix-line-bar" className="e-chart">
                    <LineBar />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <h4 className="card-title mb-4"></h4>
                  <h4 className="mt-0 header-title mb-4">현장개선반 인원관리</h4>
                  <div className="table-responsive">
                    <table className="table table-hover table-centered table-nowrap mb-0">
                      <thead>
                        <tr>
                          <th scope="col">이름</th>
                          <th scope="col">FollProof</th>
                          <th scope="col">LCA</th>
                          <th scope="col">AGV/ACS</th>
                          <th scope="col">필요스킬/역량</th>
                          <th scope="col">총점(100점 기준)</th>
                          <th scope="col">역량Level</th>
                          <th scope="col">비고</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">박진권</th>
                          <td>34</td>
                          <td>31</td>
                          <td>35</td>
                          <td>55</td>
                          <td>38.75</td>
                          <td>1Lv</td>
                          <td>1년 미만(23.6.12)</td>
                        </tr>
                        <tr>
                          <th scope="row">권민호</th>
                          <td>100</td>
                          <td>95</td>
                          <td>100</td>
                          <td>100</td>
                          <td>98.75</td>
                          <td>5Lv</td>
                           <td></td>
                        </tr>
                        <tr>
                          <th scope="row">방정환</th>
                          <td>90</td>
                          <td>93</td>
                          <td>62</td>
                          <td>82</td>
                          <td>81.75</td>
                          <td>4Lv</td>
                          <td></td>
                        </tr>
                        <tr>
                          <th scope="row">이민섭</th>
                          <td>64</td>
                          <td>64</td>
                          <td>79</td>
                          <td>73</td>
                          <td>70.00</td>
                          <td>3Lv</td>
                          <td></td>
                        </tr>
                        <tr>
                          <th scope="row">김영호</th>
                          <td>1000</td>
                          <td>100</td>
                          <td>100</td>
                          <td>100</td>
                          <td>100.00</td>
                          <td>5Lv</td>
                          <td></td>
                        </tr>
                        <tr>
                          <th scope="row">김동준</th>
                          <td>25</td>
                          <td>25</td>
                          <td>55</td>
                          <td>62</td>
                          <td>41.75</td>
                          <td>1Lv</td>
                          <td></td>
                        </tr>
                        <tr>
                          <th scope="row">방정환</th>
                          <td>90</td>
                          <td>93</td>
                          <td>71</td>
                          <td>82</td>
                          <td>84.00</td>
                          <td>4Lv</td>
                          <td></td>
                        </tr>
                        <tr>
                          <th scope="row">송근주</th>
                          <td>77</td>
                          <td>76</td>
                          <td>99</td>
                          <td>92</td>
                          <td>86.00</td>
                          <td>4Lv</td>
                          <td>조장</td>
                        </tr>
                        <tr>
                          <th scope="row">김윤호</th>
                          <td>88</td>
                          <td>90</td>
                          <td>52</td>
                          <td>87</td>
                          <td>79.25</td>
                          <td>3Lv</td>
                          <td></td>
                        </tr>
                        
                        <tr>
                          <th scope="row">김윤호</th>
                          <td>89</td>
                          <td>90</td>
                          <td>62</td>
                          <td>87</td>
                          <td>82.00</td>
                          <td>4Lv</td>
                          <td></td>
                        </tr>
                        <tr>
                          <th scope="row">김옥재</th>
                          <td>93</td>
                          <td>60</td>
                          <td>62</td>
                          <td>97</td>
                          <td>78.00</td>
                          <td>3Lv</td>
                          <td></td>
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

      <div>

        
      </div>
    </React.Fragment>
  );
};

export default ChartistChart;
