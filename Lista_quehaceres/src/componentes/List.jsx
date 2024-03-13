import React, { useState } from 'react';

function useList() {
    const [tasks, setTasks] = useState([]);
    const [checks, setChecks] = useState([]);

    const add = (task) => {
        setTasks(prevTasks => [...prevTasks, task]);
        setChecks(prevChecks => [...prevChecks, false]);
    };

    const remove = (taskIndex) => {
        setTasks(prevTasks => {
            const newTasks = [...prevTasks];
            newTasks.splice(taskIndex, 1);
            return newTasks;
        });

        setChecks(prevChecks => {
            const newChecks = [...prevChecks];
            newChecks.splice(taskIndex, 1);
            return newChecks;
        });
    };

    const complete = (taskIndex) => {
        setChecks(prevChecks => {
            const newChecks = [...prevChecks];
            newChecks[taskIndex] = !prevChecks[taskIndex];
            return newChecks;
        });
    };

    return {
        add,
        remove,
        complete,
        tasks,
        checks
    };
}

export default useList;
