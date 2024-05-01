import { CLEAR_TIME_STRING } from "../constants";

export const time = {
            seconds: 0,
            minutes: 0,
            hours: 0,
            intervals: [],
            timeString: CLEAR_TIME_STRING,
            lastIntrevalStartPointString: CLEAR_TIME_STRING,
            lastIntrevalStartPoint: {
                seconds: 0,
                minutes: 0,
                hours: 0,
            },
            clearTime() {
                this.seconds =  0;
                this.minutes = 0;
                this.hours = 0;
                this.intervals = [];
                this.timeString = CLEAR_TIME_STRING;
                this.lastIntrevalStartPointString = CLEAR_TIME_STRING;
                this.lastIntrevalStartPoint = {
                    seconds: 0,
                    minutes: 0,
                    hours: 0,
                };
            },
            saveCurrentInterval() {
                if (this.lastIntrevalStartPointString === this.timeString) return;

                let hasAnyIntreval = true;

                if (this.lastIntrevalStartPointString === CLEAR_TIME_STRING) {
                    hasAnyIntreval = false;
                }

                this.intervals.push({
                    startPoint: this.lastIntrevalStartPointString,
                    endPoint: this.timeString,
                    totalTime: {
                        seconds: this.seconds,
                        minutes: this.minutes,
                        hours: this.hours,
                    },
                    intervalTime: {
                        seconds: hasAnyIntreval ? this.seconds - this.lastIntrevalStartPoint.seconds : this.seconds,
                        minutes: hasAnyIntreval ? this.minutes - this.lastIntrevalStartPoint.minutes : this.minutes,
                        hours: hasAnyIntreval ? this.hours - this.lastIntrevalStartPoint.hours : this.hours,
                    }
                })
                
                this.lastIntrevalStartPointString = this.timeString;
                this.lastIntrevalStartPoint = {
                    seconds: this.seconds,
                    minutes: this.minutes,
                    hours: this.hours,
                };
                
            },
            updateString() {
                let seconds = String(this.seconds);
                let minutes = String(this.minutes);
                let hours   = String(this.hours);

                seconds = seconds.length    < 2 ? "0" + seconds : seconds;
                minutes = minutes.length    < 2 ? "0" + minutes : minutes;
                hours   = hours.length      < 2 ? "0" + hours   : hours;

                this.timeString = `${hours}:${minutes}:${seconds}`;
            },
            getTimeString(intervalTime) {
                let seconds = String(intervalTime.seconds);
                let minutes = String(intervalTime.minutes);
                let hours   = String(intervalTime.hours);

                seconds = seconds.length    < 2 ? "0" + seconds : seconds;
                minutes = minutes.length    < 2 ? "0" + minutes : minutes;
                hours   = hours.length      < 2 ? "0" + hours   : hours;

                return `${hours}:${minutes}:${seconds}`;
            },
            incrementTime() {
                time.seconds++;

                if (time.seconds === 60) {
                    time.seconds = 0;
                    time.minutes++;
                }
                if (time.minutes === 60) {
                    time.minutes = 0;
                    time.hours++;
                }

                this.timeString = this.getTimeString(this);
            },
            saveTimerToLocalStorage(savedName) {
                if (!localStorage.getItem("names")) {
                    localStorage.setItem("names", JSON.stringify([]));
                }

                const names = JSON.parse(localStorage.getItem("names"));

                if (names.includes(savedName)) return false;

                names.push(savedName)

                localStorage.setItem("names", JSON.stringify(names))
                localStorage.setItem(savedName, JSON.stringify(time))

                return true;
            }
        }