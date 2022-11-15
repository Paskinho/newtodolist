import React, {ChangeEvent, useState} from 'react';
import {KeyboardEvent} from "react";

type EditableSpanPropsType ={
    title: string
    changeTitle: (nextTitle: string) => void
}

const EditableSpan = (props: EditableSpanPropsType) => {
    const [isEditMode, setIsEditMode] = useState<boolean>(false)
    const [title,setTitle]= useState(props.title)
    const onEditMode = () => {
        setIsEditMode(true)
    }
    const offEditMode =() => {
        setIsEditMode(false)
    }
    const onChangeSetLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
       props.changeTitle(title)
        setTitle(e.currentTarget.value)

    }

    const OnKeyChangeTitle = (e:KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && offEditMode()
    return (
        isEditMode
        ? <input
            value={title}
                onBlur={offEditMode}
                 autoFocus
                 onChange={onChangeSetLocalTitle}
            onKeyDown={OnKeyChangeTitle}/>
        :<span onDoubleClick={onEditMode}>
{props.title}

        </span>

    );
};

export default EditableSpan;