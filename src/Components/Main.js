import React, { useState } from "react";
import "./Main.css";
import { BiSearchAlt } from "react-icons/bi";
import { IoCallOutline } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { IoMicOutline } from "react-icons/io5";
import { GiBackwardTime } from "react-icons/gi";
import { IoIosCall } from "react-icons/io";
import { Avatar } from "@mui/material";

export function Contact({ num, time, type, selected }) {
  return (
    <div
      className={selected ? "main__recents-selectedHead" : "main__recents-head"}
    >
      <div className="main__recents-icon">
        <IoCallOutline color="grey" />
      </div>
      <div className="main__recents-text">
        <div className="main__recents-top">
          <p className="main__recents-num">{num}</p>
          <p className="main__recents-time">{time}</p>
        </div>
        <div className="main__recents-down">{type} Call</div>
      </div>
    </div>
  );
}

function Main() {
  const [tab, setTab] = useState("All");
  return (
    <div className="main">
      <div className="main__left">
        <div className="main__left-parent">
          <div className="main__left-head">
            <div className="main__left-typebox">
              <div
                onClick={() => {
                  setTab("All");
                }}
                className={
                  tab === "All"
                    ? "main__left-selectedCT"
                    : "main__left-callertype"
                }
              >
                <p
                  className={
                    tab === "All"
                      ? "callertype__text-selected"
                      : "callertype__text"
                  }
                >
                  All
                </p>
              </div>
              <div
                onClick={() => {
                  setTab("Missed");
                }}
                className={
                  tab === "Missed"
                    ? "main__left-selectedCT"
                    : "main__left-callertype"
                }
              >
                <p
                  className={
                    tab === "Missed"
                      ? "callertype__text-selected"
                      : "callertype__text"
                  }
                >
                  Missed
                </p>
              </div>
            </div>
            <div className="main__left-search">
              <BiSearchAlt color={"grey"} />
            </div>
          </div>
          <div className="main__left-recents">
            <Contact num={"+91 7503312477"} time={"10 min"} type={"Missed"} />
            <Contact
              selected={true}
              num={"+91 7503312477"}
              time={"Sat, Oct 1"}
              type={"Outgoing"}
            />
            <Contact
              num={"+91 7503312477"}
              time={"Fri, Sep 30"}
              type={"Incoming"}
            />
            <Contact
              num={"+91 7503312477"}
              time={"Fri, Sep 30"}
              type={"Incoming"}
            />
            <Contact
              num={"+91 7503312477"}
              time={"Fri, Sep 30"}
              type={"Incoming"}
            />
            <Contact
              num={"+91 7503312477"}
              time={"Fri, Sep 30"}
              type={"Incoming"}
            />
            <Contact
              num={"+91 7503312477"}
              time={"Fri, Sep 30"}
              type={"Incoming"}
            />
            <Contact
              num={"+91 7503312477"}
              time={"Fri, Sep 30"}
              type={"Incoming"}
            />
            <Contact
              num={"+91 7503312477"}
              time={"Fri, Sep 30"}
              type={"Incoming"}
            />
            <Contact
              num={"+91 7503312477"}
              time={"Fri, Sep 30"}
              type={"Incoming"}
            />
            <Contact
              num={"+91 7503312477"}
              time={"Fri, Sep 30"}
              type={"Incoming"}
            />
            <Contact
              num={"+91 7503312477"}
              time={"Fri, Sep 30"}
              type={"Incoming"}
            />
          </div>
        </div>
      </div>
      <div className="main__right">
        <div className="main__right-head">
          <p className="main__right-heading">Recents</p>
          <div className="main__right-arrow">
            <IoIosArrowBack color={"var(--first-color)"} />
            <IoIosArrowForward color={"var(--first-color)"} />
          </div>
          <div className="main__right-user">
            <p className="main__right-name">Welcome! Jai</p>
            <Avatar
              style={{ height: 30, width: 30 }}
              alt="Jai Chaudhary"
              src="https://avatars.githubusercontent.com/u/59798109?v=4"
            />
          </div>
        </div>
        <div className="mr__details">
          <div className="mr__details-top">
            <div className="mr__details-user">
              <Avatar
                style={{ height: 60, width: 60 }}
                alt="Jai Chaudhary"
                src="https://avatars.githubusercontent.com/u/59798109?v=4"
              />
              <div className="mr__details-text">
                <p className="mr__details-num">+91 75033124477</p>
                <p className="mr__details-where">Call to Mudit</p>
              </div>
            </div>
            <div className="mr__details-icons">
              <IoMicOutline size={24} color="grey" />
              <GiBackwardTime size={24} color="grey" />
              <div className="mr__details-call">
                <IoIosCall size={24} color="white" />
              </div>
            </div>
          </div>
          <div className="mr__details-bottom">
            <p className="mr__details-num">Client Details :</p>
            <p className="mr__details-para">
              {`I am a creative frontend developer experienced in providing high-impact web & 
              mobile solutions for diverse industry organizations. Skilled in designing, developing and t
              esting multiple web & mobile based applications incorporating a range of technologies. Spring to 
              combine broad background with strong technical skills to excel as a frontend developer.`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
