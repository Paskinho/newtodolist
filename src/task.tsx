import React from 'react';
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";


export type TaskPropsType = {
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
}

const Task = () => {
    return <div key={t.id} className={t.isDone ? "is-done" : ""}>
        <Checkbox
            checked={t.isDone}
            color="primary"
            onChange={onChangeHandler}
        />

        <EditableSpan value={t.title} onChange={onTitleChangeHandler} />
        <IconButton onClick={onClickHandler}>
            <Delete />
        </IconButton>
    </div>
};

export default Task;