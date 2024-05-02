import { useCallback, useState } from "react";

import { time } from "./models/time";

import "./App.css";

import { CLEAR_TIME_STRING } from "./constants"

console.log(CLEAR_TIME_STRING);

// TODO: Разбить компоненты на отдельные файлы, добавить state-manager
// TODO: Реализовать историю
// TODO: Реализовать список сохранений и загрузку сохранений
// TODO: Прикрутить к сохраняемым данным о засечённом времени время запуска new Date() и другие данные (?)

function App() {
    const [timeString, setTimeString] = useState(CLEAR_TIME_STRING);
    const [intervalId, setIntervalId] = useState(null);
    const [timerStatus, setTimerStatus] = useState("wait");

    const onClickStartButton = useCallback(() => {
        if (timerStatus === "wait" || timerStatus === "pause") {
            const intervalId = setInterval(() => {
                time.incrementTime();
                setTimeString(time.timeString);
                console.log(time.timeString);
            }, 1000);
    
            setIntervalId(intervalId);
        }

        if (timerStatus === "run") {
            // Сохраняем текущий интервал
            time.saveCurrentInterval()
            return;
        }

        setTimerStatus("run");
    }, [timerStatus, setTimeString, setIntervalId, setTimerStatus]);

    const onClickStopButton = useCallback(() => {
        if (timerStatus === "wait") return;

        if (timerStatus === "run") {
            clearInterval(intervalId);
            setTimerStatus("pause");
        };
        
        if (timerStatus === "pause") {
            clearInterval(intervalId);
            setTimerStatus("wait");
            setTimeString(CLEAR_TIME_STRING)
            time.clearTime()
        };

    }, [timerStatus, intervalId, setTimerStatus]);

    const onClickSaveButton = useCallback(() => {
        if (timeString === CLEAR_TIME_STRING) return;

        openSavingModalWindow()
    }, [timeString])

    const openSavingModalWindow = useCallback(() => {
        // TEMP
        submitSavingModalWindow()

        // label: Сохранение таймера
        // placeholder: Название

        // Открываем модалку
        // Ставим интервал на паузу
        // Изменяем кнопки под статус "pause"
        // Перекрываем остальной интерфейс

        // При нажатии крестика вызываем 
        // closeSavingModalWindow

        // При нажатии "Сохранить" вызываем
        // submitSavingModalWindow
    }, [])

    const submitSavingModalWindow = useCallback(() => {
        // TEMP
        time.saveTimerToLocalStorage(prompt("Название"));

        // Пользователь ввёл имя и нажал сохранить
        // Попытка сохранить
        
        // если название не прошло валидацию, то говорим об ошибке

        // time.saveTimerToLocalStorage(saveName);
        // если вернулся false, то говорим об ошибке 

        // Ошибка выводится с помощью
        // showErrorWithSavingInModalWindow
        
        // Если ошибок не было, то закрываем окно 
    }, [])

    const closeSavingModalWindow = useCallback(() => {
        // Закрывает окно при нажатии на крестик
    }, [])

    const showErrorWithSavingInModalWindow = useCallback((msg) => {
        // Выводит ошибку в модальном окне 
        // В ошибке выводится сообщение msg
    }, [])

    return (
        <div className="stopwatch">
            <header className="header">
                <button className="history" type="button">
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M5.81824 6.72729V14H13.091"
                            stroke="white"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M4 24C4 35.0457 12.9543 44 24 44V44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C16.598 4 10.1351 8.02111 6.67677 13.9981"
                            stroke="white"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M24.005 12L24.0038 24.0088L32.4832 32.4882"
                            stroke="white"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
                <h1>Секундомер</h1>
                <button className="saves" type="button">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M12.89 5.87891H5.11C3.4 5.87891 2 7.27891 2 8.98891V20.3489C2 21.7989 3.04 22.4189 4.31 21.7089L8.24 19.5189C8.66 19.2889 9.34 19.2889 9.75 19.5189L13.68 21.7089C14.96 22.4089 16 21.7989 16 20.3489V8.98891C16 7.27891 14.6 5.87891 12.89 5.87891Z"
                            fill="white"
                        />
                        <path
                            d="M21.9998 5.11V16.47C21.9998 17.92 20.9598 18.53 19.6898 17.83L17.7598 16.75C17.5998 16.66 17.4998 16.49 17.4998 16.31V8.99C17.4998 6.45 15.4298 4.38 12.8898 4.38H8.81984C8.44984 4.38 8.18984 3.99 8.35984 3.67C8.87984 2.68 9.91984 2 11.1098 2H18.8898C20.5998 2 21.9998 3.4 21.9998 5.11Z"
                            fill="white"
                        />
                    </svg>
                </button>
            </header>
            <main className="main">
                <div className="time-display">
                    <span className="time">{timeString}</span>
                </div>
                <div className="buttons">
                    <button 
                        type="button" 
                        className={`simple-buttons start ${timerStatus === "" ? "is-disable" : ""}`} 
                        onClick={onClickStartButton}
                    >
                        {
                            timerStatus === "pause" 
                            ? "Возобн." 
                            : timerStatus === "run" 
                            ? "Интервал"
                            : "Начать" 
                        }
                    </button>
                    <button 
                        type="button" 
                        className={`simple-buttons stop ${timerStatus === "wait" ? "is-disable" : ""}`} 
                        onClick={onClickStopButton}
                        disabled={timerStatus === "wait"} 
                    >
                        {
                            timerStatus === "pause" 
                            ? "Очистить" 
                            : "Стоп"
                        }
                        
                    </button>
                    <button 
                        type="button" 
                        className={`save-button ${timeString === CLEAR_TIME_STRING ? "is-disable" : ""}`}
                        onClick={onClickSaveButton}
                        disabled={timeString === CLEAR_TIME_STRING} 
                    >
                        <svg
                            className="save-button"
                            width="48"
                            height="48"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M15.89 4H8.11C6.4 4 5 5.4 5 7.11V18.47C5 19.92 6.04 20.54 7.31 19.83L11.24 17.64C11.66 17.41 12.34 17.41 12.75 17.64L16.68 19.83C17.96 20.53 19 19.92 19 18.47V7.11C19 5.4 17.6 4 15.89 4Z"
                                fill="white"
                            />
                        </svg>
                    </button>
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
                            {
                            time.intervals.map((interval, index) => {
                                return (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{time.getTimeString(interval.intervalTime)}</td>
                                    <td>{interval.endPoint}</td>
                                </tr>
                                )
                            })
                            }
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}

export default App;
