import { useState } from "react";
import "./App.css";


function App() {

    const [ timeString, setTimeString ] = useState("00:00:00")

    const time = {
        seconds: 0,
        minutes: 0,
        hours: 0,
        timeString: "00:00:00",
        updateString() {
            let seconds   = String(this.seconds);
            let minutes   = String(this.minutes);
            let hours     = String(this.hours);

            seconds = seconds.length < 2 ? "0" + seconds : seconds
            minutes = minutes.length < 2 ? "0" + minutes : minutes
            hours   = hours.length   < 2 ? "0" + hours   : hours

            this.timeString = `${hours}:${minutes}:${seconds}`
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
            
            this.updateString()
        }
    }; 

    const startTimer = () => {
        setInterval(() => {
            time.incrementTime()
            setTimeString(time.timeString)
            console.log(time.timeString);
        }, 1000)
    }

    return (
        <div className="stopwatch">
            <header className="header">
                <button className="history" type="button">
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.81824 6.72729V14H13.091" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M4 24C4 35.0457 12.9543 44 24 44V44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C16.598 4 10.1351 8.02111 6.67677 13.9981" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M24.005 12L24.0038 24.0088L32.4832 32.4882" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
                <h1>Секундомер</h1>
                <button className="saves" type="button">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.89 5.87891H5.11C3.4 5.87891 2 7.27891 2 8.98891V20.3489C2 21.7989 3.04 22.4189 4.31 21.7089L8.24 19.5189C8.66 19.2889 9.34 19.2889 9.75 19.5189L13.68 21.7089C14.96 22.4089 16 21.7989 16 20.3489V8.98891C16 7.27891 14.6 5.87891 12.89 5.87891Z" fill="white"/>
                        <path d="M21.9998 5.11V16.47C21.9998 17.92 20.9598 18.53 19.6898 17.83L17.7598 16.75C17.5998 16.66 17.4998 16.49 17.4998 16.31V8.99C17.4998 6.45 15.4298 4.38 12.8898 4.38H8.81984C8.44984 4.38 8.18984 3.99 8.35984 3.67C8.87984 2.68 9.91984 2 11.1098 2H18.8898C20.5998 2 21.9998 3.4 21.9998 5.11Z" fill="white"/>
                    </svg>
                </button>
            </header>
            <main className="main">
                <div className="time-display">
                    <span className="time">{timeString}</span>
                </div>
                <div className="buttons">
                    <button 
                        className="start" 
                        type="button"
                        onClick={startTimer}
                    >
                        Начать
                    </button>
                    <button type="button" className="stop">
                        Стоп
                    </button>
                    <svg className="in-favorites" width="48"  height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.89 4H8.11C6.4 4 5 5.4 5 7.11V18.47C5 19.92 6.04 20.54 7.31 19.83L11.24 17.64C11.66 17.41 12.34 17.41 12.75 17.64L16.68 19.83C17.96 20.53 19 19.92 19 18.47V7.11C19 5.4 17.6 4 15.89 4Z" fill="white"/>
                    </svg>
                </div>
                <div className="intervals">
                    <table>
                        <thead>
                            <tr>
                                <th>№</th>
                                <th>Время интервала</th>
                                <th>Общее время</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>00:00:00</td>
                                <td>00:00:00</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>00:00:00</td>
                                <td>00:00:00</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>00:00:00</td>
                                <td>00:00:00</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}

export default App;
