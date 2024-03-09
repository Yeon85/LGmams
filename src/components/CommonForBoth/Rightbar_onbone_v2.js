import React, { useEffect,useState } from "react";
import { Row, Col, Card, CardBody, CardTitle, Container } from "reactstrap";
import ReactDOM from 'react-dom/client';
import PropTypes, { element } from "prop-types"
//import Slider from './Slider';
import Slider from "react-rangeslider";
import styled from 'styled-components';
import { connect } from "react-redux"
import {
  changeLayout,
  changeLayoutWidth,
  changeSidebarTheme,
  changeBodyTheme,
  changeSidebarType,
  changeTopbarTheme,
  showRightSidebarAction,
} from "../../store/actions"

//SimpleBar
import SimpleBar from "simplebar-react"

import { Link } from "react-router-dom"

//Import images
import layout1 from "../../assets/images/layouts/layout-1.jpg"
import layout2 from "../../assets/images/layouts/layout-2.jpg"
import layout3 from "../../assets/images/layouts/layout-3.jpg"


const fn_size = (value) => {
 document.body.style.fontSize = value+'px';
}



const RightSidebar = props => {

 const [custom_val, setcustom_val] = useState(13);
 const labels = {
    4 : "4",
    8 : "8",
    13: "13",
    18: "16",
    24: "24",
    30: "30",
    38: "38",
    46: "46", 
 };
 //console.log()
  return (
    <React.Fragment>
      <div className="right-bar" id="right-bar">
        <SimpleBar style={{ height: "900px" }}>
          <div data-simplebar className="h-100">
            <div className="rightbar-title px-3 py-4">
              <Link
                to="#"
                onClick={e => {
                  e.preventDefault()
                  props.showRightSidebarAction(false)
                }}
                className="right-bar-toggle float-end"
              >
                <i className="mdi mdi-close noti-icon" />
              </Link>
              <h5 className="m-0">Settings!!!!</h5>
            </div>

            <hr className="my-0" />

            <div className="p-4">
              <div className="radio-toolbar">
                <span className="mb-2 d-block" id="radio-title">
                  <h5>
                    Thema
                  </h5>
                </span>
                <input
                  type="radio"
                  id="radioVertical"
                  name="radioFruit"
                  value="vertical"
                  checked={props.layoutType === "vertical"}
                  onChange={e => {
                    if (e.target.checked) {
                      props.changeLayout(e.target.value)
                    }
                  }}
                />
                <label htmlFor="radioVertical">Vertical</label>
                {"   "}
                <input
                  type="radio"
                  id="radioHorizontal"
                  name="radioFruit"
                  value="horizontal"
                  checked={props.layoutType === "horizontal"}
                  onChange={e => {
                    if (e.target.checked) {
                      props.changeLayout(e.target.value)
                    }
                  }}
                />
                <label htmlFor="radioHorizontal">Horizontal</label>
              </div>
             <hr className="my-3" />
             <div className="mb-3">
                <span className="mb-2 d-block">
                <h5 class="font-18 text-start">Font Size</h5>
                </span>
                <Slider
                    value={custom_val}
                    min={4}
                    max={46}
                    labels={labels}
                    orientation="horizontal"
                    onChange={value => {
                      //alert(value);
                      //globalValue(value);
                     setcustom_val(value);
                      fn_size(value);
                   }}
                />
              </div> 
              <hr className="mt-5" />
              <div className="mb-3">
              <div className="radio-toolbar">
                <span className="mb-2 d-block font-18 text-start" id="radio-title">
                 <h5 >Layouts</h5>
                  </span>
                
                <input
                  type="radio"
                  id="light-mode-switch"
                  name="radioBloom"
                  value="light"
                  checked={props.bodyTheme === "light"}
                  onChange={e => {
                    if (e.target.checked) {
                      props.changeBodyTheme(e.target.value)
                      props.changeTopbarTheme(e.target.value)
                      props.changeSidebarTheme(e.target.value)
                    }
                  }}
                />{" "}
                 <label htmlFor="light-mode-switch">light</label>
                 {"   "}
                 <input
                  type="radio"
                  id="dark-mode-switch"
                  name="radioBloom"
                  value="dark"
                  checked={props.bodyTheme === "dark"}
                  onChange={e => {
                    if (e.target.checked) {
                      props.changeBodyTheme(e.target.value)
                      props.changeTopbarTheme(e.target.value)
                      props.changeSidebarTheme(e.target.value)
                    }
                  }}
                />{" "}
                <label htmlFor="dark-mode-switch">dark</label>
              </div>
              <hr className="mt-1" />
              {props.layoutType === "light" ? (
                <React.Fragment>
                  <hr className="mt-1" />
                </React.Fragment>
              ) : null}
            </div>
          </div>
          
        </div>
      </SimpleBar>
    </div>
    <Row>


</Row>
  <div className="RightSidebar">
<Slider/>
</div>

      <div className="rightbar-overlay" />
    </React.Fragment>
  )
}

RightSidebar.propTypes = {
  changeLayout: PropTypes.func,
  changeLayoutWidth: PropTypes.func,
  changeSidebarTheme: PropTypes.func,
  changeBodyTheme: PropTypes.func,
  changeSidebarType: PropTypes.func,
  changeTopbarTheme: PropTypes.func,
  layoutType: PropTypes.any,
  layoutWidth: PropTypes.any,
  leftSideBarTheme: PropTypes.any,
  leftSideBarType: PropTypes.any,
  showRightSidebarAction: PropTypes.func,
  topbarTheme: PropTypes.any,
}

const mapStateToProps = state => {
  return { ...state.Layout }
}

export default connect(mapStateToProps, {
  changeLayout,
  changeSidebarTheme,
  changeBodyTheme,
  changeSidebarType,
  changeLayoutWidth,
  changeTopbarTheme,
  showRightSidebarAction,
})(RightSidebar)
