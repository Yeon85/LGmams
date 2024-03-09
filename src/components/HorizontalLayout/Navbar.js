import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { Row, Col, Collapse } from "reactstrap";
import { Link } from "react-router-dom";
import withRouter from "components/Common/withRouter";
import classname from "classnames";

//i18n
import { withTranslation } from "react-i18next";

import { connect } from "react-redux";

const Navbar = props => {
  const [ui, setui] = useState(false);
  const [gntae, setgntae] = useState(false);
  const [dash, setdash] = useState(false);

  const [email, setemail] = useState(false);

  const [component, setcomponent] = useState(false);
  const [dashboard, setdashboard] = useState(false);
  const [form, setform] = useState(false);
  const [table, settable] = useState(false);
  const [chart, setchart] = useState(false);
  const [icon, seticon] = useState(false);
  const [map, setmap] = useState(false);
  const [extra, setextra] = useState(false);
  const [auth, setauth] = useState(false);

  useEffect(() => {
    var matchingMenuItem = null;
    var ul = document.getElementById("navigation");
    var items = ul.getElementsByTagName("a");
    removeActivation(items);
    for (var i = 0; i < items.length; ++i) {
      if (window.location.pathname === items[i].pathname) {
        matchingMenuItem = items[i];
        break;
      }
    }
    if (matchingMenuItem) {
      activateParentDropdown(matchingMenuItem);
    }
  });

  const removeActivation = items => {
    for (var i = 0; i < items.length; ++i) {
      var item = items[i];
      const parent = items[i].parentElement;
      if (item && item.classList.contains("active")) {
        item.classList.remove("active");
      }
      if (parent) {
        if (parent.classList.contains("active")) {
          parent.classList.remove("active");
        }
      }
    }
  };

  function activateParentDropdown(item) {
    item.classList.add("active");
    const parent = item.parentElement;
    if (parent) {
      parent.classList.add("active"); // li
      const parent2 = parent.parentElement;
      parent2.classList.add("active"); // li
      const parent3 = parent2.parentElement;
      if (parent3) {
        parent3.classList.add("active"); // li
        const parent4 = parent3.parentElement;
        if (parent4) {
          parent4.classList.add("active"); // li
          const parent5 = parent4.parentElement;
          if (parent5) {
            parent5.classList.add("active"); // li
            const parent6 = parent5.parentElement;
            if (parent6) {
              parent6.classList.add("active"); // li
            }
          }
        }
      }
    }
    return false;
  }

  return (
    <React.Fragment>
      <div className="topnav">
        <div className="container-fluid">
          <nav
            className="navbar navbar-light navbar-expand-lg topnav-menu"
            id="navigation"
          >
            <Collapse
              isOpen={props.leftMenu}
              className="navbar-collapse"
              id="topnav-menu-content"
            >
              <ul className="navbar-nav">
              <li className="nav-item dropdown mega-dropdown">
                  <Link
                    to="/#"
                    onClick={e => {
                      e.preventDefault();
                      setdash(!dash);
                    }}
                    className="nav-link dropdown-toggle arrow-none"
                  >
                    <i className="ti-package me-2"></i>
                    {props.t("Compliance with working hours")}
                  </Link>
                  <div
                    className={classname(
                      "dropdown-menu mega-dropdown-menu px-2 dropdown-menu-start dropdown-mega-menu",
                      { show: dash }
                    )}
                  >
                    <Row>
                      <Col lg={2}>
                        <div>
                          <Link to="/dashboard" className="dropdown-item" >
                            {props.t("UPH, same-day WO win rate")}
                          </Link>
                          <Link to="/wt-inbox" className="dropdown-item">
                            {props.t("Working hour compliance subcategories")}
                          </Link>
                          <Link to="/mon-calendar" className="dropdown-item">
                            {props.t("Monitoring the reflection meeting")}
                          </Link>
                          <Link to="/gallery" className="dropdown-item">
                            {props.t("Self-reflection meeting image management")}
                          </Link><Link to="/yeoncha-list" className="dropdown-item">
                            {props.t("Annual leave list")}
                          </Link><Link to="/gntae-mng" className="dropdown-item">
                            {props.t("Improve supervisor competency")}
                          </Link>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </li>
              {/*   <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/dashboard"
                  >
                    <i className="ti-home me-2" />
                    {props.t("Dashboard")} {props.menuOpen}
                  </Link>

                </li> */}

                <li className="nav-item dropdown mega-dropdown">
                  <Link
                    to="/#"
                    onClick={e => {
                      e.preventDefault();
                      setui(!gntae);
                    }}
                    className="nav-link dropdown-toggle arrow-none"
                  >
                    <i className="ti-package me-2"></i>
                    {props.t("Improve supervisor competency")}
                  </Link>
                  <div
                    className={classname(
                      "dropdown-menu mega-dropdown-menu px-2 dropdown-menu-start dropdown-mega-menu",
                      { show: gntae }
                    )}
                  >
                    <Row>
                      <Col lg={2}>
                        <div>
                          <Link to="/trans-plan" className="dropdown-item">
                            {props.t("Supervisor Training Plan Management")}
                          </Link>
                          <Link to="/trans-exe" className="dropdown-item">
                            {props.t("Supervisor training implementation management")}
                          </Link>
                        </div>
                      </Col>
                    
                    </Row>
                  </div>
                </li>

              
      {/*           
                <li className="nav-item dropdown mega-dropdown">
                  <Link
                    to="/#"
                    className="nav-link dropdown-toggle arrow-none"
                    onClick={e => {
                      e.preventDefault();
                      setauth(!auth);
                    }}
                  >
                    <i className="ti-archive me-2"></i>{" "}
                    {props.t("Authentication")}
                  </Link>
                  <div
                    className={classname("dropdown-menu mega-dropdown-menu px-2 dropdown-mega-menu-lg", { show: auth })}
                  >
                    <div className="row">
                      <div className="col-lg-6">
                        <div>
                          <Link to="/pages-login" className="dropdown-item">
                            {props.t("Login")}
                          </Link>
                          <Link to="/pages-register" className="dropdown-item">
                            {props.t("Register")}
                          </Link>
                          <Link to="/page-recoverpw" className="dropdown-item">
                            {props.t("Recover Password")}
                          </Link>
                          <Link to="/auth-lock-screen" className="dropdown-item">
                            {props.t("Lock Screen")}
                          </Link>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div>
                          <Link to="/pages-login-2" className="dropdown-item">
                            {props.t("Login 2")}
                          </Link>
                          <Link to="/pages-register-2" className="dropdown-item">
                            {props.t("Register 2")}
                          </Link>
                          <Link to="/page-recoverpw-2" className="dropdown-item">
                            {props.t("Recover Password 2")}
                          </Link>
                          <Link to="/auth-lock-screen-2" className="dropdown-item">
                            {props.t("Lock Screen 2")}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </li> */}

                {/* <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle arrow-none"
                    to="/#"
                    onClick={e => {
                      e.preventDefault();
                      setextra(!extra);
                    }}
                  >
                    <i className="ti-support me-2"></i>{" "}
                    {props.t("Extra pages")}
                  </Link>

                  <div
                    className={classname("dropdown-menu mega-dropdown-menu px-2 dropdown-mega-menu-lg", {
                      show: extra,
                    })}
                  >
                    <div className="row">
                      <div className="col-lg-6">
                        <div>
                          <Link to="/pages-timeline" className="dropdown-item">
                            {props.t("Timeline")}
                          </Link>
                          <Link to="/pages-starter" className="dropdown-item">
                            {props.t("Starter Page")}
                          </Link>
                          <Link to="/pages-directory" className="dropdown-item">{props.t("Directory")}</Link>
                          <Link to="/pages-404" className="dropdown-item">{props.t("Error 404")}</Link>
                          <Link to="/pages-500" className="dropdown-item">{props.t("Error 500")}</Link>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div>
                          <Link to="/pages-pricing" className="dropdown-item">{props.t("Pricing")}</Link>
                          <Link to="/pages-gallery" className="dropdown-item">{props.t("Gallery")}</Link>
                          <Link to="/pages-profile" className="dropdown-item">{props.t("Profile")}</Link>
                          <Link to="/pages-maintenance" className="dropdown-item">{props.t("Maintenance")}</Link>
                          <Link to="/pages-comingsoon" className="dropdown-item">{props.t("Coming Soon")}</Link>
                          <Link to="/pages-faqs" className="dropdown-item">{props.t("FAQs")}</Link>
                        </div>
                      </div>
                    </div>

                  </div>

                </li>

                <li className="nav-item dropdown">
                  <Link className="nav-link dropdown-toggle arrow-none" to="/#"
                    onClick={e => {
                      e.preventDefault();
                      setemail(!email);
                    }}
                  >
                    <i className="ti-bookmark-alt me-2"></i>
                    {props.t("Email Templates")}
                  </Link>
                  <div className={classname("dropdown-menu", {
                    show: email,
                  })} aria-labelledby="topnav-emailtemplates">
                    <Link
                      to="/email-template-basic"
                      className="dropdown-item"
                    >
                      {props.t("Basic Action")}
                    </Link>
                    <Link
                      to="/email-template-alert"
                      className="dropdown-item"
                    >
                      {props.t("Alert Email")}
                    </Link>
                    <Link
                      to="/email-template-billing"
                      className="dropdown-item"
                    >
                      {props.t("Billing Email")}
                    </Link>
                  </div>
                </li> */}

              </ul>
            </Collapse>
          </nav>
        </div>
      </div>
    </React.Fragment>
  );
};

Navbar.propTypes = {
  leftMenu: PropTypes.any,
  location: PropTypes.any,
  menuOpen: PropTypes.any,
  t: PropTypes.any,
};

const mapStatetoProps = state => {
  const { leftMenu } = state.Layout;
  return { leftMenu };
};

export default withRouter(
  connect(mapStatetoProps, {})(withTranslation()(Navbar))
);
