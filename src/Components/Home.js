import React, { useState } from "react";
import "./Main.css";
import { IoCallOutline } from "react-icons/io5";
import { VscEmptyWindow } from "react-icons/vsc";
import { Avatar } from "@mui/material";
import { addMeeting, editMeeting } from "../store/actions/home";
import CustomModal from "./CustomModal";
import { useDispatch, useSelector } from "react-redux";

function Callto({ num, time, name, selected, clicked, keyVal }) {
  return (
    <div
      key={keyVal}
      onClick={clicked}
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
        <div className="main__recents-down">Call to {name}</div>
      </div>
    </div>
  );
}

function Home() {
  const [type, setType] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isModal, setIsModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const { meetings, timeArr } = useSelector((state) => state.homeReducer);

  const dispatch = useDispatch();

  const save = (data) => {
    if (type === "SAVE") {
      dispatch(addMeeting(data));
    } else {
      dispatch(editMeeting(data));
    }

    setName("");
    setPhone("");
    setSelectedIndex(null);
    setType(null);
    setIsModal(false);
  };

  function parseTime(s) {
    let c = s.split(":");
    return parseInt(c[0]) * 60 + parseInt(c[1]);
  }

  function convertHours(mins) {
    let hour = Math.floor(mins / 60);
    let minutes = mins % 60;
    let converted = pad(hour, 2) + ":" + pad(minutes, 2);
    return converted;
  }

  function pad(str, max) {
    str = str.toString();
    return str.length < max ? pad("0" + str, max) : str;
  }

  function calculate_time_slot(start_time, end_time, interval = "30") {
    let formatted_time;
    let time_slots = [];
    for (let i = start_time; i <= end_time; i = i + interval) {
      formatted_time = convertHours(i);
      time_slots.push(formatted_time);
    }
    return time_slots;
  }

  let start_time = parseTime("9:00"),
    end_time = parseTime("20:00"),
    interval = 60;

  let times_ara = calculate_time_slot(start_time, end_time, interval);

  return (
    <div className="main">
      <div className="main__left">
        <div className="main__left-parent">
          <div className="main__left-recents">
            {meetings.length > 0 ? (
              meetings.map((val, index) => {
                return (
                  <Callto
                    keyVal={index + val.phone + val.timeSlot}
                    num={val.phone}
                    time={val.timeSlot}
                    name={val.name}
                    clicked={() => {
                      setSelectedIndex(index);
                      setType("EDIT");
                      setName(val.name);
                      setPhone(val.phone);
                      setSelectedSlot(val.timeSlot);
                      setIsModal(true);
                    }}
                  />
                );
              })
            ) : (
              <div className="main__left-empty">
                <VscEmptyWindow color="var(--first-color)" size={60} />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="main__right">
        <div className="main__right-head">
          <p className="main__right-heading">Home</p>
          <div className="main__right-user">
            <p className="main__right-name">Welcome! Jai</p>
            <Avatar
              style={{ height: 30, width: 30 }}
              alt="Jai Chaudhary"
              src="https://avatars.githubusercontent.com/u/59798109?v=4"
            />
          </div>
        </div>
        <div className="mr__details-home">
          {times_ara &&
            times_ara.map((val, index) => (
              <div>
                {timeArr.includes(val) && index < times_ara.length - 1 ? (
                  <div
                    key={index + `${val}-${times_ara[index + 1]}`}
                    //   onClick={() => {
                    //     setSelectedSlot(`${val} - ${times_ara[index + 1]}`);
                    //     setStartTime(val);
                    //     setEndTime(times_ara[index + 1]);
                    //     setIsModal(true);
                    //   }}
                    className="mr__details-SelSlot"
                  >
                    <p className="mr__details-SelSlotText">{`${val} - ${
                      times_ara[index + 1]
                    }`}</p>
                  </div>
                ) : index < times_ara.length - 1 ? (
                  <div
                    key={index + `${val}-${times_ara[index + 1]}`}
                    onClick={() => {
                      setSelectedSlot(`${val} - ${times_ara[index + 1]}`);
                      setStartTime(val);
                      setEndTime(times_ara[index + 1]);
                      setType("SAVE");
                      setIsModal(true);
                    }}
                    className="mr__details-slot"
                  >
                    <p className="mr__details-slotText">{`${val} - ${
                      times_ara[index + 1]
                    }`}</p>
                  </div>
                ) : null}
              </div>
            ))}
        </div>
      </div>
      <CustomModal
        isModal={isModal}
        setIsModal={(val) => {
          setIsModal(val);
        }}
        name={name}
        setName={(val) => {
          setName(val);
        }}
        phone={phone}
        setPhone={(val) => {
          setPhone(val);
        }}
        timeSlot={selectedSlot}
        startTime={startTime}
        endTime={endTime}
        save={save}
        selectedIndex={selectedIndex}
      />
    </div>
  );
}

export default Home;
