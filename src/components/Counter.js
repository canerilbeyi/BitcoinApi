import React, { useEffect, useState } from "react";

const beginingTime = 10 * 60 * 60;

const Counter = () => {
  const [seconds, setSeconds] = useState(beginingTime);
  const [timeValues, setTimeValues] = useState({
    hours: seconds / 3600,
    minutes: seconds / 60,
    seconds: seconds,
  });

  const secondsToTime = (secs) => {
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      h: hours,
      m: minutes,
      s: seconds,
    };
    setTimeValues(obj);
  };
  useEffect(() => {
    if (seconds <= 0) {
      setSeconds(beginingTime);
    }
    if (seconds >= beginingTime) {
      setSeconds(beginingTime);
    }
    const countdown = setInterval(() => {
      setSeconds(seconds - 1);
    }, 1000);
    secondsToTime(seconds);

    return () => clearInterval(countdown);
  }, [seconds]);

  const changeTime = (type) => {
    if (type === "inc") {
      setSeconds(seconds + 60 * 60);
    } else {
      setSeconds(seconds - 60 * 60);
    }
  };

  const { h, m, s } = timeValues;
  return (
    <div
      style={{
        padding: "30px",
      }}
    >
      <section className="deadline">
        <article className="deadline-format">
          <div>
            <h4 className="hours">{h}</h4>
            <span>hours</span>
          </div>
        </article>
        <article className="deadline-format">
          <div>
            <h4 className="minutes">{m}</h4>
            <span>mins</span>
          </div>
        </article>
        <article className="deadline-format">
          <div>
            <h4 className="seconds">{s}</h4>
            <span>secs</span>
          </div>
        </article>
      </section>
      <div className="button-container">
        <button className="btn btn-increase" onClick={() => changeTime("inc")}>
          increase
        </button>
        <button className="btn btn-increase" onClick={() => changeTime("dec")}>
          decrease
        </button>
      </div>
    </div>
  );
};

export default Counter;
