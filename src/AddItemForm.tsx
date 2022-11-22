import {IconButton, TextField} from '@mui/material';
import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {AddBoxOutlined} from "@mui/icons-material";

type AddItemFormPropsType = {
    addItem: (title: string) => void
    placeholder: string
}


const AddItemForm = (props: AddItemFormPropsType) => {
    const [title,setTitle]= useState("")
    const [error, setError] = useState<boolean>(false)
    const onChangeSetLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }


const onClickAddItem = () => {
    const trimmedTitle = title.trim()
    if (trimmedTitle) {
        props.addItem(trimmedTitle)
    } else {
        setError(true)
    }
    setTitle("")
}
const onKeyDownEnterAddItem = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && onClickAddItem()

    return (
        <div>
            <TextField
                variant={"outlined"}
                value={title}
                onChange={onChangeSetLocalTitle}
                onKeyDown={onKeyDownEnterAddItem}
                placeholder={props.placeholder}
                label={props.placeholder}
            />


            <IconButton>
            <AddBoxOutlined onClick={onClickAddItem}/>
            </IconButton>
            {error &&
                <div style={{fontWeight: "bold", color: "hotpink"}}>
                    Title is required</div>}

            </div>
    );
};

export default AddItemForm;